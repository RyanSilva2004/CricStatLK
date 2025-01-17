"use client"

import React, { useState } from "react";
import Image from "next/image";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { ScrollArea } from "@/components/ui/scroll-area";
import { PieChart, Pie, Cell, ResponsiveContainer } from "recharts";
import { fetchPlayersByTeam } from "@/api/teams";
import { toast } from "react-toastify";
import { Users, Trophy, X } from 'lucide-react';

interface TeamRecordCardProps {
  name: string;
  image: string;
  wins: number;
  losses: number;
}

const TeamRecordCard: React.FC<TeamRecordCardProps> = ({ name, image, wins, losses }) => {
  const [showPopup, setShowPopup] = useState(false);
  const [players, setPlayers] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);

  const total = wins + losses;
  const winPercentage = total ? (wins / total) * 100 : 0;
  const lossPercentage = total ? (losses / total) * 100 : 0;

  const data = [
    { name: "Wins", value: winPercentage },
    { name: "Losses", value: lossPercentage },
  ];

  const COLORS = ["#00A676", "#E63946"];

  const handleViewPlayers = async () => {
    setLoading(true);
    try {
      const fetchedPlayers = await fetchPlayersByTeam(name);
      setPlayers(fetchedPlayers);
      setShowPopup(true);
    } catch (error) {
      toast.error("Failed to fetch players.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Card className="w-full max-w-sm bg-white shadow-sm hover:shadow-md transition-shadow duration-300">
        <CardContent className="p-6">
          <div className="flex items-center gap-4 mb-6">
            <div className="relative w-16 h-16 bg-gray-50 rounded-full p-1 border border-gray-100">
              <Image
                src={image || "/placeholder.svg"}
                alt={name}
                layout="fill"
                objectFit="contain"
                className="rounded-full"
              />
            </div>
            <div>
              <h3 className="text-xl font-bold text-[#004236]">{name}</h3>
              <p className="text-sm text-gray-500">
                Win rate: {winPercentage.toFixed(1)}%
              </p>
            </div>
          </div>
          
          <div className="flex justify-between items-center mb-6">
            <div className="text-center px-6 py-3 bg-gray-50 rounded-lg">
              <p className="text-3xl font-bold text-[#00A676]">{wins}</p>
              <p className="text-sm text-gray-600 font-medium">Wins</p>
            </div>
            <div className="text-center px-6 py-3 bg-gray-50 rounded-lg">
              <p className="text-3xl font-bold text-[#E63946]">{losses}</p>
              <p className="text-sm text-gray-600 font-medium">Losses</p>
            </div>
          </div>

          <div className="w-full h-40 mb-6">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={data}
                  cx="50%"
                  cy="50%"
                  innerRadius={50}
                  outerRadius={70}
                  fill="#8884d8"
                  paddingAngle={5}
                  dataKey="value"
                >
                  {data.map((entry, index) => (
                    <Cell 
                      key={`cell-${index}`} 
                      fill={COLORS[index % COLORS.length]}
                      stroke="none"
                    />
                  ))}
                </Pie>
              </PieChart>
            </ResponsiveContainer>
          </div>

          <Button
            className="w-full bg-[#004236] text-white hover:bg-[#00A676] transition-colors duration-300"
            onClick={handleViewPlayers}
            disabled={loading}
          >
            {loading ? (
              "Loading..."
            ) : (
              <>
                <Users className="w-4 h-4 mr-2" />
                View Squad
              </>
            )}
          </Button>
        </CardContent>
      </Card>

      <Dialog open={showPopup} onOpenChange={setShowPopup}>
        <DialogContent className="max-w-4xl max-h-[90vh] p-0 gap-0">
          <div className="sticky top-0 z-10 bg-[#004236] text-white p-6 flex items-center justify-between">
            <DialogTitle className="text-xl font-bold flex items-center m-0 p-0">
              <Trophy className="w-5 h-5 mr-2" />
              {name} Squad
            </DialogTitle>
            <Button
              variant="ghost"
              size="icon"
              className="text-white hover:text-white hover:bg-[#00A676]"
              onClick={() => setShowPopup(false)}
            >
              <X className="h-4 w-4" />
            </Button>
          </div>

          <ScrollArea className="max-h-[calc(90vh-100px)] p-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {players.map((player) => (
                <Card 
                  key={player.playerId} 
                  className="overflow-hidden border-0 shadow-sm hover:shadow transition-shadow duration-300"
                >
                  <CardContent className="p-4">
                    <div className="flex items-center gap-3 mb-4">
                      <div className="relative w-16 h-16 bg-gray-50 rounded-full overflow-hidden">
                        <Image
                          src={player.image || "/placeholder.svg"}
                          alt={player.name}
                          layout="fill"
                          objectFit="cover"
                        />
                      </div>
                      <div>
                        <h4 className="font-bold text-[#004236] text-lg">{player.name}</h4>
                        <p className="text-sm text-gray-500">
                          {player.stats[0].playedMatches} matches
                        </p>
                      </div>
                    </div>
                    <div className="grid grid-cols-3 gap-2 text-center">
                      <StatBox label="Runs" value={player.stats[0].totalRuns} />
                      <StatBox label="Wickets" value={player.stats[0].totalWickets} />
                      <StatBox label="Catches" value={player.stats[0].totalCatches} />
                      <StatBox label="50s" value={player.stats[0].totalFifties} />
                      <StatBox label="100s" value={player.stats[0].totalHundreds} />
                      <StatBox 
                        label="Avg" 
                        value={(player.stats[0].totalRuns / player.stats[0].playedMatches).toFixed(2)} 
                      />
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </ScrollArea>
        </DialogContent>
      </Dialog>
    </>
  );
};

const StatBox: React.FC<{ label: string; value: number | string }> = ({ label, value }) => (
  <div className="bg-gray-50 p-2 rounded">
    <p className="text-lg font-bold text-[#00A676]">{value}</p>
    <p className="text-xs text-gray-600">{label}</p>
  </div>
);

export default TeamRecordCard;

