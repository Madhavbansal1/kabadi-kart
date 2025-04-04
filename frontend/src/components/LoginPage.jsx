import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const LoginPage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setError('');

    try {
      const response = await axios.post('http://localhost:4000/user/login', { email, password });
      console.log(response.data.data.tokens.accessToken.token);
      const token = response.data.data.tokens.accessToken.token;

      // Store the token in localStorage for future authentication
      localStorage.setItem('authToken', token);
      console.log(token);

      alert('Login successful!');
      
      // Redirect to homepage or dashboard after login
      navigate('/home');
    } catch (error) {
      setError('Login failed. Please check your credentials.');
    }
  };

  return (
    <div className="bg-gray-100 min-h-screen flex flex-col">
      <header className="w-full bg-green-600 text-white p-4 fixed top-0 left-0 z-10 shadow-md">
        <div className="container mx-auto text-center">
          <h1 className="text-3xl font-bold">Kabadi Cart - Login</h1>
        </div>
      </header>

      <main className="flex-grow flex flex-col items-center justify-center mt-16 p-6 bg-white rounded-lg shadow-lg w-full max-w-md mx-auto">
        <h2 className="text-2xl font-bold mb-4">Login to Your Account</h2>
        <form className="space-y-4" onSubmit={handleLogin}>
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-700">
              Email Address
            </label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-green-500 focus:border-green-500 sm:text-sm"
              required
            />
          </div>
          <div>
            <label htmlFor="password" className="block text-sm font-medium text-gray-700">
              Password
            </label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-green-500 focus:border-green-500 sm:text-sm"
              required
            />
          </div>
          {error && <p className="text-red-500 text-sm">{error}</p>}
          <button
            type="submit"
            className="w-full bg-green-600 text-white px-4 py-2 rounded-md hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2"
          >
            Login
          </button>
        </form>
      </main>

      <footer className="bg-green-600 text-white py-4 w-full text-center mt-auto">
        <p>&copy; {new Date().getFullYear()} Kabadi Cart. All rights reserved.</p>
      </footer>
    </div>
  );
};

export default LoginPage;
