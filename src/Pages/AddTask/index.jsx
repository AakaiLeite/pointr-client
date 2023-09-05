import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

// API Services
import apiServices from "../../services/api.services.js";
const taskService = new apiServices.TaskService();

function AddTask() {
  const [title, setTitle] = useState("");
  const [date, setDate] = useState("");
  const [description, setDescription] = useState("");
  const [completed, setCompleted] = useState(false);

  const navigate = useNavigate();

  const handleChange = (event) => {
    const { name, value } = event.target;
    if (name === "title") setTitle(value);
    if (name === "date") setDate(value);
    if (name === "description") setDescription(value);
    if (name === "completed") setCompleted(event.target.checked);
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    const newTask = {
      title,
      date,
      description,
      completed,
    };

    taskService
      .createTask(newTask)
      .then(() => {
        navigate("/monthly");
      })
      .catch((err) => console.error(err));
  };

  return (
    <div className="agenda-background">
      <div className="agenda-container">
        <h3>Add a Task</h3>
        <form onSubmit={handleSubmit}>
          <label>
            Title
            <input
              type="text"
              name="title"
              placeholder="Task title"
              value={title}
              onChange={handleChange}
            />
          </label>
          <label>
            Date
            <input
              type="text"
              name="date"
              value={date}
              placeholder="yyyy-mm-dd"
              onChange={handleChange}
            />
          </label>
          <label>
            Description
            <input
              type="text"
              name="description"
              placeholder="Task description"
              value={description}
              onChange={handleChange}
            />
          </label>
          <label>
            Completed
            <input
              type="checkbox"
              name="completed"
              value={completed}
              onChange={handleChange}
            />
          </label>
          <button type="submit">Add Task</button>
        </form>
        <Link to="/monthly">Back to Monthly</Link>
      </div>
    </div>
  );
}
export default AddTask;
