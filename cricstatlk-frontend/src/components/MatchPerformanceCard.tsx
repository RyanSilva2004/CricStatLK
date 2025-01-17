"use client"

import React, { useEffect, useState } from 'react';
import Image from 'next/image';
import { fetchMatchDetails } from '@/api/matches';
import { toast } from 'react-toastify';
import AddPerformanceForm from './AddPerformanceForm';
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Trophy, BoltIcon as Bat, Target, Shield } from 'lucide-react';

const MatchPerformanceCard: React.FC<{ matchId: number }> = ({ matchId }) => {
  const [matchDetails, setMatchDetails] = useState<any | null>(null);
  const [performances, setPerformances] = useState<any[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [isAddPerformanceOpen, setIsAddPerformanceOpen] = useState<boolean>(false);

  useEffect(() => {
    const loadMatchDetails = async () => {
      setLoading(true);
      try {
        const matchData = await fetchMatchDetails(matchId);
        setMatchDetails(matchData);
        setPerformances(matchData.performances);
      } catch (error) {
        toast.error('Failed to load match details');
      } finally {
        setLoading(false);
      }
    };

    loadMatchDetails();
  }, [matchId]);

  const sortPerformances = (category: string) => {
    switch (category) {
      case 'batting':
        return [...performances].sort((a, b) => b.runs - a.runs);
      case 'bowling':
        return [...performances].sort((a, b) => b.wickets - a.wickets);
      case 'fielding':
        return [...performances].sort((a, b) => b.catches - a.catches);
      default:
        return performances;
    }
  };

  const handleAddPerformanceClick = () => setIsAddPerformanceOpen(true);
  const handleCloseForm = () => setIsAddPerformanceOpen(false);

  if (loading) {
    return (
      <Card className="w-full max-w-4xl mx-auto">
        <CardContent className="p-6">
          <div className="text-center text-gray-500">Loading match details...</div>
        </CardContent>
      </Card>
    );
  }

  if (!matchDetails) {
    return null;
  }

  return (
    <Card className="w-full max-w-4xl mx-auto">
      <CardContent className="p-6">
        <div className="text-center mb-6">
          <h2 className="text-2xl font-bold mb-2 text-[#004236]">
            {matchDetails.team1Id} vs {matchDetails.team2Id}
          </h2>
          <p className="text-sm text-gray-500">{new Date(matchDetails.matchDate).toLocaleDateString()}</p>
          <p className="text-sm text-gray-500 mb-4">{matchDetails.venue}</p>
          <div className="flex gap-4 justify-center items-center">
            <div className="text-right">
              <p className="font-semibold text-[#004236]">{matchDetails.team1Id}</p>
              <p className="text-2xl font-bold text-[#00A676]">{matchDetails.team1Score}</p>
            </div>
            <div className="flex gap-4">
              <div className="w-16 h-16 bg-gray-100 rounded-full p-1 flex items-center justify-center">
                <Image
                  src={matchDetails.team1Image || "/placeholder.svg"}
                  alt={matchDetails.team1Id}
                  width={56}
                  height={56}
                  className="rounded-full"
                />
              </div>
              <div className="w-16 h-16 bg-gray-100 rounded-full p-1 flex items-center justify-center">
                <Image
                  src={matchDetails.team2Image || "/placeholder.svg"}
                  alt={matchDetails.team2Id}
                  width={56}
                  height={56}
                  className="rounded-full"
                />
              </div>
            </div>
            <div className="text-left">
              <p className="font-semibold text-[#004236]">{matchDetails.team2Id}</p>
              <p className="text-2xl font-bold text-[#00A676]">{matchDetails.team2Score}</p>
            </div>
          </div>
          <div className="mt-4 flex items-center justify-center text-[#00A676]">
            <Trophy className="w-5 h-5 mr-2" />
            <p className="font-semibold">Winner: {matchDetails.winnerTeamId}</p>
          </div>
        </div>

        <Tabs defaultValue="batting" className="w-full">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="batting" className="data-[state=active]:bg-[#004236] data-[state=active]:text-white">
              <Bat className="w-4 h-4 mr-2" />
              Batting
            </TabsTrigger>
            <TabsTrigger value="bowling" className="data-[state=active]:bg-[#004236] data-[state=active]:text-white">
              <Target className="w-4 h-4 mr-2" />
              Bowling
            </TabsTrigger>
            <TabsTrigger value="fielding" className="data-[state=active]:bg-[#004236] data-[state=active]:text-white">
              <Shield className="w-4 h-4 mr-2" />
              Fielding
            </TabsTrigger>
          </TabsList>
          <TabsContent value="batting">
            <ScrollArea className="w-full whitespace-nowrap rounded-md border">
              <div className="flex w-max space-x-4 p-4">
                {sortPerformances('batting').slice(0, 5).map((performance) => (
                  <PerformanceCard
                    key={performance.performanceId}
                    performance={performance}
                    statLabel="Runs"
                    statValue={performance.runs}
                    subStat={`${performance.ballsFaced} balls`}
                  />
                ))}
              </div>
              <ScrollBar orientation="horizontal" />
            </ScrollArea>
          </TabsContent>
          <TabsContent value="bowling">
            <ScrollArea className="w-full whitespace-nowrap rounded-md border">
              <div className="flex w-max space-x-4 p-4">
                {sortPerformances('bowling').slice(0, 5).map((performance) => (
                  <PerformanceCard
                    key={performance.performanceId}
                    performance={performance}
                    statLabel="Wickets"
                    statValue={performance.wickets}
                    subStat={`${performance.runsConceded} runs`}
                  />
                ))}
              </div>
              <ScrollBar orientation="horizontal" />
            </ScrollArea>
          </TabsContent>
          <TabsContent value="fielding">
            <ScrollArea className="w-full whitespace-nowrap rounded-md border">
              <div className="flex w-max space-x-4 p-4">
                {sortPerformances('fielding').slice(0, 5).map((performance) => (
                  <PerformanceCard
                    key={performance.performanceId}
                    performance={performance}
                    statLabel="Catches"
                    statValue={performance.catches}
                    subStat={`${performance.runOuts || 0} run outs`}
                  />
                ))}
              </div>
              <ScrollBar orientation="horizontal" />
            </ScrollArea>
          </TabsContent>
        </Tabs>

        <div className="text-center mt-6">
          <Button
            onClick={handleAddPerformanceClick}
            className="bg-[#004236] text-white hover:bg-[#00A676]"
          >
            Add Performance
          </Button>
        </div>

        {isAddPerformanceOpen && (
          <AddPerformanceForm matchId={matchId} closeForm={handleCloseForm} />
        )}
      </CardContent>
    </Card>
  );
};

const PerformanceCard: React.FC<{
  performance: any;
  statLabel: string;
  statValue: number;
  subStat: string;
}> = ({ performance, statLabel, statValue, subStat }) => (
  <Card className="w-[250px] overflow-hidden">
    <CardContent className="p-4">
      <div className="flex items-center gap-4 mb-2">
        <div className="w-12 h-12 bg-gray-100 rounded-full overflow-hidden">
          <Image
            src={performance.playerImage || "/placeholder.svg"}
            alt={performance.playerName}
            width={48}
            height={48}
            className="object-cover"
          />
        </div>
        <div>
          <h4 className="font-bold text-[#004236] truncate">{performance.playerName}</h4>
          <p className="text-xs text-gray-500">{performance.teamId}</p>
        </div>
      </div>
      <div className="text-center">
        <p className="text-3xl font-bold text-[#00A676]">{statValue}</p>
        <p className="text-sm font-medium text-[#004236]">{statLabel}</p>
        <p className="text-xs text-gray-500">{subStat}</p>
      </div>
    </CardContent>
  </Card>
);

export default MatchPerformanceCard;

