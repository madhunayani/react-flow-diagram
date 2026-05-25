from fastapi import FastAPI
from datetime import datetime

app = FastAPI()


@app.get("/")
async def root():
    return {
        "message": "FastAPI server is running 🚀"
    }


@app.get("/health")
async def health():
    return {
        "status": "healthy",
        "timestamp": datetime.utcnow().isoformat()
    }


@app.get("/users")
async def get_users():
    return {
        "users": [
            {
                "id": 1,
                "name": "Madhu"
            },
            {
                "id": 2,
                "name": "Alex"
            }
        ]
    }


@app.get("/products")
async def get_products():
    return {
        "products": [
            {
                "id": 101,
                "name": "Laptop",
                "price": 85000
            },
            {
                "id": 102,
                "name": "Keyboard",
                "price": 2500
            }
        ]
    }


@app.post("/login")
async def login():
    return {
        "status": "success",
        "message": "User logged in successfully"
    }


@app.get("/metrics")
async def metrics():
    return {
        "uptime": "24h",
        "requests": 1240,
        "active_users": 18
    }