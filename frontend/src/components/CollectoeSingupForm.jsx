import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const CollectorSignup = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    password: "",
    location: "",
    serviceAreas: [{ pincode: "", city: "" }],
  });
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleServiceAreaChange = (index, e) => {
    const { name, value } = e.target;
    const updatedServiceAreas = [...formData.serviceAreas];
    updatedServiceAreas[index][name] = value;
    setFormData({ ...formData, serviceAreas: updatedServiceAreas });
  };

  const addServiceArea = () => {
    setFormData({
      ...formData,
      serviceAreas: [...formData.serviceAreas, { pincode: "", city: "" }],
    });
  };

  const handleSignup = async (e) => {
    e.preventDefault();
    setError("");

    try {
      await axios.post("http://localhost:4000/collector/signup", formData);
      alert("Registration successful!");
      navigate("/collector/login");
    } catch (error) {
      setError(
        error.response?.data?.message || "Registration failed. Please try again."
      );
    }
  };

  return (
    <div className="bg-gray-100 min-h-screen flex flex-col">
      {/* Header */}
      <header className="w-full bg-green-600 text-white p-4 fixed top-0 left-0 z-10 shadow-md">
        <div className="container mx-auto text-center">
          <h1 className="text-3xl font-bold">Kabadi Cart - Collector Signup</h1>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-grow flex flex-col items-center justify-center mt-16 p-6 bg-white rounded-lg shadow-lg w-full max-w-md mx-auto">
        <h2 className="text-2xl font-bold mb-4">Create an Account</h2>
        <form className="space-y-4" onSubmit={handleSignup}>
          {/* Full Name */}
          <div>
            <label htmlFor="name" className="block text-sm font-medium text-gray-700">
              Full Name
            </label>
            <input
              type="text"
              id="name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-green-500 focus:border-green-500 sm:text-sm"
              required
            />
          </div>

          {/* Email */}
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-700">
              Email Address
            </label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-green-500 focus:border-green-500 sm:text-sm"
              required
            />
          </div>

          {/* Phone */}
          <div>
            <label htmlFor="phone" className="block text-sm font-medium text-gray-700">
              Phone Number
            </label>
            <input
              type="tel"
              id="phone"
              name="phone"
              value={formData.phone}
              onChange={handleChange}
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-green-500 focus:border-green-500 sm:text-sm"
              pattern="\d{10}"
              title="Please enter a valid 10-digit phone number."
              required
            />
          </div>

          {/* Password */}
          <div>
            <label htmlFor="password" className="block text-sm font-medium text-gray-700">
              Password
            </label>
            <input
              type="password"
              id="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-green-500 focus:border-green-500 sm:text-sm"
              required
            />
          </div>

          {/* Location */}
          <div>
            <label htmlFor="location" className="block text-sm font-medium text-gray-700">
              Location
            </label>
            <input
              type="text"
              id="location"
              name="location"
              value={formData.location}
              onChange={handleChange}
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-green-500 focus:border-green-500 sm:text-sm"
              required
            />
          </div>

          {/* Service Areas */}
          <div>
            <label className="block text-sm font-medium text-gray-700">Service Areas</label>
            {formData.serviceAreas.map((area, index) => (
              <div key={index} className="flex space-x-2 mt-2">
                <input
                  type="text"
                  name="pincode"
                  value={area.pincode}
                  onChange={(e) => handleServiceAreaChange(index, e)}
                  placeholder="Pincode"
                  className="block w-1/2 px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-green-500 focus:border-green-500 sm:text-sm"
                  required
                />
                <input
                  type="text"
                  name="city"
                  value={area.city}
                  onChange={(e) => handleServiceAreaChange(index, e)}
                  placeholder="City"
                  className="block w-1/2 px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-green-500 focus:border-green-500 sm:text-sm"
                  required
                />
              </div>
            ))}
            <button
              type="button"
              onClick={addServiceArea}
              className="mt-2 text-green-600 hover:underline text-sm"
            >
              + Add Another Service Area
            </button>
          </div>

          {error && <p className="text-red-500 text-sm">{error}</p>}

          <button
            type="submit"
            className="w-full bg-green-600 text-white px-4 py-2 rounded-md hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2"
          >
            Sign Up
          </button>
        </form>
      </main>

      {/* Footer */}
      <footer className="bg-green-600 text-white py-4 w-full text-center mt-auto">
        <p>&copy; {new Date().getFullYear()} Kabadi Cart. All rights reserved.</p>
      </footer>
    </div>
  );
};

export default CollectorSignup;
