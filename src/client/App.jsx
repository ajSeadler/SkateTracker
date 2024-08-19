import React from "react";
import { Routes, Route } from "react-router-dom";
import Home from "./components/Home";
import Login from "./components/Login";
import ProfilePage from "./components/ProfilePage";
import Recoveries from "./components/Recoveries";
import Nav from "./components/Nav";
import Tricks from "./components/Tricks";

function App() {
  return (
    <>
      <div className="app">
        <Nav />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/me" element={<ProfilePage />} />
          <Route path="/recoveries" element={<Recoveries />} />
          <Route path="/track-tricks" element={<Tricks />} />
        </Routes>
      </div>
    </>
  );
}

export default App;
