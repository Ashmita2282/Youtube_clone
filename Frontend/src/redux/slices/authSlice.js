import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { loginUser, fetchUserData } from "../api/authApi";
import { setToken, getToken, removeToken } from "../utils/localStorage";

// Async thunk for logging in
export const login = createAsyncThunk(
  "auth/login",
  async (credentials, { rejectWithValue }) => {
    try {
      const { data: token } = await loginUser(credentials);
      setToken(token); // Save token to local storage
      return token; // Return token
    } catch (error) {
      console.error("Login thunk error:", error.message);
      return rejectWithValue(error.response?.data || "Login failed");
    }
  }
);

// Async thunk to fetch user data using token
export const getUserData = createAsyncThunk(
  "auth/getUserData",
  async (_, { getState, rejectWithValue }) => {
    const token = getToken(); // Retrieve token from local storage
    if (!token) return rejectWithValue("No token found");
    try {
      const userData = await fetchUserData(token);
      return userData; // Return user data object
    } catch (error) {
      console.error("Get User Data thunk error:", error.message);
      return rejectWithValue(
        error.response?.data || "Failed to fetch user data"
      );
    }
  }
);

const authSlice = createSlice({
  name: "auth",
  initialState: {
    token: getToken() || null, // Initialize with token from local storage if available
    user: JSON.parse(localStorage.getItem("userDetails")) || null,
    loading: false,
    error: null,
  },
  reducers: {
    logout: (state) => {
      state.token = null;
      state.user = null;
      state.error = null;

      removeToken(); // Clear token from local storage
      localStorage.removeItem("userDetails");
    },
  },
  extraReducers: (builder) => {
    builder
      // Handle login actions
      .addCase(login.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(login.fulfilled, (state, action) => {
        state.loading = false;
        state.token = action.payload;
        state.error = null;
      })
      .addCase(login.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // Handle fetching user data actions
      .addCase(getUserData.pending, (state) => {
        state.loading = true;
        state.error = null;
      })

      .addCase(getUserData.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload;
        localStorage.setItem("userDetails", JSON.stringify(action.payload)); // Save user details
        state.error = null;
      })

      .addCase(getUserData.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
    // .addCase(getUserData.fulfilled, (state, action) => {
    //   state.loading = false;
    //   state.user = action.payload; // Set user data
    //   state.error = null;
    // })
    // .addCase(getUserData.fulfilled, (state, action) => {
    //   state.user = action.payload; // Fetch user data after login
    //   localStorage.setItem("userDetails", JSON.stringify(action.payload));
    // })
  },
});

export const { logout } = authSlice.actions;
export default authSlice.reducer;

// / src / redux / slices / authSlice.js;
// import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
// import { loginUser, fetchUserData } from "../api/authApi";
// import { setToken, getToken, removeToken } from "../utils/localStorage";

// // Async thunk for logging in
// export const login = createAsyncThunk(
//   "auth/login",
//   async (credentials, { rejectWithValue }) => {
//     try {
//       const { data: token } = await loginUser({
//         identifier: credentials.identifier, // Unified field
//         password: credentials.password,
//       });
//       setToken(token); // Save token to local storage
//       return token;
//     } catch (error) {
//       return rejectWithValue(error.response?.data || "Login failed");
//     }
//   }
// );

// // Async thunk to fetch user data using token
// export const getUserData = createAsyncThunk(
//   "auth/getUserData",
//   async (_, { getState, rejectWithValue }) => {
//     const token = getToken(); // Retrieve token from local storage
//     if (!token) return rejectWithValue("No token found");
//     try {
//       const response = await fetchUserData(token);

//       return response.data; // User data
//     } catch (error) {
//       return rejectWithValue(
//         error.response?.data || "Failed to fetch user data"
//       );
//     }
//   }
// );

// const authSlice = createSlice({
//   name: "auth",
//   initialState: {
//     token: getToken() || null, // Initialize with token from local storage if available
//     user: null,
//     loading: false,
//     error: null,
//   },
//   reducers: {
//     logout: (state) => {
//       state.token = null;
//       state.user = null;
//       removeToken(); // Remove token from local storage
//     },
//   },
//   extraReducers: (builder) => {
//     builder
//       // Handle login actions
//       .addCase(login.pending, (state) => {
//         state.loading = true;
//       })
//       .addCase(login.fulfilled, (state, action) => {
//         state.loading = false;
//         state.token = action.payload;
//         state.error = null;
//       })
//       .addCase(login.rejected, (state, action) => {
//         state.loading = false;
//         state.error = action.payload;
//       })

//       // Handle fetching user data actions
//       .addCase(getUserData.pending, (state) => {
//         state.loading = true;
//       })
//       .addCase(getUserData.fulfilled, (state, action) => {
//         state.loading = false;
//         state.user = action.payload;
//         state.error = null;
//       })
//       .addCase(getUserData.rejected, (state, action) => {
//         state.loading = false;
//         state.error = action.payload;
//       });
//   },
// });

// export const { logout } = authSlice.actions;
// export default authSlice.reducer;
