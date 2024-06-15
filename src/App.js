import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import Dashboard from "./pages/Dashboard";
import BookDesk from "./pages/BookDesk"; // Add this import
import "./App.css";

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/book-desk" element={<BookDesk />} />{" "}
      </Routes>
    </Router>
  );
};

export default App;
