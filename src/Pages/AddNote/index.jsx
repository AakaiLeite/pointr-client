import {useState} from "react";

// API Services
import apiServices from "../../services/api.services.js";
const noteService = new apiServices.NoteService();

function AddNote() {
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");

    const handleChange = (event) => {
        const {name, value} = event.target;
        if (name === "title") setTitle(value);
        if (name === "description") setDescription(value);
    };

    const handleSubmit = (event) => {
        event.preventDefault();

        const newNote = {
            title,
            description,
        };

        noteService
            .createNote(newNote)
            .then((response) => {
                console.log(response.data);
            })
            .catch((err) => console.error(err));
    };

    return (
        <div className="add-note-background">
            <h3>Add a Note</h3>
            <div className="add-note-form">
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
                        Description
                        <input
                            type="text"
                            name="description"
                            value={description}
                            onChange={handleChange}
                        />
                    </label>
                    <button type="submit">Add Note</button>
                </form>
            </div>
        </div>
    );

}

export default AddNote;