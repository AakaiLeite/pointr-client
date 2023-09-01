import { useState } from "react";

// Import Services method 1
import apiServices from "../../services/api.services.js";
const taskService = new apiServices.TaskService();
const noteService = new apiServices.NoteService();
const eventService = new apiServices.EventService();

function Dashboard() {
  const [tasks, setTasks] = useState([]);
  const [notes, setNotes] = useState([]);
  const [events, setEvents] = useState([]);

  useState(() => {
    taskService
      .getAllTasks()
      .then((response) => {
        console.log(response.data)
        setTasks(response.data);
      })
      .catch((err) => console.error(err));

    noteService
      .getAllNotes()
      .then((response) => {
        setNotes(response.data);
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
                return <li key={task._id}>{task.title}</li>;
              })}
            </ul>
          </div>
          <div className="dashboard-notes">
            <h2>Notes</h2>
            <ul>
              {notes.map((note) => {
                return <li key={note._id}>{note.title}</li>;
              })}
            </ul>
          </div>
          <div className="dashboard-events">
            <h2>Events</h2>
            <ul>
              {events.map((event) => {
                return <li key={event._id}>{event.title}</li>;
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
