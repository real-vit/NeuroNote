from app.models.llama_model import generate_notes
from langchain_community.utilities import SearxSearchWrapper
import spacy 
import re

nlp = spacy.load("en_core_web_sm")

search = SearxSearchWrapper(
    searx_host="http://127.0.0.1:32768/", k=5
)

def format_references(results):
    """
    Formats search results into a structured reference section with snippets.
    """
    if not results:
        return "No relevant references found."

    formatted = "\n".join(
        [
            f"- **[{res['title']}]({res['link']})**\n  *Snippet:* {res.get('snippet', 'No summary available.')}\n"
            for res in results
        ]
    )
    return f"\n### Additional References:\n{formatted}"

def refine_query_with_llm(raw_notes: str):
    """
    Uses the LLM to extract a structured search query from rough notes.
    """
    prompt = f"""
    Generate a **concise and effective search query that is one line** for retrieving relevant information, nothing else.

    Notes: {raw_notes}

    Query:
    """
    refined_query = generate_notes(prompt)  # Assuming this calls the LLM
    return refined_query.strip()


nlp = spacy.load("en_core_web_sm")

def extract_keywords(raw_notes: str):
    """
    Extracts relevant keywords and key phrases from raw notes for a search query.
    """
    # Process the raw text with SpaCy
    doc = nlp(raw_notes)

    entities = [ent.text for ent in doc.ents]
    noun_phrases = [np.text for np in doc.noun_chunks]
    
    keywords = list(set(entities + noun_phrases))
    print(keywords)
    return "".join(keywords)

def refine_query_with_keywords(raw_notes: str):
    """
    Uses keyword extraction to create a search query.
    """
    keywords = extract_keywords(raw_notes)
    refined_query = "".join(keywords)
    return refined_query.strip()

def search_query(raw_notes: str, num_results=5, research=False):
    """
    Cleans the raw notes, extracts a refined search query, and queries SearxNG.
    """
    # Step 1: Get a clean search query from LLM
    search_query = refine_query_with_keywords(raw_notes)
    print("search query refined: ", search_query)
    
    # Step 2: Set categories dynamically based on `research` flag
    categories = "science, scholar, academics" if research else "general"

    try:
        results = search.results(
            search_query,  # Use the refined query
            num_results=num_results,
            categories=categories,
            time_range="year" if research else None
        )
        print(results)
        references = [
            {"title": result["title"], "url": result["link"], "engines":result["engines"], "snippet":result["snippet"]}
            for result in results
        ]

        return references if references else [{"title": "No relevant references found.", "url": "", "snippet":""}]

    except Exception as e:
        print(f"⚠️ Error fetching search results: {e}")
        return [{"title": "Error fetching references", "url": ""}]
