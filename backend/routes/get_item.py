from flask import jsonify
from bson import ObjectId
from db import items_collection
from helpers import serialize


def get_item(id):
    item = items_collection.find_one({"_id": ObjectId(id)})
    if not item:
        return jsonify({"error": "Item not found"}), 404
    return jsonify(serialize(item))
