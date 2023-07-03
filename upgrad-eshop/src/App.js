import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import SignIn from './components/home/SignIn';
import SignUp from './components/home/SignUp';
import Products from './components/products/Products';
import ProductDetails from './components/products/ProductDetails';
import CreateOrder from './components/orders/CreateOrder';

function App() {
  const [loggedIn, setLoggedIn] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false);
  const [email, setEmail] = useState('');

  const handleLogout = () => {
    setLoggedIn(false);
  };

  const handleAdminStatus = (adminStatus) => {
    setIsAdmin(adminStatus);
  };

  const handleLogin = (loggedInEmail) => {
    setEmail(loggedInEmail);
    setLoggedIn(true);
  };

  return (
    <Router>
      <div>
        <Navbar loggedIn={loggedIn} isAdmin={isAdmin} onLogout={handleLogout} />

        <Routes>
          <Route
            path="/"
            element={<SignIn onAdminStatus={handleAdminStatus} onLogin={handleLogin} />}
          />
          <Route
            path="/login"
            element={<SignIn onAdminStatus={handleAdminStatus} onLogin={handleLogin} />}
          />
          <Route path="/signup" element={<SignUp />} />
          <Route path="/products" element={<Products isAdmin={isAdmin} email={email} />} />
          <Route path="/product/:id" element={<ProductDetails email={email} />} />
          <Route path="/create-order" element={<CreateOrder email={email} />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
