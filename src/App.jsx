// Import Basics
import {Routes, Route} from "react-router-dom";
import "./App.css";

// Import Auth Middleware
import IsUser from "./Components/IsUser";
import IsGuest from "./Components/IsGuest";

// Import Pages
import Home from "./Pages/Home";
import Error from "./Pages/Error";
import Login from "./Pages/Login";
import Signup from "./Pages/Signup";
import Daily from "./Pages/Daily";
import Weekly from "./Pages/Weekly";
import Monthly from "./Pages/Monthly";
import TaskDetails from "./Pages/TaskDetails";
import EventDetails from "./Pages/EventDetails";
import AddTask from "./Pages/AddTask";
import AddEvent from "./Pages/AddEvent";
import EditTask from "./Pages/EditTask";
import EditEvent from "./Pages/EditEvent";

// Import Components
import Navbar from "./Components/Navbar";

// React App Component
function App() {
  return (
    <div className="App">
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<IsGuest><Login /></IsGuest>} />
        <Route path="/signup" element={<IsGuest><Signup /></IsGuest>} />
        <Route path="/daily" element={<IsUser><Daily /></IsUser>} />
        <Route path="/monthly" element={<IsUser><Monthly /></IsUser>} />
        <Route path="/weekly" element={<IsUser><Weekly /></IsUser>} />
        <Route path="/task/:taskId" element={<IsUser><TaskDetails /></IsUser>} />
        <Route path="/event/:eventId" element={<IsUser><EventDetails /></IsUser>} />
        <Route path="/add/task" element={<IsUser><AddTask /></IsUser>} />
        <Route path="/add/event" element={<IsUser><AddEvent /></IsUser>} />
        <Route path="/edit/task/:taskId" element={<IsUser><EditTask /></IsUser>} />
        <Route path="/edit/event/:eventId" element={<IsUser><EditEvent /></IsUser>} />
        <Route path="/*" element={<Error />} />
      </Routes>
    </div>
  );
}

export default App;
