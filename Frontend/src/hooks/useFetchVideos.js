import { useEffect, useState } from 'react';

const useFetchVideos = () => {
  const [videos, setVideos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchVideos = async () => {
      try {
        const response = await fetch('http://localhost:4000/api/video');
        if (!response.ok) throw new Error('Failed to fetch videos');
        const data = await response.json();
        setVideos(data.data); // Assuming the videos are in `data.data` as per your structure
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchVideos();
  }, []);

  return { videos, loading, error };
};

export default useFetchVideos;
