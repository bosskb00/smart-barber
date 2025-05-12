import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function UserBookingPage() {
  const availableSlots = [
    "10:00 AM",
    "11:00 AM",
    "2:00 PM",
    "4:00 PM",
  ]; // Static list of all slots
  const [bookedSlots, setBookedSlots] = useState(["10:00 AM"]); // Example of already booked slots
  const [selectedSlot, setSelectedSlot] = useState("");
  const navigate = useNavigate(); // Hook for navigation

  const handleBooking = () => {
    if (selectedSlot) {
      alert(`You have booked the slot: ${selectedSlot}`);
      setBookedSlots([...bookedSlots, selectedSlot]); // Add the slot to booked slots
      setSelectedSlot("");
    } else {
      alert("Please select a slot to book.");
    }
  };

  // Filter out booked slots from available slots
  const filteredSlots = availableSlots.filter(
    (slot) => !bookedSlots.includes(slot)
  );

  return (
    <div style={{ padding: 20, minHeight: "100vh" }}>
      <h2>User Booking Page</h2>
      <h3>Available Slots</h3>
      {filteredSlots.length > 0 ? (
        <ul>
          {filteredSlots.map((slot, index) => (
            <li key={index}>
              <button onClick={() => setSelectedSlot(slot)}>{slot}</button>
            </li>
          ))}
        </ul>
      ) : (
        <p>No slots available.</p>
      )}
      {selectedSlot && <p>Selected Slot: {selectedSlot}</p>}
      <button onClick={handleBooking} disabled={!selectedSlot}>
        Book Slot
      </button>
      <br />
      <button onClick={() => navigate("/")}>Go Back Home</button> {/* New button */}
    </div>
  );
}