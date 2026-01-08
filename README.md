# 🚀 AutoLife AI

AutoLife AI is an **AI-powered command-based automation platform** that allows users to perform real-world tasks like **booking cabs**, **ordering food**, and **booking restaurant tables** using **natural language commands**.

Built with a modern **React + Vite frontend**, **Node.js / Python backend**, and a **neon AI-inspired UI**, this project demonstrates how conversational interfaces can control multiple services from a single input box.

---

## ✨ Features

### 🧠 AI Command Interface
- One command box for all actions
- Natural language understanding (basic NLP logic)
- Example commands:
  - `Book a cab from Ranchi Railway Station to Birsa Munda Airport`
  - `Order margherita pizza from Pizza Palace`
  - `Book table at Pizza Palace`

---

### 🚕 Cab Booking
- Auto-detect pickup & destination from command
- Live route visualization using maps
- Distance, ETA, and fare estimation
- Vehicle selection (Sedan / SUV / Mini)
- Booking confirmation flow
- Neon-themed modern UI

---

### 🍔 Food Ordering
- Command-based instant food ordering
- Auto-add items to cart
- Direct cart view after command
- Order placement & history
- Restaurant menu browsing

---

### 🪑 Restaurant Table Booking
- Command-based booking intent detection
- Auto-open booking form
- User fills:
  - Name
  - Date
  - Time
  - Number of guests
- Booking history support

---

### 🎨 UI & UX
- Neon cyberpunk-inspired design
- Dark AI-themed interface
- Consistent UI across Home, Food, and Cab
- Optimized for hackathons & demos

---

## 🛠️ Tech Stack

### Frontend
- React
- Vite
- React Router
- Axios
- Inline Neon Styling

### Backend
- Node.js (Food Service)
- Python / FastAPI (AI / Command logic)
- REST APIs

### Maps & Utilities
- OpenStreetMap
- Custom distance & ETA estimation
- Context API for shared state

---

## 📂 Project Structure

autilife-ai/
│
├── backend/
│ ├── main.py
│ ├── schemas.py
│ └── requirements.txt
│
├── frontend/
│ ├── src/
│ │ ├── api/
│ │ ├── context/
│ │ ├── interfaces/
│ │ │ ├── cab/
│ │ │ └── Food/
│ │ ├── pages/
│ │ ├── App.jsx
│ │ └── main.jsx
│ └── package.json
