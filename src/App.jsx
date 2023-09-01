// Import Basics
import {Routes, Route} from "react-router-dom";
import "./App.css";

// Import Pages
import About from "./Pages/About";
import AddBullet from "./Pages/AddBullet";
import EditBullet from "./Pages/EditBullet";
import Daily from "./Pages/Daily";
import Dashboard from "./Pages/Dashboard";
import Home from "./Pages/Home";
import Login from "./Pages/Login";
import Monthly from "./Pages/Monthly";
import Signup from "./Pages/Signup";
import Weekly from "./Pages/Weekly";


function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/add" element={<AddBullet />} />
        <Route path="/edit" element={<EditBullet />} />
        <Route path="/about" element={<About />} />
        <Route path="/daily" element={<Daily />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/monthly" element={<Monthly />} />
        <Route path="/weekly" element={<Weekly />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
      </Routes>
    </div>
  );
}

export default App;
