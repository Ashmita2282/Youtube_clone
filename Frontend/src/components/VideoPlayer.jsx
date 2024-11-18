import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom"; // To get the video ID from the URL
import useFetchVideos from "../hooks/useFetchVideos"; // Custom hook for fetching video data
import VideoList from "./VideoList"; // Assuming the list of videos is displayed here
import useVideoActions from "../hooks/useVideoActions";

const VideoPlayer = () => {
  const { id } = useParams(); // Get video ID from URL
  const [newComment, setNewComment] = useState("");
  const { handleLike, handleDislike, handleAddComment, loading, error } =
    useVideoActions();
  const [hasFetchedData, setHasFetchedData] = useState(false); // Track if data has been fetched

  // Fetch video data using the custom hook
  const { videos } = useFetchVideos();

  // Select the video based on the ID passed in the URL
  const selectedVideo = videos.find((video) => video._id === id);

  const getEmbedUrl = (url) => {
    const videoId = url.split("v=")[1]?.split("&")[0]; // Extract the VIDEO_ID
    return `https://www.youtube.com/embed/${videoId}`;
  };

  // Logging fetched video data and URL whenever selectedVideo changes
  useEffect(() => {
    if (selectedVideo) {
      setHasFetchedData(true); // Mark as fetched
    }
  }, [selectedVideo]); // Trigger effect when selectedVideo changes

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
            <p>Error loading video: {error.message}</p>
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
                  onClick={() => handleLike(selectedVideo._id)}
                  className="like-button bg-green text-green-500 mr-2"
                >
                  👍 Like
                </button>
                <span>{selectedVideo.likes?.length || 0}</span>

                <button
                  onClick={() => handleDislike(selectedVideo._id)}
                  className="dislike-button text-red-500"
                >
                  👎 Dislike
                </button>
                <span>{selectedVideo.dislikes?.length || 0}</span>
              </div>
            </div>

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
                  onClick={() => {
                    // Call the handleAddComment with videoId and newComment text
                    handleAddComment(selectedVideo._id, newComment);
                    setNewComment(""); // Clear the comment input after submitting
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

// import React, { useState, useEffect } from "react";
// import { useParams } from "react-router-dom"; // To get the video ID from the URL
// import useFetchVideos from "../hooks/useFetchVideos"; // Custom hook for fetching video data
// import VideoList from "./VideoList"; // Assuming the list of videos is displayed here
// import useVideoActions from "../hooks/useVideoActions";

// const VideoPlayer = () => {
//   const { id } = useParams(); // Get video ID from URL
//   const [comments, setComments] = useState([]);
//   const [newComment, setNewComment] = useState("");

//   const { handleLike, handleDislike, handleAddComment, loading, error } =
//     useVideoActions();
//   const [hasFetchedData, setHasFetchedData] = useState(false); // Track if data has been fetched

//   // Fetch video data using the custom hook
//   const { videos } = useFetchVideos();

//   // Select the video based on the ID passed in the URL
//   const selectedVideo = videos.find((video) => video._id === id);

//   const getEmbedUrl = (url) => {
//     const videoId = url.split("v=")[1]?.split("&")[0]; // Extract the VIDEO_ID
//     return `https://www.youtube.com/embed/${videoId}`;
//   };

//   // Logging fetched video data and URL whenever selectedVideo changes
//   useEffect(() => {
//     if (selectedVideo) {
//       setHasFetchedData(true); // Mark as fetched
//     }
//   }, [selectedVideo]); // Trigger effect when selectedVideo changes

//   return (
//     <div className="flex flex-row justify-between ml-8">
//       {/* Left Section - Video Player */}
//       <div className="w-2/3 p-5 bg-white">
//         {/* Show Loading Indicator */}
//         {loading && (
//           <div className="loading-indicator">
//             <p>Loading video...</p>
//           </div>
//         )}

//         {/* Show Error Message */}
//         {error && (
//           <div className="error-message">
//             <p>Error loading video: {error.message}</p>
//           </div>
//         )}

//         {/* Display Video Player if Video Data is Available */}
//         {!loading && !error && selectedVideo && (
//           <div>
//             <iframe
//               width="560"
//               height="315"
//               src={getEmbedUrl(selectedVideo.videoUrl)}
//               frameBorder="0"
//               allow="autoplay; encrypted-media; picture-in-picture"
//               allowFullScreen
//               className="w-full"
//               onError={() =>
//                 console.error("Embedding restricted for this video.")
//               }
//             ></iframe>
//             <p className="mt-2">
//               If the video doesn't play,{" "}
//               <a
//                 href={selectedVideo.videoUrl}
//                 target="_blank"
//                 rel="noopener noreferrer"
//               >
//                 (watch it on YouTube)
//               </a>
//               .
//             </p>
//           </div>
//         )}

//         {/* Display Video Details */}
//         {!loading && !error && selectedVideo && (
//           <div className="video-details mt-5">
//             <h2 className="text-xl font-semibold">{selectedVideo.title}</h2>
//             <p className="text-gray-600">{selectedVideo.description}</p>
//             <p className="text-blue-600">
//               {selectedVideo.channelId.channelName}
//             </p>

//             {/* Like/Dislike Buttons */}
//             <div className="like-dislike-buttons mt-4 flex items-center">
//               <div>
//                 <button
//                   onClick={() => handleLike(selectedVideo._id)}
//                   className="like-button bg-green text-green-500 mr-2"
//                 >
//                   👍 Like
//                 </button>
//                 <span>{selectedVideo.likes?.length || 0}</span>

//                 <button
//                   onClick={() => handleDislike(selectedVideo._id)}
//                   className="dislike-button text-red-500"
//                 >
//                   👎 Dislike
//                 </button>
//                 <span>{selectedVideo.dislikes?.length || 0}</span>
//               </div>
//             </div>

//             {/* Comments Section */}
//             <div className="comments-section mt-6">
//               <div className="add-comment">
//                 <textarea
//                   value={newComment}
//                   onChange={(e) => setNewComment(e.target.value)}
//                   className="w-full p-2 border rounded-md"
//                   placeholder="Add a comment..."
//                 />
//                 <button
//                   onClick={handleAddComment}
//                   className="mt-2 bg-blue-500 text-white px-4 py-2 rounded-md"
//                 >
//                   Add Comment
//                 </button>
//               </div>
//               {/* Handle edit comment */}
//               {/* <div className="comments-list mt-4">
//                 {comments.map((comment) => (
//                   <div key={comment._id} className="comment p-2 border-b">
//                     <p>{comment.text}</p>
//                     <button
//                       onClick={() => handleDeleteComment(comment._id)}
//                       className="text-red-500 text-sm"
//                     >
//                       Delete
//                     </button>
//                     <button
//                       onClick={() =>
//                         handleEditComment(
//                           comment._id,
//                           prompt("Edit Comment:", comment.text)
//                         )
//                       }
//                       className="text-blue-500 text-sm ml-2"
//                     >
//                       Edit
//                     </button>
//                   </div>
//                 ))}
//               </div> */}
//             </div>
//           </div>
//         )}
//       </div>

//       {/* Right Section - Video List */}
//       <div className="w-1/3 p-5 bg-gray-100">
//         <h3 className="text-lg font-semibold">More Videos</h3>
//         <div className="">
//           <VideoList videos={videos} />{" "}
//           {/* Pass the full list of videos to the VideoList component */}
//         </div>
//       </div>
//     </div>
//   );
// };

// export default VideoPlayer;

// // import React, { useState, useEffect } from "react";
// // import { useParams } from "react-router-dom"; // To get the video ID from the URL
// // import useFetchVideos from "../hooks/useFetchVideos"; // Custom hook for fetching video data
// // import VideoList from "./VideoList"; // Assuming the list of videos is displayed here
// // import useVideoActions from "../hooks/useVideoActions";

// // import { getToken } from "../redux/utils/localStorage"; // Utility to get the token
// // import { likeVideo, dislikeVideo } from "../Api/videoApi"; // API functions for like/dislike

// // const VideoPlayer = () => {
// //   const { id } = useParams(); // Get video ID from URL
// //   const [comments, setComments] = useState([]);
// //   const [newComment, setNewComment] = useState("");
// //   const [hasFetchedData, setHasFetchedData] = useState(false); // Track if data has been fetched

// //   // Fetch video data using the custom hook
// //   const { videos, loading, error } = useFetchVideos();

// //   const { handleLike, handleDislike } = useVideoActions();

// //   // Select the video based on the ID passed in the URL
// //   const selectedVideo = videos.find((video) => video._id === id);

// //   const getEmbedUrl = (url) => {
// //     const videoId = url.split("v=")[1]?.split("&")[0]; // Extract the VIDEO_ID
// //     return `https://www.youtube.com/embed/${videoId}`;
// //   };

// //   // Logging fetched video data and URL whenever selectedVideo changes
// //   useEffect(() => {
// //     if (selectedVideo) {
// //       console.log("Video data", selectedVideo);
// //       console.log("Video url", selectedVideo?.videoUrl);
// //       setHasFetchedData(true); // Mark as fetched
// //     }
// //   }, [selectedVideo]); // Trigger effect when selectedVideo changes

// //   // Simulate fetching comments for the selected video
// //   useEffect(() => {
// //     if (selectedVideo) {
// //       setComments([
// //         { _id: 1, text: "Great video!" },
// //         { _id: 2, text: "Loved the explanation." },
// //       ]);
// //     }
// //   }, [selectedVideo]); // Re-fetch comments when selectedVideo changes

// //   // Handle adding a comment
// //   const handleAddComment = () => {
// //     if (newComment) {
// //       const newCommentObj = { _id: comments.length + 1, text: newComment };
// //       setComments([...comments, newCommentObj]);
// //       setNewComment(""); // Clear input after submitting
// //     }
// //   };

// //   // Handle deleting a comment
// //   const handleDeleteComment = (id) => {
// //     setComments(comments.filter((comment) => comment._id !== id));
// //   };

// //   // Handle editing a comment
// //   const handleEditComment = (id, updatedText) => {
// //     setComments(
// //       comments.map((comment) =>
// //         comment._id === id ? { ...comment, text: updatedText } : comment
// //       )
// //     );
// //   };

// //   return (
// //     <div className="flex flex-row justify-between mt-36 ml-8">
// //       {/* Left Section - Video Player */}
// //       <div className="w-2/3 p-5 bg-white">
// //         {/* Show Loading Indicator */}
// //         {loading && (
// //           <div className="loading-indicator">
// //             <p>Loading video...</p>
// //           </div>
// //         )}

// //         {/* Show Error Message */}
// //         {error && (
// //           <div className="error-message">
// //             <p>Error loading video: {error.message}</p>
// //           </div>
// //         )}

// //         {/* Display Video Player if Video Data is Available */}
// //         {!loading && !error && selectedVideo && (
// //           <div>
// //             {/* <video controls className="w-full">
// //               <source src={selectedVideo.videoUrl} type="video/mp4" />
// //               Your browser does not support the video tag.
// //             </video> */}
// //             <iframe
// //               width="560"
// //               height="315"
// //               src={getEmbedUrl(selectedVideo.videoUrl)}
// //               frameBorder="0"
// //               allow="autoplay; encrypted-media; picture-in-picture"
// //               allowFullScreen
// //               className="w-full"
// //               onError={() =>
// //                 console.error("Embedding restricted for this video.")
// //               }
// //             ></iframe>
// //             <p className="mt-2">
// //               If the video doesn't play,{" "}
// //               <a
// //                 href={selectedVideo.videoUrl}
// //                 target="_blank"
// //                 rel="noopener noreferrer"
// //               >
// //                 ( watch it on YouTube)
// //               </a>
// //               .
// //             </p>
// //           </div>
// //         )}

// //         {/* Display Video Details */}
// //         {!loading && !error && selectedVideo && (
// //           <div className="video-details mt-5">
// //             <h2 className="text-xl font-semibold">{selectedVideo.title}</h2>
// //             <p className="text-gray-600">{selectedVideo.description}</p>
// //             <p className="text-blue-600">
// //               {selectedVideo.channelId.channelName}
// //             </p>

// //             <div className="like-dislike-buttons mt-4 flex items-center">
// //               <div>
// //                 <button
// //                   onClick={() => handleLike(video._id)}
// //                   className="like-button text-green-500 mr-2"
// //                 >
// //                   👍 Like
// //                 </button>
// //                 <span>{videos.likes?.length || 0}</span>

// //                 <button
// //                   onClick={() => handleDislike(selectedVideo._id)}
// //                   className="dislike-button text-red-500"
// //                 >
// //                   👎 Dislike
// //                 </button>
// //                 <span>{videos.dislikes?.length || 0}</span>
// //               </div>
// //               {/* <button
// //                 className="like-button text-green-500 mr-2"
// //                 onClick={() => setLikeCount(likeCount + 1)}
// //               >
// //                 👍 {likeCount}
// //               </button>
// //               <button
// //                 className="dislike-button text-red-500"
// //                 onClick={() => setDislikeCount(dislikeCount + 1)}
// //               >
// //                 👎 {dislikeCount}
// //               </button> */}
// //             </div>

// //             {/* Comments Section */}
// //             <div className="comments-section mt-6">
// //               <div className="add-comment">
// //                 <textarea
// //                   value={newComment}
// //                   onChange={(e) => setNewComment(e.target.value)}
// //                   className="w-full p-2 border rounded-md"
// //                   placeholder="Add a comment..."
// //                 />
// //                 <button
// //                   onClick={handleAddComment}
// //                   className="mt-2 bg-blue-500 text-white px-4 py-2 rounded-md"
// //                 >
// //                   Add Comment
// //                 </button>
// //               </div>

// //               <div className="comments-list mt-4">
// //                 {comments.map((comment) => (
// //                   <div key={comment._id} className="comment p-2 border-b">
// //                     <p>{comment.text}</p>
// //                     <button
// //                       onClick={() => handleDeleteComment(comment._id)}
// //                       className="text-red-500 text-sm"
// //                     >
// //                       Delete
// //                     </button>
// //                     <button
// //                       onClick={() =>
// //                         handleEditComment(
// //                           comment._id,
// //                           prompt("Edit Comment:", comment.text)
// //                         )
// //                       }
// //                       className="text-blue-500 text-sm ml-2"
// //                     >
// //                       Edit
// //                     </button>
// //                   </div>
// //                 ))}
// //               </div>
// //             </div>
// //           </div>
// //         )}
// //       </div>

// //       {/* Right Section - Video List */}
// //       <div className="w-1/3 p-5 bg-gray-100">
// //         <h3 className="text-lg font-semibold">More Videos</h3>
// //         <div className="">
// //           <VideoList videos={videos} />{" "}
// //           {/* Pass the full list of videos to the VideoList component */}
// //         </div>
// //       </div>
// //     </div>
// //   );
// // };

// // export default VideoPlayer;
