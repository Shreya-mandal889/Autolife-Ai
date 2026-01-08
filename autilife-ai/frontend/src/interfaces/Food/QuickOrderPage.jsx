import React, { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { AppContext } from "../../context/AppContext";

export default function QuickOrderPage() {
  const { quickOrder, setQuickOrder } = useContext(AppContext);
  const navigate = useNavigate();

  const [item, setItem] = useState(null);
  const [loading, setLoading] = useState(true);

  // 🔍 Fetch restaurant menu & auto-pick item
  useEffect(() => {
    if (!quickOrder) return;

    axios.get("http://localhost:5000/api/restaurants")
      .then(res => {
        const restaurant = res.data.find(r =>
          r.name.toLowerCase().includes(quickOrder.restaurant?.toLowerCase())
        );

        if (!restaurant) {
          alert("❌ Restaurant not found");
          navigate("/");
          return;
        }

        // Pick first matching item OR first item
        const matchedItem =
          restaurant.menu.find(m =>
            m.name.toLowerCase().includes(quickOrder.item)
          ) || restaurant.menu[0];

        setItem({
          ...matchedItem,
          quantity: quickOrder.quantity || 1,
        });

        setLoading(false);
      })
      .catch(err => {
        console.error(err);
        alert("❌ Failed to fetch food");
        navigate("/");
      });
  }, [quickOrder, navigate]);

  // 🧾 Place Order
  const placeOrder = () => {
    axios.post("http://localhost:5000/api/orders", {
      items: [item],
      total: item.price * item.quantity,
    }).then(() => {
      alert("✅ Order placed successfully!");
      setQuickOrder(null);
      navigate("/");
    }).catch(err => {
      console.error(err);
      alert("❌ Order failed");
    });
  };

  if (loading) {
    return <p style={{ padding: "20px" }}>Placing your order...</p>;
  }

  return (
    <div className="food-app" style={{ padding: "20px" }}>
      <h2>Quick Order Summary</h2>

      <p><strong>Item:</strong> {item.name}</p>
      <p><strong>Quantity:</strong> {item.quantity}</p>
      <p><strong>Price:</strong> ₹{item.price}</p>
      <p><strong>Total:</strong> ₹{item.price * item.quantity}</p>

      <button onClick={placeOrder} style={{ marginTop: "20px" }}>
        Place Order
      </button>
    </div>
  );
}

