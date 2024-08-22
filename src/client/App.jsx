import React from "react";
import { Routes, Route } from "react-router-dom";
import Home from "./components/Home";
import Login from "./components/Login";
import ProfilePage from "./components/ProfilePage";
import Recoveries from "./components/Recoveries";
import Nav from "./components/Nav";
import Tricks from "./components/Tricks";
import SignUp from "./components/SignUp";
import Community from "./components/Community";

function App() {
  return (
    <>
      <div className="app">
        <Nav />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<SignUp />} />
          <Route path="/me" element={<ProfilePage />} />
          <Route path="/recoveries" element={<Recoveries />} />
          <Route path="/track-tricks" element={<Tricks />} />
          <Route path="/community" element={<Community />} />
        </Routes>
      </div>
    </>
  );
}

export default App;
