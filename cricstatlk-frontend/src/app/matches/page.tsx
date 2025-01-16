'use client';

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { fetchTeams } from '@/api/teams';
import { fetchMatches, updateMatch, createMatch } from '@/api/matches';
import MatchList from '@/components/MatchList';
import { toast } from 'react-toastify';
import Modal from '@/components/ui/Modal';

const MatchesPage = () => {
  const navigate = useRouter();
  console.log(navigate);

  const [teams, setTeams] = useState<any[]>([]);
  const [matches, setMatches] = useState<any[]>([]);
  const [isUpdateModalOpen, setIsUpdateModalOpen] = useState(false);
  const [selectedMatch, setSelectedMatch] = useState<any>(null);

  // State for creating match
  const [team1Id, setTeam1Id] = useState<string>('');
  const [team2Id, setTeam2Id] = useState<string>('');
  const [team1Score, setTeam1Score] = useState<number>(0);
  const [team2Score, setTeam2Score] = useState<number>(0);
  const [venue, setVenue] = useState<string>('');
  const [matchDate, setMatchDate] = useState<string>('');
  const [winnerTeamId, setWinnerTeamId] = useState<string>('');

  // Fetch teams and matches
  useEffect(() => {
    const loadData = async () => {
      try {
        const [teamsData, matchesData] = await Promise.all([
          fetchTeams(),
          fetchMatches(),
        ]);
        setTeams(teamsData);
        setMatches(matchesData);
      } catch (error) {
        toast.error('Failed to load data. Please try again.');
        console.error('Error loading data:', error);
      }
    };

    loadData();
  }, []);

  // Handle form submission for creating a match
  const handleCreateMatch = async (e: React.FormEvent) => {
    e.preventDefault();

    const matchData = {
      team1Id,
      team2Id,
      team1Score,
      team2Score,
      matchDate,
      venue,
      winnerTeamId: team1Score > team2Score ? team1Id : team2Id, // Auto-determining winner
    };

    try {
      await createMatch(matchData);
      toast.success('Match created successfully!');
      setMatches([...matches, matchData]); // Add the new match to the list
      resetCreateForm(); // Reset the form after success
    } catch (error) {
      toast.error('Error creating match. Please try again.');
      console.error('Error creating match:', error);
    }
  };

  // Reset create match form
  const resetCreateForm = () => {
    setTeam1Id('');
    setTeam2Id('');
    setTeam1Score(0);
    setTeam2Score(0);
    setVenue('');
    setMatchDate('');
    setWinnerTeamId('');
  };

  // Handle Update button click
  const handleUpdateClick = (matchId: number) => {
    const match = matches.find((m: any) => m.matchId === matchId);
    setSelectedMatch(match);
    setIsUpdateModalOpen(true);
  };

  // Handle View Performance
  const handleViewPerformance = (matchId: number) => {
    navigate.push(`/matches/${matchId}`);
  };

  // Handle Update Form Submission
  const handleUpdateSubmit = async (updatedMatch: any) => {
    try {
      await updateMatch(updatedMatch.matchId, updatedMatch);
      toast.success('Match updated successfully!');
      setMatches((prev) =>
        prev.map((m) => (m.matchId === updatedMatch.matchId ? updatedMatch : m))
      );
      setIsUpdateModalOpen(false);
    } catch (error) {
      toast.error('Error updating match. Please try again.');
      console.error('Error updating match:', error);
    }
  };

  return (
    <div className="grid grid-cols-2 gap-6 p-8">
      {/* Left: Create Match Form */}
      <div className="bg-white shadow-lg rounded p-6">
        <h2 className="text-2xl font-bold mb-4">Create New Match</h2>
        <form onSubmit={handleCreateMatch}>
          <div className="mb-4">
            <label className="block text-sm font-medium">Team 1</label>
            <select
              className="w-full p-2 border rounded"
              value={team1Id}
              onChange={(e) => setTeam1Id(e.target.value)}
            >
              <option value="">Select Team</option>
              {teams.map((team) => (
                <option key={team.id} value={team.id}>
                  {team.name}
                </option>
              ))}
            </select>
          </div>

          <div className="mb-4">
            <label className="block text-sm font-medium">Team 2</label>
            <select
              className="w-full p-2 border rounded"
              value={team2Id}
              onChange={(e) => setTeam2Id(e.target.value)}
            >
              <option value="">Select Team</option>
              {teams.map((team) => (
                <option key={team.id} value={team.id}>
                  {team.name}
                </option>
              ))}
            </select>
          </div>

          <div className="mb-4">
            <label className="block text-sm font-medium">Team 1 Score</label>
            <input
              type="number"
              className="w-full p-2 border rounded"
              value={team1Score}
              onChange={(e) => setTeam1Score(Number(e.target.value))}
              required
            />
          </div>

          <div className="mb-4">
            <label className="block text-sm font-medium">Team 2 Score</label>
            <input
              type="number"
              className="w-full p-2 border rounded"
              value={team2Score}
              onChange={(e) => setTeam2Score(Number(e.target.value))}
              required
            />
          </div>

          <div className="mb-4">
            <label className="block text-sm font-medium">Match Date</label>
            <input
              type="datetime-local"
              className="w-full p-2 border rounded"
              value={matchDate}
              onChange={(e) => setMatchDate(e.target.value)}
              required
            />
          </div>

          <div className="mb-4">
            <label className="block text-sm font-medium">Venue</label>
            <input
              type="text"
              className="w-full p-2 border rounded"
              value={venue}
              onChange={(e) => setVenue(e.target.value)}
              required
            />
          </div>

          <button
            type="submit"
            className="w-full bg-blue-500 text-white py-2 rounded hover:bg-blue-600"
          >
            Create Match
          </button>
        </form>
      </div>

      {/* Right: Match List */}
      <div>
        <h2 className="text-2xl font-bold mb-4">Match List</h2>
        <MatchList
          matches={matches}
          onUpdate={handleUpdateClick}
          onViewPerformance={handleViewPerformance}
        />
      </div>

      {/* Update Match Modal */}
      {isUpdateModalOpen && selectedMatch && (
        <Modal onClose={() => setIsUpdateModalOpen(false)}>
          <h2 className="text-xl font-bold mb-4">Update Match</h2>
          <form
            onSubmit={(e) => {
              e.preventDefault();
              handleUpdateSubmit(selectedMatch);
            }}
          >
            <div className="mb-4">
              <label className="block text-sm font-medium">Team 1 Score</label>
              <input
                type="number"
                className="w-full p-2 border rounded"
                value={selectedMatch.team1Score}
                onChange={(e) =>
                  setSelectedMatch({
                    ...selectedMatch,
                    team1Score: Number(e.target.value),
                  })
                }
                required
              />
            </div>
            <div className="mb-4">
              <label className="block text-sm font-medium">Team 2 Score</label>
              <input
                type="number"
                className="w-full p-2 border rounded"
                value={selectedMatch.team2Score}
                onChange={(e) =>
                  setSelectedMatch({
                    ...selectedMatch,
                    team2Score: Number(e.target.value),
                  })
                }
                required
              />
            </div>
            <div className="mb-4">
              <label className="block text-sm font-medium">Venue</label>
              <input
                type="text"
                className="w-full p-2 border rounded"
                value={selectedMatch.venue}
                onChange={(e) =>
                  setSelectedMatch({ ...selectedMatch, venue: e.target.value })
                }
                required
              />
            </div>
            <div className="mb-4">
              <label className="block text-sm font-medium">Match Date</label>
              <input
                type="datetime-local"
                className="w-full p-2 border rounded"
                value={new Date(selectedMatch.matchDate)
                  .toISOString()
                  .slice(0, 16)}
                onChange={(e) =>
                  setSelectedMatch({
                    ...selectedMatch,
                    matchDate: new Date(e.target.value).toISOString(),
                  })
                }
                required
              />
            </div>
            <button
              type="submit"
              className="w-full bg-yellow-500 text-white py-2 rounded hover:bg-yellow-600"
            >
              Update Match
            </button>
          </form>
        </Modal>
      )}
    </div>
  );
};

export default MatchesPage;
