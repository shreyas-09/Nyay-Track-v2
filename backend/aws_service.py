from config import s3_client, S3_BUCKET_NAME
from config import dynamodb_client
from config import dynamodb_client
from boto3.dynamodb.conditions import Key, Attr

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


#Fetch data from Dynamo DB

def fetch_results_from_dynamodb(file_name: str = None) -> List[dict]:
    """
    Fetches results from DynamoDB. If `file_name` is provided, fetch results for that specific file.
    """
    try:
        if file_name:
            # Query DynamoDB for a specific file
            response = dynamodb_client.query(
                TableName=DYNAMO_TABLE_NAME,
                KeyConditionExpression=Key('FileName').eq(file_name)
            )
        else:
            # Scan DynamoDB to fetch all results
            response = dynamodb_client.scan(TableName=DYNAMO_TABLE_NAME)
        
        items = response.get('Items', [])
        # Convert DynamoDB items to Python dictionaries
        return [{k: v['S'] for k, v in item.items()} for item in items]

    except Exception as e:
        print(f"Error fetching data from DynamoDB: {str(e)}")
        raise
