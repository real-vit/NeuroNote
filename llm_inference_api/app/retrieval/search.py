import requests

SEARX_HOST = "http://localhost:8888"  # SearxNG instance

def search_query(query: str) -> str:
    params = {"q": query, "format": "json"}
    response = requests.get(f"{SEARX_HOvST}/search", params=params)
    return response.json().get("results", [])
