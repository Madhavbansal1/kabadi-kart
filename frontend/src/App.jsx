import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import LandingPage from './components/LandingPage';
import SignupForm from './components/SignupForm';
import HomePage from './components/HomePage';
import PricingPage from './components/PricingPage';
import AboutPage from './components/AboutPage';
import LoginPage from './components/LoginPage';
import PickupRequestForm from './components/PickupRequestForm';
import ProfilePage from './components/ProfilePage';
import CollectorSignup from './components/CollectoeSingupForm';
import CollectorSignIn from './components/CollectorSignInForm';
import CollectorDashboard from './components/CollectorHomePage';

const App = () => {
  // Check if user is authenticated by verifying if token is in localStorage
  const isAuthenticated = localStorage.getItem('authToken');
  
  console.log(isAuthenticated);
  

  return (
    <Router>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/signup" element={<SignupForm />} />
        <Route path="/collector/signup" element={<CollectorSignup />} />
        <Route path="/collector/home" element={<CollectorDashboard />} />
        <Route path="/home" element={isAuthenticated ? <HomePage /> : <Navigate to="/" />} />
        <Route path="/pricing" element={<PricingPage />} />
        <Route path="/about" element={<AboutPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/collector/login" element={<CollectorSignIn />} />
        <Route path="/pickuprequest" element={isAuthenticated ? <PickupRequestForm /> : <Navigate to="/login" />} />
        <Route path="/profile" element={isAuthenticated ? <ProfilePage /> : <Navigate to="/login" />} />
      </Routes>
    </Router>
  );
};

export default App;
