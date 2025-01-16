'use client'

import React from "react";
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"

interface MatchProps {
  matchId: number;
  team1Id: string;
  team2Id: string;
  team1Score: number;
  team2Score: number;
  matchDate: string;
  venue: string;
  winnerTeamId: string;
  team1Image: string;
  team2Image: string;
}

const MatchList: React.FC<{ matches: MatchProps[]; onUpdate: (id: number) => void; onViewPerformance: (id: number) => void }> = ({ matches, onUpdate, onViewPerformance }) => {
  if (!matches || matches.length === 0) {
    return <div className="p-4 text-center text-gray-500">No matches available.</div>;
  }

  return (
    <div className="space-y-4">
      {matches.map((match) => (
        <Card key={match.matchId} className="overflow-hidden">
          <CardContent className="p-0">
            <div className="flex items-center justify-between bg-gray-100 p-4">
              <div className="flex items-center space-x-4">
                <img
                  src={match.team1Image || "/placeholder.svg"}
                  alt={match.team1Id}
                  className="w-10 h-10 object-contain"
                />
                <div>
                  <p className="font-bold">{match.team1Id}</p>
                  <p className="text-lg font-bold">{match.team1Score}</p>
                </div>
              </div>
              <div className="text-center">
                <p className="text-xs text-gray-500 font-semibold">VS</p>
              </div>
              <div className="flex items-center space-x-4">
                <div className="text-right">
                  <p className="font-bold">{match.team2Id}</p>
                  <p className="text-lg font-bold">{match.team2Score}</p>
                </div>
                <img
                  src={match.team2Image || "/placeholder.svg"}
                  alt={match.team2Id}
                  className="w-10 h-10 object-contain"
                />
              </div>
            </div>
            <div className="p-4">
              <div className="flex justify-between items-center mb-2">
                <p className="text-sm text-gray-500">{new Date(match.matchDate).toLocaleDateString()}</p>
                <p className="text-sm text-gray-500">{match.venue}</p>
              </div>
              <div className="flex justify-between items-center mb-4">
                <p className="text-sm text-gray-500">Winner:</p>
                <p className={`text-sm font-bold ${match.winnerTeamId === match.team1Id ? "text-blue-600" : "text-green-600"}`}>
                  {match.winnerTeamId}
                </p>
              </div>
              <div className="flex justify-between space-x-2">
                <Button
                  onClick={() => onUpdate(match.matchId)}
                  className="w-1/2 bg-[#00A676] hover:bg-[#008d63] text-white"
                >
                  Update
                </Button>
                <Button
                  onClick={() => onViewPerformance(match.matchId)}
                  className="w-1/2 bg-[#004236] hover:bg-[#003529] text-white"
                >
                  View Performance
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
};

export default MatchList;

