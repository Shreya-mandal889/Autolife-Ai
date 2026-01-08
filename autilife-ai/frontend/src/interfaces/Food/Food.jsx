import React, { useState, useEffect, useContext } from "react";
import axios from "axios";
import "./Food.css";
import { AppContext } from "../../context/AppContext";
import QuickOrderPage from "./QuickOrderPage";

export default function Food() {
  const { quickOrder, setQuickOrder } = useContext(AppContext);


  // 🔥 QUICK ORDER MODE (command-based)
  if (quickOrder?.isQuickOrder) {
    return <QuickOrderPage />;
  }

  // 🍽️ FOOD APP STATE
  const [restaurants, setRestaurants] = useState([]);
  const [selectedRestaurant, setSelectedRestaurant] = useState(null);
  const [cart, setCart] = useState([]);
  const [orders, setOrders] = useState([]);
  const [bookings, setBookings] = useState([]);
  const [bookingForm, setBookingForm] = useState({
    name: "",
    date: "",
    time: "",
    guests: 1,
  });

  // 📡 FETCH DATA FROM FOOD BACKEND
  useEffect(() => {
    axios.get("http://localhost:5000/api/restaurants")
      .then(res => setRestaurants(res.data))
      .catch(err => console.error(err));

    axios.get("http://localhost:5000/api/orders")
      .then(res => setOrders(res.data))
      .catch(err => console.error(err));

    axios.get("http://localhost:5000/api/bookings")
      .then(res => setBookings(res.data))
      .catch(err => console.error(err));
  }, []);







  // 🤖 HANDLE COMMAND-BASED FOOD & TABLE ACTIONS
useEffect(() => {
  if (!quickOrder || restaurants.length === 0) return;

  // 🍔 ORDER FOOD → AUTO ADD TO CART
  if (quickOrder.intent === "ORDER_FOOD") {
    const restaurant = restaurants.find(r =>
      r.name.toLowerCase().includes(quickOrder.restaurant.toLowerCase())
    );

    if (!restaurant) return;

    const item = restaurant.menu.find(m =>
      m.name.toLowerCase().includes(quickOrder.item)
    );

    if (!item) return;

    setCart(Array(quickOrder.quantity).fill(item));
    setSelectedRestaurant("order"); // open cart
    setQuickOrder(null);
  }

  // 🪑 BOOK TABLE → OPEN BOOKING FORM
  if (quickOrder.intent === "BOOK_TABLE") {
    setSelectedRestaurant("book");
    setQuickOrder(null);
  }

}, [quickOrder, restaurants]);







  // ➕ ADD ITEM TO CART
  const addToCart = (item) => {
    setCart([...cart, item]);
  };

  // 🧾 PLACE ORDER
  const placeOrder = () => {
    axios.post("http://localhost:5000/api/orders", {
      items: cart,
      total: cart.reduce((sum, item) => sum + item.price, 0),
    }).then(res => {
      setOrders([...orders, res.data]);
      setCart([]);
      alert("✅ Order placed successfully!");
    }).catch(err => console.error(err));
  };

  // 🪑 BOOK TABLE
  const bookTable = () => {
    axios.post("http://localhost:5000/api/bookings", bookingForm)
      .then(res => {
        setBookings([...bookings, res.data]);
        setBookingForm({ name: "", date: "", time: "", guests: 1 });
        alert("✅ Table booked!");
      })
      .catch(err => console.error(err));
  };

  return (
    <div className="food-app">
      {/* HEADER */}
      <header className="header">
        <h1>FoodieApp</h1>
        <p>Order food or book a table with style!</p>
      </header>

      {/* NAVIGATION */}
      <nav className="nav">
        <button onClick={() => setSelectedRestaurant(null)}>Home</button>
        <button onClick={() => setSelectedRestaurant("order")}>Order Food</button>
        <button onClick={() => setSelectedRestaurant("book")}>Book Table</button>
        <button onClick={() => setSelectedRestaurant("history")}>History</button>
      </nav>

      {/* MAIN CONTENT */}
      <main className="main">

        {/* HOME */}
        {!selectedRestaurant && (
          <div>
            <h2>Featured Restaurants</h2>
            {restaurants.map(r => (
              <div
                key={r.id}
                className="restaurant-card"
                onClick={() => setSelectedRestaurant(r)}
              >
                <h3>{r.name}</h3>
                <p>Click to view menu</p>
              </div>
            ))}
          </div>
        )}

        {/* MENU */}
        {selectedRestaurant &&
          selectedRestaurant !== "order" &&
          selectedRestaurant !== "book" &&
          selectedRestaurant !== "history" && (
            <div>
              <h2>{selectedRestaurant.name} Menu</h2>
              {selectedRestaurant.menu.map(item => (
                <div key={item.id} className="menu-item">
                  <span>{item.name} - ₹{item.price}</span>
                  <button onClick={() => addToCart(item)}>Add to Cart</button>
                </div>
              ))}
              <button onClick={() => setSelectedRestaurant("order")}>
                Go to Cart
              </button>
            </div>
          )}

        {/* CART */}
        {selectedRestaurant === "order" && (
          <div className="cart">
            <h2>Your Cart</h2>
            {cart.map((item, idx) => (
              <p key={idx}>{item.name} - ₹{item.price}</p>
            ))}
            <p>
              <strong>
                Total: ₹{cart.reduce((sum, item) => sum + item.price, 0)}
              </strong>
            </p>
            <button onClick={placeOrder}>Place Order</button>
          </div>
        )}

        {/* BOOK TABLE */}
        {selectedRestaurant === "book" && (
          <div className="booking">
            <h2>Book a Table</h2>

            <input
              type="text"
              placeholder="Name"
              value={bookingForm.name}
              onChange={e =>
                setBookingForm({ ...bookingForm, name: e.target.value })
              }
            />

            <input
              type="date"
              value={bookingForm.date}
              onChange={e =>
                setBookingForm({ ...bookingForm, date: e.target.value })
              }
            />

            <input
              type="time"
              value={bookingForm.time}
              onChange={e =>
                setBookingForm({ ...bookingForm, time: e.target.value })
              }
            />

            <input
              type="number"
              min="1"
              value={bookingForm.guests}
              onChange={e =>
                setBookingForm({ ...bookingForm, guests: e.target.value })
              }
            />

            <button onClick={bookTable}>Book Now</button>
          </div>
        )}

        {/* HISTORY */}
        {selectedRestaurant === "history" && (
          <div>
            <h2>Order History</h2>
            {orders.map(o => (
              <p key={o.id}>Order #{o.id} – ₹{o.total}</p>
            ))}

            <h2>Booking History</h2>
            {bookings.map(b => (
              <p key={b.id}>
                Booking #{b.id} – {b.name} on {b.date} at {b.time}
              </p>
            ))}
          </div>
        )}

      </main>
    </div>
  );
}

