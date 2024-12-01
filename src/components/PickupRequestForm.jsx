import React, { useState } from 'react';
import { Link } from 'react-router-dom';

const PickupRequestForm = () => {
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    email: '',
    option: 'sell',
    pickupDate: '',
    pickupTime: '',
    category: [],
    scrapImage: null,
    address: '',
    pincode: '',
  });

  const [imagePreview, setImagePreview] = useState(null);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleCategoryChange = (e) => {
    const { value, checked } = e.target;
    setFormData((prevData) => {
      if (checked) {
        return {
          ...prevData,
          category: [...prevData.category, value],
        };
      } else {
        return {
          ...prevData,
          category: prevData.category.filter((category) => category !== value),
        };
      }
    });
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    setFormData((prevData) => ({
      ...prevData,
      scrapImage: file,
    }));

    const reader = new FileReader();
    reader.onloadend = () => {
      setImagePreview(reader.result);
    };
    if (file) {
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formDataObj = new FormData();
    Object.entries(formData).forEach(([key, value]) => {
      if (key === 'category') {
        formDataObj.append(key, JSON.stringify(value)); // Serialize array
      } else {
        formDataObj.append(key, value);
      }
    });

    try {
      const response = await fetch('http://localhost:4000/pickup-requests', {
        method: 'POST',
        body: formDataObj,
      });

      const data = await response.json();
      if (data.success) {
        alert(data.message);
        setFormData({
          name: '',
          phone: '',
          email: '',
          option: 'sell',
          pickupDate: '',
          pickupTime: '',
          category: [],
          scrapImage: null,
          address: '',
          pincode: '',
        });
        setImagePreview(null);
      } else {
        alert(data.message);
      }
    } catch (err) {
      console.error(err);
      alert('An error occurred while submitting the form.');
    }
  };

  return (
    <div className="bg-gray-100 min-h-screen flex flex-col items-center p-6">
      {/* Fixed Navbar */}
      <header className="w-full bg-green-600 text-white p-4 fixed top-0 left-0 z-50">
        <div className="container mx-auto flex justify-between items-center">
          <h1 className="text-3xl font-bold">Pickup Request Form</h1>
          <nav>
            <Link to="/home" className="mr-4">Dashboard</Link>
            <Link to="/pricing" className="mr-4">Pricing</Link>
            <Link to="/about" className="mr-4">About</Link>
            <Link to="/profile" className="mr-4">Profile</Link>
            <button onClick={() => {
            localStorage.removeItem("token");
            window.location.href = "/login";
          }} className="bg-white text-green-600 px-4 py-2 rounded hover:bg-green-100">Logout</button>
          </nav>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex flex-col items-center justify-center mt-16 p-6 bg-white rounded-lg shadow-lg w-full max-w-4xl">
        <h2 className="text-2xl font-bold mb-6">Request a Scrap Pickup</h2>
        <form className="space-y-4 w-full" onSubmit={handleSubmit}>
          {/* Name and Phone in a single line */}
          <div className="flex space-x-4">
            <div className="flex-1">
              <label className="block text-sm font-medium text-gray-700" htmlFor="nameInput">
                Name <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                id="nameInput"
                name="name"
                value={formData.name}
                onChange={handleInputChange}
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-green-500 focus:border-green-500 sm:text-sm"
                required
              />
            </div>
            <div className="flex-1">
              <label className="block text-sm font-medium text-gray-700" htmlFor="phoneInput">
                Phone <span className="text-red-500">*</span>
              </label>
              <input
                type="tel"
                id="phoneInput"
                name="phone"
                value={formData.phone}
                onChange={handleInputChange}
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-green-500 focus:border-green-500 sm:text-sm"
                required
              />
            </div>
          </div>

          {/* Email */}
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Email <span className="text-red-500">*</span>
            </label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleInputChange}
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-green-500 focus:border-green-500 sm:text-sm"
              required
            />
          </div>

          {/* Sell or Donate */}
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Sell or Donate <span className="text-red-500">*</span>
            </label>
            <select
              name="option"
              value={formData.option}
              onChange={handleInputChange}
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-green-500 focus:border-green-500 sm:text-sm"
              required
            >
              <option value="sell">Sell</option>
              <option value="donate">Donate</option>
            </select>
          </div>

          {/* Pickup Date and Time */}
          <div className="flex space-x-4">
            <div className="flex-1">
              <label className="block text-sm font-medium text-gray-700">
                Pickup Date <span className="text-red-500">*</span>
              </label>
              <input
                type="date"
                name="pickupDate"
                value={formData.pickupDate}
                onChange={handleInputChange}
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-green-500 focus:border-green-500 sm:text-sm"
                required
              />
            </div>
            <div className="flex-1">
              <label className="block text-sm font-medium text-gray-700">
                Pickup Time <span className="text-red-500">*</span>
              </label>
              <input
                type="time"
                name="pickupTime"
                value={formData.pickupTime}
                onChange={handleInputChange}
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-green-500 focus:border-green-500 sm:text-sm"
                required
              />
            </div>
          </div>

          {/* Scrap Category (Checkboxes) */}
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Scrap Category <span className="text-red-500">*</span>
            </label>
            <div className="mt-2 flex flex-wrap gap-4">
              <div className="flex items-center">
                <input
                  type="checkbox"
                  id="metal"
                  value="metal"
                  onChange={handleCategoryChange}
                  checked={formData.category.includes('metal')}
                  className="mr-2"
                />
                <label htmlFor="metal">Metal</label>
              </div>
              <div className="flex items-center">
                <input
                  type="checkbox"
                  id="plastic"
                  value="plastic"
                  onChange={handleCategoryChange}
                  checked={formData.category.includes('plastic')}
                  className="mr-2"
                />
                <label htmlFor="plastic">Plastic</label>
              </div>
              <div className="flex items-center">
                <input
                  type="checkbox"
                  id="glass"
                  value="glass"
                  onChange={handleCategoryChange}
                  checked={formData.category.includes('glass')}
                  className="mr-2"
                />
                <label htmlFor="glass">Glass</label>
              </div>
              <div className="flex items-center">
                <input
                  type="checkbox"
                  id="paper"
                  value="paper"
                  onChange={handleCategoryChange}
                  checked={formData.category.includes('paper')}
                  className="mr-2"
                />
                <label htmlFor="paper">Paper</label>
              </div>
              <div className="flex items-center">
                <input
                  type="checkbox"
                  id="cartoon"
                  value="cartoon"
                  onChange={handleCategoryChange}
                  checked={formData.category.includes('cartoon')}
                  className="mr-2"
                />
                <label htmlFor="paper">Cartoon</label>
              </div>
              <div className="flex items-center">
                <input
                  type="checkbox"
                  id="battery"
                  value="battery"
                  onChange={handleCategoryChange}
                  checked={formData.category.includes('battery')}
                  className="mr-2"
                />
                <label htmlFor="battery">Battery</label>
              </div>
              <div className="flex items-center">
                <input
                  type="checkbox"
                  id="cardboard"
                  value="cardboard"
                  onChange={handleCategoryChange}
                  checked={formData.category.includes('cardboard')}
                  className="mr-2"
                />
                <label htmlFor="cardboard">Cardboard</label>
              </div>
              <div className="flex items-center">
                <input
                  type="checkbox"
                  id="car"
                  value="car"
                  onChange={handleCategoryChange}
                  checked={formData.category.includes('car')}
                  className="mr-2"
                />
                <label htmlFor="car">Car</label>
              </div>
              <div className="flex items-center">
                <input
                  type="checkbox"
                  id="washing_machine"
                  value="washing_machine"
                  onChange={handleCategoryChange}
                  checked={formData.category.includes('washing_machine')}
                  className="mr-2"
                />
                <label htmlFor="washing_machine">Washing Machine</label>
              </div>
            </div>
          </div>

          {/* Scrap Image Upload */}
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Scrap Image <span className="text-red-500">*</span>
            </label>
            <input
              type="file"
              name="scrapImage"
              onChange={handleImageChange}
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-green-500 focus:border-green-500 sm:text-sm"
              required
            />
            {imagePreview && (
              <div className="mt-4">
                <img src={imagePreview} alt="Image Preview" className="w-48 h-48 object-cover" />
              </div>
            )}
          </div>

          {/* Address and Pincode */}
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Address <span className="text-red-500">*</span>
            </label>
            <textarea
              name="address"
              value={formData.address}
              onChange={handleInputChange}
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-green-500 focus:border-green-500 sm:text-sm"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">
              Pincode <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              name="pincode"
              value={formData.pincode}
              onChange={handleInputChange}
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-green-500 focus:border-green-500 sm:text-sm"
              required
            />
          </div>

          <button
            type="submit"
            className="w-full bg-green-600 text-white py-2 rounded-md hover:bg-green-700"
          >
            Submit Request
          </button>
        </form>
      </main>
    </div>
  );
};

export default PickupRequestForm;
