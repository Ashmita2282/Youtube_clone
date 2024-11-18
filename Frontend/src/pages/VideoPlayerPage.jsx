
// import React, { useState, useEffect } from "react";
// import { addComment } from "./yourApiFile"; // Import the addComment function from your API file

// // Sample video data
// const videoData = {
//   videoId: "video01",
//   title: "Learn JavaScript in 10 Minutes",
//   description: "A quick guide to the basics of JavaScript programming.",
//   channelName: "Code with John",
//   videoUrl: "https://www.w3schools.com/html/mov_bbb.mp4", // Sample video URL
// };

// const VideoPlayerPage = ({ token, user }) => {
//   const [comments, setComments] = useState([]); // Initialize with empty array for dynamic comments
//   const [newComment, setNewComment] = useState("");
//   const [editingCommentId, setEditingCommentId] = useState(null);
//   const [editingCommentText, setEditingCommentText] = useState("");
//   const [likes, setLikes] = useState(0);
//   const [dislikes, setDislikes] = useState(0);
//   const [loading, setLoading] = useState(false);

//   // Fetch comments when the component loads (this is a placeholder, replace with actual API call)
//   useEffect(() => {
//     // Fetch initial comments from the API if needed
//     // For now, let's assume `comments` is empty
//     // Replace with an API call to load comments if you have one
//   }, [videoData.videoId]);

//   // Handle adding a new comment
//   const handleAddComment = async () => {
//     if (newComment.trim()) {
//       // Assuming user._id contains the userId
//       const userId = user?._id; // Ensure this exists and is valid
//       if (!token || !userId) {
//         alert("You need to log in to add a comment.");
//         return;
//       }

//       setLoading(true);
//       try {
//         // Call the addComment function to post a comment
//         const response = await addComment(videoData.videoId, newComment, token, userId);
//         alert(response.message || "Comment added successfully.");
//         // After adding the comment, update the comments state (assuming response includes updated comments)
//         setComments((prevComments) => [
//           ...prevComments,
//           { id: Date.now(), text: newComment }, // Assuming a new comment object structure
//         ]);
//         setNewComment(""); // Clear the input field after posting
//       } catch (err) {
//         alert(err.response?.data?.message || "Failed to add the comment.");
//       } finally {
//         setLoading(false);
//       }
//     }
//   };

//   // Handle deleting a comment
//   const handleDeleteComment = (id) => {
//     setComments(comments.filter((comment) => comment.id !== id));
//   };

//   // Handle editing a comment
//   const handleEditComment = (id, text) => {
//     setEditingCommentId(id);
//     setEditingCommentText(text);
//   };

//   // Save edited comment
//   const handleSaveEdit = () => {
//     setComments(
//       comments.map((comment) =>
//         comment.id === editingCommentId ? { ...comment, text: editingCommentText } : comment
//       )
//     );
//     setEditingCommentId(null);
//     setEditingCommentText("");
//   };

//   return (
//     <div className="max-w-3xl mx-auto p-4">
//       {/* Video Player */}
//       <div className="video-player mb-4">
//         <video controls src={videoData.videoUrl} className="w-full h-64 rounded-lg" />
//       </div>

//       {/* Video Details */}
//       <h2 className="text-2xl font-bold">{videoData.title}</h2>
//       <p className="text-gray-600">{videoData.description}</p>
//       <p className="text-gray-500 mb-4">Channel: {videoData.channelName}</p>

//       {/* Like/Dislike Buttons */}
//       <div className="flex items-center space-x-4 mb-6">
//         <button
//           onClick={() => setLikes(likes + 1)}
//           className="text-blue-500 font-semibold flex items-center space-x-1"
//         >
//           👍 <span>{likes}</span>
//         </button>
//         <button
//           onClick={() => setDislikes(dislikes + 1)}
//           className="text-red-500 font-semibold flex items-center space-x-1"
//         >
//           👎 <span>{dislikes}</span>
//         </button>
//       </div>

//       {/* Comment Section */}
//       <div>
//         <h3 className="text-xl font-bold mb-2">Comments</h3>
//         <ul className="space-y-3 mb-4">
//           {comments.map((comment) => (
//             <li key={comment.id} className="flex justify-between items-center bg-gray-100 p-2 rounded">
//               {editingCommentId === comment.id ? (
//                 <input
//                   type="text"
//                   value={editingCommentText}
//                   onChange={(e) => setEditingCommentText(e.target.value)}
//                   className="flex-1 p-2 border rounded mr-2"
//                 />
//               ) : (
//                 <p className="flex-1">{comment.text}</p>
//               )}
//               <div className="flex space-x-2">
//                 {editingCommentId === comment.id ? (
//                   <button onClick={handleSaveEdit} className="text-blue-500 hover:underline">
//                     Save
//                   </button>
//                 ) : (
//                   <button
//                     onClick={() => handleEditComment(comment.id, comment.text)}
//                     className="text-blue-500 hover:underline"
//                   >
//                     Edit
//                   </button>
//                 )}
//                 <button onClick={() => handleDeleteComment(comment.id)} className="text-red-500 hover:underline">
//                   Delete
//                 </button>
//               </div>
//             </li>
//           ))}
//         </ul>
//         <div className="flex">
//           <input
//             type="text"
//             placeholder="Add a comment..."
//             value={newComment}
//             onChange={(e) => setNewComment(e.target.value)}
//             className="flex-1 p-2 border rounded-l"
//           />
//           <button
//             onClick={handleAddComment}
//             className="bg-blue-600 text-white px-4 py-2 rounded-r"
//           >
//             Post
//           </button>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default VideoPlayerPage;


// import React, { useState } from "react";

// // Sample video data
// const videoData = {
//   videoId: "video01",
//   title: "Learn JavaScript in 10 Minutes",
//   description: "A quick guide to the basics of JavaScript programming.",
//   channelName: "Code with John",
//   videoUrl: "https://www.w3schools.com/html/mov_bbb.mp4", // Sample video URL
// };

// const VideoPlayerPage = () => {
//   const [comments, setComments] = useState([
//     { id: 1, text: "Great video!" },
//     { id: 2, text: "Very helpful, thanks!" },
//   ]);
//   const [newComment, setNewComment] = useState("");
//   const [editingCommentId, setEditingCommentId] = useState(null);
//   const [editingCommentText, setEditingCommentText] = useState("");
//   const [likes, setLikes] = useState(0);
//   const [dislikes, setDislikes] = useState(0);

//   // Handle adding a new comment
//   const handleAddComment = () => {
//     if (newComment.trim()) {
//       setComments([...comments, { id: Date.now(), text: newComment }]);
//       setNewComment("");
//     }
//   };

//   // Handle deleting a comment
//   const handleDeleteComment = (id) => {
//     setComments(comments.filter((comment) => comment.id !== id));
//   };

//   // Handle editing a comment
//   const handleEditComment = (id, text) => {
//     setEditingCommentId(id);
//     setEditingCommentText(text);
//   };

//   // Save edited comment
//   const handleSaveEdit = () => {
//     setComments(
//       comments.map((comment) =>
//         comment.id === editingCommentId ? { ...comment, text: editingCommentText } : comment
//       )
//     );
//     setEditingCommentId(null);
//     setEditingCommentText("");
//   };

//   return (
//     <div className="max-w-3xl mx-auto p-4">
//       {/* Video Player */}
//       <div className="video-player mb-4">
//         <video controls src={videoData.videoUrl} className="w-full h-64 rounded-lg" />
//       </div>

//       {/* Video Details */}
//       <h2 className="text-2xl font-bold">{videoData.title}</h2>
//       <p className="text-gray-600">{videoData.description}</p>
//       <p className="text-gray-500 mb-4">Channel: {videoData.channelName}</p>

//       {/* Like/Dislike Buttons */}
//       <div className="flex items-center space-x-4 mb-6">
//         <button
//           onClick={() => setLikes(likes + 1)}
//           className="text-blue-500 font-semibold flex items-center space-x-1"
//         >
//           👍 <span>{likes}</span>
//         </button>
//         <button
//           onClick={() => setDislikes(dislikes + 1)}
//           className="text-red-500 font-semibold flex items-center space-x-1"
//         >
//           👎 <span>{dislikes}</span>
//         </button>
//       </div>

//       {/* Comment Section */}
//       <div>
//         <h3 className="text-xl font-bold mb-2">Comments</h3>
//         <ul className="space-y-3 mb-4">
//           {comments.map((comment) => (
//             <li key={comment.id} className="flex justify-between items-center bg-gray-100 p-2 rounded">
//               {editingCommentId === comment.id ? (
//                 <input
//                   type="text"
//                   value={editingCommentText}
//                   onChange={(e) => setEditingCommentText(e.target.value)}
//                   className="flex-1 p-2 border rounded mr-2"
//                 />
//               ) : (
//                 <p className="flex-1">{comment.text}</p>
//               )}
//               <div className="flex space-x-2">
//                 {editingCommentId === comment.id ? (
//                   <button onClick={handleSaveEdit} className="text-blue-500 hover:underline">
//                     Save
//                   </button>
//                 ) : (
//                   <button
//                     onClick={() => handleEditComment(comment.id, comment.text)}
//                     className="text-blue-500 hover:underline"
//                   >
//                     Edit
//                   </button>
//                 )}
//                 <button onClick={() => handleDeleteComment(comment.id)} className="text-red-500 hover:underline">
//                   Delete
//                 </button>
//               </div>
//             </li>
//           ))}
//         </ul>
//         <div className="flex">
//           <input
//             type="text"
//             placeholder="Add a comment..."
//             value={newComment}
//             onChange={(e) => setNewComment(e.target.value)}
//             className="flex-1 p-2 border rounded-l"
//           />
//           <button
//             onClick={handleAddComment}
//             className="bg-blue-600 text-white px-4 py-2 rounded-r"
//           >
//             Post
//           </button>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default VideoPlayerPage;
