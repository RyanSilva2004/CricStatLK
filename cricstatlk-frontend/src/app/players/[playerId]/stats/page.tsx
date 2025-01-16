"use client";

import React, { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import axios from "axios";
import { toast } from "react-toastify";

const PlayerStatsPage = () => {
  const { playerId } = useParams();
  const [playerStats, setPlayerStats] = useState<any>(null);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetchPlayerStats = async () => {
      try {
        const response = await axios.get(
          `http://localhost:8080/api/players/${playerId}/stats`
        );
        setPlayerStats(response.data);
      } catch (error) {
        toast.error("Failed to fetch player statistics. Please try again.");
        console.error("Error fetching player stats:", error);
      } finally {
        setLoading(false);
      }
    };

    if (playerId) {
      fetchPlayerStats();
    }
  }, [playerId]);

  if (loading) {
    return <div className="text-center py-10">Loading player statistics...</div>;
  }

  if (!playerStats) {
    return <div className="text-center py-10">No data found for this player.</div>;
  }

  return (
    <div className="p-8 max-w-6xl mx-auto">
      <div className="bg-gradient-to-r from-green-400 to-blue-500 text-white p-6 rounded-lg shadow-lg">
        <div className="flex items-center gap-4">
          <img
            src={playerStats.image}
            alt={playerStats.name}
            className="w-24 h-24 object-cover rounded-full"
          />
          <div>
            <h1 className="text-3xl font-bold">{playerStats.name}</h1>
            <p className="text-lg">{playerStats.country}</p>
            <p className="text-sm text-gray-200">
              DOB: {new Date(playerStats.dateOfBirth).toLocaleDateString()}
            </p>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-3 gap-6 mt-6">
        {/* Total Runs */}
        <div className="bg-white shadow-lg p-4 rounded-lg text-center">
          <h2 className="text-xl font-bold text-gray-800">Total Runs</h2>
          <p className="text-2xl text-green-500 font-semibold">
            {playerStats.totalRuns}
          </p>
        </div>

        {/* Batting Average */}
        <div className="bg-white shadow-lg p-4 rounded-lg text-center">
          <h2 className="text-xl font-bold text-gray-800">Batting Average</h2>
          <p className="text-2xl text-green-500 font-semibold">
            {playerStats.battingAverage.toFixed(2)}
          </p>
        </div>

        {/* Total Hundreds */}
        <div className="bg-white shadow-lg p-4 rounded-lg text-center">
          <h2 className="text-xl font-bold text-gray-800">Hundreds</h2>
          <p className="text-2xl text-green-500 font-semibold">
            {playerStats.totalHundreds}
          </p>
        </div>

        {/* Total Fifties */}
        <div className="bg-white shadow-lg p-4 rounded-lg text-center">
          <h2 className="text-xl font-bold text-gray-800">Fifties</h2>
          <p className="text-2xl text-green-500 font-semibold">
            {playerStats.totalFifties}
          </p>
        </div>

        {/* Played Matches */}
        <div className="bg-white shadow-lg p-4 rounded-lg text-center">
          <h2 className="text-xl font-bold text-gray-800">Matches Played</h2>
          <p className="text-2xl text-green-500 font-semibold">
            {playerStats.playedMatches}
          </p>
        </div>

        {/* Total Wickets */}
        <div className="bg-white shadow-lg p-4 rounded-lg text-center">
          <h2 className="text-xl font-bold text-gray-800">Total Wickets</h2>
          <p className="text-2xl text-green-500 font-semibold">
            {playerStats.totalWickets}
          </p>
        </div>

        {/* Bowling Average */}
        <div className="bg-white shadow-lg p-4 rounded-lg text-center">
          <h2 className="text-xl font-bold text-gray-800">Bowling Average</h2>
          <p className="text-2xl text-green-500 font-semibold">
            {playerStats.bowlingAverage.toFixed(2)}
          </p>
        </div>

        {/* Total Catches */}
        <div className="bg-white shadow-lg p-4 rounded-lg text-center">
          <h2 className="text-xl font-bold text-gray-800">Catches</h2>
          <p className="text-2xl text-green-500 font-semibold">
            {playerStats.totalCatches}
          </p>
        </div>
      </div>
    </div>
  );
};

export default PlayerStatsPage;
