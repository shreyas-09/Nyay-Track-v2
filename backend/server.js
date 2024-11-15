const Fastify = require("fastify");
const fs = require("fs-extra");
const path = require("path");
const axios = require("axios");
require("dotenv").config();

const fastify = Fastify({ logger: true });

// Register Fastify multipart plugin for handling file uploads
fastify.register(require("@fastify/multipart"));

// RAG Processing Endpoint
fastify.post("/api/rag-process", async (req, reply) => {
  const data = await req.file();

  // Save the file temporarily
  const filePath = path.join(__dirname, "uploads", data.filename);
  await fs.ensureDir(path.dirname(filePath));
  await fs.writeFile(filePath, await data.toBuffer());

  try {
    // Read the file content
    const fileContents = await fs.readFile(filePath, "utf-8");

    // Query the LLama API
    const ragResult = await invokeLlamaAPI(fileContents);

    // Clean up the uploaded file
    await fs.remove(filePath);

    // Return response to the client
    reply.send({ message: ragResult });
  } catch (error) {
    fastify.log.error(error);
    reply.status(500).send({ message: "Error processing the file." });
  }
});

// Helper: Call the LLama API
const invokeLlamaAPI = async (context) => {
  try {
    const response = await axios.post(
      process.env.LLAMA_API_URL, // API endpoint from .env file
      {
        prompt: `Using the following document as context, answer questions based on it:\n\n${context}`,
        max_tokens: 200,
        temperature: 0.7,
      },
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${process.env.LLAMA_API_KEY}`,
        },
      }
    );

    // Return the generated response
    return response.data.choices[0].text.trim();
  } catch (error) {
    throw new Error(`LLama API Error: ${error.message}`);
  }
};

// Start the Fastify server
const PORT = process.env.PORT || 3000;
fastify.listen({ port: PORT }, (err, address) => {
  if (err) {
    fastify.log.error(err);
    process.exit(1);
  }
  fastify.log.info(`Server running at ${address}`);
});
