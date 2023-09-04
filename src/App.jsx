// Import Basics
import {Routes, Route} from "react-router-dom";
import "./App.css";

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
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/daily" element={<Daily />} />
        <Route path="/monthly" element={<Monthly />} />
        <Route path="/weekly" element={<Weekly />} />
        <Route path="/task/:taskId" element={<TaskDetails />} />
        <Route path="/event/:eventId" element={<EventDetails />} />
        <Route path="/add/task" element={<AddTask />} />
        <Route path="/add/event" element={<AddEvent />} />
        <Route path="/edit/task/:taskId" element={<EditTask />} />
        <Route path="/edit/event/:eventId" element={<EditEvent />} />
        <Route path="/*" element={<Error />} />
      </Routes>
    </div>
  );
}

export default App;
