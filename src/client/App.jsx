import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Home from './components/Home';
import Login from './components/Login';
import NavigationBar from './components/NavigationBar';
import AllGuitars from './components/AllGuitars';
import AcousticGuitars from './components/AcousticGuitars';
import ElectricGuitars from './components/ElectricGuitars';
import GuitarDetail from './components/GuitarDetail'; // Import GuitarDetail component
import AllAmplifiers from './components/AllAmplifiers'
import ProfilePage from './components/ProfilePage';
import Footer from './components/Footer';

function App() {
  return (
    <>
      <div>
        <NavigationBar />
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path='/me' element={<ProfilePage />} />
          <Route path='/guitars' element={<AllGuitars />} />
          <Route path='/acoustic-guitars' element={<AcousticGuitars />} />
          <Route path='/electric-guitars' element={<ElectricGuitars />} />
          <Route path='/amps' element={<AllAmplifiers />} />
          {/* Add route for GuitarDetail component */}
          <Route path='/products/:productId' element={<GuitarDetail />} />
        </Routes>
        <Footer />
      </div>
    </>
  );
}

export default App;
