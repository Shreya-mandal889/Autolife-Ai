import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { estimateCab, confirmCab } from "../../api/cabApi";
import MapView from "./components/MapView";
import VehicleSelector from "./components/VehicleSelector";

export default function CabBooking() {
  const location = useLocation();
  const navigate = useNavigate();

  const pickup = location.state?.pickup;
  const destination = location.state?.destination;

  const [fareData, setFareData] = useState(null);
  const [vehicle, setVehicle] = useState("Sedan");

  // 🚨 GUARD: if user opened /cab directly
  if (!pickup || !destination) {
    return (
      <div>
        <h3>No cab details found</h3>
        <p>Please start booking from home.</p>
        <button onClick={() => navigate("/")}>Go Back</button>
      </div>
    );
  }

  useEffect(() => {
  console.log("Pickup:", pickup);
  console.log("Destination:", destination);
  console.log("Vehicle:", vehicle);

  setFareData(null); // reset while refetching

  estimateCab(pickup, destination, vehicle)
    .then((res) => {
      console.log("Fare API response:", res);
      setFareData(res);
    })
    .catch((err) => {
      console.error("Fare API error:", err);
    });
}, [pickup, destination, vehicle]);


async function handleConfirm() {
  try {
    const res = await confirmCab({
      pickup,
      destination,
      vehicle
    });

    navigate("/cab-confirmed", { state: res });
  } catch (err) {
    console.error("Confirm booking failed:", err);
  }
}


  if (!fareData) return <p>Loading...</p>;

  return (
    <>
      
  <div
    style={{
      minHeight: "100vh",
      background: "radial-gradient(circle at top, #0f2027, #000)",
      padding: "30px",
      color: "#00fff7",
      fontFamily: "Segoe UI, sans-serif"
    }}
  >
    <div
      style={{
        maxWidth: "900px",
        margin: "auto",
        background: "rgba(0,0,0,0.65)",
        borderRadius: "18px",
        padding: "25px",
        boxShadow: "0 0 30px #00fff7"
      }}
    >
      <h1 style={{ textAlign: "center", marginBottom: "20px" }}>
        🚕 Book Cab
      </h1>

      <div style={{ marginBottom: "15px" }}>
        <p><b>From:</b> {pickup}</p>
        <p><b>To:</b> {destination}</p>
      </div>

      {/* MAP (UNCHANGED) */}
      <div
        style={{
          borderRadius: "14px",
          overflow: "hidden",
          boxShadow: "0 0 18px #00fff7",
          marginBottom: "20px"
        }}
      >
        <MapView
          pickupCoords={fareData.pickup_coords}
          destinationCoords={fareData.destination_coords}
        />
      </div>

      {/* INFO CARDS */}
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(3, 1fr)",
          gap: "15px",
          marginBottom: "20px",
          textAlign: "center"
        }}
      >
        <div className="info-card">📍 {fareData.distance_km} km</div>
        <div className="info-card">⏱ {fareData.eta_minutes} mins</div>
        <div className="info-card">💰 ₹{fareData.estimated_fare}</div>
      </div>

      {/* VEHICLE SELECTOR (UNCHANGED) */}
      <VehicleSelector value={vehicle} onChange={setVehicle} />

      {/* CONFIRM BUTTON */}
      <button
        onClick={handleConfirm}
        style={{
          marginTop: "20px",
          width: "100%",
          padding: "14px",
          fontSize: "16px",
          fontWeight: "bold",
          borderRadius: "14px",
          border: "none",
          cursor: "pointer",
          background: "linear-gradient(90deg, #00fff7, #7f00ff)",
          boxShadow: "0 0 20px #00fff7"
        }}
      >
        ✅ Confirm Booking
      </button>
    </div>

    {/* INLINE CSS */}
    <style>
      {`
        .info-card {
          background: rgba(0,0,0,0.7);
          padding: 15px;
          border-radius: 14px;
          box-shadow: 0 0 12px #00fff7;
          font-weight: bold;
        }
      `}
    </style>
  </div>


    </>
  );
}

