// Import Dependencies
import {useState} from "react";
import { Link, useNavigate} from "react-router-dom";

// API Services
import apiServices from "../../services/api.services.js";
const eventService = new apiServices.EventService();

// React Page Component
function AddEvent() {
    // State Variables
    const [title, setTitle] = useState("");
    const [date, setDate] = useState("");
    const [time, setTime] = useState("");
    const [description, setDescription] = useState("");
    const [completed, setCompleted] = useState(false);

    // React Router Navigate Hook
    const navigate = useNavigate();

    // Handle form changes and submit
    const handleChange = (event) => {
        const {name, value} = event.target;
        if (name === "title") setTitle(value);
        if (name === "date") setDate(value);
        if (name === "time") setTime(value);
        if (name === "description") setDescription(value);
        if (name === "completed") setCompleted(value);
    };

    const handleSubmit = (event) => {
        event.preventDefault();
        const combinedDate = `${date}T${time}:00`
        const newEvent = {
            title,
            date: combinedDate,
            description,
            completed,
        };
        eventService
            .createEvent(newEvent)
            .then(() => {
                navigate("/monthly");
            })
            .catch((err) => console.error(err));
    };

    // Render Page
    return (
        <div className="agenda-background">
            <div className="agenda-container">
            <h3>Add an Event</h3>
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
                            placeholder="YYYY-MM-DD"
                            onChange={handleChange}
                        />
                    </label>
                    <label>
                        Time
                        <input
                            type="text"
                            name="time"
                            value={time}
                            placeholder="HH:MM"
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
                    <button type="submit">Add Event</button>
                </form>
                <Link className="agenda-return-button" to="/monthly">Return to Monthly</Link>
            </div>
        </div>
    );

}

// Export Page
export default AddEvent;