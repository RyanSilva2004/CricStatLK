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

  export const fetchPlayers = async () => {
    const response = await axios.get(`${API_BASE_URL}/api/players`);
    return response.data;
  };
  

  export const createPlayer = async (playerData: any) => {
    const response = await axios.post(`${API_BASE_URL}/api/players`, playerData);
    return response.data;
  };
  
  export const searchPlayers = async (name?: string, country?: string) => {
    try {
      // Construct query parameters dynamically, omitting undefined values
      const params: Record<string, string> = {};
      if (name) params.name = name;
      if (country) params.country = country;
  
      // Use the params object with Axios to send the request
      const response = await axios.get(`${API_BASE_URL}/api/players/search`, {
        params,
      });
  
      return response.data;
    } catch (error) {
      console.error("Error searching players:", error);
      throw error;
    }
  };

  // Update a player
export const updatePlayer = async (playerId: number, player: {
  name: string;
  country: string;
  dateOfBirth: string;
  image: string;
}) => {
  const response = await axios.put(`${API_BASE_URL}/api/players/${playerId}`, player);
  return response.data;
};

// Delete a player
export const deletePlayer = async (playerId: number) => {
  const response = await axios.delete(`${API_BASE_URL}/api/players/${playerId}`);
  return response.data;
};
