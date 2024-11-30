import React, { useState, useEffect } from "react";
import { io } from "socket.io-client";
import axios from "axios";

const CollectorDashboard = () => {
  const [notifications, setNotifications] = useState([]); // New requests
  const [acceptedRequests, setAcceptedRequests] = useState([]); // Accepted requests

  // Fetch accepted requests on load
  useEffect(() => {
    const socket = io("http://localhost:4000", {
      transports: ["websocket"], // Only use WebSocket
    });

    socket.on("connect", () => {
      console.log("Socket connected:", socket.id);
    });

    // Socket.io: Listen for new pickup requests
    socket.on("new-pickup-request", (newRequest) => {
      setNotifications((prev) => [...prev, newRequest]);
    });

    const fetchAcceptedRequests = async () => {
      try {
        const response = await axios.get("http://localhost:4000/collector/accepted-requests", {
          headers: { Authorization: `Bearer ${localStorage.getItem("Collector_Token")}` },
        });
        setAcceptedRequests(response.data.data);
      } catch (error) {
        console.error("Error fetching accepted requests:", error);
      }
    };

    fetchAcceptedRequests();

    return () => {
      socket.disconnect();
    };
  }, []);

  // Handle Accept Request
  const handleAccept = async (requestId) => {
    try {
      const tokened = localStorage.getItem("Collector_Token");

      const response = await axios.patch(
        `http://localhost:4000/pickup-requests/${requestId}/accept`, 
        {},
        { 
          headers: { 
            Authorization: `Bearer ${tokened}`, 
          },
        }
      );

      const updatedRequest = response.data.data;

      // Move the request from notifications to accepted requests
      setNotifications((prev) =>
        prev.filter((request) => request._id !== requestId)
      );
      setAcceptedRequests((prev) => [...prev, updatedRequest]);
    } catch (error) {
      console.error("Error accepting request:", error);
      alert("Failed to accept the request. Please try again.");
    }
  };

  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      {/* Header */}
      <header className="bg-white shadow-md p-4 flex justify-between items-center rounded-md">
        <h1 className="text-2xl font-semibold text-gray-800">Collector Dashboard</h1>
        <button
          className="bg-red-500 text-white px-4 py-2 rounded-md hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-red-500"
          onClick={() => {
            localStorage.removeItem("Collector_Token");
            window.location.href = "/collector/login";
          }}
        >
          Logout
        </button>
      </header>

      <div className="mt-6 space-y-6">
        {/* Notifications Section */}
        <section className="bg-white p-6 shadow-lg rounded-md">
          <h2 className="text-xl font-semibold text-gray-700 mb-4">New Pickup Requests</h2>
          {notifications.length === 0 ? (
            <p className="text-gray-500">No new requests at the moment.</p>
          ) : (
            <ul className="space-y-4">
              {notifications.map((request) => (
                <li
                  key={request._id}
                  className="flex justify-between items-center p-4 bg-gray-50 border border-gray-200 rounded-lg shadow-sm hover:bg-gray-100"
                >
                  {/* Scrap Image Section */}
                  {request.scrapImage && (
                    <div className="flex justify-center w-1/4">
                      <img 
                        src={request.scrapImage} 
                        alt="Scrap" 
                        className="w-full h-32 object-cover rounded-md shadow-lg"
                      />
                    </div>
                  )}

                  <div className="flex flex-col space-y-2 w-3/4">
                    <p><strong className="text-gray-800">Name:</strong> {request.name}</p>
                    <p><strong className="text-gray-800">Address:</strong> {request.address}</p>
                    <p><strong className="text-gray-800">Category:</strong> {request.category.join(", ")}</p>
                    <p><strong className="text-gray-800">Pickup Date:</strong> {new Date(request.pickupDate).toLocaleDateString()}</p>
                    <p><strong className="text-gray-800">Pickup Time:</strong> {request.pickupTime}</p>
                  </div>

                  <button
                    className="bg-green-500 text-white px-4 py-2 rounded-md hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-green-500"
                    onClick={() => handleAccept(request._id)}
                  >
                    Accept
                  </button>
                </li>
              ))}
            </ul>
          )}
        </section>

        {/* Accepted Requests Section */}
        <section className="bg-white p-6 shadow-lg rounded-md">
          <h2 className="text-xl font-semibold text-gray-700 mb-4">Accepted Requests</h2>
          {acceptedRequests.length === 0 ? (
            <p className="text-gray-500">No accepted requests yet.</p>
          ) : (
            <ul className="space-y-4">
              {acceptedRequests.map((request) => (
                <li
                  key={request._id}
                  className="flex flex-col space-y-4 p-4 bg-gray-50 border border-gray-200 rounded-lg shadow-sm hover:bg-gray-100"
                >
                  {/* Scrap Image Section */}
                  {request.scrapImage && (
                    <div className="flex justify-center">
                      <img 
                        src={request.scrapImage} 
                        alt="Scrap" 
                        className="w-full max-w-md h-72 object-cover rounded-md shadow-lg"
                      />
                    </div>
                  )}
                  
                  {/* Request Details Section */}
                  <div className="space-y-2 text-gray-700">
                    <p><strong className="text-gray-800">Name:</strong> {request.name}</p>
                    <p><strong className="text-gray-800">Address:</strong> {request.address}</p>
                    <p><strong className="text-gray-800">Phone:</strong> {request.phone}</p>
                    <p><strong className="text-gray-800">Pincode:</strong> {request.pincode}</p>
                    <p><strong className="text-gray-800">Category:</strong> {request.category.join(", ")}</p>
                    <p><strong className="text-gray-800">Pickup Date:</strong> {new Date(request.pickupDate).toLocaleDateString()}</p>
                    <p><strong className="text-gray-800">Pickup Time:</strong> {request.pickupTime}</p>
                  </div>

                  {/* Mark as Completed Button */}
                  <button
                    className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    onClick={() => alert("Feature to mark as completed coming soon!")}
                  >
                    Mark as Completed
                  </button>
                </li>
              ))}
            </ul>
          )}
        </section>
      </div>
    </div>
  );
};

export default CollectorDashboard;
