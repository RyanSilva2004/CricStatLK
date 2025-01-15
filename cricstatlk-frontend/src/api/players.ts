import axios from 'axios';

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8080';

export const fetchTopScorers = async () => {
  try {
    const response = await axios.get(`${API_BASE_URL}/api/players/top-scorers`);
    return response.data;
  } catch (error) {
    console.error('Error fetching top scorers:', error);
    return [];
  }
};

  export const fetchTopBowlers = async () => {
    try {
      const response = await axios.get(`${API_BASE_URL}/api/players/top-wicket-takers`);
      return response.data;
    } catch (error) {
      console.error("Error fetching top bowlers:", error);
      throw error;
    }
  };

