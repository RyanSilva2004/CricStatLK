import axios from "axios";

const BASE_URL = "http://localhost:8080";

export const fetchTeamRecords = async (): Promise<any[]> => {
  try {
    const response = await axios.get(`${BASE_URL}/api/teams/matches/record`);
    const data = response.data;

    // Transform the object response into an array of team records
    const transformedData = Object.entries(data).map(([key, value]: [string, any]) => ({
      name: key,
      ...value,
    }));

    return transformedData; // Returns an array of teams
  } catch (error) {
    console.error("Error fetching team records:", error);
    throw error;
  }
};

export const fetchTeams = async () => {
  try {
    const response = await axios.get(`${BASE_URL}/api/teams`);
    return response.data;
  } catch (error) {
    console.error("Error fetching teams:", error);
    throw error;
  }
};

export const fetchPlayersByTeam = async (teamId: string): Promise<any[]> => {
  try {
    const response = await axios.get(`${BASE_URL}/api/teams/${teamId}/players`);
    return response.data;
  } catch (error) {
    console.error(`Error fetching players for team ${teamId}:`, error);
    throw error;
  }
};
