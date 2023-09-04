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

  return (
    <div className="monthly-background">
      <div className="monthly-bullets">
        <div className="monthly-tasks">
          <h2>Tasks for the Month</h2>
          <ul>
            {tasksForMonth.map((task) => {
              return (
                <Link key={task._id} to={`/task/${task._id}`}>
                  <li>{task.title}</li>
                </Link>
              );
            })}
          </ul>
        </div>
        <div className="monthly-events">
          <h2>Events for the Month</h2>
          <ul>
            {eventsForMonth.map((event) => {
              return <li key={event._id}>{event.title}</li>;
            })}
          </ul>
        </div>
      </div>
    </div>
  );
}

export default Monthly;
