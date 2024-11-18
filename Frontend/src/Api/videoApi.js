import axios from "axios";

const API_BASE_URL = "http://localhost:4000/api";

export const likeVideo = async (videoId, userId, token) => {
  const response = await axios.post(
    `${API_BASE_URL}/video/${videoId}/like`,
    { userId }, // Send userId in the body
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );
  return response.data;
};

export const dislikeVideo = async (videoId, userId, token) => {
  const response = await axios.post(
    `${API_BASE_URL}/video/${videoId}/dislike`,
    { userId }, // Send userId in the body
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );
  return response.data;
};

export const addComment = async (videoId, commentText, token, userId) => {
  try {
    if (!videoId || typeof videoId !== "string") {
      throw new Error("Invalid video ID.");
    }

    if (!commentText || !commentText.trim()) {
      throw new Error("Comment text cannot be empty.");
    }

    // Ensure that userId is passed as well
    if (!userId) {
      throw new Error("User ID is required.");
    }

    // Make the API request with Authorization header and userId in the body
    const response = await axios.post(
      `${API_BASE_URL}/video/${videoId}/comments`, // Endpoint to post the comment
      { userId, text: commentText.trim() }, // Pass userId and text in the body
      {
        headers: {
          Authorization: `Bearer ${token}`, // Include the Authorization header with Bearer token
        },
      }
    );
    return response.data;
  } catch (error) {
    console.error(
      "Error adding comment:",
      error.response?.data || error.message
    );
    throw error; // Propagate the error to the caller
  }
};
