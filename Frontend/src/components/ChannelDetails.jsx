// import React from "react";
// import { useParams } from "react-router-dom";
// import useFetchChannelById from "../hooks/useFetchChannelById";

// const ChannelDetails = () => {
//   const { channelId } = useParams(); // Extract channelId from URL
//   const { channel, loading, error } = useFetchChannelById(channelId); // Use custom hook

//   if (loading) return <div>Loading...</div>;
//   if (error) return <div>Error: {error}</div>;

//   return (
//     <div className="p-4">
//       <h1 className="text-xl font-bold">{channel?.name}</h1>
//       <p className="text-gray-700">{channel?.description}</p>
//       <h2 className="text-lg mt-4 font-semibold">Videos:</h2>
//       <ul className="list-disc pl-6">
//         {channel?.videos?.length > 0 ? (
//           channel.videos.map((video) => (
//             <li key={video._id}>
//               <strong>{video.title}</strong> - {video.description}
//             </li>
//           ))
//         ) : (
//           <p>No videos available.</p>
//         )}
//       </ul>
//     </div>
//   );
// };

// export default ChannelDetails;
