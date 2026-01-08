from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from agent.agent_loop import AutoLifeAgent
from tools import cab, food, trip
from tools.cab import confirm_cab_booking, estimate_cab_fare

app = FastAPI(title="AutoLife AI")

# ✅ ADD CORS IMMEDIATELY AFTER APP CREATION
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # allow frontend
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# =========================
# Agent Tool Registry
# =========================
TOOLS = {
    "cab": cab.book_cab_agent,
    "food": food.food_agent,
    "trip": trip.trip_agent
}

# =========================
# Agent Endpoint
# =========================
@app.post("/agent")
def run_agent(goal: str):
    agent = AutoLifeAgent(TOOLS)
    return agent.run(goal)

# =========================
# Cab APIs
# =========================
@app.post("/estimate/cab")
def estimate_cab(data: dict):
    return estimate_cab_fare(data)

@app.post("/confirm/cab")
def confirm_cab(data: dict):
    return confirm_cab_booking(data)

