// Clear ESlink errors
/* eslint-disable no-unused-vars */

// Import Basics
import { useEffect, useState } from "react";
import { Link, useParams, useNavigate } from "react-router-dom";

// API Services
import apiServices from "../../services/api.services.js";
const { TaskService } = apiServices;
const taskService = new apiServices.TaskService();

// React Page Component
function TaskDetails() {
  // State Variables
  const [task, setTask] = useState([]);

  // React Router useParams and Navigate Hooks
  const { taskId } = useParams();
  const navigate = useNavigate();

  // useEffect Hook to Fetch Data from API Services on Page Load
  useEffect(() => {
    taskService
      .getTaskById(taskId)
      .then((response) => {
        setTask(response.data);
      })
      .catch((err) => console.error(err));
  }, []);

  // Format completion status
  task.completed = task.completed ? "Completed" : "Not Completed";

  // Format date
  const date = new Date(task.date);
  task.date = date.toDateString();

  // Delete Task
  const taskDelete = () => {
    taskService
      .deleteTask(taskId)
      .then(() => {
        navigate("/dashboard");
      })
      .catch((err) => console.error(err));
  };

  return (
    <div>
      <div className="task-details">
        <h2>Task Details</h2>
        <h3>{task.title}</h3>
        <p>{task.description}</p>
        <p>{task.date}</p>
        <p>{task.completed}</p>
      </div>
      <div className="task-details-buttons">
        <Link to={`/edit/task/${task._id}`}>Edit Task</Link>
        <button onClick={taskDelete}>Delete Task</button>
      </div>
      <div className="task-return-buttons">
        <Link to={`/dashboard`}>Back to Dashboard</Link>
      </div>
    </div>
  );
}

export default TaskDetails;
