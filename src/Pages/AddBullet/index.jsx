import { useState } from "react";
import apiServices from "../../services/api.services.js";

function AddBullet() {
  const [bulletType, setBulletType] = useState("task");

  const handleOptionChange = (event) => {
    setBulletType(event.target.value);
  };

  return (
    <div>
      <div className="addBullet-select-type">
        <label htmlFor="task">
          Task
          <input
            type="radio"
            id="task"
            name="bullet"
            value="task"
            onChange={handleOptionChange}
          />
        </label>
        <label htmlFor="note">
          Note
          <input
            type="radio"
            id="note"
            name="bullet"
            value="note"
            onChange={handleOptionChange}
          />
        </label>
        <label htmlFor="event">
          Event
          <input
            type="radio"
            id="event"
            name="bullet"
            value="event"
            onChange={handleOptionChange}
          />
        </label>
      </div>
      <div>

      </div>
    </div>
  );
}

export default AddBullet;
