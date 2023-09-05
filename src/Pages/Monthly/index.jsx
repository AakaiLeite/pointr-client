// Clear ESlint errors
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
function Monthly() {
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

  // Filter Tasks, Notes, and Events for the current Month
  const today = new Date();
  const currentYear = today.getFullYear();
  const currentMonth = today.getMonth();

  const tasksForMonth = tasks.filter((task) => {
    const taskDate = new Date(task.date);
    return (
      taskDate.getFullYear() === currentYear &&
      taskDate.getMonth() === currentMonth
    );
  });

  const eventsForMonth = events.filter((event) => {
    const eventDate = new Date(event.date);
    return (
      eventDate.getFullYear() === currentYear &&
      eventDate.getMonth() === currentMonth
    );
  });

  // Sort Events for the Month by Date
  eventsForMonth.sort((a, b) => {
    const dateA = new Date(a.date);
    const dateB = new Date(b.date);
    return dateA - dateB;
  });

  // Add Day of Month to event object
  eventsForMonth.forEach((event) => {
    const date = new Date(event.date);
    event.monthDay = date.getDate();
  });

  // Render Page
  return (
    <div className="intervals-background">
      <div className="intervals-container">
        <h2>Events for the Month</h2>
        <ul>
          {eventsForMonth.map((event) => {
            const checkCompleted = event.completed ? "bullet-completed" : "";
            return (
              <Link key={event._id} to={`/event/${event._id}`}>
                <li key={event._id} className={checkCompleted}>
                  Day {event.monthDay}: {event.title}
                </li>
              </Link>
            );
          })}
        </ul>
        <Link to="/add/event">Add Event</Link>
      </div>
      <div className="intervals-container">
        <h2>Tasks for the Month</h2>
        <ul>
          {tasksForMonth.map((task) => {
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
        <Link to="/add/task">Add Task</Link>
      </div>
    </div>
  );
}

export default Monthly;
