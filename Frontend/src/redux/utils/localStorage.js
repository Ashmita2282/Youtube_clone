import { jwtDecode } from "jwt-decode";

export const setToken = (token) => {
  localStorage.setItem("authToken", token);
};

export const getToken = () => {
  const token = localStorage.getItem("authToken");
  if (!token || isTokenExpired(token)) {
    removeToken(); // Remove expired token
    return null;
  }
  return token;
};

export const removeToken = () => {
  localStorage.removeItem("authToken");
};

export const isTokenExpired = (token) => {
  try {
    const { exp } = jwtDecode(token); // Decode the token to extract expiration
    return Date.now() >= exp * 1000; // Compare current time with expiry
  } catch (error) {
    return true; // If decoding fails, treat as expired
  }
};
