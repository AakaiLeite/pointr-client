import axios from "axios";

// API URL, Authtoken and User ID from token
const API_URL = "https://pointr-backend.onrender.com";
const storedToken = localStorage.getItem("authToken");

// API Service Classes
// API service for Task model
class TaskService {
  constructor() {
    this.api = axios.create({
      baseURL: API_URL,
      headers: { Authorization: `Bearer ${storedToken}` },
    });
  }

  // API service methods
  getAllTasks = () => this.api.get("/api/tasks");
  getTaskById = (taskId) => this.api.get(`/api/tasks/${taskId}`);
  createTask = (taskInfo) => this.api.post("/api/tasks/create", taskInfo);
  updateTask = (taskId, taskInfo) =>
    this.api.put(`/api/tasks/${taskId}`, taskInfo);
  deleteTask = (taskId) => this.api.delete(`/api/tasks/${taskId}`);
}

// API service for Event model
class EventService {
  constructor() {
    this.api = axios.create({
      baseURL: API_URL,
      headers: { Authorization: `Bearer ${storedToken}` },
    });
  }
  // API service methods
  getAllEvents = () => this.api.get("/api/events");
  getEventById = (eventId) => this.api.get(`/api/events/${eventId}`);
  createEvent = (eventInfo) => this.api.post("/api/events/create", eventInfo);
  updateEvent = (eventId, eventInfo) =>
    this.api.put(`/api/events/${eventId}`, eventInfo);
  deleteEvent = (eventId) => this.api.delete(`/api/events/${eventId}`);
}

export default { TaskService, EventService };
