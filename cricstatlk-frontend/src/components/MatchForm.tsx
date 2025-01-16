import React, { useState } from "react";

const MatchForm = ({ teams, onCreateMatch }: any) => {
  const [formData, setFormData] = useState({
    team1Id: "",
    team2Id: "",
    team1Score: 0,
    team2Score: 0,
    matchDate: "",
    venue: "",
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const winnerTeamId =
      formData.team1Score > formData.team2Score
        ? formData.team1Id
        : formData.team2Id;

    if (!winnerTeamId) {
      alert("Scores cannot be equal!");
      return;
    }

    onCreateMatch({ ...formData, winnerTeamId });
  };

  return (
    <div className="p-4 bg-white shadow-lg rounded">
      <h2 className="text-lg font-bold mb-4">Create New Match</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        {/* Team 1 */}
        <div>
          <label className="block text-sm font-medium">Team 1</label>
          <select
            name="team1Id"
            value={formData.team1Id}
            onChange={handleInputChange}
            className="w-full border p-2 rounded"
            required
          >
            <option value="">Select Team 1</option>
            {teams.map((team: any) => (
              <option key={team.id} value={team.id}>
                {team.name}
              </option>
            ))}
          </select>
        </div>

        {/* Team 2 */}
        <div>
          <label className="block text-sm font-medium">Team 2</label>
          <select
            name="team2Id"
            value={formData.team2Id}
            onChange={handleInputChange}
            className="w-full border p-2 rounded"
            required
          >
            <option value="">Select Team 2</option>
            {teams.map((team: any) => (
              <option key={team.id} value={team.id}>
                {team.name}
              </option>
            ))}
          </select>
        </div>

        {/* Scores and Details */}
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium">Team 1 Score</label>
            <input
              type="number"
              name="team1Score"
              value={formData.team1Score}
              onChange={handleInputChange}
              className="w-full border p-2 rounded"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium">Team 2 Score</label>
            <input
              type="number"
              name="team2Score"
              value={formData.team2Score}
              onChange={handleInputChange}
              className="w-full border p-2 rounded"
              required
            />
          </div>
        </div>

        {/* Match Date and Venue */}
        <div>
          <label className="block text-sm font-medium">Match Date</label>
          <input
            type="datetime-local"
            name="matchDate"
            value={formData.matchDate}
            onChange={handleInputChange}
            className="w-full border p-2 rounded"
            required
          />
        </div>
        <div>
          <label className="block text-sm font-medium">Venue</label>
          <input
            type="text"
            name="venue"
            value={formData.venue}
            onChange={handleInputChange}
            className="w-full border p-2 rounded"
            required
          />
        </div>

        <button
          type="submit"
          className="w-full bg-red-900 text-white p-2 rounded hover:bg-red-600"
        >
          Create Match
        </button>
      </form>
    </div>
  );
};

export default MatchForm;
