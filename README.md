# Getting Started with Create React App

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## Available Scripts

In the project directory, you can run:

### `cd frontend`

If you're running for the first time run 
### `npm build` 
### `npm start`

If you're running once the node_modules are created,, you can directly do
### `npm start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in your browser.

The page will reload when you make changes.\
You may also see any lint errors in the console.



You will also need to run the backend separately. The backend is Python based

1. Navigate to the directory
### `cd backend`

2. Install the dependencies
### `pip install -r requirements.txt`

3. Create a .env file in the backend folder and create the following variables
AWS_REGION=us-east-1
S3_BUCKET_NAME=your_bucket_name
CHATGROQ_API_KEY=your_api_key

4. Run the server
### python run_server.py