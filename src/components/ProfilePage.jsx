import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";

const ProfilePage = () => {
  const [user, setUser] = useState({});
  const [pickupRequests, setPickupRequests] = useState([]); // Ensure this is an array by default
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [isCompleting, setIsCompleting] = useState(false);
  const [isCancelling, setIsCancelling] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchUserProfile = async () => {
      const token = localStorage.getItem("authToken");
      if (!token) {
        console.error("No auth token found in localStorage");
        setError("You are not logged in. Please log in first.");
        setLoading(false);
        return;
      }

      try {
        const response = await axios.get("http://localhost:4000/user/profile", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        setUser(response.data);
      } catch (err) {
        console.error("Error fetching user profile:", err);
        setError("Failed to fetch user profile. Please try again later.");
      }

      try {
        const pickupResponse = await axios.get(
          "http://localhost:4000/pickup-requests",
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        // Ensure pickupRequests is an array
        console.log(pickupResponse.data.data);
        if (Array.isArray(pickupResponse.data.data)) {
          setPickupRequests(pickupResponse.data.data);
        } else {
          setPickupRequests([]); // In case the response is not an array
        }
      } catch (err) {
        console.error("Error fetching pickup requests:", err);
        setError("Failed to fetch pickup requests. Please try again later.");
      } finally {
        setLoading(false);
      }
    };

    fetchUserProfile();
  }, []);

  const handleCompleteRequest = async (requestId) => {
    console.log("handle complete"+requestId);
    setIsCompleting(true);
    try {
      const token = localStorage.getItem("authToken");
      console.log("handel complete" + token)
      if (!token) {
        console.error("No auth token found in localStorage");
        return;
      }

      await axios.patch(
        `http://localhost:4000/pickup-requests/${requestId}/complete`,
        {},
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      setPickupRequests((prevRequests) =>
        prevRequests.map((request) =>
          request._id === requestId ? { ...request, status: "completed" } : request
        )
      );

      alert("Pickup request marked as completed.");
      navigate(0);
    } catch (err) {
      console.error("Error completing pickup request:", err);
      alert("Failed to mark the request as completed.");
    } finally {
      setIsCompleting(false);
    }
  };

  const handleCancelRequest = async (requestId) => {
    setIsCancelling(true);
    try {
      const token = localStorage.getItem("authToken");
      if (!token) {
        console.error("No auth token found in localStorage");
        return;
      }

      await axios.patch(`http://localhost:4000/pickup-requests/${requestId}`,{}, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      setPickupRequests((prevRequests) =>
        prevRequests.filter((request) => request._id !== requestId)
      );

      alert("Pickup request has been canceled.");
      navigate(0);
    } catch (err) {
      console.error("Error canceling pickup request:", err);
      alert("Failed to cancel the request.");
    } finally {
      setIsCancelling(false);
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <p className="text-gray-600 text-lg">Loading your profile...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex justify-center items-center min-h-screen text-center">
        <p className="text-red-600 text-xl">{error}</p>
        <Link to="/login" className="text-green-600 text-lg underline ml-2">
          Log in
        </Link>
      </div>
    );
  }

  return (
    <div className="bg-gray-50 min-h-screen flex flex-col">
      <header className="w-full bg-green-600 text-white p-4 shadow-lg">
        <div className="container mx-auto flex justify-between items-center">
          <h1 className="text-3xl font-bold">Kabadi Cart</h1>
          <nav className="space-x-4">
            <Link to="/home" className="hover:text-green-300">
              Dashboard
            </Link>
            <Link to="/pricing" className="hover:text-green-300">
              Pricing
            </Link>
            <Link to="/about" className="hover:text-green-300">
              About
            </Link>
            <Link to="/profile" className="hover:text-green-300">
              Profile
            </Link>
            <Link
              to="/logout"
              className="bg-white text-green-600 px-4 py-2 rounded-lg shadow hover:bg-green-100"
            >
              Logout
            </Link>
          </nav>
        </div>
      </header>

      <section id="profile" className="py-12 w-full bg-white">
        <div className="container mx-auto max-w-4xl px-4">
          <h2 className="text-4xl font-semibold text-center text-green-600 mb-8">
            Your Profile
          </h2>
          <div className="bg-white p-8 rounded-lg shadow-xl space-y-6">
            <h3 className="text-2xl font-semibold text-green-700">Personal Information</h3>
            <p className="text-lg">
              <strong className="font-semibold">Full Name:</strong> {user.name}
            </p>
            <p className="text-lg">
              <strong className="font-semibold">Email:</strong> {user.email}
            </p>
            <p className="text-lg">
              <strong>Joined On:</strong> {user.createdAt ? new Date(user.createdAt).toLocaleDateString() : 'N/A'}
            </p>
            <button
              className="mt-6 bg-green-600 text-white px-6 py-2 rounded-lg hover:bg-green-700 transition-all focus:outline-none"
              onClick={() => alert('Edit Profile functionality coming soon!')}
            >
              Edit Profile
            </button>
          </div>

          <div className="mt-12">
            <h3 className="text-2xl font-semibold text-green-700">Your Pickup Requests</h3>
            {pickupRequests.length === 0 ? (
              <p className="text-lg text-gray-600">You have no pickup requests.</p>
            ) : (
              <ul className="space-y-4 mt-4">
                {pickupRequests.map((request) => (
                  <li key={request._id} className="bg-gray-100 p-4 rounded-lg shadow">
                    {request.scrapImage && (
                      <div className="mb-4">
                        <img
                          src={request.scrapImage}
                          alt="Pickup Item"
                          className="w-full h-64 object-cover rounded-md"
                        />
                      </div>
                    )}
                    <p className="text-lg">
                      <strong>Name:</strong> {request.name}
                    </p>
                    <p className="text-lg">
                      <strong>Address:</strong> {request.address}
                    </p>
                    <p className="text-lg">
                      <strong>Items:</strong> {request.category.join(", ")}
                    </p>
                    <p className="text-lg">
                      <strong>PickUp On:</strong> {new Date(request.pickupDate).toLocaleDateString()}
                    </p>
                    <p className="text-lg">
                      <strong>Collector Name:</strong> {request.collectorName}
                    </p>

                    <div className="mt-4 space-x-4">
                      <button
                        className={`bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition-all focus:outline-none ${isCompleting ? 'opacity-50 cursor-not-allowed' : ''}`}
                        onClick={() => handleCompleteRequest(request._id)}
                        disabled={isCompleting}
                      >
                        {isCompleting ? <span className="spinner">Completing...</span> : 'Complete'}
                      </button>
                      <button
                        className={`bg-red-600 text-white px-4 py-2 rounded-lg hover:bg-red-700 transition-all focus:outline-none ${isCancelling ? 'opacity-50 cursor-not-allowed' : ''}`}
                        onClick={() => handleCancelRequest(request._id)}
                        disabled={isCancelling}
                      >
                        {isCancelling ? <span className="spinner">Cancelling...</span> : 'Cancel'}
                      </button>
                    </div>
                  </li>
                ))}
              </ul>
            )}
          </div>
        </div>
      </section>

      <footer className="bg-green-600 text-white p-4 mt-12">
        <div className="container mx-auto text-center">
          <p>&copy; 2024 Kabadi Cart. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
};

export default ProfilePage;
