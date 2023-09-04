// Clear ESlink errors
/* eslint-disable no-unused-vars */

// Import Basics
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

  // useEffect Hook to Fetch Data from API Services on Page Load
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

  // Format Event Time
  eventsForToday.forEach((event) => {
    const time = new Date(event.date);
    event.time = time.toLocaleTimeString();
  });

  // Render Page
  return (
    <div className="daily-backgrond">
      <div className="daily-bullets">
        <div className="daily-tasks">
          <h2>Tasks for Today</h2>
          <ul>
            {tasksForToday.map((task) => {
              const checkCompleted = task.completed ? "bullet-completed" : "";
              return (
                <Link key={task._id} to={`/task/${task._id}`}>
                  <li key={task._id} className={checkCompleted}>
                    {task.title}
                  </li>
                </Link>
              );  
            })}
          </ul>
        </div>
        <div className="daily-events">
          <h2>Events for Today</h2>
          <ul>
            {eventsForToday.map((event) => {
              return (
                <Link key={event._id} to={`/event/${event._id}`}>
                  <li key={event._id}>{event.time}: {event.title}</li>
                </Link>
              );
            })}
          </ul>
        </div>
      </div>
    </div>
  );
}

export default Daily;
