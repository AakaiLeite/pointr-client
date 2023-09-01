import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";

const API_URL = "http://localhost:5005";

function EditBullet() {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");

  const { bulletId } = useParams();
  const navigate = useNavigate();
}

useEffect(() => {
  axios
    .get(`${API_URL}/api/dashboard/${bulletId}`)
    .then((response) => {
      const oneBullet = response.data;
      setTitle(oneBullet.title);
      setDescription(oneBullet.description);
    })
    .catch((error) => {
      console.log(error);
    });
}, [bulletId]);



const handleSubmit = (e) => {
  e.preventDefault();
  const requestBody = {  title, description };

  axios
    .put(`${API_URL}/api/dashboard/${bulletId}`, requestBody)
    .then(() => {
      navigate(`/dashboard/${bulletId}`);
    })
    .catch((error) => {
      console.log(error);
    });



return(
    <div>
        <h3> Edit Bullet</h3>
        <form onSubmit={handleSubmit}>
            <label>
                Title:
                <input type="text" name="title" value={title} onChange={(e)=> setTitle(e.target.value)} />
            </label>
            <label>
                Description:
                <input type="text" name="description" value={description} onChange={(e)=> setDescription(e.target.value)} />
            </label>
            <button type="submit"> Edit</button>
        </form>
        <button onClick={deleteBullet}>Delete Bullet</button>

    </div>
)

};

export default EditBullet;
