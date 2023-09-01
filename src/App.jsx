// Import Basics
import {Routes, Route} from "react-router-dom";
import "./App.css";

// Import Pages
import Error from "./Pages/Error";
import About from "./Pages/About";
import Daily from "./Pages/Daily";
import Dashboard from "./Pages/Dashboard";
import Home from "./Pages/Home";
import Login from "./Pages/Login";
import Monthly from "./Pages/Monthly";
import Signup from "./Pages/Signup";
import Weekly from "./Pages/Weekly";
import AddTask from "./Pages/AddTask";
import AddNote from "./Pages/AddNote";
import AddEvent from "./Pages/AddEvent";
import EditTask from "./Pages/EditTask";
import EditNote from "./Pages/EditNote";
import EditEvent from "./Pages/EditEvent";


function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/daily" element={<Daily />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/monthly" element={<Monthly />} />
        <Route path="/weekly" element={<Weekly />} />
        <Route path="/add/task" element={<AddTask />} />
        <Route path="/add/note" element={<AddNote />} />
        <Route path="/add/event" element={<AddEvent />} />
        <Route path="/edit/task/:taskId" element={<EditTask />} />
        <Route path="/edit/note/:noteId" element={<EditNote />} />
        <Route path="/edit/event/:eventId" element={<EditEvent />} />
        <Route path="/about" element={<About />} />
        <Route path="/*" element={<Error />} />
      </Routes>
    </div>
  );
}

export default App;
