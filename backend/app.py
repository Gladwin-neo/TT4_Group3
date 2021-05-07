from flask import Flask, make_response, jsonify, request, json
import requests
import jwt

app = Flask(__name__)

API_KEY = "895Z21koZEasz7rGcQnPw9Z3BgZUoTln4Lnda9jH"

# def get_response(status, data):
#     return {
#         "status": status,
#         "data": data
#     }

@app.route('/')
def index():
    return "hello world"

@app.route("/login", methods=["POST"])
def login():
    if not (request.method == "POST"):
        return "Error"
        # return get_response(400, "Invalid HTTP verb.")

    login_data = json.loads(request.data)
    userName = login_data['userName']
    userPass = login_data['userPass']

    API_ENDPOINT = "https://ipllrj2mq8.execute-api.ap-southeast-1.amazonaws.com/techtrek/login"

    body = {
        "userName" : userName, 
        "userPass" : userPass
    }

    headers = {
        'x-api-key': API_KEY,
        'Content-Type': 'application/json'
    }

    response = requests.request("POST", API_ENDPOINT, headers=headers, data=json.dumps(body))
    if (response.status_code == 403) :
        return "Error"
    
    return response.text

if (__name__) == "__main__":
    app.run(debug=True)