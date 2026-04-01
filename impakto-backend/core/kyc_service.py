import base64
from groq import Groq
from django.conf import settings
import json
from PIL import Image
import io
import face_recognition

# Initialize the new Groq Client
client = Groq(api_key=settings.GROQ_API_KEY)

def extract_id_data(image_bytes):
    """
    Takes a photo of a National ID, sends it to Gemini 2.5 Flash, 
    and forces the model to extract the identity data as JSON.
    """
    image = Image.open(io.BytesIO(image_bytes))
    if image.mode != 'RGB':
        image = image.convert('RGB')
    buffered = io.BytesIO()
    image.save(buffered, format="JPEG")
    base64_image = base64.b64encode(buffered.getvalue()).decode("utf-8")
    
    prompt = """
    You are a strict KYC (Know Your Customer) compliance AI for a Kenyan microfinance institution.
    Analyze this image of an ID card (such as a Kenyan National ID).
    Extract the individual's first name, last name, and ID Number (or Serial Number).
    
    Return the data STRICTLY in this JSON format:
    {
      "first_name": "string",
      "last_name": "string",
      "id_number": "string"
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
        print(f"KYC AI Error: {e}")
        raise ValueError("Failed to read the ID card. Please ensure the image is clear, well-lit, and not blurry.")
    
def match_faces(id_image_bytes, selfie_image_bytes):
    """
    Compares the face on the ID card to the face in the selfie using dlib.
    Returns a boolean match and a confidence score.
    """
    try:
        # 1. Load the images into face_recognition
        id_image = face_recognition.load_image_file(io.BytesIO(id_image_bytes))
        selfie_image = face_recognition.load_image_file(io.BytesIO(selfie_image_bytes))

        # 2. Extract the geometric face encodings (finds the eyes, nose, mouth lines)
        id_encodings = face_recognition.face_encodings(id_image)
        selfie_encodings = face_recognition.face_encodings(selfie_image)

        # 3. Validation: Ensure a face was actually found in both photos
        if not id_encodings:
            raise ValueError("Could not detect a face on the ID card.")
        if not selfie_encodings:
            raise ValueError("Could not detect a face in the selfie.")

        # 4. Compare the first face found in both images (tolerance 0.6 is standard)
        match_results = face_recognition.compare_faces([id_encodings[0]], selfie_encodings[0], tolerance=0.6)
        is_match = bool(match_results[0])

        # 5. Calculate a 0-100 Confidence Score
        face_distances = face_recognition.face_distance([id_encodings[0]], selfie_encodings[0])
        confidence = max(0.0, 100.0 - (face_distances[0] * 100.0))

        return {
            "is_match": is_match,
            "confidence": round(confidence, 2)
        }
    except Exception as e:
        print(f"Biometric Error: {e}")
        raise ValueError(str(e))