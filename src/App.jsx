import React from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import About from './components/About';
import Navbar from './components/Navbar';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js'; 
import './App.css';
import Register from './Auth/Register';
import Login from './Auth/Login';
import Homepage from './components/Homepage';
import Profile from './Auth/Profile';
import Services from './components/Services';
import Category from './Auth/Category';
import Booking from './components/Booking/Booking';
import Places from './components/Places/Places'

function Layout() {
    return (
        <>
           
            <Navbar /> {/* Always show Home now */}
            <Routes>
                <Route path="/" element={<Homepage />} />
                <Route path="/Homepage" element={<Homepage />} />
                <Route path="/about" element={<About />} />
                <Route path="/Services" element={<Services />} />
                <Route path="/Booking" element={<Booking />} />
                <Route path="/Register" element={<Register />} />
                <Route path="/Login" element={<Login />} />
                <Route path="/Profile" element={<Profile />} />
                <Route path="/Places" element={<Places />} />
                <Route path="/category" element={<Category />} />
               
            </Routes>
        </>
    );
}

const App = () => {
    return (
        <Router>
            <Layout />
        </Router>
    );
};

export default App;