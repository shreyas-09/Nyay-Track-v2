from fastapi import FastAPI, File, UploadFile, HTTPException
from aws_service import upload_file_to_s3
from llama_service import invoke_llama
from aws_service import store_result_in_dynamodb

app = FastAPI()

#API end point to upload a file, run a LLAMA model, and store the results in a Dynamo DB
@app.post("/upload/")
async def upload_and_process_file(file: UploadFile = File(...)):
    """
    Uploads a file to S3, processes it with LLaMA, and stores the results in DynamoDB.
    """
    try:
        # Step 1: Upload file to S3
        file_name = file.filename
        file_content = await file.read()
        upload_file_to_s3(file_name, file_content)

        # Step 2: Invoke LLaMA model with the file content
        llama_response = invoke_llama(file_content.decode("utf-8"))

        
        # Step 3: Store the LLaMA result in DynamoDB
        store_result_in_dynamodb(file_name, llama_response)

        return {
            "message": "File uploaded and processed successfully",
            "result": llama_response,
        }

    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Error: {str(e)}")

# API end point to fetch results from the DynamoDB
@app.get("/results/")
async def get_results(file_name: Optional[str] = Query(None)):
    """
    Fetches results from DynamoDB. If `file_name` is provided, fetch results for a specific file.
    """
    try:
        results = fetch_results_from_dynamodb(file_name)
        return {"results": results}
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))