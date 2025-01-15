import axios from "axios";

const BASE_URL = "http://localhost:8080";

export const fetchTeamRecords = async () => {
  try {
    const response = await axios.get(`${BASE_URL}/api/teams/matches/record`);
    return response.data;
  } catch (error) {
    console.error("Error fetching team records:", error);
    throw error;
  }
};
