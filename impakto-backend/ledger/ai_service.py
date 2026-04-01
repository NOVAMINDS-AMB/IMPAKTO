import base64
from groq import Groq
from django.conf import settings
import json
from PIL import Image
import io

# Initialize the new Groq Client
client = Groq(api_key=settings.GROQ_API_KEY)

def extract_ledger_data(image_bytes):
    """
    Takes raw image bytes, sends them to Gemini 2.5 Flash, 
    and forces the model to return a strict JSON transaction object.
    """
    image = Image.open(io.BytesIO(image_bytes))
    if image.mode != 'RGB':
        image = image.convert('RGB')
    buffered = io.BytesIO()
    image.save(buffered, format="JPEG")
    base64_image = base64.b64encode(buffered.getvalue()).decode("utf-8")
    
    prompt = """
    You are an expert financial data extraction AI for a microfinance application in Kenya. 
    Analyze the provided image of a handwritten or physical ledger. 
    Extract the most recent or most prominent transaction and return it STRICTLY using this JSON schema:
    
    {
      "amount": (number, the monetary value extracted, e.g. 1500.00),
      "transaction_type": (string, MUST be exactly "INCOME" or "EXPENSE"),
      "category": (string, e.g. "SALES", "TRANSPORT", "STOCK", "WAGES"),
      "transaction_date": (string, format YYYY-MM-DD. If no date is visible, estimate today's date),
      "description": (string, a brief summary of the item, e.g. "Maize - 10kg bags")
    }
    """
    
    try:
        response = client.chat.completions.create(
            model="meta-llama/llama-4-scout-17b-16e-instruct",
            messages=[
                {
                    "role": "user",
                    "content": [
                        {"type": "text", "text": prompt},
                        {
                            "type": "image_url",
                            "image_url": {
                                "url": f"data:image/jpeg;base64,{base64_image}",
                            },
                        },
                    ],
                }
            ],
            temperature=0,
        )
        import re
        text = response.choices[0].message.content
        match = re.search(r'\{.*\}', text, re.DOTALL)
        if not match:
            raise ValueError("No JSON object found in response.")
        extracted_data = json.loads(match.group(0))
        return extracted_data
        
    except Exception as e:
        print(f"AI Extraction Error: {e}")
        raise ValueError("Failed to extract data from the image. Ensure the image is clear.")