import axios from 'axios';

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8080';

export const fetchPlayerStats = async (playerId: string) => {
    const response = await axios.get(`${API_BASE_URL}/api/players/${playerId}/stats`);
    return response.data;
  };