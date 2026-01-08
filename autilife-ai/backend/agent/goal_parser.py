def parse_goal(user_input: str):
    text = user_input.lower()

    if "cab" in text or "ride" in text:
        return {"intent": "cab"}

    if "food" in text or "eat" in text:
        return {"intent": "food"}

    if "trip" in text or "travel" in text:
        return {"intent": "trip"}

    return {"intent": "unknown"}
