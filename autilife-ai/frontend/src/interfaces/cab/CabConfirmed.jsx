import { useLocation, useNavigate } from "react-router-dom";

export default function CabConfirmed() {
  const { state } = useLocation();
  const navigate = useNavigate();

  if (!state) {
    return (
      <div>
        <h3>No booking found</h3>
        <button onClick={() => navigate("/")}>Go Home</button>
      </div>
    );
  }

  return (
    <div>
      <h2>Ride Confirmed ✅</h2>

      <p><b>Driver:</b> {state.driver?.name || "Assigned"}</p>
      <p><b>Vehicle:</b> {state.driver?.vehicle}</p>
      <p><b>Vehicle No:</b> {state.driver?.vehicle_number}</p>

      <p><b>Distance:</b> {state.distance_km} km</p>
      <p><b>ETA:</b> {state.eta_minutes} mins</p>
      <p><b>Total Fare:</b> ₹{state.fare}</p>

      <button onClick={() => navigate("/")}>Back to Home</button>
    </div>
  );
}
