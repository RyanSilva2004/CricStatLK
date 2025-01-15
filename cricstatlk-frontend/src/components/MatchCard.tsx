import React from 'react';

type MatchCardProps = {
  team1: string;
  team2: string;
  team1Score: number;
  team2Score: number;
  matchDate: string;
  venue: string;
  winner: string;
  team1Image: string;
  team2Image: string;
};

const MatchCard: React.FC<MatchCardProps> = ({
  team1,
  team2,
  team1Score,
  team2Score,
  matchDate,
  venue,
  winner,
  team1Image,
  team2Image,
}) => {
  return (
    <div className="border rounded-md p-4 shadow-sm w-64 bg-white">
      <div className="flex justify-between items-center mb-4">
        <img src={team1Image} alt={`${team1} logo`} className="h-12 w-12" />
        <p className="text-sm text-gray-500">vs</p>
        <img src={team2Image} alt={`${team2} logo`} className="h-12 w-12" />
      </div>
      <h2 className="text-lg font-bold text-center mb-2">
        {team1} {team1Score} - {team2Score} {team2}
      </h2>
      <p className="text-sm text-gray-600 text-center mb-1">{venue}</p>
      <p className="text-sm text-gray-500 text-center mb-1">Winner: {winner}</p>
      <p className="text-sm text-gray-400 text-center">{new Date(matchDate).toDateString()}</p>
    </div>
  );
};

export default MatchCard;