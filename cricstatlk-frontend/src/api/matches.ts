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

export const createMatch = async (matchData: any) => {
  try {
    const response = await axios.post(`${API_BASE_URL}/api/matches`, matchData);
    return response.data;
  } catch (error) {
    console.error("Error creating match:", error);
    throw error;
  }
};

export const updateMatch = async (matchId: number, updatedMatch: any) => {
  const response = await fetch(`${API_BASE_URL}/api/matches/${matchId}`, 
    {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(updatedMatch),
  });
  if (!response.ok) {
    throw new Error("Failed to update match");
  }
  return await response.json();
};

export const fetchMatchDetails = async (matchId: number) => {
  const response = await fetch(`${API_BASE_URL}/api/matches/${matchId}`);
  
  if (!response.ok) {
    throw new Error('Failed to fetch match details');
  }

  const data = await response.json();
  return data;
};
