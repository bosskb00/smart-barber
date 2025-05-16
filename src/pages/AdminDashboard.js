import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom"; // Import useNavigate

export default function AdminDashboard() {
  const [appointments, setAppointments] = useState({});
  const [editing, setEditing] = useState(null); // Track the appointment being edited
  const [editDetails, setEditDetails] = useState({}); // Store the details of the appointment being edited
  const navigate = useNavigate(); // Initialize useNavigate

  useEffect(() => {
    // Fetch appointments from localStorage
    const storedAppointments = JSON.parse(localStorage.getItem("appointments")) || {};
    setAppointments(storedAppointments);
  }, []);

  const handleDelete = (date, index) => {
    const updatedAppointments = { ...appointments };
    updatedAppointments[date].splice(index, 1); // Remove the specific appointment

    if (updatedAppointments[date].length === 0) {
      delete updatedAppointments[date]; // Remove the date if no appointments remain
    }

    setAppointments(updatedAppointments);
    localStorage.setItem("appointments", JSON.stringify(updatedAppointments)); // Update localStorage
  };

  const handleEdit = (date, index, appointment) => {
    setEditing({ date, index }); // Set the appointment being edited
    setEditDetails({ ...appointment }); // Populate the edit form with the current details
  };

  const handleEditChange = (field, value) => {
    setEditDetails((prev) => ({ ...prev, [field]: value })); // Update the edited details
  };

  const handleEditSave = () => {
    const updatedAppointments = { ...appointments };
    updatedAppointments[editing.date][editing.index] = editDetails; // Update the appointment details

    setAppointments(updatedAppointments);
    localStorage.setItem("appointments", JSON.stringify(updatedAppointments)); // Update localStorage
    setEditing(null); // Exit edit mode
  };

  const handleLogout = () => {
    navigate("/"); // Redirect to the homepage
  };

  return (
    <div style={{ padding: 20, fontFamily: "Arial, sans-serif", backgroundColor: "#f9f9f9", minHeight: "100vh" }}>
      <h2 style={{ textAlign: "center", color: "#333" }}>Admin Dashboard</h2>
      <p style={{ textAlign: "center", color: "#555" }}>Welcome to the admin dashboard!</p>

      <h3 style={{ marginTop: "20px", color: "#444" }}>Appointments</h3>
      {Object.keys(appointments).length > 0 ? (
        Object.keys(appointments).map((date) => (
          <div
            key={date}
            style={{
              marginBottom: "1.5rem",
              padding: "10px",
              border: "1px solid #ddd",
              borderRadius: "5px",
              backgroundColor: "#fff",
            }}
          >
            <h4 style={{ color: "#555", borderBottom: "1px solid #ddd", paddingBottom: "5px" }}>{date}</h4>
            <ul style={{ listStyleType: "none", padding: 0 }}>
              {appointments[date].map((appointment, index) => (
                <li
                  key={index}
                  style={{
                    marginBottom: "0.8rem",
                    padding: "10px",
                    border: "1px solid #eee",
                    borderRadius: "5px",
                    backgroundColor: "#fdfdfd",
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                  }}
                >
                  {editing && editing.date === date && editing.index === index ? (
                    <div style={{ flex: 1 }}>
                      <input
                        type="text"
                        value={editDetails.name}
                        onChange={(e) => handleEditChange("name", e.target.value)}
                        placeholder="Client Name"
                        style={{
                          marginBottom: "5px",
                          padding: "5px",
                          width: "100%",
                          border: "1px solid #ddd",
                          borderRadius: "5px",
                        }}
                      />
                      <input
                        type="time"
                        value={new Date(editDetails.time).toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}
                        onChange={(e) => handleEditChange("time", e.target.value)}
                        style={{
                          marginBottom: "5px",
                          padding: "5px",
                          width: "100%",
                          border: "1px solid #ddd",
                          borderRadius: "5px",
                        }}
                      />
                      <select
                        value={editDetails.service}
                        onChange={(e) => handleEditChange("service", e.target.value)}
                        style={{
                          marginBottom: "5px",
                          padding: "5px",
                          width: "100%",
                          border: "1px solid #ddd",
                          borderRadius: "5px",
                        }}
                      >
                        <option value="short haircut">Short Haircut</option>
                        <option value="long haircut">Long Haircut</option>
                        <option value="beard">Beard</option>
                        <option value="tint">Tint</option>
                      </select>
                      <button
                        onClick={handleEditSave}
                        style={{
                          padding: "5px 10px",
                          backgroundColor: "green",
                          color: "white",
                          border: "none",
                          borderRadius: "5px",
                          cursor: "pointer",
                          marginRight: "5px",
                        }}
                      >
                        Save
                      </button>
                      <button
                        onClick={() => setEditing(null)}
                        style={{
                          padding: "5px 10px",
                          backgroundColor: "gray",
                          color: "white",
                          border: "none",
                          borderRadius: "5px",
                          cursor: "pointer",
                        }}
                      >
                        Cancel
                      </button>
                    </div>
                  ) : (
                    <>
                      <div>
                        <strong>Time:</strong>{" "}
                        {new Date(appointment.time).toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })} <br />
                        <strong>Service:</strong> {appointment.service} <br />
                        <strong>Client:</strong> {appointment.name}
                      </div>
                      <div>
                        <button
                          onClick={() => handleEdit(date, index, appointment)}
                          style={{
                            marginRight: 10,
                            backgroundColor: "orange",
                            color: "white",
                            border: "none",
                            padding: "5px 10px",
                            borderRadius: "5px",
                            cursor: "pointer",
                          }}
                        >
                          Edit
                        </button>
                        <button
                          onClick={() => handleDelete(date, index)}
                          style={{
                            backgroundColor: "red",
                            color: "white",
                            border: "none",
                            padding: "5px 10px",
                            borderRadius: "5px",
                            cursor: "pointer",
                          }}
                        >
                          Delete
                        </button>
                      </div>
                    </>
                  )}
                </li>
              ))}
            </ul>
          </div>
        ))
      ) : (
        <p style={{ color: "#777" }}>No appointments available.</p>
      )}

      <button
        onClick={handleLogout}
        style={{
          marginTop: "20px",
          backgroundColor: "blue",
          color: "white",
          border: "none",
          padding: "10px 20px",
          borderRadius: "5px",
          cursor: "pointer",
        }}
      >
        Logout
      </button>
    </div>
  );
}