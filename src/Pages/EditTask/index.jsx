// Import Basics
import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";

// API Services
import apiServices from "../../services/api.services.js";
const taskService = new apiServices.TaskService();

function EditTask() {
  const navigate = useNavigate();
  const { taskId } = useParams();

  // State Variables
  const [title, setTitle] = useState("");
  const [date, setDate] = useState("");
  const [description, setDescription] = useState("");
  const [completed, setCompleted] = useState(false);

  // useEffect Hook to Fetch Data from API Services on Page Load
  useEffect(() => {
    taskService
      .getTaskById(taskId)
      .then((response) => {
        const { title, date, description, completed } = response.data;
        setTitle(title);
        setDate(date);
        setDescription(description);
        setCompleted(completed);
      })
      .catch((err) => console.error(err));
  }, []);

  // Handle Form and Form Submission
  const handleChange = (event) => {
    const { name, value } = event.target;
    if (name === "title") setTitle(value);
    if (name === "date") setDate(value);
    if (name === "description") setDescription(value);
    if (name === "completed") setCompleted(event.target.checked);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    taskService
      .updateTask(taskId, { title, date, description, completed })
      .then(() => {
        navigate(`/monthly`);
      })
      .catch((err) => console.error(err));
  };

  // Delete and Edit Task
  const taskDelete = () => {
    taskService
      .deleteTask(taskId)
      .then(() => {
        navigate(`/monthly`);
      })
      .catch((err) => console.error(err));
  };

  const cancelEdit = () => {
    navigate(`/monthly`);
  };

  return (
    <div className="agenda-background">
      <div className="agenda-container">
        <h2>Edit Task</h2>
        <form onSubmit={handleSubmit}>
          <label>
            Title
            <input
              type="text"
              name="title"
              placeholder="Task Title"
              value={title}
              onChange={handleChange}
            />
          </label>
          <label>
            Date
            <input
              type="text"
              name="date"
              placeholder="YYYY-MM-DD"
              onChange={handleChange}
            />
          </label>
          <label>
            Description
            <input
              type="text"
              name="description"
              placeholder="Task Description"
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
          <button type="submit">Edit Task</button>
        </form>
        <div className="agenda-secondary-buttons">
          <button onClick={taskDelete}>Delete Task</button>
          <button onClick={cancelEdit}>Cancel Edit</button>
        </div>
      </div>
    </div>
  );
}

export default EditTask;
