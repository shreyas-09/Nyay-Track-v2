import os
import boto3

# Load environment variables
AWS_REGION = os.getenv("AWS_REGION", "us-east-1")
S3_BUCKET_NAME = os.getenv("S3_BUCKET_NAME", "your_bucket_name")
CHATGROQ_API_KEY = os.getenv("CHATGROQ_API_KEY", "your_api_key")
DYNAMO_TABLE_NAME = os.getenv("DYNAMO_TABLE_NAME","LlamaResults")

# AWS Clients
s3_client = boto3.client("s3", region_name=AWS_REGION)
dynamodb_client = boto3.client("dynamodb", region_name=AWS_REGION)
