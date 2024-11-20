import React from "react";
import { useFetchVideos } from "../hooks/useFetchVideos";
import VideoCard from "./VideoCard";
import { Link, useOutletContext } from "react-router-dom"; // To access context passed from Home.jsx

const VideoList = () => {
  const { searchTerm, selectedCategory } = useOutletContext(); // Access the search and category state

  const { videos, loading, error } = useFetchVideos();

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error}</p>;

  const filteredVideos = videos
    .filter(
      (video) =>
        selectedCategory === "All" || video.category === selectedCategory
    )
    .filter((video) =>
      video.title.toLowerCase().includes(searchTerm.toLowerCase())
    );

  return (
    <div className="ml-10 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      {filteredVideos.map((video) => (
        <Link to={`/videoPlayer/${video._id}`} key={video._id}>
          <VideoCard video={video} />
        </Link>
      ))}
    </div>
  );
};

export default VideoList;
