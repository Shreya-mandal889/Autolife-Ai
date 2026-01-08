
import Food from "./interfaces/Food/Food";

import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import CabBooking from "./interfaces/cab/CabBooking";
import CabConfirmed from "./interfaces/cab/CabConfirmed";

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/cab" element={<CabBooking />} />
      <Route path="/cab-confirmed" element={<CabConfirmed />} />
      <Route path="/food" element={<Food />} />  
    </Routes>
  );
}

