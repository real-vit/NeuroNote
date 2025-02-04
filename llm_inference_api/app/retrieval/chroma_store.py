import chromadb
import uuid
from datetime import datetime

# Initialize ChromaDB with persistent storage
chroma_client = chromadb.PersistentClient(path="chroma_db")
collection = chroma_client.get_or_create_collection("note_summaries")

def store_note_summary(note_id: str, summary: str, metadata: dict = None):
    """
    Stores structured note summaries in ChromaDB with optional metadata.
    
    :param note_id: Unique identifier for the note
    :param summary: The structured summary of the note
    :param metadata: Optional dictionary with metadata (e.g., timestamp, tags)
    """
    if metadata is None:
        metadata = {}

    # Adding default metadata if not provided
    metadata['timestamp'] = metadata.get('timestamp', datetime.utcnow().isoformat())  # Add timestamp
    metadata['note_id'] = note_id  # Ensure note_id is part of metadata

    # Store in ChromaDB with metadata
    collection.add(
        ids=[note_id],
        documents=[summary],
        metadatas=[metadata]  # Attach metadata to the document
    )

    print(f"Note {note_id} stored with metadata: {metadata}")

def retrieve_similar_summaries(query: str, top_k=3):
    """Retrieves most relevant note summaries using semantic search."""
    results = collection.query(query_texts=[query], n_results=top_k)
    return results["documents"] if results else []
