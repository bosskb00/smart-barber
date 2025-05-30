import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function HomePage() {
  const [backgroundColor, setBackgroundColor] = useState("#ffffff"); // Default background color
  const navigate = useNavigate();

  // Function to determine the contrast color (white or black)
  const getContrastColor = (bgColor) => {
    const r = parseInt(bgColor.slice(1, 3), 16);
    const g = parseInt(bgColor.slice(3, 5), 16);
    const b = parseInt(bgColor.slice(5, 7), 16);
    const brightness = (r * 299 + g * 587 + b * 114) / 1000;
    return brightness > 128 ? "#000000" : "#ffffff"; // Black for light backgrounds, white for dark
  };

  const textColor = getContrastColor(backgroundColor);

  return (
    <div
      style={{
        padding: "5vw",
        boxSizing: "border-box",
        textAlign: "center",
        backgroundColor: backgroundColor,
        minHeight: "100vh",
        color: textColor,
        fontFamily: "Arial, sans-serif",
      }}
    >
      <h1 style={{ fontFamily: "Georgia", fontSize: "clamp(1.8rem, 5vw, 3.5rem)", marginBottom: "10px" }}>
        ✂️ Barber Shop
      </h1>
      <p style={{ fontSize: "clamp(1rem, 3.5vw, 1.6rem)", marginBottom: "10px" }}>
        📞 Contact us: (+39) 123-4567 | 📍 Via Bianchi 123, Rome (RM), Italy
      </p>
      <p style={{ fontSize: "clamp(1rem, 3.5vw, 1.6rem)", marginBottom: "20px" }}>
        🕒 Working Hours: Monday - Friday, 9:00 AM - 5:00 PM
      </p>
      <button
        onClick={() => navigate("/book")}
        style={{
          padding: "10px 20px",
          backgroundColor: "#b22222",
          color: "white",
          border: "none",
          cursor: "pointer",
          borderRadius: "5px",
          fontSize: "1rem",
          fontWeight: "bold",
        }}
      >
        📅 Book an Appointment
      </button>
      <div style={{ marginTop: 20 }}>
        <a
          href="/admin"
          style={{
            color: textColor,
            textDecoration: "underline",
            fontSize: "1rem",
          }}
        >
          🔑 Admin Login
        </a>
      </div>
      <div style={{ marginTop: 40 }}>
        <h3 style={{ fontSize: "clamp(1.2rem, 3.5vw, 2rem)", marginBottom: "10px" }}>📍 Find Us Here</h3>
        <div style={{ position: "relative", width: "100%", paddingBottom: "56.25%", height: 0 }}>
          <iframe
            title="Google Maps"
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2880.529091509057!2d12.50325931550138!3d41.89155197922062!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x132f61a0f1a2b8b3%3A0x4e2b8b8b8b8b8b8b!2sVia%20Ariosto%2025%2C%20Esquilino%2C%20Roma%2C%20Italia!5e0!3m2!1sit!2sit!4v1681234567890!5m2!1sit!2sit"
            style={{
              position: "absolute",
              top: 0,
              left: 0,
              width: "100%",
              height: "100%",
              border: "0",
              borderRadius: "8px",
              boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
            }}
            allowFullScreen=""
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
          ></iframe>
        </div>
      </div>

      <div style={{ marginTop: 40 }}>
        <h3 style={{ fontSize: "1rem, 3.5vw, 1.6rem", marginBottom: "10px" }}>🎨 Customize Background</h3>
        <input
          type="color"
          value={backgroundColor}
          onChange={(e) => setBackgroundColor(e.target.value)} // Update background color
          style={{
            padding: "5px",
            border: "none",
            cursor: "pointer",
            width: "50px",
            height: "50px",
            borderRadius: "50%",
            boxShadow: "0 2px 4px rgba(0, 0, 0, 0.2)",
          }}
        />
      </div>
    </div>
  );
}
