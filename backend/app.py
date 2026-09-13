import os
from dotenv import load_dotenv
from flask import Flask
from flask_cors import CORS

from routes.get_items import get_items
from routes.get_item import get_item
from routes.create_item import create_item
from routes.delete_item import delete_item
from routes.get_image import get_image

load_dotenv()

app = Flask(__name__)
CORS(app)


@app.route("/items", methods=["GET"])
def route_get_items():
    return get_items()


@app.route("/items/<id>", methods=["GET"])
def route_get_item(id):
    return get_item(id)


@app.route("/items", methods=["POST"])
def route_create_item():
    return create_item()


@app.route("/items/<id>", methods=["DELETE"])
def route_delete_item(id):
    return delete_item(id)


@app.route("/images/<filename>", methods=["GET"])
def route_get_image(filename):
    return get_image(filename)


if __name__ == "__main__":
    port = int(os.getenv("PORT", 5000))
    app.run(debug=True, port=port)
