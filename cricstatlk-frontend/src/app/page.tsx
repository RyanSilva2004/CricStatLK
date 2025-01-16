"use client";

import React, { useEffect, useState } from "react";
import { fetchMatches } from "@/api/matches";
import { fetchTopScorers, fetchTopBowlers } from "@/api/players";
import MatchCard from "@/components/MatchCard";
import TopScorerCard from "@/components/TopScorerCard";
import TopWicketTakerCard from "@/components/TopWicketTakerCard";

const HomePage = () => {
  const [matches, setMatches] = useState([]);
  const [topScorers, setTopScorers] = useState([]);
  const [topWicketTakers, setTopWicketTakers] = useState([]);

  useEffect(() => {
    const loadData = async () => {
      try {
        const [matchesData, topScorersData, topBowlersData] = await Promise.all([
          fetchMatches(),
          fetchTopScorers(),
          fetchTopBowlers(),
        ]);

        // Process top scorers
        const sortedTopScorers = topScorersData
          .sort((a, b) => b.totalRuns - a.totalRuns)
          .map((scorer, index) => ({ ...scorer, position: index + 1 }));

        // Process top wicket-takers
        const sortedTopBowlers = topBowlersData
          .sort((a, b) => b.totalWickets - a.totalWickets)
          .map((bowler, index) => ({ ...bowler, position: index + 1 }));

        setMatches(matchesData);
        setTopScorers(sortedTopScorers);
        setTopWicketTakers(sortedTopBowlers);
      } catch (error) {
        console.error("Error loading data:", error);
      }
    };

    loadData();
  }, []);

  return (
    <div className="p-4">
      {/* Matches Section */}
      <h1 className="text-2xl font-bold mb-4">Latest Matches</h1>
      <div className="overflow-x-auto mb-8">
        <div className="flex space-x-4">
          {matches.map((match: any) => (
            <MatchCard
              key={match.matchId}
              team1={match.team1Id}
              team2={match.team2Id}
              team1Score={match.team1Score}
              team2Score={match.team2Score}
              matchDate={match.matchDate}
              venue={match.venue}
              winner={match.winnerTeamId}
              team1Image={match.team1Image}
              team2Image={match.team2Image}
            />
          ))}
        </div>
      </div>

      {/* Top Run Scorers Section */}
      <h2 className="text-2xl font-bold mb-4">Top Run Scorers</h2>
      <div className="overflow-x-auto mb-8">
        <div className="flex space-x-4">
          {topScorers.map((scorer: any) => (
            <TopScorerCard
              key={scorer.playerId}
              position={scorer.position}
              name={scorer.name}
              country={scorer.country}
              image={scorer.image}
              totalRuns={scorer.totalRuns}
              battingAverage={scorer.battingAverage}
              totalHundreds={scorer.totalHundreds}
              totalFifties={scorer.totalFifties}
            />
          ))}
        </div>
      </div>

      {/* Top Wicket Takers Section */}
      <h2 className="text-2xl font-bold mb-4">Top Wicket Takers</h2>
      <div className="overflow-x-auto">
        <div className="flex space-x-4">
          {topWicketTakers.map((bowler: any) => (
            <TopWicketTakerCard
              key={bowler.playerId}
              position={bowler.position}
              name={bowler.name}
              country={bowler.country}
              image={bowler.image}
              totalWickets={bowler.totalWickets}
              totalRunsConceded={bowler.totalRunsConceded}
              bowlingAverage={bowler.bowlingAverage}
              total5Wickets={bowler.total5Wickets}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default HomePage;
