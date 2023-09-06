// Clear ESlink errors
/* eslint-disable no-unused-vars */

// Import Dependencies
import { useEffect, useState } from "react";
import { Link, useParams, useNavigate } from "react-router-dom";

// API Services
import apiServices from "../../services/api.services.js";
const { TaskService } = apiServices;
const taskService = new apiServices.TaskService();

// React Page Component
function TaskDetails() {
  // State Variables
  const [task, setTask] = useState({});

  // React Router useParams and Navigate Hooks
  const { taskId } = useParams();
  const navigate = useNavigate();

  // useEffect Hook to Fetch Data from API Services on Page Load
  useEffect(() => {
    taskService
      .getTaskById(taskId)
      .then((response) => {
        // Format task completion status
        let taskCompleted = response.data.completed
          ? "Completed"
          : "Not Completed";
        setTask({ ...response.data, completed: taskCompleted });
      })
      .catch((err) => console.error(err));
  }, []);

  // Format task date
  const date = new Date(task.date);
  task.date = date.toDateString();

  // Delete Task
  const taskDelete = () => {
    taskService
      .deleteTask(taskId)
      .then(() => {
        navigate("/monthly");
      })
      .catch((err) => console.error(err));
  };

  // Render Page
  return (
    <div>
      <div className="details-background">
        <div className="details-container">
          <h2>Task Details</h2>
          <h3>{task.title}</h3>
          <p>{task.description}</p>
          <p>{task.date}</p>
          <p>{task.completed}</p>
          <div className="details-main-buttons">
            <Link to={`/edit/task/${task._id}`}>
              <button>Edit Task</button>
            </Link>
            <button onClick={taskDelete}>Delete Task</button>
          </div>
        </div>
        <div className="return-link-button-box">
          <Link className="return-link-button" to={`/monthly`}>
            Back to Monthly
          </Link>
        </div>
      </div>
    </div>
  );
}

// Export Page
export default TaskDetails;
