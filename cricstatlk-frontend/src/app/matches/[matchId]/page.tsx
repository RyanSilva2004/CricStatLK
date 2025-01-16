"use client";

import React, { useEffect, useState } from "react";
import { useRouter, useParams } from "next/navigation";
import { fetchMatchDetails } from "@/api/matches";
import { Card, CardContent } from "@/components/ui/card";
import { ArrowLeft, Trophy, BoltIcon as Bat, Target, Shield } from 'lucide-react';

const MatchPerformancePage = () => {
  const router = useRouter();
  const { matchId } = useParams();
  const [matchDetails, setMatchDetails] = useState<any>(null);

  useEffect(() => {
    if (!matchId) return;

    const getMatchDetails = async () => {
      try {
        const data = await fetchMatchDetails(Number(matchId));
        setMatchDetails(data);
      } catch (error) {
        console.error("Error fetching match details:", error);
      }
    };

    getMatchDetails();
  }, [matchId]);

  if (!matchDetails) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-[#004236] to-[#00A676]">
        <div className="animate-pulse text-white text-xl">Loading match details...</div>
      </div>
    );
  }

  const { team1Id, team2Id, team1Score, team2Score, winnerTeamId, venue, matchDate, performances, team1Image, team2Image } = matchDetails;

  const battingPerformances = performances
    .filter((performance: any) => performance.runs > 0)
    .sort((a: any, b: any) => b.runs - a.runs);
  const bowlingPerformances = performances
    .filter((performance: any) => performance.wickets > 0)
    .sort((a: any, b: any) => b.wickets - a.wickets);
  const fieldingPerformances = performances
    .filter((performance: any) => performance.catches > 0 || performance.runOuts > 0)
    .sort((a: any, b: any) => (b.catches + b.runOuts) - (a.catches + a.runOuts));

  const getGradient = (index: number) => {
    const gradients = [
      'from-yellow-400 to-yellow-300',
      'from-gray-400 to-gray-300',
      'from-amber-600 to-amber-500'
    ];
    return gradients[index] || 'from-blue-400 to-blue-300';
  };

  return (
    <div className="min-h-screen bg-gray-100">
      <div className="max-w-7xl mx-auto px-4 py-8">
        {/* Back Button */}
        <button 
          onClick={() => router.back()} 
          className="flex items-center text-[#004236] hover:text-[#00A676] mb-6"
        >
          <ArrowLeft className="w-5 h-5 mr-2" />
          <span className="font-medium">Back to Matches</span>
        </button>

        {/* Match Header */}
        <Card className="mb-8 border-none shadow-lg overflow-hidden">
          <CardContent className="p-0">
            <div className="bg-gradient-to-r from-[#004236] to-[#00A676] text-white p-6">
              <div className="flex flex-col md:flex-row justify-between items-center gap-4">
                <div className="flex items-center space-x-4">
                  <div className="w-20 h-20 bg-white rounded-full p-2 flex items-center justify-center">
                    <img src={team1Image || "/placeholder.svg"} alt={team1Id} className="w-20 h-20 object-contain" />
                  </div>
                  <h1 className="text-3xl font-bold">{team1Id}</h1>
                </div>
                <div className="text-4xl font-bold">VS</div>
                <div className="flex items-center space-x-4">
                  <h1 className="text-3xl font-bold">{team2Id}</h1>
                  <div className="w-20 h-20 bg-white rounded-full p-2 flex items-center justify-center">
                    <img src={team2Image || "/placeholder.svg"} alt={team2Id} className="w-20 h-20 object-contain" />
                  </div>
                </div>
              </div>
            </div>
            <div className="bg-white p-6">
              <div className="flex flex-col md:flex-row justify-between items-center gap-4">
                <div>
                  <p className="text-gray-600 text-lg mb-1">{venue}</p>
                  <p className="text-gray-500">{new Date(matchDate).toLocaleDateString('en-US', {
                    weekday: 'long',
                    year: 'numeric',
                    month: 'long',
                    day: 'numeric'
                  })}</p>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold mb-2">
                    <span className={winnerTeamId === team1Id ? "text-[#00A676]" : "text-gray-700"}>
                      {team1Score}
                    </span>
                    <span className="mx-2 text-gray-400">-</span>
                    <span className={winnerTeamId === team2Id ? "text-[#00A676]" : "text-gray-700"}>
                      {team2Score}
                    </span>
                  </div>
                  <p className="text-[#00A676] font-semibold flex items-center justify-center">
                    <Trophy className="w-5 h-5 mr-2" />
                    {winnerTeamId} won
                  </p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Performance Sections */}
        <div className="grid md:grid-cols-3 gap-8">
          {/* Batting */}
          <div>
            <h2 className="text-xl font-bold text-[#004236] mb-4 pb-2 border-b-2 border-[#00A676] flex items-center">
              <Bat className="w-6 h-6 mr-2" />
              Top Batting Performances
            </h2>
            {battingPerformances.length > 0 ? (
              <div className="space-y-4">
                {battingPerformances.slice(0, 3).map((performance: any, index: number) => (
                  <Card key={performance.performanceId} className="hover:shadow-md transition-shadow overflow-hidden">
                    <CardContent className="p-0">
                      <div className={`flex items-center gap-4 bg-gradient-to-r ${getGradient(index)} p-4`}>
                        <div className="w-16 h-16 rounded-full overflow-hidden bg-white flex items-center justify-center">
                          <img 
                            src={performance.playerImage || "/placeholder.svg"} 
                            alt={performance.playerName} 
                            className="w-16 h-16 object-cover"
                          />
                        </div>
                        <div>
                          <p className="font-bold text-[#004236] text-lg">{performance.playerName}</p>
                          <p className="text-sm text-gray-700">{performance.teamId}</p>
                        </div>
                      </div>
                      <div className="p-4 bg-white">
                        <div className="flex justify-between items-center">
                          <div>
                            <p className="text-4xl font-bold text-[#00A676]">{performance.runs}</p>
                            <p className="text-sm text-gray-500">runs</p>
                          </div>
                          <p className="text-sm text-gray-500">({performance.ballsFaced} balls)</p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            ) : (
              <p className="text-gray-500 italic">No batting performances recorded</p>
            )}
          </div>

          {/* Bowling */}
          <div>
            <h2 className="text-xl font-bold text-[#004236] mb-4 pb-2 border-b-2 border-[#00A676] flex items-center">
              <Target className="w-6 h-6 mr-2" />
              Top Bowling Performances
            </h2>
            {bowlingPerformances.length > 0 ? (
              <div className="space-y-4">
                {bowlingPerformances.slice(0, 3).map((performance: any, index: number) => (
                  <Card key={performance.performanceId} className="hover:shadow-md transition-shadow overflow-hidden">
                    <CardContent className="p-0">
                      <div className={`flex items-center gap-4 bg-gradient-to-r ${getGradient(index)} p-4`}>
                        <div className="w-16 h-16 rounded-full overflow-hidden bg-white flex items-center justify-center">
                          <img 
                            src={performance.playerImage || "/placeholder.svg"} 
                            alt={performance.playerName} 
                            className="w-16 h-16 object-cover"
                          />
                        </div>
                        <div>
                          <p className="font-bold text-[#004236] text-lg">{performance.playerName}</p>
                          <p className="text-sm text-gray-700">{performance.teamId}</p>
                        </div>
                      </div>
                      <div className="p-4 bg-white">
                        <div className="flex justify-between items-center">
                          <div>
                            <p className="text-4xl font-bold text-[#00A676]">{performance.wickets}</p>
                            <p className="text-sm text-gray-500">wickets</p>
                          </div>
                          <div className="text-right">
                            <p className="text-xl font-semibold text-gray-700">{performance.runsConceded}</p>
                            <p className="text-sm text-gray-500">runs conceded</p>
                          </div>
                        </div>
                        <p className="text-sm text-gray-500 mt-2">
                          Economy: {(performance.runsConceded / (performance.oversBowled || 1)).toFixed(2)}
                        </p>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            ) : (
              <p className="text-gray-500 italic">No bowling performances recorded</p>
            )}
          </div>

          {/* Fielding */}
          <div>
            <h2 className="text-xl font-bold text-[#004236] mb-4 pb-2 border-b-2 border-[#00A676] flex items-center">
              <Shield className="w-6 h-6 mr-2" />
              Top Fielding Performances
            </h2>
            {fieldingPerformances.length > 0 ? (
              <div className="space-y-4">
                {fieldingPerformances.slice(0, 3).map((performance: any, index: number) => (
                  <Card key={performance.performanceId} className="hover:shadow-md transition-shadow overflow-hidden">
                    <CardContent className="p-0">
                      <div className={`flex items-center gap-4 bg-gradient-to-r ${getGradient(index)} p-4`}>
                        <div className="w-16 h-16 rounded-full overflow-hidden bg-white flex items-center justify-center">
                          <img 
                            src={performance.playerImage || "/placeholder.svg"} 
                            alt={performance.playerName} 
                            className="w-16 h-16 object-cover"
                          />
                        </div>
                        <div>
                          <p className="font-bold text-[#004236] text-lg">{performance.playerName}</p>
                          <p className="text-sm text-gray-700">{performance.teamId}</p>
                        </div>
                      </div>
                      <div className="p-4 bg-white">
                        <div className="flex justify-between items-center">
                          <div>
                            <p className="text-4xl font-bold text-[#00A676]">{performance.catches}</p>
                            <p className="text-sm text-gray-500">catches</p>
                          </div>
                          {performance.runOuts > 0 && (
                            <div className="text-right">
                              <p className="text-4xl font-bold text-[#00A676]">{performance.runOuts}</p>
                              <p className="text-sm text-gray-500">run outs</p>
                            </div>
                          )}
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            ) : (
              <p className="text-gray-500 italic">No fielding performances recorded</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default MatchPerformancePage;

