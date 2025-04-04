import React, { useState } from 'react';
import { Link } from 'react-router-dom';

const PricingPage = () => {
  const [weight, setWeight] = useState('');
  const [type, setType] = useState('metal');
  const [price, setPrice] = useState(null);
  const [priceHistory, setPriceHistory] = useState([]);

  // Pricing rates
  const rates = {
    metal: 10,
    plastic: 5,
    glass: 3,
    paper: 6,
    battery: 15,
    cardboard: 4,
    cartoon: 8,
    car: 10,
    washing_machine: 50,
  };

  // Scrap images
  const scrapImages = {
    metal: 'https://images.unsplash.com/photo-1536842409491-b3bbde0e3b66?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
    plastic: 'https://images.unsplash.com/photo-1530587191325-3db32d826c18?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NHx8cGxhc3RpYyUyMHNjcmFifGVufDB8fDB8fHww',
    glass: 'https://images.unsplash.com/photo-1520164126806-d75ade72e6e3?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTB8fGdsYXNzJTIwc2NyYWJ8ZW58MHx8MHx8fDA%3D',
    paper: 'https://images.unsplash.com/photo-1532153354457-5fbe1a3bb0b4?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
    battery: 'https://images.unsplash.com/photo-1608224873587-81ee37394b4e?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NHx8YmF0dGVyeSUyMHNjcmFifGVufDB8fDB8fHww',
    cardboard: 'https://images.unsplash.com/photo-1513672494107-cd9d848a383e?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8OHx8Y2FyZGJvYXJkJTIwc2NyYWJ8ZW58MHx8MHx8fDA%3D',
    cartoon: 'https://via.placeholder.com/150?text=Cartoon',
    car: 'https://plus.unsplash.com/premium_photo-1715300001979-1841b9deb61d?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MXx8Y2FyJTIwc2NyYWJ8ZW58MHx8MHx8fDA%3D',
    washing_machine: 'https://plus.unsplash.com/premium_photo-1664303474269-a186b1eb1ce3?q=80&w=1936&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
  };

  const handleCalculate = () => {
    const calculatedPrice = weight * (rates[type] || 0);
    setPrice(calculatedPrice);

    // Add to price history
    setPriceHistory([
      ...priceHistory,
      { type, weight, price: calculatedPrice },
    ]);
  };

  return (
    <div className="bg-gray-100 min-h-screen">
      {/* Navbar */}
      <header className="w-full bg-green-600 text-white p-6 shadow-md">
        <div className="container mx-auto flex justify-between items-center">
          <h1 className="text-3xl font-bold">Kabadi Cart</h1>
          <nav className="space-x-6">
            <Link to="/home" className="text-white hover:text-green-200">Dashboard</Link>
            <Link to="/pricing" className="text-white hover:text-green-200">Pricing</Link>
            <Link to="/about" className="text-white hover:text-green-200">About</Link>
            <Link to="/profile" className="text-white hover:text-green-200">Profile</Link>
            <button onClick={() => {
            localStorage.removeItem("token");
            window.location.href = "/login";
          }} className="bg-white text-green-600 px-4 py-2 rounded hover:bg-green-100">Logout</button>
          </nav>
        </div>
      </header>

      {/* Main Content */}
      <main className="pt-20 px-6 flex flex-col items-center">
        <div className="flex flex-col items-center justify-center p-8 bg-white rounded-lg shadow-xl w-full max-w-2xl border border-gray-300">
          <h2 className="text-3xl font-semibold mb-6 text-center text-green-600">Calculate Your Scrap Price</h2>
          <form className="space-y-6 w-full">
            <div>
              <label htmlFor="type" className="block text-lg font-medium text-gray-700 mb-2">
                Scrap Type
              </label>
              <select
                id="type"
                name="type"
                value={type}
                onChange={(e) => setType(e.target.value)}
                className="mt-1 block w-full px-4 py-3 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-green-500 sm:text-lg"
              >
                {Object.keys(rates).map((scrapType) => (
                  <option key={scrapType} value={scrapType}>
                    {scrapType.replace('_', ' ').toUpperCase()}
                  </option>
                ))}
              </select>
            </div>
            <div>
              <label htmlFor="weight" className="block text-lg font-medium text-gray-700 mb-2">
                Weight (kg)
              </label>
              <input
                type="number"
                id="weight"
                name="weight"
                value={weight}
                onChange={(e) => setWeight(e.target.value)}
                className="mt-1 block w-full px-4 py-3 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-green-500 sm:text-lg"
              />
            </div>
            <div>
              <button
                type="button"
                onClick={handleCalculate}
                className="w-full bg-green-600 text-white px-6 py-3 rounded-md hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2 sm:text-lg"
              >
                Calculate Price
              </button>
            </div>
          </form>

          {price !== null && (
            <div className="mt-8 p-6 bg-green-50 border border-green-200 rounded-md shadow-md">
              <h3 className="text-xl font-semibold text-green-600">Calculated Price</h3>
              <p className="text-2xl font-bold text-green-800">₹{price.toFixed(2)}</p>
            </div>
          )}
        </div>

        {/* Scrap Prices with Pictures */}
        <div className="mt-10 w-full">
          <h3 className="text-lg font-bold mb-4 text-center">Scrap Prices</h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {Object.keys(rates).map((scrapType) => (
              <div
                key={scrapType}
                className="border border-gray-300 rounded-lg p-4 flex flex-col items-center bg-white shadow-md"
              >
                <div className="w-40 h-40 mb-4">
                  <img
                    src={scrapImages[scrapType]}
                    alt={`${scrapType} scrap`}
                    className="w-full h-full object-cover rounded-md"
                  />
                </div>
                <h4 className="text-lg font-bold capitalize">{scrapType.replace('_', ' ')}</h4>
                <p className="text-xl font-semibold text-green-600">₹{rates[scrapType]}/kg</p>
              </div>
            ))}
          </div>
        </div>
      </main>
    </div>
  );
};

export default PricingPage;
