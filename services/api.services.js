const axios = require("axios");

// API service classes

// API service for Task model
class TaskService {
  constructor() {
    this.api = axios.create({
      baseURL:
        "mongodb+srv://miguel:9Qq73sMBO2W8sCeG@cluster0.wzgkbt9.mongodb.net/pointr",
    });
  }
  // API service methods
  getAllTasks = () => this.api.get("/tasks");
  getTaskById = (taskId) => this.api.get(`/tasks/${taskId}`);
  createTask = (taskInfo) => this.api.post("/tasks/create", taskInfo);
  updateTask = (taskId, taskInfo) => this.api.put(`/tasks/${taskId}`, taskInfo);
  deleteTask = (taskId) => this.api.delete(`/tasks/${taskId}`);
}
module.exports = TaskService;

// API service for Note model
class NoteService {
  constructor() {
    this.api = axios.create({
      baseURL:
        "mongodb+srv://miguel:9Qq73sMBO2W8sCeG@cluster0.wzgkbt9.mongodb.net/pointr",
    });
  }

  // API service methods
  getAllNotes = () => this.api.get("/notes");
  getNoteById = (noteId) => this.api.get(`/notes/${noteId}`);
  createNote = (noteInfo) => this.api.post("/notes/create", noteInfo);
  updateNote = (noteId, noteInfo) => this.api.put(`/notes/${noteId}`, noteInfo);
  deleteNote = (noteId) => this.api.delete(`/notes/${noteId}`);
}
module.exports = NoteService;

// API service for Event model
class EventService {
  constructor() {
    this.api = axios.create({
      baseURL:
        "mongodb+srv://miguel:9Qq73sMBO2W8sCeG@cluster0.wzgkbt9.mongodb.net/pointr",
    });
  }
  // API service methods
  getAllEvents = () => this.api.get("/events");
  getEventById = (eventId) => this.api.get(`/events/${eventId}`);
  createEvent = (eventInfo) => this.api.post("/events/create", eventInfo);
  updateEvent = (eventId, eventInfo) =>
    this.api.put(`/events/${eventId}`, eventInfo);
  deleteEvent = (eventId) => this.api.delete(`/events/${eventId}`);
}
module.exports = EventService;
