def serialize(item):
    item["_id"] = str(item["_id"])
    return item
