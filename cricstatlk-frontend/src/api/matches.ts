import axios from 'axios';

const API_BASE_URL = 'http://localhost:8080';

export const fetchMatches = async () => {
  try 
  {
    const response = await axios.get(`${API_BASE_URL}/api/matches`);
    return response.data;
  } 
  catch (error) 
  {
    console.error('Error fetching matches:', error);
    return [];
  }
};
