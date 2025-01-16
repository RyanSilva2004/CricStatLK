import React, { useState, useEffect } from 'react';
import { toast } from 'react-toastify';
import axios from 'axios';

interface AddPerformanceFormProps {
  matchId: number;
  closeForm: () => void;
}

const AddPerformanceForm: React.FC<AddPerformanceFormProps> = ({ matchId, closeForm }) => {
  const [selectedTeam, setSelectedTeam] = useState<string | null>(null); // selected team
  const [players, setPlayers] = useState<any[]>([]); // Players list based on selected team
  const [selectedPlayer, setSelectedPlayer] = useState<number | null>(null); // selected player
  const [runs, setRuns] = useState<number>(0);
  const [ballsFaced, setBallsFaced] = useState<number>(0);
  const [wickets, setWickets] = useState<number>(0);
  const [runsConceded, setRunsConceded] = useState<number>(0);
  const [oversBowled, setOversBowled] = useState<number>(0);
  const [catches, setCatches] = useState<number>(0);
  const [runOuts, setRunOuts] = useState<number>(0);
  const [teams, setTeams] = useState<string[]>([]); // Teams list (from match)

  // Fetch match data to get team IDs
  useEffect(() => {
    const fetchMatchData = async () => {
      try {
        const response = await fetch(`http://localhost:8080/api/matches/${matchId}`);
        const data = await response.json();
        setTeams([data.team1Id, data.team2Id]); // Assuming the match data contains team1Id and team2Id
      } catch (error) {
        toast.error('Error fetching match data');
      }
    };

    fetchMatchData();
  }, [matchId]);

  // Fetch players for the selected team (using team ID as country parameter)
  useEffect(() => {
    if (selectedTeam) {
      console.log(`Fetching players for team: ${selectedTeam}`);
      fetch(`http://localhost:8080/api/players/search?country=${selectedTeam}`)
        .then((response) => response.json())
        .then((data) => {
          console.log('Players fetched:', data); // Log the fetched data
          setPlayers(data);
        })
        .catch((error) => {
          console.error('Error fetching players:', error);
          toast.error('Error fetching players');
        });
    }
  }, [selectedTeam]);

const handleSubmit = async () => {
    if (!selectedPlayer) {
        toast.error('Please select a player');
        return;
    }

    const performanceData = {
        matchId,
        playerId: selectedPlayer,
        runs,
        ballsFaced,
        wickets,
        runsConceded,
        oversBowled,
        catches,
        runOuts
    };

    try {
        await addPerformance(performanceData);
        toast.success('Performance added successfully');
        closeForm(); // Close the form after submission
    } catch (error) {
        toast.error('Error adding performance');
    }
};

const addPerformance = async (data: any) => {
    console.log('Adding performance:', data);
    try {
        const response = await axios.post('http://localhost:8080/api/performances', data, {
            headers: { 'Content-Type': 'application/json' },
        });
        return response.data;
    } catch (error) {
        throw new Error('Failed to add performance');
    }
};

  return (
    <div className="fixed inset-0 bg-gray-700 bg-opacity-50 flex justify-center items-center z-50">
      <div className="bg-white p-6 rounded-lg w-96">
        <h3 className="text-xl font-bold text-gray-800 mb-4">Add Performance</h3>
        
        {/* Team Selection */}
        <div className="mb-4">
          <label className="block text-gray-700">Select Team</label>
          <select
            onChange={(e) => setSelectedTeam(e.target.value)}
            className="mt-2 p-2 w-full border rounded"
          >
            <option value="">Select Team</option>
            {teams.map((teamId) => (
              <option key={teamId} value={teamId}>
                {teamId} {/* You may fetch and display team names here */}
              </option>
            ))}
          </select>
        </div>

        {/* Player Selection */}
        {selectedTeam && (
          <div className="mb-4">
            <label className="block text-gray-700">Select Player</label>
            <select
              onChange={(e) => setSelectedPlayer(Number(e.target.value))}
              className="mt-2 p-2 w-full border rounded"
            >
              <option value="">Select Player</option>
              {players.length > 0 ? (
                players.map((player) => (
                  <option key={player.playerId} value={player.playerId}>
                    {player.name}
                  </option>
                ))
              ) : (
                <option disabled>No players found</option>
              )}
            </select>
          </div>
        )}

        {/* Performance Inputs (3-column grid layout) */}
        {selectedPlayer && (
          <div className="grid grid-cols-3 gap-4 mb-4">
            <div>
              <label className="block text-gray-700">Runs</label>
              <input
                type="number"
                value={runs}
                onChange={(e) => setRuns(Number(e.target.value))}
                className="mt-2 p-2 w-full border rounded"
              />
            </div>
            <div>
              <label className="block text-gray-700">Balls Faced</label>
              <input
                type="number"
                value={ballsFaced}
                onChange={(e) => setBallsFaced(Number(e.target.value))}
                className="mt-2 p-2 w-full border rounded"
              />
            </div>
            <div>
              <label className="block text-gray-700">Wickets</label>
              <input
                type="number"
                value={wickets}
                onChange={(e) => setWickets(Number(e.target.value))}
                className="mt-2 p-2 w-full border rounded"
              />
            </div>
            <div>
              <label className="block text-gray-700">Runs Conceded</label>
              <input
                type="number"
                value={runsConceded}
                onChange={(e) => setRunsConceded(Number(e.target.value))}
                className="mt-2 p-2 w-full border rounded"
              />
            </div>
            <div>
              <label className="block text-gray-700">Overs Bowled</label>
              <input
                type="number"
                value={oversBowled}
                onChange={(e) => setOversBowled(Number(e.target.value))}
                className="mt-2 p-2 w-full border rounded"
              />
            </div>
            <div>
              <label className="block text-gray-700">Catches</label>
              <input
                type="number"
                value={catches}
                onChange={(e) => setCatches(Number(e.target.value))}
                className="mt-2 p-2 w-full border rounded"
              />
            </div>
            <div>
              <label className="block text-gray-700">Run Outs</label>
              <input
                type="number"
                value={runOuts}
                onChange={(e) => setRunOuts(Number(e.target.value))}
                className="mt-2 p-2 w-full border rounded"
              />
            </div>
          </div>
        )}

        {/* Submit and Close Button */}
        <div className="flex justify-between">
          <button
            onClick={closeForm}
            className="bg-gray-500 text-white px-4 py-2 rounded hover:bg-gray-600"
          >
            Close
          </button>
          <button
            onClick={handleSubmit}
            className="bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700"
          >
            Submit
          </button>
        </div>
      </div>
    </div>
  );
};

export default AddPerformanceForm;
