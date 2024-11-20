import axios from "axios";

const API_BASE_URL = "http://localhost:4000/api";

export const likeVideo = async (videoId, userId, token, channelId) => {
  const response = await axios.post(
    `${API_BASE_URL}/video/${videoId}/like`,
    { userId, channelId }, // Send both userId and channelId in the body
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );
  return response.data;
};

export const dislikeVideo = async (videoId, userId, token, channelId) => {
  const response = await axios.post(
    `${API_BASE_URL}/video/${videoId}/dislike`,
    { userId, channelId }, // Send both userId and channelId in the body
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );
  return response.data;
};

export const addComment = async (videoId, commentText, token, userId, channelId) => {
  try {
    if (!videoId || typeof videoId !== "string") {
      throw new Error("Invalid video ID.");
    }

    if (!commentText || !commentText.trim()) {
      throw new Error("Comment text cannot be empty.");
    }

    // Ensure that userId and channelId are passed as well
    if (!userId || !channelId) {
      throw new Error("User ID and Channel ID are required.");
    }

    const response = await axios.post(
      `${API_BASE_URL}/video/${videoId}/comments`,
      { userId, text: commentText.trim(), channelId }, // Include channelId in the request
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    return response.data;
  } catch (error) {
    console.error("Error adding comment:", error.response?.data || error.message);
    throw error; // Propagate the error to the caller
  }
};
