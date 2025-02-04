from fastapi import FastAPI
from app.routes import notes

app = FastAPI(
    title="Llama RAG Notes Processor",
    description="Summarizes and retrieves structured notes using Llama3 and ChromaDB",
    version="1.0"
)

app.include_router(notes.router)

@app.get("/", tags=["Health Check"])
def home():
    return {"message": "Llama RAG API is running 🚀"}
