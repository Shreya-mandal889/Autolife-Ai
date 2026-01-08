import { MapContainer, TileLayer, Marker, Polyline, useMap } from "react-leaflet";
import { useEffect } from "react";
import L from "leaflet";
import "leaflet/dist/leaflet.css";

// Fix marker icon issue
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl:
    "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png",
  iconUrl:
    "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png",
  shadowUrl:
    "https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png"
});

// Component to auto-fit bounds
function FitBounds({ pickupCoords, destinationCoords }) {
  const map = useMap();

  useEffect(() => {
    if (!pickupCoords || !destinationCoords) return;

    const bounds = L.latLngBounds([
      pickupCoords,
      destinationCoords
    ]);

    map.fitBounds(bounds, { padding: [50, 50] });
  }, [pickupCoords, destinationCoords, map]);

  return null;
}

export default function MapView({ pickupCoords, destinationCoords }) {
  if (!pickupCoords || !destinationCoords) return null;

  return (
    <MapContainer
      style={{ height: "400px", width: "100%" }}
      zoom={13}
      center={pickupCoords}
      scrollWheelZoom={false}
    >
      <TileLayer
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        attribution="© OpenStreetMap"
      />

      <FitBounds
        pickupCoords={pickupCoords}
        destinationCoords={destinationCoords}
      />

      <Marker position={pickupCoords} />
      <Marker position={destinationCoords} />

      <Polyline
        positions={[pickupCoords, destinationCoords]}
        color="blue"
      />
    </MapContainer>
  );
}

