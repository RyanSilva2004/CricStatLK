"use client";

import React, { useState, useEffect } from "react";
import { fetchPlayers, createPlayer, searchPlayers, updatePlayer, deletePlayer } from "@/api/players";
import { fetchTeams } from "@/api/teams";
import { toast } from "react-toastify";
import PlayerList from "@/components/PlayerList";
import UpdatePlayerModal from "@/components/UpdatePlayerModal";

const PlayersPage = () => {
  const [players, setPlayers] = useState<any[]>([]);
  const [teams, setTeams] = useState<any[]>([]);
  const [name, setName] = useState<string>("");
  const [country, setCountry] = useState<string>("");
  const [dateOfBirth, setDateOfBirth] = useState<string>("");
  const [image, setImage] = useState<string>("");
  const [searchName, setSearchName] = useState<string>("");
  const [searchCountry, setSearchCountry] = useState<string>("");
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedPlayer, setSelectedPlayer] = useState<any>(null);

  // Fetch players and teams
  useEffect(() => {
    const loadData = async () => {
      try {
        const [playersData, teamsData] = await Promise.all([fetchPlayers(), fetchTeams()]);
        setPlayers(playersData);
        setTeams(teamsData);
      } catch (error) {
        toast.error("Failed to load data. Please try again.");
        console.error("Error loading data:", error);
      }
    };

    loadData();
  }, []);

  // Handle creating a player
  const handleCreatePlayer = async (e: React.FormEvent) => {
    e.preventDefault();

    const newPlayer = {
      name,
      country,
      dateOfBirth,
      image,
    };

    try {
      const createdPlayer = await createPlayer(newPlayer);
      toast.success("Player created successfully!");
      setPlayers([...players, createdPlayer]); // Add to list
      resetCreateForm();
    } catch (error) {
      toast.error("Error creating player. Please try again.");
      console.error("Error creating player:", error);
    }
  };

  // Reset create form
  const resetCreateForm = () => {
    setName("");
    setCountry("");
    setDateOfBirth("");
    setImage("");
  };

  // Handle search
  const handleSearch = async () => {
    try {
      const result = await searchPlayers(
        searchName.trim() || undefined,
        searchCountry || undefined
      );
      setPlayers(result);
      toast.success("Search completed successfully!");
    } catch (error) {
      toast.error("Error while searching players. Please try again.");
      console.error("Error searching players:", error);
    }
  };

  // Reset search
  const resetSearch = async () => {
    setSearchName("");
    setSearchCountry("");
    try {
      const playersData = await fetchPlayers();
      setPlayers(playersData);
    } catch (error) {
      toast.error("Error resetting search. Please try again.");
      console.error("Error resetting search:", error);
    }
  };

  // Handle player update
  const handleUpdatePlayer = async (updatedPlayer: any) => {
    try {
      const playerData = await updatePlayer(updatedPlayer);
      setPlayers((prevPlayers) =>
        prevPlayers.map((player) =>
          player.playerId === playerData.playerId ? playerData : player
        )
      );
      toast.success("Player updated successfully!");
      setIsModalOpen(false);
    } catch (error) {
      toast.error("Error updating player. Please try again.");
      console.error("Error updating player:", error);
    }
  };

  // Handle player delete
  const handleDeletePlayer = async (playerId: number) => {
    try {
      await deletePlayer(playerId);
      setPlayers((prevPlayers) =>
        prevPlayers.filter((player) => player.playerId !== playerId)
      );
      toast.success("Player deleted successfully!");
    } catch (error) {
      toast.error("Error deleting player. Please try again.");
      console.error("Error deleting player:", error);
    }
  };

  return (
    <div className="grid grid-cols-2 gap-6 p-8">
      {/* Left: Create Player Form */}
      <div className="bg-white shadow-lg rounded p-6">
        <h2 className="text-2xl font-bold mb-4">Create New Player</h2>
        <form onSubmit={handleCreatePlayer}>
          <div className="mb-4">
            <label className="block text-sm font-medium">Name</label>
            <input
              type="text"
              className="w-full p-2 border rounded"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
          </div>

          <div className="mb-4">
            <label className="block text-sm font-medium mb-2">Country</label>
            <div className="relative">
              <button
                type="button"
                className="w-full p-2 border rounded bg-white flex justify-between items-center"
                onClick={() => setIsDropdownOpen(!isDropdownOpen)}
              >
                {country
                  ? teams.find((team) => team.id === country)?.name
                  : "Select Country"}
                <span className="ml-2 text-gray-500">▼</span>
              </button>

              {isDropdownOpen && (
                <ul className="absolute w-full border rounded bg-white mt-1 z-10 shadow-lg max-h-48 overflow-auto">
                  {teams.map((team) => (
                    <li
                      key={team.id}
                      className="p-2 hover:bg-gray-100 cursor-pointer flex items-center gap-2"
                      onClick={() => {
                        setCountry(team.id);
                        setIsDropdownOpen(false);
                      }}
                    >
                      <img
                        src={team.image}
                        alt={team.name}
                        className="w-6 h-6 rounded-full"
                      />
                      {team.name}
                    </li>
                  ))}
                </ul>
              )}
            </div>
          </div>

          <div className="mb-4">
            <label className="block text-sm font-medium">Date of Birth</label>
            <input
              type="date"
              className="w-full p-2 border rounded"
              value={dateOfBirth}
              onChange={(e) => setDateOfBirth(e.target.value)}
              required
            />
          </div>

          <div className="mb-4">
            <label className="block text-sm font-medium">Image URL</label>
            <input
              type="url"
              className="w-full p-2 border rounded"
              value={image}
              onChange={(e) => setImage(e.target.value)}
              required
            />
          </div>

          <button
            type="submit"
            className="w-full bg-blue-500 text-white py-2 rounded hover:bg-blue-600"
          >
            Create Player
          </button>
        </form>
      </div>

      {/* Right: Player List and Search */}
      <div>
        <div className="mb-6">
          <h2 className="text-2xl font-bold mb-4">Search Players</h2>
          <div className="grid grid-cols-2 gap-4 mb-4">
            <input
              type="text"
              placeholder="Search by name"
              className="w-full p-2 border rounded"
              value={searchName}
              onChange={(e) => setSearchName(e.target.value)}
            />
            <div className="relative">
              <button
                type="button"
                className="w-full p-2 border rounded bg-white flex justify-between items-center"
                onClick={() => setIsDropdownOpen(!isDropdownOpen)}
              >
                {searchCountry
                  ? teams.find((team) => team.id === searchCountry)?.name
                  : "Select Country"}
                <span className="ml-2 text-gray-500">▼</span>
              </button>

              {isDropdownOpen && (
                <ul className="absolute w-full border rounded bg-white mt-1 z-10 shadow-lg max-h-48 overflow-auto">
                  {teams.map((team) => (
                    <li
                      key={team.id}
                      className="p-2 hover:bg-gray-100 cursor-pointer flex items-center gap-2"
                      onClick={() => {
                        setSearchCountry(team.id);
                        setIsDropdownOpen(false);
                      }}
                    >
                      <img
                        src={team.image}
                        alt={team.name}
                        className="w-6 h-6 rounded-full"
                      />
                      {team.name}
                    </li>
                  ))}
                </ul>
              )}
            </div>
          </div>
          <div className="flex gap-4">
            <button
              onClick={handleSearch}
              className="w-1/2 bg-green-500 text-white py-2 rounded hover:bg-green-600"
            >
              Search
            </button>
            <button
              onClick={resetSearch}
              className="w-1/2 bg-gray-500 text-white py-2 rounded hover:bg-gray-600"
            >
              Reset
            </button>
          </div>
        </div>
        <PlayerList
          players={players}
          onEdit={(player) => {
            setSelectedPlayer(player);
            setIsModalOpen(true);
          }}
          onDelete={handleDeletePlayer}
          onViewStats={(playerId) => {
            console.log("View stats for playerId:", playerId);
          }}
        />
      </div>

      {isModalOpen && selectedPlayer && (
        <UpdatePlayerModal
          player={selectedPlayer}
          onUpdate={handleUpdatePlayer}
          onClose={() => setIsModalOpen(false)}
        />
      )}
    </div>
  );
};

export default PlayersPage;
