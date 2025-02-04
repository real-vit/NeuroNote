from llama_cpp import Llama

MODEL_PATH = "app/models/Llama-3.2-3B-Instruct-Q4_K_M.gguf"
#./Llama-3.2-3B-Instruct-Q4_K_M.gguf
# Load Llama3 model with optimal settings
llm = Llama(
    model_path=MODEL_PATH,
    n_gpu_layers=35,
    n_ctx=1024,
    temperature=0.4
)

def generate_notes(prompt: str) -> str:
    """Generates structured notes based on input."""
    output = llm(prompt, max_tokens=512)
    print(output)
    return output["choices"][0]["text"].strip()
