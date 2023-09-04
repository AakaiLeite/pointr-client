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
    if (name === "completed") setCompleted(value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    taskService
      .updateTask(taskId, { title, date, description, completed })
      .then(() => {
        navigate(`/motnhly`);
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
    <div className="edit-task-background">
      <h3>Edit Task</h3>
      <div className="edit-task-form">
        <form onSubmit={handleSubmit}>
          <label>
            Title
            <input
              type="text"
              name="title"
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
              onChange={handleChange}
            />
          </label>
          <label>
            Description
            <input
              type="text"
              name="description"
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
        <button onClick={taskDelete}>Delete Task</button>
        <button onClick={cancelEdit}>Cancel Edit</button>
      </div>
    </div>
  );
}

export default EditTask;
