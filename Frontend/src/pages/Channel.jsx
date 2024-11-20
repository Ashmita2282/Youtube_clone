import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import { useFetchVideosByChannelId } from "../hooks/useFetchVideos"; // Import your custom hook
import { useFetchDeleteVideo } from "../hooks/useFetchDeleteVideo"; // Import the delete hook
import useFetchEditVideo from "../hooks/useFetchEditVideo"; // Import the edit hook
import VideoCard from "../components/VideoCard";
import { useSelector } from "react-redux";

const Channel = () => {
  const location = useLocation();

  const { channelId, channelName, channelBanner, description } =
    location.state || {};

  const [videos, setVideos] = useState([]);
  const { token } = useSelector((state) => state.auth);

  const { fetchvideos, loading, error } = useFetchVideosByChannelId(channelId);

  useEffect(() => {
    if (fetchvideos) {
      setVideos(fetchvideos);
    }
  }, [fetchvideos]);

  const {
    deleteVideo,
    loading: deleteLoading,
    error: deleteError,
    success: deleteSuccess,
  } = useFetchDeleteVideo();

  const {
    editVideo,
    loading: editLoading,
    error: editError,
  } = useFetchEditVideo();

  const [editVideoData, setEditVideoData] = useState({
    id: "",
    title: "",
    description: "",
    thumbnailUrl: "",
  });

  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleDeleteVideo = async (videoId) => {
    if (!token) {
      console.error("No token found");
      return;
    }

    try {
      await deleteVideo(videoId, token);

      setVideos((prevVideos) =>
        prevVideos.filter((video) => video._id !== videoId)
      );
    } catch (err) {
      console.error("Failed to delete video:", err);
    }
  };

  const handleEditClick = (video) => {
    setEditVideoData({
      id: video._id,
      title: video.title,
      description: video.description,
      thumbnailUrl: video.thumbnailUrl,
    });
    setIsModalOpen(true); // Open the modal
  };

  const handleEditVideo = async () => {
    if (!token) {
      console.error("No token found");
      return;
    }

    try {
      const updatedVideo = await editVideo(editVideoData.id, {
        title: editVideoData.title,
        description: editVideoData.description,
        thumbnailUrl: editVideoData.thumbnailUrl,
      });

      setVideos((prevVideos) =>
        prevVideos.map((video) =>
          video._id === updatedVideo._id ? updatedVideo : video
        )
      );

      setEditVideoData({
        id: "",
        title: "",
        description: "",
        thumbnailUrl: "",
      });

      setIsModalOpen(false); // Close the modal
    } catch (err) {
      console.error("Failed to edit video:", err);
    }
  };

  return (
    <div className="p-6 max-w-3xl mx-auto">
      <div className="rounded-lg overflow-hidden shadow-md">
        <img
          src={channelBanner || "defaultBanner.jpg"}
          alt="Channel Banner"
          className="w-full h-48 object-cover"
        />
        <div className="p-4">
          <h1 className="text-2xl font-bold">
            {channelName || "Default Channel Name"}
          </h1>
          <p className="text-gray-600">
            {description || "No description provided"}
          </p>
          <p className="text-gray-500">Subscribers: 150</p>
        </div>
      </div>

      {loading && <div className="text-center mt-4">Loading videos...</div>}

      {error && <div className="text-center text-red-500 mt-4">{error}</div>}

      <div className="mt-6">
        {videos.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {videos.map((video) => (
              <div key={video._id} className="relative">
                <VideoCard video={video} />
                <div className="absolute bottom-4 left-4 space-x-2">
                  <button
                    onClick={() => handleDeleteVideo(video._id)}
                    className="bg-red-600 text-white px-4 py-2 rounded hover:bg-red-800"
                  >
                    {deleteLoading ? "Deleting..." : "Delete"}
                  </button>
                  <button
                    onClick={() => handleEditClick(video)}
                    className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-800"
                  >
                    Edit
                  </button>
                  {deleteError && (
                    <p className="text-red-500 text-sm">{deleteError}</p>
                  )}
                  {deleteSuccess && (
                    <p className="text-green-500 text-sm">Video deleted!</p>
                  )}
                </div>
              </div>
            ))}
          </div>
        ) : (
          !loading &&
          !error && (
            <div className="text-center text-gray-500 mt-4">
              No videos found.
            </div>
          )
        )}
      </div>

      {isModalOpen && (
        <div className="fixed inset-0 bg-gray-900 bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded shadow-md w-full max-w-lg">
            <h2 className="text-xl font-bold mb-4">Edit Video</h2>
            <form
              onSubmit={(e) => {
                e.preventDefault();
                handleEditVideo();
              }}
              className="space-y-4"
            >
              <input
                type="text"
                placeholder="Title"
                value={editVideoData.title}
                onChange={(e) =>
                  setEditVideoData({ ...editVideoData, title: e.target.value })
                }
                className="w-full p-2 border rounded"
              />
              <textarea
                placeholder="Description"
                value={editVideoData.description}
                onChange={(e) =>
                  setEditVideoData({
                    ...editVideoData,
                    description: e.target.value,
                  })
                }
                className="w-full p-2 border rounded"
              />
              <input
                type="text"
                placeholder="Thumbnail URL"
                value={editVideoData.thumbnailUrl}
                onChange={(e) =>
                  setEditVideoData({
                    ...editVideoData,
                    thumbnailUrl: e.target.value,
                  })
                }
                className="w-full p-2 border rounded"
              />
              <div className="flex justify-end space-x-4">
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="bg-gray-600 text-white px-4 py-2 rounded hover:bg-gray-800"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-800"
                  disabled={editLoading}
                >
                  {editLoading ? "Saving..." : "Save"}
                </button>
              </div>
              {editError && <p className="text-red-500 mt-2">{editError}</p>}
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default Channel;
                                                                                                                                                                                                                                                