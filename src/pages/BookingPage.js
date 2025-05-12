import React, { useState } from "react";
import { fetchAvailableSlots } from "../utils/slotUtils";
import { useNavigate } from "react-router-dom"; // Import useNavigate
import barberBackground from "../assets/bg.jpg"; // Import your local image

export default function BookingPage() {
  const [date, setDate] = useState("");
  const [slots, setSlots] = useState([]);
  const [time, setTime] = useState("");
  const [service, setService] = useState(""); // State for selected service
  const [name, setName] = useState(""); // State for user's name
  const navigate = useNavigate(); // Initialize useNavigate

  const bookedDates = JSON.parse(localStorage.getItem("appointments")) || {};

  function handleSubmit(e) {
    e.preventDefault();
    const [hours, mins] = time.split(":");
    const newDate = new Date(date);
    newDate.setHours(hours);
    newDate.setMinutes(mins);

    const appointments = JSON.parse(localStorage.getItem("appointments")) || {};
    localStorage.setItem(
      "appointments",
      JSON.stringify({
        ...appointments,
        [date]: [
          ...(appointments[date] || []),
          { time: newDate, service, name }, // Save time, service, and name
        ],
      })
    );

    alert("🎉 Appointment booked successfully!");
    window.location.reload();
  }

  function handleDateChange(e) {
    const selectedDate = e.target.value;
    setDate(selectedDate);
    setSlots(fetchAvailableSlots(selectedDate, bookedDates)); // Fetch only available slots
    setTime("");
  }

  function handleTimeChange(e) {
    const { value } = e.target;
    setTime(value);
  }

  function handleServiceChange(e) {
    setService(e.target.value); // Update selected service
  }

  function handleNameChange(e) {
    setName(e.target.value); // Update user's name
  }

  return (
    <div
      style={{
        padding: 20,
        fontFamily: "Arial, sans-serif",
        backgroundImage: `url(${barberBackground})`, // Use the imported local image
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
        position: "relative",
        minHeight: "100vh",
      }}
    >
      {/* Overlay for alpha effect */}
      <div
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          width: "100%",
          height: "100%",
          backgroundColor: "rgba(0, 0, 0, 0.5)", // Black overlay with 50% transparency
          zIndex: 1,
        }}
      ></div>

      {/* Content */}
      <div
        style={{
          position: "relative",
          zIndex: 2,
          color: "white", // Ensure text is visible on dark overlay
        }}
      >
        <h2 style={{ textAlign: "center", marginBottom: "20px" }}>✂️ Book an Appointment</h2>
        <form
          onSubmit={handleSubmit}
          style={{
            maxWidth: "600px",
            margin: "0 auto",
            backgroundColor: "rgba(255, 255, 255, 0.9)", // White background with slight transparency
            padding: "20px",
            borderRadius: "8px",
            boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
          }}
        >
          <input
            type="text"
            value={name}
            onChange={handleNameChange}
            placeholder="👤 Enter your name"
            required
            style={{
              marginBottom: "1rem",
              padding: "10px",
              width: "100%",
              border: "1px solid #ddd",
              borderRadius: "5px",
            }}
          />
          <input
            type="date"
            value={date}
            onChange={handleDateChange}
            required
            style={{
              marginBottom: "1rem",
              padding: "10px",
              width: "100%",
              border: "1px solid #ddd",
              borderRadius: "5px",
            }}
          />
          <div style={{ marginBottom: "1rem" }}>
            {slots.map(({ slot, available }) => (
              <button
                type="button"
                onClick={handleTimeChange}
                key={slot}
                value={slot}
                disabled={!available} // Disable button if slot is not available
                style={{
                  marginRight: 8,
                  marginBottom: 8,
                  padding: "10px 15px",
                  backgroundColor: slot === time ? "#007bff" : available ? "#28a745" : "#ccc",
                  color: "white",
                  border: "none",
                  borderRadius: "5px",
                  cursor: available ? "pointer" : "not-allowed",
                }}
              >
                {slot}
              </button>
            ))}
          </div>
          <select
            value={service}
            onChange={handleServiceChange}
            required
            style={{
              marginBottom: "1rem",
              padding: "10px",
              width: "100%",
              border: "1px solid #ddd",
              borderRadius: "5px",
            }}
          >
            <option value="" disabled>
              💇 Select a Service
            </option>
            <option value="short haircut">Short Haircut ✂️</option>
            <option value="long haircut">Long Haircut 💇‍♂️</option>
            <option value="beard">Beard 🧔</option>
            <option value="tint">Tint 🎨</option>
          </select>
          <button
            type="submit"
            disabled={!time || !service || !name}
            style={{
              width: "100%",
              padding: "10px",
              backgroundColor: "#007bff",
              color: "white",
              border: "none",
              borderRadius: "5px",
              cursor: "pointer",
              fontWeight: "bold",
            }}
          >
            ✅ Book
          </button>
        </form>
        <br />
        <button
          onClick={() => navigate("/")}
          style={{
            display: "block",
            margin: "20px auto",
            padding: "10px 20px",
            backgroundColor: "#6c757d",
            color: "white",
            border: "none",
            borderRadius: "5px",
            cursor: "pointer",
          }}
        >
          🏠 Go Back Home
        </button>
      </div>
    </div>
  );
}