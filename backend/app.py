from flask import Flask, make_response, jsonify, request, json
import requests
import jwt

app = Flask(__name__)

API_KEY = "895Z21koZEasz7rGcQnPw9Z3BgZUoTln4Lnda9jH"

@app.route('/')
def index():
    return "hello world"

def get_response(status, data):
    return {
        "status": status,
        "data": data
    }

@app.route("/login", methods=["POST"])
def login():
    if not (request.method == "POST"):
        return "Wrong HTTP method"

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
        return "Invalid login credentials!"
    print(json.loads(response.text))
    return get_response(200, json.loads(response.text))
    # return response.text

@app.route("/balance", methods=["POST"])
def get_balance():
    API_ENDPOINT = "https://ipllrj2mq8.execute-api.ap-southeast-1.amazonaws.com/techtrek/accounts"

    get_account_balance = json.loads(request.data)
    custID = get_account_balance['custID']
    accountKey = get_account_balance['accountKey']

    headers = {
        'x-api-key': API_KEY,
        'Content-Type': 'application/json'
    }   
    body = {
        "custID": custID,
        "accountKey" : accountKey
    }

    response = requests.request("POST", API_ENDPOINT, headers=headers, data=json.dumps(body))
    if (response.status_code == 400):
        return "Invalid customerId!"
    return get_response(200, json.loads(response.text))
    # return response.text

@app.route("/transactions", methods=["POST"])
def view_transactions():
    if not (request.method == "POST"):
        return "Wrong HTTP method"

    view_transaction_details = json.loads(request.data)
    custID = view_transaction_details['custID']
    accountKey = view_transaction_details['accountKey']

    API_ENDPOINT = "https://ipllrj2mq8.execute-api.ap-southeast-1.amazonaws.com/techtrek/transactions/view"

    body = {
        "custID" : custID, 
        "accountKey" : accountKey
    }

    headers = {
        'x-api-key': API_KEY,
        'Content-Type': 'application/json'
    }

    response = requests.request("POST", API_ENDPOINT, headers=headers, data=json.dumps(body))
    if (response.status_code == 403) :
        return "Credentials provided are invalid"
    
    return get_response(200, json.loads(response.text))

@app.route("/add", methods=["POST"])
def add_transactions():
    if not (request.method == "POST"):
        return "Wrong HTTP method"

    add_details = json.loads(request.data)
    custID = add_details['custID']
    accountKey = add_details['accountKey']
    payeeID = add_details['payeeID']
    amount = add_details['amount']
    eGift = add_details['eGift']
    message = add_details['message']

    API_ENDPOINT = "https://ipllrj2mq8.execute-api.ap-southeast-1.amazonaws.com/techtrek/transactions/add"

    body = {
        "custID" : custID, 
        "accountKey" : accountKey,
        "payeeID" : payeeID,
        "amount" : amount,
        "eGift" : eGift,
        "message" : message
    }

    headers = {
        'x-api-key': API_KEY,
        'Content-Type': 'application/json'
    }

    response = requests.request("POST", API_ENDPOINT, headers=headers, data=json.dumps(body))
    if (response.status_code == 403) :
        return "Credentials provided are invalid"

    return get_response(200, json.loads(response.text))

if (__name__) == "__main__":
    app.run(debug=True)