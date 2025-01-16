import React, { useEffect, useState } from 'react';
import { fetchMatchDetails } from '@/api/matches';
import { toast } from 'react-toastify';
import AddPerformanceForm from './AddPerformanceForm'; // Import the AddPerformanceForm component

const MatchPerformanceCard: React.FC<{ matchId: number }> = ({ matchId }) => {
  const [matchDetails, setMatchDetails] = useState<any | null>(null); // Store match details
  const [performances, setPerformances] = useState<any[]>([]); // Store performances for the match
  const [loading, setLoading] = useState<boolean>(false); // Loading state for match details
  const [isAddPerformanceOpen, setIsAddPerformanceOpen] = useState<boolean>(false); // To control form visibility

  // Fetch match details and performances
  useEffect(() => {
    const loadMatchDetails = async () => {
      setLoading(true);
      try {
        const matchData = await fetchMatchDetails(matchId); // Fetch match details with performances
        setMatchDetails(matchData); // Set match details
        setPerformances(matchData.performances); // Set performances data
      } catch (error) {
        toast.error('Failed to load match details');
      } finally {
        setLoading(false);
      }
    };

    loadMatchDetails();
  }, [matchId]);

  // Sorting functions
  const sortPerformances = (category: string) => {
    switch (category) {
      case 'batting':
        return [...performances].sort((a, b) => b.runs - a.runs); // Sort by most runs
      case 'bowling':
        return [...performances].sort((a, b) => b.wickets - a.wickets); // Sort by most wickets
      case 'fielding':
        return [...performances].sort((a, b) => b.catches - a.catches); // Sort by most catches
      default:
        return performances;
    }
  };

  // Function to open the form
  const handleAddPerformanceClick = () => {
    setIsAddPerformanceOpen(true);
  };

  // Function to close the form
  const handleCloseForm = () => {
    setIsAddPerformanceOpen(false);
  };

  return (
    <div className="bg-white shadow-lg rounded-lg p-6 mb-6 border-t-4 border-blue-600">
      {loading && <div className="text-center text-gray-500">Loading match details...</div>}

      {/* Match Details */}
      {!loading && matchDetails && (
        <>
          <div className="text-center">
            <h2 className="text-2xl font-bold mb-2 text-gray-800">
              {matchDetails.team1Id} vs {matchDetails.team2Id}
            </h2>
            <p className="text-sm text-gray-500">{new Date(matchDetails.matchDate).toLocaleDateString()}</p>
            <p className="text-sm text-gray-500">{matchDetails.venue}</p>
            <div className="flex gap-4 justify-center mt-4">
              <img
                src={matchDetails.team1Image}
                alt={matchDetails.team1Id}
                className="w-16 h-16 object-cover rounded-full"
              />
              <img
                src={matchDetails.team2Image}
                alt={matchDetails.team2Id}
                className="w-16 h-16 object-cover rounded-full"
              />
            </div>
            <p className="mt-2 font-semibold text-gray-700">Winner: {matchDetails.winnerTeamId}</p>
          </div>

          {/* Performance Sections */}
          <div className="mt-6">
            {/* Batting Performances */}
            <div className="mb-4">
              <h3 className="text-xl font-semibold mb-2 text-blue-600">Top Batting Performances</h3>
              {sortPerformances('batting').slice(0, 3).map((performance) => (
                <div key={performance.performanceId} className="flex items-center justify-between border p-4 mb-2 rounded-lg shadow-sm bg-gray-50">
                  <div className="flex items-center gap-4">
                    <img
                      src={performance.playerImage}
                      alt={performance.playerName}
                      className="w-12 h-12 object-cover rounded-full"
                    />
                    <div>
                      <h4 className="font-bold text-gray-800">{performance.playerName}</h4>
                      <p className="text-sm text-gray-500">Runs: {performance.runs} | Balls: {performance.ballsFaced}</p>
                    </div>
                  </div>
                  <p className="font-semibold text-gray-700">{performance.runs} Runs</p>
                </div>
              ))}
            </div>

            {/* Bowling Performances */}
            <div className="mb-4">
              <h3 className="text-xl font-semibold mb-2 text-blue-600">Top Bowling Performances</h3>
              {sortPerformances('bowling').slice(0, 3).map((performance) => (
                <div key={performance.performanceId} className="flex items-center justify-between border p-4 mb-2 rounded-lg shadow-sm bg-gray-50">
                  <div className="flex items-center gap-4">
                    <img
                      src={performance.playerImage}
                      alt={performance.playerName}
                      className="w-12 h-12 object-cover rounded-full"
                    />
                    <div>
                      <h4 className="font-bold text-gray-800">{performance.playerName}</h4>
                      <p className="text-sm text-gray-500">Wickets: {performance.wickets} | Runs Conceded: {performance.runsConceded}</p>
                    </div>
                  </div>
                  <p className="font-semibold text-gray-700">{performance.wickets} Wickets</p>
                </div>
              ))}
            </div>

            {/* Fielding Performances */}
            <div>
              <h3 className="text-xl font-semibold mb-2 text-blue-600">Top Fielding Performances</h3>
              {sortPerformances('fielding').slice(0, 3).map((performance) => (
                <div key={performance.performanceId} className="flex items-center justify-between border p-4 mb-2 rounded-lg shadow-sm bg-gray-50">
                  <div className="flex items-center gap-4">
                    <img
                      src={performance.playerImage}
                      alt={performance.playerName}
                      className="w-12 h-12 object-cover rounded-full"
                    />
                    <div>
                      <h4 className="font-bold text-gray-800">{performance.playerName}</h4>
                      <p className="text-sm text-gray-500">Catches: {performance.catches}</p>
                    </div>
                  </div>
                  <p className="font-semibold text-gray-700">{performance.catches} Catches</p>
                </div>
              ))}
            </div>
          </div>

          {/* Add Performance Button */}
          <div className="text-center mt-6">
            <button
              onClick={handleAddPerformanceClick} // Open form when clicked
              className="bg-blue-600 text-white px-6 py-2 rounded-full hover:bg-blue-700"
            >
              Add Performance
            </button>
          </div>
        </>
      )}

      {/* Add Performance Form Popup */}
      {isAddPerformanceOpen && (
        <AddPerformanceForm matchId={matchId} closeForm={handleCloseForm} />
      )}
    </div>
  );
};

export default MatchPerformanceCard;
