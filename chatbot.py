from flask import Flask, request, jsonify, render_template
import os
from dotenv import load_dotenv
from openai import OpenAI

# Load environment variables
load_dotenv()

app = Flask(__name__)

# Set OpenAI API key
openai_client = OpenAI(api_key=os.getenv("OPENAI_API_KEY"))  # Ensure API key is set in environment variables

# Route to serve the HTML file
@app.route("/")
def home():
    print("Home route accessed")
    return render_template("index.html")

@app.route("/chat", methods=["POST"])
def chat():
    user_message = request.json.get("message")
    if not user_message:
        return jsonify({"error": "No message provided"}), 400

    # Call the fine-tuned model
    try:
        response = openai_client.chat.completions.create(
            model="ft:gpt-4o-mini-2024-07-18:bhs:virtual-expert:AZ1HhUbt",  # Replace with your fine-tuned model ID
            messages=[
                {"role": "system", "content": "You are a helpful assistant."},
                {"role": "user", "content": user_message}
            ]
        )
        return jsonify({"response": response.choices[0].message.content})
    except Exception as e:
        return jsonify({"error": str(e)}), 500

if __name__ == "__main__":
    app.run(host="0.0.0.0", port=5000)
