import axios from "axios";

const API_URL = "http://localhost:4000/api";

// Function to handle user login
export const loginUser = async (credentials) => {
  const response = await axios.post(`${API_URL}/login`, {
    identifier: credentials.identifier, // Unified field for email/username
    password: credentials.password,
  });
  // console.log("User login successfully with ", response.data);
  return response.data; // { success, message, data: token }
};

// Function to fetch the logged-in user's data
export const fetchUserData = async (token) => {
  const response = await axios.get(`${API_URL}/me`, {
    headers: { Authorization: `Bearer ${token}` },
  });
  console.log("Fetched User Data: ", response.data); // Debug API response
  return response.data;
};
