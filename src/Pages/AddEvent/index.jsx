import {useState} from "react";

// API Services
import apiServices from "../../services/api.services.js";
const eventService = new apiServices.EventService();

function AddEvent() {
    const [title, setTitle] = useState("");
    const [date, setDate] = useState("");
    const [description, setDescription] = useState("");
    const [completed, setCompleted] = useState(false);

    const handleChange = (event) => {
        const {name, value} = event.target;
        if (name === "title") setTitle(value);
        if (name === "date") setDate(value);
        if (name === "description") setDescription(value);
        if (name === "completed") setCompleted(value);
    };

    const handleSubmit = (event) => {
        event.preventDefault();

        const newEvent = {
            title,
            date,
            description,
            completed,
        };

        eventService
            .createEvent(newEvent)
            .then((response) => {
                console.log(response.data);
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