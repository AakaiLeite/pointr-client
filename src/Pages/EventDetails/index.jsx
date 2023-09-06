// Clear ESlint errors
/* eslint-disable no-unused-vars */

// Import Dependencies
import { useEffect, useState } from "react";
import { Link, useParams, useNavigate } from "react-router-dom";

// API Services
import apiServices from "../../services/api.services.js";
const { EventService } = apiServices;
const eventService = new apiServices.EventService();

// React Page Component
function EventDetails() {
  // State Variables
  const [event, setEvent] = useState({});

  // React Router useParams and Navigate Hooks
  const { eventId } = useParams();
  const navigate = useNavigate();

  // useEffect Hook to Fetch Data from API Services on Page Load
  useEffect(() => {
    eventService
      .getEventById(eventId)
      .then((response) => {
        // Format event completion status
        let eventCompleted = response.data.completed
          ? "Completed"
          : "Not Completed";
        // Get event date and get time from the date
        let eventDate = response.data.date;
        let eventTime = eventDate.slice(11, 16);
        setEvent({
          ...response.data,
          completed: eventCompleted,
          date: eventDate,
          time: eventTime,
        });
      })
      .catch((err) => console.error(err));
  }, []);

  // Format event date for display
  event.date = event.date ? event.date.slice(0, 10) : "";

  // Delete Event
  const eventDelete = () => {
    eventService
      .deleteEvent(eventId)
      .then(() => {
        navigate("/monthly");
      })
      .catch((err) => console.error(err));
  };

  // Render Page
  return (
    <div>
      <div className="details-background">
        <div className="details-container">
          <h2>Event Details</h2>
          <h3>{event.title}</h3>
          <p>{event.description}</p>
          <p>{event.date}</p>
          <p>{event.time}</p>
          <p>{event.completed}</p>
          <div className="details-main-buttons">
            <Link to={`/edit/event/${event._id}`}>
              <button>Edit Event</button>
            </Link>
            <button onClick={eventDelete}>Delete Event</button>
          </div>
        </div>
        <div className="return-link-button-box">
          <Link className="return-link-button" to="/monthly">
            Return to Monthly
          </Link>
        </div>
      </div>
    </div>
  );
}

// Export Page
export default EventDetails;
