import requests

# URL of the Flask app
url = "http://127.0.0.1:5000/chat"

# Data to send in the POST request
data = {"message": "What is GlycanAge?"}

try:
    # Sending the POST request
    response = requests.post(url, json=data)
    
    # Checking if the response is successful
    if response.status_code == 200:
        print("Response from chatbot:")
        print(response.json())
    else:
        print(f"Error: Received status code {response.status_code}")
        print(response.text)

except Exception as e:
    print(f"An error occurred: {e}")
