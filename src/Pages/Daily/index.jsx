import { useState } from "react";
import apiServices from "../../services/api.services.js";
const taskService = new apiServices.TaskService();
const noteService = new apiServices.NoteService();
const eventService = new apiServices.EventService();

function Daily() {
  const [tasks, setTasks] = useState([]);
  const [notes, setNotes] = useState([]);
  const [events, setEvents] = useState([]);

  useState(() => {
    taskService
      .getAllTasks()
      .then((response) => {
        console.log(response.data);
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
    <div className="daily-backgrond">
      <div className="daily-bullets">
        <div className="daily-tasks">
          <h2>Tasks</h2>
          <ul>
            {tasks.map((task) => {
              return <li key={task._id}>{task.title}</li>;
            })}
          </ul>
        </div>
        <div className="daily-notes">
          <h2>Notes</h2>
          <ul>
            {notes.map((note) => {
              return <li key={note._id}>{note.title}</li>;
            })}
          </ul>
        </div>
        <div className="daily-events">
          <h2>Events</h2>
          <ul>
            {events.map((event) => {
              return <li key={event._id}>{event.title}</li>;
            })}
          </ul>
        </div>
      </div>
    </div>
  );
}

export default Daily;
