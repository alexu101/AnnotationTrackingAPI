from fastapi import FastAPI, BackgroundTasks
from pydantic import BaseModel
from hash_computer import process_hash


class ComputeTask(BaseModel):
    file_path: str
    notification_endpoint: str


app = FastAPI()


@app.get("/")
async def root():
    return {"message": "Hello World"}


@app.post("/api/hash")
async def compute_hash(task: ComputeTask, background_tasks: BackgroundTasks):
    background_tasks.add_task(process_hash, task.notification_endpoint, task.file_path)
    return {"message": "Hash processing started"}
