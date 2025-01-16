"use client";

import React from "react";
import { useRouter } from "next/navigation";

interface Player {
  playerId: number;
  name: string;
  country: string;
  dateOfBirth: string;
  image: string;
  teamImage?: string;
}

interface PlayerListProps {
  players: Player[];
  onEdit: (player: Player) => void;
  onDelete: (playerId: number) => void;
}

const PlayerList: React.FC<PlayerListProps> = ({ players, onEdit, onDelete }) => {
  const router = useRouter(); // Hook for navigation

  if (players.length === 0) {
    return <div className="text-center text-gray-500">No players found.</div>;
  }

  return (
    <div className="grid grid-cols-2 gap-6">
      {players.map((player) => (
        <div
          key={player.playerId}
          className="bg-white shadow-lg rounded-lg p-6 flex flex-col items-center text-center"
        >
          <img
            src={player.image}
            alt={player.name}
            className="w-24 h-24 object-cover rounded-full mb-4"
          />
          <h3 className="text-lg font-bold">{player.name}</h3>
          <p className="text-sm text-gray-600 mb-2">Country: {player.country}</p>
          {player.teamImage && (
            <img
              src={player.teamImage}
              alt={`${player.country} flag`}
              className="w-8 h-8 object-contain mb-2"
            />
          )}
          <p className="text-sm text-gray-600 mb-2">
            DOB: {new Date(player.dateOfBirth).toLocaleDateString()}
          </p>
          <div className="mt-4 flex gap-2">
            {/* Update Button */}
            <button
              onClick={() => onEdit(player)}
              className="bg-yellow-500 text-white px-4 py-1 rounded hover:bg-yellow-600"
            >
              Update
            </button>

            {/* Delete Button */}
            <button
              onClick={() => onDelete(player.playerId)}
              className="bg-red-500 text-white px-4 py-1 rounded hover:bg-red-600"
            >
              Delete
            </button>

            {/* View Stats Button */}
            <button
              onClick={() => router.push(`/players/${player.playerId}/stats`)}
              className="bg-blue-500 text-white px-4 py-1 rounded hover:bg-blue-600"
            >
              View Stats
            </button>
          </div>
        </div>
      ))}
    </div>
  );
};

export default PlayerList;
