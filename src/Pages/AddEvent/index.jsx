import {useState} from "react";
import {useNavigate} from "react-router-dom";

// API Services
import apiServices from "../../services/api.services.js";
const eventService = new apiServices.EventService();

function AddEvent() {
    const [title, setTitle] = useState("");
    const [date, setDate] = useState("");
    const [time, setTime] = useState("");
    const [description, setDescription] = useState("");
    const [completed, setCompleted] = useState(false);

    const navigate = useNavigate();

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
                navigate("/dashboard");
            })
            .catch((err) => console.error(err));
    };

    return (
        <div className="add-event-background">
            <h3>Add an Event</h3>
            <div className="add-event-form">
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
            </div>
        </div>
    );

}

export default AddEvent;