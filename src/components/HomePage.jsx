import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Line, Pie, Bar } from "react-chartjs-2";
import { Chart as ChartJS, Title, Tooltip, Legend, ArcElement, CategoryScale, LinearScale, BarElement, PointElement, LineElement } from "chart.js";

// Register Chart.js components
ChartJS.register(
  Title,
  Tooltip,
  Legend,
  ArcElement,
  CategoryScale,
  LinearScale,
  BarElement,
  PointElement,
  LineElement
);

const HomePage = () => {
  const [lineChartData, setLineChartData] = useState({
    labels: [],
    datasets: [
      {
        label: "Recycled Waste (kg)",
        data: [],
        borderColor: "rgba(75, 192, 192, 1)",
        backgroundColor: "rgba(75, 192, 192, 0.2)",
        fill: true,
      },
    ],
  });

  const [pieChartData, setPieChartData] = useState({
    labels: [],
    datasets: [
      {
        label: "Waste Types",
        data: [],
        backgroundColor: ["#34D399", "#FBBF24", "#60A5FA", "#F472B6"],
        borderColor: ["#2D7A4C", "#F59E0B", "#3B82F6", "#E11D48"],
        borderWidth: 1,
      },
    ],
  });

  const [barChartData, setBarChartData] = useState({
    labels: [],
    datasets: [
      {
        label: "Economic Impact (in billion USD)",
        data: [],
        backgroundColor: "rgba(53, 162, 235, 0.2)",
        borderColor: "rgba(53, 162, 235, 1)",
        borderWidth: 1,
      },
    ],
  });

  useEffect(() => {
    // Mock data for Line chart: Recycling Waste over time
    const lineData = [
      { date: "2024-01-01", recycledKg: 500 },
      { date: "2024-02-01", recycledKg: 600 },
      { date: "2024-03-01", recycledKg: 750 },
      { date: "2024-04-01", recycledKg: 900 },
    ];

    const lineLabels = lineData.map((item) => item.date);
    const lineRecycledData = lineData.map((item) => item.recycledKg);

    setLineChartData({
      labels: lineLabels,
      datasets: [
        {
          ...lineChartData.datasets[0],
          data: lineRecycledData,
        },
      ],
    });

    // Mock data for Pie chart: Waste Type Percentage
    const pieData = [
      { type: "Plastic", percentage: 40 },
      { type: "Paper", percentage: 30 },
      { type: "Glass", percentage: 20 },
      { type: "Metal", percentage: 10 },
    ];

    const pieLabels = pieData.map((item) => item.type);
    const piePercentages = pieData.map((item) => item.percentage);

    setPieChartData({
      labels: pieLabels,
      datasets: [
        {
          ...pieChartData.datasets[0],
          data: piePercentages,
        },
      ],
    });

    // Mock data for Bar chart: Economic Impact of Recycling
    const barData = [
      { year: "2024", impact: 5 },
      { year: "2025", impact: 6 },
      { year: "2026", impact: 7 },
      { year: "2027", impact: 9 },
    ];

    const barLabels = barData.map((item) => item.year);
    const barEconomicImpact = barData.map((item) => item.impact);

    setBarChartData({
      labels: barLabels,
      datasets: [
        {
          ...barChartData.datasets[0],
          data: barEconomicImpact,
        },
      ],
    });
  }, []);

  return (
    <div className="bg-gray-100 min-h-screen flex flex-col">
      {/* Header */}
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

      {/* Welcome Section - Dashboard */}
      <main className="text-center py-16 px-4 bg-green-100">
        <h2 className="text-4xl font-bold text-green-600 mb-6">Welcome to Your Dashboard</h2>
        <p className="text-lg text-gray-700 mb-8">
          Manage your recycling activities, track your progress, and contribute to a cleaner environment. Every little bit helps!
        </p>
        <Link 
          to="/pickuprequest"
          className="bg-green-600 text-white px-8 py-4 rounded-lg text-lg hover:bg-green-700 transition-all"
        >
          Request a PickUp
        </Link>
      </main>

      {/* Recycling Tips Section */}
      <section className="py-12 bg-white">
        <div className="container mx-auto px-4">
          <h3 className="text-3xl font-bold text-gray-800 text-center mb-8">Recycling Tips</h3>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            <div className="bg-green-50 p-6 rounded-lg shadow-md">
              <h4 className="text-xl font-semibold text-gray-800 mb-3">Recycle Aluminum Cans</h4>
              <p className="text-gray-700">Recycling aluminum cans saves up to 95% of the energy needed to make new ones!</p>
            </div>
            <div className="bg-green-50 p-6 rounded-lg shadow-md">
              <h4 className="text-xl font-semibold text-gray-800 mb-3">Don't Throw Away Old Electronics</h4>
              <p className="text-gray-700">Electronic waste contains valuable materials like gold, silver, and copper. Recycle your old gadgets!</p>
            </div>
            <div className="bg-green-50 p-6 rounded-lg shadow-md">
              <h4 className="text-xl font-semibold text-gray-800 mb-3">Reduce Plastic Waste</h4>
              <p className="text-gray-700">Use reusable bags and bottles to reduce the amount of plastic waste that ends up in landfills.</p>
            </div>
            <div className="bg-green-50 p-6 rounded-lg shadow-md">
              <h4 className="text-xl font-semibold text-gray-800 mb-3">Compost Food Waste</h4>
              <p className="text-gray-700">Composting food scraps helps reduce waste and creates valuable soil for gardening.</p>
            </div>
            <div className="bg-green-50 p-6 rounded-lg shadow-md">
              <h4 className="text-xl font-semibold text-gray-800 mb-3">Paper Recycling</h4>
              <p className="text-gray-700">Recycling paper reduces the need for deforestation and helps save energy and water.</p>
            </div>
            <div className="bg-green-50 p-6 rounded-lg shadow-md">
              <h4 className="text-xl font-semibold text-gray-800 mb-3">Donate Used Clothes</h4>
              <p className="text-gray-700">Instead of throwing away old clothes, donate them to charity or recycle them into new items.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Charts Section */}
      <section className="bg-white p-8 mt-8 rounded-lg w-full mx-auto max-w-6xl">
        <h3 className="text-3xl font-bold text-gray-800 text-center mb-8">Recycling Data Overview</h3>

        {/* Line Chart for Recycling Over Time */}
        <div className="mb-8 w-full max-w-lg mx-auto">
          <h4 className="text-xl font-semibold text-gray-800 text-center mb-4">Recycling Over Time (kg)</h4>
          <Line data={lineChartData} options={{
            responsive: true,
            plugins: {
              title: {
                display: true,
                text: "Increase in Recycling Waste Over Time",
                font: { size: 14 },
              },
              tooltip: { mode: "index" },
            },
            scales: { y: { beginAtZero: true } },
          }} />
        </div>

        {/* Pie Chart for Waste Types */}
        <div className="mb-8 w-full max-w-lg mx-auto">
          <h4 className="text-xl font-semibold text-gray-800 text-center mb-4">Waste Type Distribution</h4>
          <Pie data={pieChartData} options={{
            responsive: true,
            plugins: {
              title: {
                display: true,
                text: "Waste Types Contribution to Recycling",
                font: { size: 14 },
              },
            },
          }} />
        </div>

        {/* Bar Chart for Economic Impact */}
        <div className="mb-8 w-full max-w-lg mx-auto">
          <h4 className="text-xl font-semibold text-gray-800 text-center mb-4">Economic Impact of Recycling (Billion USD)</h4>
          <Bar data={barChartData} options={{
            responsive: true,
            plugins: {
              title: {
                display: true,
                text: "Economic Benefits of Recycling Over Time",
                font: { size: 14 },
              },
            },
            scales: { y: { beginAtZero: true } },
          }} />
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-green-600 text-white p-6 text-center mt-auto">
        <p>&copy; 2024 Kabadi Cart. All Rights Reserved.</p>
      </footer>
    </div>
  );
};

export default HomePage;
