// Clear ESlink errors
/* eslint-disable no-unused-vars */

// Import Dependencies
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";

// API Services
import apiServices from "../../services/api.services.js";
const { TaskService, EventService } = apiServices;
const taskService = new apiServices.TaskService();
const eventService = new apiServices.EventService();

// React Page Component
function Daily() {
  // State Variables
  const [tasks, setTasks] = useState([]);
  const [events, setEvents] = useState([]);

  // useEffect Hook to fetch Tasks and Events from API Services
  useEffect(() => {
    taskService
      .getAllTasks()
      .then((response) => {
        setTasks(response.data);
      })
      .catch((err) => console.error(err));

    eventService
      .getAllEvents()
      .then((response) => {
        setEvents(response.data);
      })
      .catch((err) => console.error(err));
  }, []);

  // Filter Tasks, Notes, and Events for Today
  const today = new Date().toISOString().slice(0, 10);

  const tasksForToday = tasks.filter((task) => {
    const taskDate = new Date(task.date).toISOString().slice(0, 10);
    return taskDate === today;
  });

  const eventsForToday = events.filter((event) => {
    const eventDate = new Date(event.date).toISOString().slice(0, 10);
    return eventDate === today;
  });

  // Sort Events for Today by Date
  eventsForToday.sort((a, b) => {
    const dateA = new Date(a.date);
    const dateB = new Date(b.date);
    return dateA - dateB;
  });

  // Auto mark Events that are in the past as completed and update in database
 /*  eventsForToday.forEach((event) => {
    const eventDate = new Date(event.date);
    const today = new Date();
    if (eventDate < today) {
      event.completed = true;
      event.title = `${event.title} (Missed)`;
    }

    eventService
      .updateEvent(event._id, event)
      .then(() => {})
      .catch((err) => console.error(err));
  });
 */
  // Format Event Time
  eventsForToday.forEach((event) => {
    const time = new Date(event.date);
    event.time = time.toLocaleTimeString();
  });

  // Render Page
  return (
    <div className="intervals-background">
      <div className="intervals-container">
        <h2>Events for Today</h2>
        <ul>
          {eventsForToday.map((event) => {
            const bulletCompleted = event.completed
              ? "bullet-completed"
              : "bullet-incomplete";
            return (
              <Link key={event._id} to={`/event/${event._id}`}>
                <li key={event._id} className={bulletCompleted}>
                  {event.time}: {event.title}
                </li>
              </Link>
            );
          })}
        </ul>
        <Link to="/add/event">Add an Event</Link>
      </div>
      <div className="intervals-container">
        <h2>Tasks for Today</h2>
        <ul>
          {tasksForToday.map((task) => {
            const bulletCompleted = task.completed
              ? "bullet-completed"
              : "bullet-incomplete";
            return (
              <Link key={task._id} to={`/task/${task._id}`}>
                <li key={task._id} className={bulletCompleted}>
                  {task.title}
                </li>
              </Link>
            );
          })}
        </ul>
        <Link to="/add/task">Add a Task</Link>
      </div>
    </div>
  );
}

// Export Page
export default Daily;
