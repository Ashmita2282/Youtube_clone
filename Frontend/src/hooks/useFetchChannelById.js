// import { useEffect, useState } from 'react';

// const useFetchChannelData = (channelId, token) => {
//   const [channelData, setChannelData] = useState(null);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);

//   useEffect(() => {
//     const fetchChannelData = async () => {
//       try {
//         const response = await fetch(`http://localhost:4000/api/channel/${channelId}`, {
//           method: 'GET',
//           headers: {
//             'Authorization': `Bearer ${token}`, // Pass the token in the Authorization header
//             'Content-Type': 'application/json',
//           },
//         });

//         if (!response.ok) {
//           throw new Error('Failed to fetch channel data');
//         }

//         const data = await response.json();
//         setChannelData(data.data); // Assuming the data is in `data.data`
//       } catch (error) {
//         setError(error.message);
//       } finally {
//         setLoading(false);
//       }
//     };

//     if (channelId && token) {
//       fetchChannelData();
//     }
//   }, [channelId, token]); // Re-run if channelId or token changes

//   return { channelData, loading, error };
// };

// export default useFetchChannelData;
