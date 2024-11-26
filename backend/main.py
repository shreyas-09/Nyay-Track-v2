import os
import uuid
import json
from google.cloud import storage, bigquery

# Set up Google Cloud credentials
os.environ["GOOGLE_APPLICATION_CREDENTIALS"] = "path/to/your-gcp-service-account-key.json"

# GCP configuration
BUCKET_NAME = "your-gcp-bucket-name"
BIGQUERY_DATASET = "your_dataset_name"
BIGQUERY_TABLE = "your_table_name"

def upload_to_gcs(file_path, file_name):
    try:
        storage_client = storage.Client()
        bucket = storage_client.bucket(BUCKET_NAME)
        unique_name = f"uploads/{uuid.uuid4()}_{file_name}"
        blob = bucket.blob(unique_name)
        blob.upload_from_filename(file_path)
        return f"gs://{BUCKET_NAME}/{unique_name}"
    except Exception as e:
        raise RuntimeError(f"Failed to upload to GCS: {e}")

def process_with_llm(file_path):
    with open(file_path, "r") as f:
        content = f.read()
    return {"summary": "Processed summary", "keywords": ["example", "keywords"]}

def store_in_bigquery(file_name, gcs_path, llm_result):
    try:
        bigquery_client = bigquery.Client()
        table_id = f"{bigquery_client.project}.{BIGQUERY_DATASET}.{BIGQUERY_TABLE}"

        rows_to_insert = [
            {
                "file_name": file_name,
                "file_path": gcs_path,
                "llm_result": json.dumps(llm_result),
            }
        ]

        errors = bigquery_client.insert_rows_json(table_id, rows_to_insert)
        if errors:
            raise RuntimeError(f"Failed to insert into BigQuery: {errors}")
    except Exception as e:
        raise RuntimeError(f"BigQuery insertion failed: {e}")

def process_file_backend(file_path):
    try:
        # Extract file name
        file_name = os.path.basename(file_path)

        # Step 1: Upload to GCS
        gcs_url = upload_to_gcs(file_path, file_name)
        print(f"Uploaded to GCS: {gcs_url}")

        # Step 2: Process file with LLM
        llm_results = process_with_llm(file_path)
        print(f"LLM Results: {llm_results}")

        # Step 3: Store results in BigQuery
        store_in_bigquery(file_name, gcs_url, llm_results)
        print("Results stored in BigQuery.")

        return {"status": "success", "gcs_url": gcs_url, "llm_results": llm_results}

    except Exception as e:
        return {"status": "error", "message": str(e)}

