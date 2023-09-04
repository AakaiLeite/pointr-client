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
function Weekly() {
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

  // Render Page
  return (
    <div className="weekly-background">
      <div className="weekly-bullets">
        <div className="weekly-tasks">
          <h2>Tasks for the Week</h2>
          <ul>
            {tasksForWeek.map((task) => {
              return (
                <Link key={task._id} to={`/task/${task._id}`}>
                  <li>{task.title}</li>
                </Link>
              );
            })}
          </ul>
        </div>
        <div className="weekly-events">
          <h2>Events for the Week</h2>
          <ul>
            {eventsForWeek.map((event) => {
              return (
                <Link key={event._id} to={`/event/${event._id}`}>
                  <li key={event._id}>{event.weekDay}: {event.title}</li>
                </Link>
              );
            })}
          </ul>
        </div>
      </div>
    </div>
  );
}

export default Weekly;
