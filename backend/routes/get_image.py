import os
from flask import send_from_directory

IMAGES_DIR = os.path.abspath(os.path.join(os.path.dirname(__file__), "..", "images"))


def get_image(filename):
    return send_from_directory(IMAGES_DIR, filename)
