import requests
import time

def get_coordinates(place):
    url = "https://nominatim.openstreetmap.org/search"
    headers = {
        "User-Agent": "AutoLifeAI/1.0 (hackathon project)"
    }

    params = {
        "q": place,
        "format": "json",
        "limit": 1
    }

    response = requests.get(url, params=params, headers=headers, timeout=10)
    data = response.json()

    time.sleep(1.2)  # 🔴 REQUIRED TO AVOID RATE LIMIT

    if not data:
        return None

    return float(data[0]["lat"]), float(data[0]["lon"])





