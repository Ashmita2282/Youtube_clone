import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom"; // To get the video ID from the URL
import { useFetchVideos } from "../hooks/useFetchVideos"; // Custom hook for fetching video data
import VideoList from "./VideoList"; // Assuming the list of videos is displayed here
import useVideoActions from "../hooks/useVideoActions";

const VideoPlayer = () => {
  const { id } = useParams(); // Get video ID from URL
  const [newComment, setNewComment] = useState("");
  const { handleLike, handleDislike, handleAddComment, loading, error } =
    useVideoActions();
  const [hasFetchedData, setHasFetchedData] = useState(false); // Track if data has been fetched
  const [actionError, setActionError] = useState(""); // Track errors from actions

  // Fetch video data using the custom hook
  const { videos } = useFetchVideos();

  // Select the video based on the ID passed in the URL
  const selectedVideo = videos.find((video) => video._id === id);

  // Function to generate the YouTube embed URL
  const getEmbedUrl = (url) => {
    const videoId = url.split("v=")[1]?.split("&")[0]; // Extract the VIDEO_ID
    return `https://www.youtube.com/embed/${videoId}`;
  };

  // Effect to mark data as fetched when selectedVideo changes
  useEffect(() => {
    if (selectedVideo) {
      setHasFetchedData(true); // Mark as fetched
    }
  }, [selectedVideo]);

  // Error handling for actions like like, dislike, and comment
  const handleError = (error) => {
    setActionError(
      error.message || "An error occurred while processing your request."
    );
  };

  return (
    <div className="flex flex-row justify-between ml-8">
      {/* Left Section - Video Player */}
      <div className="w-2/3 p-5 bg-white">
        {/* Show Loading Indicator */}
        {loading && (
          <div className="loading-indicator">
            <p>Loading video...</p>
          </div>
        )}

        {/* Show Error Message */}
        {error && (
          <div className="error-message">
            <p>Error: {error}</p>
          </div>
        )}

        {/* Display Video Player if Video Data is Available */}
        {!loading && !error && selectedVideo && (
          <div>
            <iframe
              width="560"
              height="315"
              src={getEmbedUrl(selectedVideo.videoUrl)}
              frameBorder="0"
              allow="autoplay; encrypted-media; picture-in-picture"
              allowFullScreen
              className="w-full"
              onError={() =>
                console.error("Embedding restricted for this video.")
              }
            ></iframe>
            <p className="mt-2">
              If the video doesn't play,{" "}
              <a
                href={selectedVideo.videoUrl}
                target="_blank"
                rel="noopener noreferrer"
              >
                (watch it on YouTube)
              </a>
              .
            </p>
          </div>
        )}

        {/* Display Video Details */}
        {!loading && !error && selectedVideo && (
          <div className="video-details mt-5">
            <h2 className="text-xl font-semibold">{selectedVideo.title}</h2>
            <p className="text-gray-600">{selectedVideo.description}</p>
            <p className="text-blue-600">
              {selectedVideo.channelId.channelName}
            </p>

            {/* Like/Dislike Buttons */}
            <div className="like-dislike-buttons mt-4 flex items-center">
              <div>
                <button
                  onClick={async () => {
                    try {
                      await handleLike(selectedVideo._id);
                    } catch (err) {
                      handleError(err);
                    }
                  }}
                  className="like-button bg-green text-green-500 mr-2"
                >
                  👍 Like
                </button>
                <span>{selectedVideo.likes?.length || 0}</span>

                <button
                  onClick={async () => {
                    try {
                      await handleDislike(selectedVideo._id);
                    } catch (err) {
                      handleError(err);
                    }
                  }}
                  className="dislike-button text-red-500"
                >
                  👎 Dislike
                </button>
                <span>{selectedVideo.dislikes?.length || 0}</span>
              </div>
            </div>

            {/* Error Message for Action Failures */}
            {actionError && (
              <div className="error-message mt-4 text-red-500">
                <p>{actionError}</p>
              </div>
            )}

            {/* Comments Section */}
            <div className="comments-section mt-6">
              <div className="add-comment">
                <textarea
                  value={newComment}
                  onChange={(e) => setNewComment(e.target.value)}
                  className="w-full p-2 border rounded-md"
                  placeholder="Add a comment..."
                />
                <button
                  onClick={async () => {
                    try {
                      await handleAddComment(selectedVideo._id, newComment);
                      setNewComment(""); // Clear the comment input after submitting
                    } catch (err) {
                      handleError(err);
                    }
                  }}
                  className="mt-2 bg-blue-500 text-white px-4 py-2 rounded-md"
                >
                  Add Comment
                </button>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Right Section - Video List */}
      <div className="w-1/3 p-5 bg-gray-100">
        <h3 className="text-lg font-semibold">More Videos</h3>
        <div className="">
          <VideoList videos={videos} />{" "}
          {/* Pass the full list of videos to the VideoList component */}
        </div>
      </div>
    </div>
  );
};

export default VideoPlayer;
