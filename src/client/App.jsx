// App.jsx
import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Home from './components/Home';
import Login from './components/Login';
import NavigationBar from './components/NavigationBar';
import AllGuitars from './components/AllGuitars';

function App() {
  return (
    <>
    <div>
      <NavigationBar />
  
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path='/guitars' element={<AllGuitars />} />
       </Routes>
    </div>
    </>
  );
}

export default App;
