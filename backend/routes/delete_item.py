from flask import jsonify
from bson import ObjectId
from db import items_collection


def delete_item(id):
    items_collection.delete_one({"_id": ObjectId(id)})
    return jsonify({"message": "Item deleted"})
