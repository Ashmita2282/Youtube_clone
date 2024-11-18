// import { useState, useEffect } from "react";
// import axios from "axios";

// const useFetchChannel = (channelId, token) => {
//   const [channel, setChannel] = useState(null);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);

//   useEffect(() => {
//     const fetchChannel = async () => {
//       setLoading(true);
//       try {
//         const response = await axios.get(
//           `http://localhost:4000/api/channel/${channelId}`,
//           {
//             headers: {
//               Authorization: `Bearer ${token}`, // Pass token if required
//             },
//           }
//         );
//         setChannel(response.data.data);
//       } catch (err) {
//         setError(err.response?.data?.message || "Failed to fetch channel.");
//       } finally {
//         setLoading(false);
//       }
//     };

//     if (channelId) {
//       fetchChannel();
//     }
//   }, [channelId, token]);

//   return { channel, loading, error };
// };

// export default useFetchChannel;
