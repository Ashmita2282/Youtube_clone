import React from "react";
import Home from "./pages/Home";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { logout } from "./redux/slices/authSlice";
import { getToken } from "./utils/localStorage";

function App() {
  const dispatch = useDispatch();

  useEffect(() => {
    const token = getToken();
    if (token) {
      const { exp } = jwtDecode(token);
      const timeUntilExpiry = exp * 1000 - Date.now();

      const timeout = setTimeout(() => {
        dispatch(logout()); // Log out user when token expires
      }, timeUntilExpiry);

      return () => clearTimeout(timeout); // Clear timer on unmount
    }
  }, [dispatch]);
  return <Home />;
}

export default App;
