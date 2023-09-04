// Clear ESlint errors
/* eslint-disable no-unused-vars */

// Import Basics
import { useEffect, useState } from "react";
import { Link, useParams, useNavigate } from "react-router-dom";

// API Services
import apiServices from "../../services/api.services.js";
const { EventService } = apiServices;
const eventService = new apiServices.EventService();

// React Page Component
function EventDetails() {
  // State Variables
  const [event, setEvent] = useState([]);

  // React Router useParams and Navigate Hooks
  const { eventId } = useParams();
  const navigate = useNavigate();

  // useEffect Hook to Fetch Data from API Services on Page Load
  useEffect(() => {
    eventService
      .getEventById(eventId)
      .then((response) => {
        setEvent(response.data);
      })
      .catch((err) => console.error(err));
  }, []);

  // Format event completion status
  event.completed = event.completed ? "Completed" : "Not Completed";

  // Format event date
  const date = new Date(event.date);
  event.date = date.toDateString();

  // Format event time
  const time = new Date(event.date);
  const hours = time.getHours();
  const minutes = time.getMinutes();
  event.time = `${hours}:${minutes}`;

  // Delete Event
  const eventDelete = () => {
    eventService
      .deleteEvent(eventId)
      .then(() => {
        navigate("/dashboard");
      })
      .catch((err) => console.error(err));
  };

  // Render Page
  return (
    <div>
      <div className="event-details">
        <h2>Event Details</h2>
        <h3>{event.title}</h3>
        <p>{event.description}</p>
        <p>{event.completed}</p>
        <p>{event.date}</p>
        <p>{event.time}</p>
      </div>
      <div className="event-details-buttons">
        <Link to={`/edit/event/${event._id}`}>Edit Event</Link>
        <button onClick={eventDelete}>Delete Event</button>
      </div>
      <div className="event-return-buttons">
        <Link to="/dashboard">Return to Dashboard</Link>
      </div>
    </div>
  );
}

export default EventDetails;
