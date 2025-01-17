"use client";

import React, { useEffect, useState } from "react";
import { fetchTeamRecords } from "@/api/teams";
import TeamRecordCard from "@/components/TeamRecordCard";
import { toast } from "react-toastify";

const TeamsPage: React.FC = () => {
  const [teams, setTeams] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadTeams = async () => {
      try {
        const teamData = await fetchTeamRecords();
        setTeams(teamData);
      } catch (error) {
        console.error("Error loading team records:", error);
        toast.error("Failed to load team records. Please try again later.");
      } finally {
        setLoading(false);
      }
    };

    loadTeams();
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center">
        <div className="animate-pulse text-[#004236] text-xl font-medium">
          Loading team records...
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white">
      <div className="bg-[#004236] py-12">
        <div className="max-w-7xl mx-auto px-4">
          <h1 className="text-3xl md:text-4xl font-bold text-white text-center">
            Team Statistics
          </h1>
        </div>
      </div>
      
      <div className="max-w-7xl mx-auto px-4 py-8">
        {teams.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-gray-500 text-lg">No team records found</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {teams.map((team) => (
              <TeamRecordCard
                key={team.name}
                name={team.name}
                image={team.image}
                wins={team.wins}
                losses={team.losses}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default TeamsPage;

