import { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { AppContext } from "../context/AppContext";

export default function Home() {
  const [message, setMessage] = useState("");
  const navigate = useNavigate();
  const { setQuickOrder } = useContext(AppContext);

  function handleSend() {
    const text = message.toLowerCase();

    /* =======================
       🍔 FOOD COMMAND HANDLER
       ======================= */
    if (text.includes("order")) {
      // basic food parsing
      const fromMatch = text.match(/from (.+)/);

      if (!fromMatch) {
        alert("Use format: order ITEM from RESTAURANT");
        return;
      }

      const restaurant = fromMatch[1].trim();

      // simple item detection (can improve later)
      let item = "pizza";
      if (text.includes("burger")) item = "burger";
      if (text.includes("margherita")) item = "margherita";

      setQuickOrder({
        intent: "ORDER_FOOD",
        item,
        quantity: 1,
        restaurant,
        isQuickOrder: true
      });

      navigate("/food");
      return; // 🔴 VERY IMPORTANT
    }


    /* =======================
   🪑 BOOK TABLE HANDLER
   ======================= */
if (text.includes("book table")) {
  const atMatch = text.match(/at (.+)/);

  if (!atMatch) {
    alert("Use format: book table at RESTAURANT");
    return;
  }

  const restaurant = atMatch[1].trim();

  setQuickOrder({
    intent: "BOOK_TABLE",
    restaurant,
  });

  navigate("/food");
  return;
}


    /* =======================
       🚕 CAB COMMAND HANDLER
       ======================= */
    if (!text.includes("book a cab")) {
      alert("Try: Book a cab from X to Y OR Order food from restaurant");
      return;
    }

    const fromMatch = text.match(/from (.+?) to /);
    const toMatch = text.match(/to (.+)/);

    if (!fromMatch || !toMatch) {
      alert("Use format: Book a cab from PLACE to PLACE");
      return;
    }

    const pickup = fromMatch[1].trim();
    const destination = toMatch[1].trim();

    navigate("/cab", {
      state: { pickup, destination }
    });
  }

  
    return (
  <div
    style={{
      minHeight: "100vh",
      background: "radial-gradient(circle at top, #0f2027, #000000)",
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      fontFamily: "Segoe UI, sans-serif"
    }}
  >
    <div
      style={{
        width: "600px",
        padding: "30px",
        borderRadius: "16px",
        background: "rgba(0,0,0,0.65)",
        boxShadow: "0 0 25px #00fff7",
        color: "#00fff7"
      }}
    >
      <h1
        style={{
          textAlign: "center",
          marginBottom: "20px",
          letterSpacing: "1px"
        }}
      >
        ⚡ AutoLife AI
      </h1>

      <textarea
        rows="3"
        placeholder='Try: "Order pizza from Pizza Palace"'
        value={message}
        onChange={(e) => setMessage(e.target.value)}
        style={{
          width: "100%",
          padding: "14px",
          borderRadius: "10px",
          background: "#000",
          color: "#00fff7",
          border: "1px solid #00fff7",
          outline: "none",
          boxShadow: "0 0 12px #00fff7 inset",
          fontSize: "16px",
          resize: "none"
        }}
      />

      <button
        onClick={handleSend}
        style={{
          marginTop: "20px",
          width: "100%",
          padding: "14px",
          fontSize: "16px",
          fontWeight: "bold",
          background: "linear-gradient(90deg, #00fff7, #7f00ff)",
          color: "#000",
          border: "none",
          borderRadius: "12px",
          cursor: "pointer",
          boxShadow: "0 0 18px #00fff7",
          transition: "0.3s"
        }}
        onMouseOver={(e) =>
          (e.target.style.boxShadow = "0 0 28px #7f00ff")
        }
        onMouseOut={(e) =>
          (e.target.style.boxShadow = "0 0 18px #00fff7")
        }
      >
        🚀 Send Command
      </button>
    </div>
  </div>
);

  
}
