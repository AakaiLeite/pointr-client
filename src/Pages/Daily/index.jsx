// Clear ESlink errors
/* eslint-disable no-unused-vars */

// Import Basics
import { useState, useEffect } from "react";

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

  return (
    <div className="daily-backgrond">
      <div className="daily-bullets">
        <div className="daily-tasks">
          <h2>Tasks for Today</h2>
          <ul>
            {tasksForToday.map((task) => {
              return <li key={task._id}>{task.title}</li>;
            })}
          </ul>
        </div>
        <div className="daily-events">
          <h2>Events for Today</h2>
          <ul>
            {eventsForToday.map((event) => {
              return <li key={event._id}>{event.title}</li>;
            })}
          </ul>
        </div>
      </div>
    </div>
  );
}

export default Daily;
