import React, { useState } from "react";
import { useLocation } from "react-router-dom";

// Sample channel data
const channelData = {
  subscribers: 5200,
  videos: [
    { id: "video01", title: "JavaScript Basics" },
    { id: "video02", title: "React Tutorial" },
  ],
};

const Channel = () => {
  const [videos, setVideos] = useState(channelData.videos);
  const [newVideoTitle, setNewVideoTitle] = useState("");
  const [editingVideoId, setEditingVideoId] = useState(null);
  const [editingVideoTitle, setEditingVideoTitle] = useState("");

  const location = useLocation();

  const { channelName, channelBanner, description } = location.state || {}; // Safely extract data

  console.log("channelBanner", channelBanner);

  // Handle adding a new video
  const handleAddVideo = () => {
    if (newVideoTitle) {
      const newVideo = {
        id: `video${videos.length + 1}`,
        title: newVideoTitle,
      };
      setVideos([...videos, newVideo]);
      setNewVideoTitle("");
    }
  };

  // Handle deleting a video
  const handleDeleteVideo = (id) => {
    setVideos(videos.filter((video) => video.id !== id));
  };

  // Handle editing a video
  const handleEditVideo = (id) => {
    const video = videos.find((video) => video.id === id);
    setEditingVideoId(id);
    setEditingVideoTitle(video.title);
  };

  // Save edited video
  const handleSaveEdit = () => {
    setVideos(
      videos.map((video) =>
        video.id === editingVideoId
          ? { ...video, title: editingVideoTitle }
          : video
      )
    );
    setEditingVideoId(null);
    setEditingVideoTitle("");
  };

  return (
    <div className="p-6 max-w-3xl mx-auto">
      {/* Channel Banner and Details */}
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
          <p className="text-gray-500">
            Subscribers: {channelData.subscribers}
          </p>
        </div>
      </div>

      {/* Video List */}
      <div className="mt-6">
        <h2 className="text-xl font-bold mb-4">Videos</h2>
        <ul className="space-y-4">
          {videos.map((video) => (
            <li
              key={video.id}
              className="flex justify-between items-center bg-gray-100 p-3 rounded shadow-sm"
            >
              {editingVideoId === video.id ? (
                <div className="flex-1">
                  <input
                    type="text"
                    value={editingVideoTitle}
                    onChange={(e) => setEditingVideoTitle(e.target.value)}
                    className="w-full p-2 border rounded"
                  />
                </div>
              ) : (
                <p className="flex-1">{video.title}</p>
              )}
              <div className="flex space-x-2">
                {editingVideoId === video.id ? (
                  <button
                    onClick={handleSaveEdit}
                    className="text-blue-500 hover:underline"
                  >
                    Save
                  </button>
                ) : (
                  <button
                    onClick={() => handleEditVideo(video.id)}
                    className="text-blue-500 hover:underline"
                  >
                    Edit
                  </button>
                )}
                <button
                  onClick={() => handleDeleteVideo(video.id)}
                  className="text-red-500 hover:underline"
                >
                  Delete
                </button>
              </div>
            </li>
          ))}
        </ul>
      </div>

      {/* Add New Video */}
      <div className="mt-6">
        <h2 className="text-xl font-bold mb-2">Add New Video</h2>
        <div className="flex space-x-2">
          <input
            type="text"
            placeholder="Video Title"
            value={newVideoTitle}
            onChange={(e) => setNewVideoTitle(e.target.value)}
            className="flex-1 p-2 border rounded"
          />
          <button
            onClick={handleAddVideo}
            className="bg-blue-600 text-white px-4 py-2 rounded"
          >
            Add Video
          </button>
        </div>
      </div>
    </div>
  );
};

export default Channel;
