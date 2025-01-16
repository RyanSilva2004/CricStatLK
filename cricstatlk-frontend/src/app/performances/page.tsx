"use client";
import React, { useEffect, useState } from 'react';
import { fetchMatches, fetchMatchDetails } from '@/api/matches'; // Import API calls
import { toast } from 'react-toastify';
import MatchPerformanceCard from '@/components/MatchPerformanceCard'; // Import the reusable component

const PerformancePage = () => {
  const [matches, setMatches] = useState<any[]>([]); // Store matches
  const [loading, setLoading] = useState<boolean>(false); // Loading state for performance fetching

  // Fetch all matches
  useEffect(() => {
    const loadMatches = async () => {
      setLoading(true);
      try {
        const matchesData = await fetchMatches();
        setMatches(matchesData); // Store fetched matches
      } catch (error) {
        toast.error('Failed to load matches');
      } finally {
        setLoading(false);
      }
    };
    loadMatches();
  }, []);

  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold mb-6">Performance Page</h1>

      {/* Loading Indicator */}
      {loading && <div className="text-center text-gray-500">Loading matches...</div>}

      {/* Match Performance Cards */}
      <div className="space-y-6">
        {matches.map((match) => (
          <MatchPerformanceCard key={match.matchId} matchId={match.matchId} />
        ))}
      </div>
    </div>
  );
};

export default PerformancePage;
