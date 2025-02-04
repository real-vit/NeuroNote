import re

def clean_text(text: str) -> str:
    """Cleans raw notes by removing extra spaces and symbols."""
    text = re.sub(r"\s+", " ", text).strip()
    return text

def format_references(results):
    """
    Formats search results into a structured reference section with snippets.
    """
    if not results:
        return "No relevant references found."

    formatted = "\n".join(
        [
            f"- **[{res['title']}]({res['url']})**\n  *Snippet:* {res.get('snippet', 'No summary available.')}\n"
            for res in results
        ]
    )

    return f"\n### Additional References:\n{formatted}"
