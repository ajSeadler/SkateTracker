import React from "react";
import { Routes, Route } from "react-router-dom";
import Home from "./components/Home";
import Login from "./components/Login";
import ProfilePage from "./components/ProfilePage";
import Nav from "./components/Nav";
import Tricks from "./components/Tricks";
import SignUp from "./components/SignUp";
import Community from "./components/Community";
import Footer from "./components/Footer";

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
          <Route path="/trick-bank" element={<Tricks />} />
          <Route path="/community" element={<Community />} />
        </Routes>
        <Footer />
      </div>
    </>
  );
}

export default App;
