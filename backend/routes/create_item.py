import os
import uuid
from flask import request, jsonify
from datetime import datetime
from db import items_collection

IMAGES_DIR = os.path.abspath(os.path.join(os.path.dirname(__file__), "..", "images"))


def create_item():
    image_filename = ""
    if "image" in request.files:
        file = request.files["image"]
        if file and file.filename:
            ext = file.filename.rsplit(".", 1)[-1].lower()
            image_filename = f"{uuid.uuid4().hex}.{ext}"
            file.save(os.path.join(IMAGES_DIR, image_filename))

    data = {
        "type":          request.form.get("type", "lost"),
        "title":         request.form.get("title", ""),
        "reporter_name": request.form.get("reporter_name", ""),
        "description":   request.form.get("description", ""),
        "location":      request.form.get("location", ""),
        "contact":       request.form.get("contact", ""),
        "image":         image_filename,
        "created_at":    datetime.utcnow().isoformat(),
    }

    result = items_collection.insert_one(data)
    data["_id"] = str(result.inserted_id)
    return jsonify(data), 201
