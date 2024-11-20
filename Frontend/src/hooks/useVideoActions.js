import { useState } from "react";
import { useSelector } from "react-redux";
import { likeVideo, dislikeVideo, addComment } from "../Api/videoApi";

const useVideoActions = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // Get user and token from Redux store
  const { user, token } = useSelector((state) => state.auth);
  const channelId = user?.data?.channel?._id; // Get channelId here

  // Fetch comments for a given video
  const fetchComments = async (videoId) => {
    setLoading(true);
    setError(null);

    try {
      const response = await axios.get(`/api/comments/${videoId}`);
      setLoading(false);
      return response.data; // Return the fetched comments
    } catch (err) {
      setLoading(false);
      setError("Failed to load comments. Please try again later.");
      throw err;
    }
  };

  const handleLike = async (videoId) => {
    const userId = user?.data?._id; // Validate userId

    if (!token || !userId || !channelId) {
      alert("You need to log in to like a video.");
      return;
    }

    setLoading(true);
    try {
      const response = await likeVideo(videoId, userId, token, channelId); // Pass channelId here
      alert(response.message || "Video liked successfully.");
    } catch (err) {
      setError(err.response?.data?.message || "Failed to like the video.");
    } finally {
      setLoading(false);
    }
  };

  const handleDislike = async (videoId) => {
    const userId = user?.data?._id;

    if (!token || !userId || !channelId) {
      alert("You need to log in to dislike a video.");
      return;
    }

    setLoading(true);
    try {
      const response = await dislikeVideo(videoId, userId, token, channelId); // Pass channelId here
      alert(response.message || "Video disliked successfully.");
    } catch (err) {
      setError(err.response?.data?.message || "Failed to dislike the video.");
    } finally {
      setLoading(false);
    }
  };

  const handleAddComment = async (videoId, commentText) => {
    const userId = user?.data?._id;

    if (!token || !userId || !channelId) {
      alert("You need to log in to add a comment.");
      return;
    }

    if (!commentText.trim()) {
      alert("Comment text cannot be empty.");
      return;
    }

    setLoading(true);
    try {
      const response = await addComment(
        videoId,
        commentText,
        token,
        userId,
        channelId
      ); // Pass userId and channelId
      alert(response.message || "Comment added successfully.");
    } catch (err) {
      setError(err.response?.data?.message || "Failed to add the comment.");
    } finally {
      setLoading(false);
    }
  };

  return { handleLike, handleDislike, handleAddComment, loading, error };
};

export default useVideoActions;

// src/hooks/useVideoActions.js
// import { useDispatch, useSelector } from "react-redux";
// import { likeVideo, dislikeVideo } from "../Api/videoApi";
// import { getToken } from "../redux/utils/localStorage";

// import { useState } from 'react';

// const useVideoActions = () => {
//   const [loading, setLoading] = useState(false);
//   const [error, setError] = useState(null);

//   // Get the token from localStorage
//   const token = getToken();

//   const handleLike = async (videoId) => {
//     if (!token) {
//       alert("You need to log in to like a video.");
//       return;
//     }

//     setLoading(true);
//     try {
//       const response = await likeVideo(videoId, token);  // Call API with videoId and token
//       alert(response.data.message || "Video liked successfully.");
//     } catch (error) {
//       setError(error.response?.data?.message || "Failed to like the video.");
//     } finally {
//       setLoading(false);
//     }
//   };

//   const handleDislike = async (videoId) => {
//     if (!token) {
//       alert("You need to log in to dislike a video.");
//       return;
//     }

//     setLoading(true);
//     try {
//       const response = await dislikeVideo(videoId, token);  // Call API with videoId and token
//       alert(response.data.message || "Video disliked successfully.");
//     } catch (error) {
//       setError(error.response?.data?.message || "Failed to dislike the video.");
//     } finally {
//       setLoading(false);
//     }
//   };

//   return { handleLike, handleDislike, loading, error };
// };

// export default useVideoActions;
