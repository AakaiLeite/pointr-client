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
function Dashboard() {
  // State Variables
  const [tasks, setTasks] = useState([]);
  const [events, setEvents] = useState([]);

  // useEffect Hook to Fetch Data from API Services on Page Load
  useEffect(() => {
    taskService
      .getAllTasks()
      .then((response) => {
        console.log(response.data);
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

  return (
    <div className="dashboard-background">
      <div className="dashboard-main">
        <div className="dashboard-calendar"></div>
        <div className="dashboard-bullets">
          <div className="dashboard-tasks">
            <h2>Tasks</h2>
            <ul>
              {tasks.map((task) => {
                return (
                  <Link key={task._id} to={`/task/${task._id}`}>
                    <li>{task.title}</li>
                  </Link>
                );
              })}
            </ul>
          </div>
          <div className="dashboard-events">
            <h2>Events</h2>
            <ul>
              {events.map((event) => {
                return (
                  <Link key={event._id} to={`/event/${event._id}`}>
                    <li>{event.title}</li>
                  </Link>
                );
              })}
            </ul>
          </div>
        </div>
      </div>
      <div className="dashboard-secondary"></div>
    </div>
  );
}

export default Dashboard;
