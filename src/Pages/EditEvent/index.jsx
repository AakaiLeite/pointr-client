// Import Basics
import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";

// API Services
import apiServices from "../../services/api.services.js";
const eventService = new apiServices.EventService();

function EditEvent() {
  const navigate = useNavigate();
  const { eventId } = useParams();

  // State Variables
  const [title, setTitle] = useState("");
  const [date, setDate] = useState("");
  const [time, setTime] = useState("");
  const [description, setDescription] = useState("");
  const [completed, setCompleted] = useState(false);

  // useEffect Hook to Fetch Data from API Services on Page Load
  useEffect(() => {
    eventService
      .getEventById(eventId)
      .then((response) => {
        const { title, date, time, description, completed } = response.data;
        setTitle(title);
        setDate(date);
        setTime(time);
        setDescription(description);
        setCompleted(completed);
      })
      .catch((err) => console.error(err));
  }, []);

  // Handle Form and Form Submission
  const handleChange = (event) => {
    const { name, value } = event.target;
    if (name === "title") setTitle(value);
    if (name === "date") setDate(value);
    if (name === "time") setTime(value);
    if (name === "description") setDescription(value);
    if (name === "completed") setCompleted(event.target.checked);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    eventService
      .updateEvent(eventId, { title, date, time, description, completed })
      .then(() => {
        navigate(`/monthly`);
      })
      .catch((err) => console.error(err));
  };

  // Delete and Edit Event
  const eventDelete = () => {
    eventService
      .deleteEvent(eventId)
      .then(() => {
        navigate(`/monthly`);
      })
      .catch((err) => console.error(err));
  };

  const cancelEdit = () => {
    navigate(`/monthly`);
  };

  return (
    <div className="agenda-background">
      <h3>Edit Event</h3>
      <div className="agenda-container">
        <form onSubmit={handleSubmit}>
          <label>
            Title
            <input
              type="text"
              name="title"
              value={title}
              onChange={handleChange}
            />
          </label>
          <label>
            Date
            <input
              type="text"
              name="date"
              placeholder="YYYY-MM-DD"
              onChange={handleChange}
            />
          </label>
          <label>
            Time
            <input
              type="text"
              name="time"
              value={time}
              placeholder="HH:MM"
              onChange={handleChange}
            />
          </label>
          <label>
            Description
            <input
              type="text"
              name="description"
              value={description}
              onChange={handleChange}
            />
          </label>
          <label>
            Completed
            <input
              type="checkbox"
              name="completed"
              value={completed}
              onChange={handleChange}
            />
          </label>
          <button type="submit">Edit Event</button>
        </form>
        <button onClick={eventDelete}>Delete Event</button>
        <button onClick={cancelEdit}>Cancel Edit</button>
      </div>
    </div>
  );
}

export default EditEvent;

//Keep me here for now
