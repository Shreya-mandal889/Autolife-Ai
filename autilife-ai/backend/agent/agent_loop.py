from agent.goal_parser import parse_goal
from agent.planner import create_plan
from agent.api_availability import can_auto_book

class AutoLifeAgent:
    def __init__(self, tools):
        self.tools = tools

    def run(self, user_goal: str):
        parsed = parse_goal(user_goal)
        intent = parsed["intent"]

        plan = create_plan(intent)

        if not plan:
            return {"message": "Sorry, I couldn't understand your request."}

        service = plan["service"]

        # 🔁 Decision: auto-book or redirect
        if can_auto_book(service):
            result = self.tools[service](user_goal)
            return {
                "mode": "auto",
                "service": service,
                "result": result
            }

        # ❗ Redirect flow
        return {
            "mode": "redirect",
            "service": service,
            "required_fields": plan["required_fields"],
            "message": f"Redirecting to {service} interface"
        }

