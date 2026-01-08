def can_auto_book(service: str) -> bool:
    """
    Decide if this service can be completed fully using free APIs
    """
    auto_services = [
        "route",        # distance / ETA
        "nearby_places" # hospitals, petrol, groceries
    ]

    return service in auto_services
