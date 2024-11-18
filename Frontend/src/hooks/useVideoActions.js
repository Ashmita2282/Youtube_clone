import { useState } from "react";
import { useSelector } from "react-redux";
import { likeVideo, dislikeVideo, addComment } from "../Api/videoApi";

const useVideoActions = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // Get user and token from Redux store
  const { user, token } = useSelector((state) => state.auth);
  // console.log("user videoAction", user?._id, "token videoAction", token);

  const handleLike = async (videoId) => {
    if (!token || !user?._id) {
      alert("You need to log in to like a video.");
      return;
    }

    setLoading(true);
    try {
      const response = await likeVideo(videoId, user?._id, token); // Use user.id as userId
      alert(response.message || "Video liked successfully.");
    } catch (err) {
      setError(
        err.response?.data?.message ||
          err.message ||
          "Failed to like the video."
      );
    } finally {
      setLoading(false);
    }
  };

  const handleDislike = async (videoId) => {
    if (!token || !user?._id) {
      alert("You need to log in to dislike a video.");
      return;
    }

    setLoading(true);
    try {
      const response = await dislikeVideo(videoId, user._id, token); // Use user.id as userId
      alert(response.message || "Video disliked successfully.");
    } catch (err) {
      setError(err.response?.data?.message || "Failed to dislike the video.");
    } finally {
      setLoading(false);
    }
  };

  const handleAddComment = async (videoId, commentText) => {
    // Assuming user._id contains the userId
    const userId = user?._id; // Ensure this exists and is valid
    console.log("User Id", userId);
    if (!token || !userId) {
      alert("You need to log in to add a comment.");
      return;
    }
    console.log("token Id", userId);

    setLoading(true);
    try {
      // Pass videoId, commentText, token, and userId to the addComment function
      const response = await addComment(videoId, commentText, token, userId);
      alert(response.message || "Comment added successfully.");
    } catch (err) {
      alert(err.response?.data?.message || "Failed to add the comment.");
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
