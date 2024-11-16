from config import s3_client, S3_BUCKET_NAME
from config import dynamodb_client

# Function to upload a file to S3
def upload_file_to_s3(file_name: str, file_content: bytes):
    s3_client.put_object(
        Bucket=S3_BUCKET_NAME,
        Key=file_name,
        Body=file_content,
    )
    print(f"Uploaded {file_name} to S3.")


#Function to store the results in Dynamo DB
def store_result_in_dynamodb(file_name: str, result: str):
    dynamodb_client.put_item(
        TableName="LlamaResults",
        Item={
            "FileName": {"S": file_name},
            "Result": {"S": result},
        }
    )
    print(f"Stored result for {file_name} in DynamoDB.")
