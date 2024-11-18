// src/components/Dashboard.jsx
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import { setUser } from "../redux/slices/authSlice";

const Dashboard = () => {
  const dispatch = useDispatch();
  const { token, user } = useSelector((state) => state.auth);

  useEffect(() => {
    const fetchUserData = async () => {
      if (token && !user) {
        try {
          const response = await axios.get("http://localhost:4000/api/me", {
            headers: { Authorization: `Bearer ${token}` },
          });
          dispatch(setUser(response.data.data));
        } catch (error) {
          console.error("Error fetching user data:", error);
        }
      }
    };

    fetchUserData();
  }, [token, user, dispatch]);

  if (!user) {
    return <div>Loading user data...</div>;
  }

  return (
    <div className="dashboard-container">
      <h1>Welcome, {user.name}</h1>
      <img
        src={user.profilePic}
        alt="Profile"
        className="rounded-full w-24 h-24"
      />
      <p>Email: {user.email}</p>
      <p>Location: {user.location}</p>
    </div>
  );
};

export default Dashboard;
