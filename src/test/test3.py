from pydantic import BaseModel, Field
from datetime import datetime
from typing import List, Optional
import uuid

# --- Data Models ---

class Task(BaseModel):
    id: str = Field(default_factory=lambda: str(uuid.uuid4()))
    title: str
    description: Optional[str] = None
    completed: bool = False
    created_at: datetime = Field(default_factory=datetime.utcnow)

class TaskManager:
    """A clean in-memory task management system."""
    
    def __init__(self):
        self._tasks: List[Task] = []

    def create_task(self, title: str, description: Optional[str] = None) -> Task:
        task = Task(title=title, description=description)
        self._tasks.append(task)
        return task

    def get_all_tasks(self) -> List[Task]:
        return self._tasks

    def complete_task(self, task_id: str) -> Optional[Task]:
        for task in self._tasks:
            if task.id == task_id:
                task.completed = True
                return task
        return None


# --- Practical Execution Example ---

if __name__ == "__main__":
    print("--- Initializing Task Manager ---")
    manager = TaskManager()

    # 1. Create dummy tasks
    task1 = manager.create_task(
        title="Refactor RAG Ingestion Pipeline", 
        description="Fix table chunk parsing issue in unstructured PDF files."
    )
    task2 = manager.create_task(
        title="Review FastAPI endpoints", 
        description="Check telemetry and health routes for production readiness."
    )

    print(f"Created Task 1: {task1.title} (ID: {task1.id})")
    print(f"Created Task 2: {task2.title} (ID: {task2.id})\n")

    # 2. Complete a task
    print(f"--- Modifying Status for Task ID: {task1.id} ---")
    updated_task = manager.complete_task(task1.id)
    
    if updated_task:
        print(f"Task status successfully updated! Completed: {updated_task.completed}\n")

    # 3. List out current status of all records
    print("--- Final Task Registry View (JSON Serialized) ---")
    for task in manager.get_all_tasks():
        # Using Pydantic's model_dump to output a clean dictionary configuration
        print(task.model_dump())