from fastapi import APIRouter
from app.models.llama_model import generate_notes
from app.retrieval.chroma_store import store_note_summary
from app.utils.preprocess import clean_text
from app.retrieval.searx_search import search_query
import uuid
from pydantic import BaseModel
from app.retrieval.chroma_store import retrieve_similar_summaries
import asyncio

class NoteRequest(BaseModel):
    raw_notes: str
    research: bool = False

class QueryRequest(BaseModel):
    query: str

router = APIRouter()

@router.post("/process")
def process_notes(request: NoteRequest):
    """
    Processes raw notes into a structured summary and enhances it with search results.
    :param research: Flag to indicate whether to fetch research papers (default is False).
    """
    raw_notes = request.raw_notes
    research = request.research

    cleaned_notes = clean_text(raw_notes)
    search_results = search_query(cleaned_notes[:100], research=research)

    # Generate a structured summary with extra context (search results)
    prompt = f"""
    ### **Instructions:**  
    Refine and structure the following notes into a clear, well-formatted summary. Use short, readable explanations while keeping it concise and structured.

    ### **Notes:**  
    {cleaned_notes}

    ### **Snippets (only refer to these if needed for clarity):**  
    {[x['snippet'] for x in search_results]}

    ### **Formatting Guidelines:**  
    - **Use bullet points** for clarity  
    - Highlight key terms in **bold**  
    - Keep language simple  
    - Explain formulas if applicable
    - Use user prompts enclosed in !!
    - Do not add extra framing text (e.g. "Here is the summary"), just clean the notes.
    - Do not repeat information from the snippets verbatim unless it's directly relevant.
    - Do not add too much extra information
    --- 

    """

    structured_summary = generate_notes(prompt)

    # Store summary in ChromaDB
    note_id = str(uuid.uuid4())
    store_note_summary(note_id, structured_summary)

    return {
        "message": "Notes processed & enhanced successfully!",
        "note_id": note_id,
        "summary": structured_summary,
        "references": search_results
    }



# INFERENCE ENDPOINTS HERE

@router.post("/process_notes_async")
async def process_notes_async(request: NoteRequest):
    raw_notes = request.raw_notes
    research = request.research
    
    cleaned_notes = clean_text(raw_notes)
    search_results = search_query(cleaned_notes[:50], research=research)
    prompt = f"""
    ### **Instructions:**  
    Refine and structure the following notes into a **clear, well-formatted summary**.  
    Keep explanations **concise, readable, and structured**.  

    ### **Notes:**  
    {cleaned_notes}  

    {"### **Reference Snippets (Use only if needed):** " + " ".join(f"- {x['snippet']}" for x in search_results) if search_results else ""}

    ### **Formatting Guidelines:**  
    - **Use bullet points** for clarity  
    - **Highlight key terms** in **bold**  
    - **Keep language simple & direct**  
    - **Do not add unnecessary framing text** (e.g., "Here's the summary")  
    - **Explain formulas briefly** (if present)  
    - **Do not copy snippets verbatim**—only use them for context  

    ### **Structured Summary:**  
    """

    query_task = asyncio.to_thread(lambda: search_query(cleaned_notes[:100], research=research))
    llm_task = asyncio.to_thread(lambda: generate_notes(prompt))  
    
    search_results, structured_summary = await asyncio.gather(query_task, llm_task)
    
    note_id = str(uuid.uuid4())
    store_note_summary(note_id, structured_summary)

    return {
        "message": "Notes processed successfully!",
        "note_id": note_id,
        "summary": structured_summary,
        "references": search_results
    }


@router.post("/query_notes")
def query_notes(request: QueryRequest):
    """
    Searches the vector database for relevant stored notes and generates a structured response.
    """
    query_text = request.query
    top_k = 3  # Default to 3 most relevant notes

    # Search in ChromaDB
    relevant_notes = retrieve_similar_summaries(query_text, top_k=top_k)

    if not relevant_notes:
        return {"message": "No relevant notes found.", "response": ""}

    # Format retrieved notes for LLM
    formatted_notes = "\n\n".join([f"- {note}" for note in relevant_notes])

    # Generate a response based on retrieved notes
    prompt = f"""
    ### **Instructions:**  
    Summarize and recall information **only from the following retrieved notes**.  
    If the notes contain relevant details, answer ONLY THE QUERY concisely using **bullet points**.  
    If the information is missing, say **'No relevant notes found.'**  
    Do not hallucinate extra details.

    ### **Retrieved Notes:**  
    {formatted_notes}

    ### **Response:**  
    """

    response = generate_notes(prompt)

    return {
        "message": "Query processed successfully!",
        "response": response,
        "retrieved_notes": relevant_notes
    }



