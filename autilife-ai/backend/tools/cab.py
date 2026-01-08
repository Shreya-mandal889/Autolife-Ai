import requests
import random
from tools.maps import get_coordinates
from tools.maps import get_coordinates


VEHICLE_MULTIPLIER = {
    "Mini": 1.0,
    "Sedan": 1.2,
    "SUV": 1.5
}


def calculate_route(src, dest):
    url = f"http://router.project-osrm.org/route/v1/driving/{src[1]},{src[0]};{dest[1]},{dest[0]}"
    response = requests.get(url)
    data = response.json()

    route = data["routes"][0]

    return {
        "distance_km": round(route["distance"] / 1000, 2),
        "eta_minutes": round(route["duration"] / 60)
    }

def book_cab_agent(goal: str):
    pickup = "Dumka Jharkhand"
    destination = "Dumka Railway Station"
    vehicle_type = "Sedan"

    src = get_coordinates(pickup)
    dest = get_coordinates(destination)

    route = calculate_route(src, dest)

    return {
        "service": "Cab Booking",
        "pickup": pickup,
        "destination": destination,
        "vehicle_type": vehicle_type,
        "distance_km": route["distance_km"],
        "eta_minutes": route["eta_minutes"],
        "status": "Cab booked successfully"
    }






def confirm_cab_booking(data):
    pickup = data.get("pickup")
    destination = data.get("destination")
    vehicle = data.get("vehicle", "Sedan")

    src = get_coordinates(pickup)
    dest = get_coordinates(destination)

    route = calculate_route(src, dest)

    multiplier = VEHICLE_MULTIPLIER.get(vehicle, 1.2)

    base_fare = 120 * multiplier
    per_km = 15 * multiplier
    total_fare = base_fare + (route["distance_km"] * per_km)

    driver = {
        "name": random.choice(["Ramesh", "Suresh", "Amit"]),
        "vehicle_number": f"JH-04 AB {random.randint(1000,9999)}",
        "vehicle": vehicle
    }

    return {
        "status": "CONFIRMED",
        "pickup": pickup,
        "destination": destination,
        "distance_km": route["distance_km"],
        "eta_minutes": route["eta_minutes"],
        "fare": round(total_fare),
        "driver": driver,
        "ride_state": "Driver Assigned"
    }


 
def estimate_cab_fare(data):
    pickup = data.get("pickup")
    destination = data.get("destination")
    vehicle = data.get("vehicle", "Sedan")

    src = get_coordinates(pickup)
    if not src:
        return {"error": f"Could not locate pickup: {pickup}"}

    dest = get_coordinates(destination)
    if not dest:
        return {"error": f"Could not locate destination: {destination}"}

    route = calculate_route(src, dest)

    multiplier = VEHICLE_MULTIPLIER.get(vehicle, 1.2)
    base_fare = 120 * multiplier
    per_km = 15 * multiplier

    return {
        "distance_km": route["distance_km"],
        "eta_minutes": route["eta_minutes"],
        "estimated_fare": round(base_fare + route["distance_km"] * per_km),
        "pickup_coords": src,
        "destination_coords": dest
    }

