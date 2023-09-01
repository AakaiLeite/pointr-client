import axios from "axios";

// API URL and stored token
const API_URL = "http://localhost:5005";
const storedToken = localStorage.getItem("authToken");

// API Service Classes
// API service for Task model
class TaskService {
  constructor() {
    this.api = axios.create({
      baseURL: API_URL,
    });
  }

  // API service methods
  getAllTasks = () => this.api.get("/api/tasks");
  getTaskById = (taskId) => this.api.get(`/api/tasks/${taskId}`);
  createTask = (taskInfo) =>
    this.api.post("/api/tasks/create", taskInfo, {
      headers: { Authorization: `Bearer ${storedToken}` },
    });
  updateTask = (taskId, taskInfo) =>
    this.api.put(`/api/tasks/${taskId}`, taskInfo, {
      headers: { Authorization: `Bearer ${storedToken}` },
    });
  deleteTask = (taskId) =>
    this.api.delete(`/api/tasks/${taskId}`, {
      headers: { Authorization: `Bearer ${storedToken}` },
    });
}

// API service for Note model
class NoteService {
  constructor() {
    this.api = axios.create({
      baseURL: API_URL,
    });
  }

  // API service methods
  getAllNotes = () => this.api.get("/api/notes");
  getNoteById = (noteId) => this.api.get(`/api/notes/${noteId}`);
  createNote = (noteInfo) =>
    this.api.post("/api/notes/create", noteInfo, {
      headers: { Authorization: `Bearer ${storedToken}` },
    });
  updateNote = (noteId, noteInfo) =>
    this.api.put(`/api/notes/${noteId}`, noteInfo, {
      headers: { Authorization: `Bearer ${storedToken}` },
    });
  deleteNote = (noteId) =>
    this.api.delete(`/api/notes/${noteId}`, {
      headers: { Authorization: `Bearer ${storedToken}` },
    });
}

// API service for Event model
class EventService {
  constructor() {
    this.api = axios.create({
      baseURL: API_URL,
    });
  }
  // API service methods
  getAllEvents = () => this.api.get("/api/events");
  getEventById = (eventId) => this.api.get(`/api/events/${eventId}`);
  createEvent = (eventInfo) =>
    this.api.post("/api/events/create", eventInfo, {
      headers: { Authorization: `Bearer ${storedToken}` },
    });
  updateEvent = (eventId, eventInfo) =>
    this.api.put(`/api/events/${eventId}`, eventInfo, {
      headers: { Authorization: `Bearer ${storedToken}` },
    });
  deleteEvent = (eventId) =>
    this.api.delete(`/api/events/${eventId}`, {
      headers: { Authorization: `Bearer ${storedToken}` },
    });
}

export default { TaskService, NoteService, EventService };
