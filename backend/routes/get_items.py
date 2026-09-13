from flask import request, jsonify
from db import items_collection
from helpers import serialize


def get_items():
    search = request.args.get("search", "")
    if search:
        query = {
            "$or": [
                {"title": {"$regex": search, "$options": "i"}},
                {"description": {"$regex": search, "$options": "i"}},
                {"location": {"$regex": search, "$options": "i"}},
            ]
        }
    else:
        query = {}

    items = list(items_collection.find(query).sort("created_at", -1))
    return jsonify([serialize(i) for i in items])
