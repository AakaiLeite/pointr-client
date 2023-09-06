// Clear ESlint errors
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
function Weekly() {
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

  // Filter Tasks, Notes, and Events for the current Week
  const today = new Date();

  const startOfWeek = new Date(today);
  startOfWeek.setDate(today.getDate() - today.getDay());

  const endOfWeek = new Date(today);
  endOfWeek.setDate(startOfWeek.getDate() + 6);

  const startWeek = startOfWeek.toISOString().slice(0, 10);
  const endWeek = endOfWeek.toISOString().slice(0, 10);

  const tasksForWeek = tasks.filter((task) => {
    const taskDate = new Date(task.date).toISOString().slice(0, 10);
    return taskDate >= startWeek && taskDate <= endWeek;
  });

  const eventsForWeek = events.filter((event) => {
    const eventDate = new Date(event.date).toISOString().slice(0, 10);
    return eventDate >= startWeek && eventDate <= endWeek;
  });

  // Sort Events for the Week by Date
  eventsForWeek.sort((a, b) => {
    const dateA = new Date(a.date);
    const dateB = new Date(b.date);
    return dateA - dateB;
  });

  // Add Day of the Week to event object
  eventsForWeek.forEach((event) => {
    const date = new Date(event.date);
    event.weekDay = date.toDateString().slice(0, 3);
  });

   // Auto mark Events that are in the past as completed and update in database
    const now = new Date();
    eventsForWeek.forEach((event) => {
      const eventTime = new Date(event.date);
      if (!event.completed && eventTime < now) {
        event.completed = true;
        event.title = `${event.title} (Auto Completed)`;
        eventService
          .updateEvent(event._id, event)
          .then((response) => {
            console.log(response);
          })
          .catch((err) => console.error(err));
      }
    });

  // Render Page
  return (
    <div className="intervals-background">
      <div className="intervals-container">
        <h2>Events for the Week</h2>
        <ul>
          {eventsForWeek.map((event) => {
            const checkCompleted = event.completed ? "bullet-completed" : "";
            return (
              <Link key={event._id} to={`/event/${event._id}`}>
                <li key={event._id} className={checkCompleted}>
                  {event.weekDay}: {event.title}
                </li>
              </Link>
            );
          })}
        </ul>
        <Link to="/add/event">Add Event</Link>
      </div>
      <div className="intervals-container">
        <h2>Tasks for the Week</h2>
        <ul>
          {tasksForWeek.map((task) => {
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

// Export Page
export default Weekly;
