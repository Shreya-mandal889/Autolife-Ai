export default function VehicleSelector({ value, onChange }) {
  return (
    <select value={value} onChange={(e) => onChange(e.target.value)}>
      <option>Sedan</option>
      <option>Mini</option>
      <option>SUV</option>
    </select>
  );
}
