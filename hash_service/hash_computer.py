import hashlib
import requests
import time
import datetime
import json


def generate_hash(file_path: str):

    with open(file_path, "rb") as f:

        contents = f.read()
        hash_object = hashlib.md5(contents)

        return hash_object.hexdigest()


def process_hash(endpoint, file_path):
    hash: str = generate_hash(file_path)

    for try_no in range(3):
        try:
            response = requests.post(endpoint, json={"hash": hash})
            if response.ok:
                print("Request processed successfull")
                return
        except:
            print(f"Request failed, trying again ({try_no}) ...")
            time.sleep(2**try_no)

    print("Request was unsuccessfull")
    with open("failed_webhooks.json", "a") as f:

        json.dump(
            {
                "endpoint": endpoint,
                "file_path": file_path,
                "hash": hash,
                "timestamp": datetime.datetime.now().isoformat(),
            },
            f,
        )
        f.write("\n")
