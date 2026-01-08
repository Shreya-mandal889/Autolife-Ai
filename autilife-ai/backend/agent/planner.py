def create_plan(intent: str):
    if intent == "cab":
        return {
            "service": "cab",
            "required_fields": ["vehicle_type"],
            "auto_book": False
        }

    if intent == "food":
        return {
            "service": "food",
            "required_fields": ["mode"],
            "auto_book": False
        }

    if intent == "trip":
        return {
            "service": "trip",
            "required_fields": ["days", "budget"],
            "auto_book": True
        }

    return None

