import React, { useState } from "react";

const UpdatePlayerModal = ({
  player,
  onUpdate,
  onClose,
}: {
  player: any;
  onUpdate: (updatedPlayer: any) => void;
  onClose: () => void;
}) => {
  const [name, setName] = useState<string>(player.name);
  const [country, setCountry] = useState<string>(player.country);
  const [dateOfBirth, setDateOfBirth] = useState<string>(player.dateOfBirth);
  const [image, setImage] = useState<string>(player.image);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const updatedPlayer = {
      ...player,
      name,
      country,
      dateOfBirth,
      image,
    };

    onUpdate(updatedPlayer);
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg p-6 w-1/3">
        <h2 className="text-xl font-bold mb-4">Update Player</h2>
        <form onSubmit={handleSubmit}>
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
            <label className="block text-sm font-medium">Country</label>
            <input
              type="text"
              className="w-full p-2 border rounded"
              value={country}
              onChange={(e) => setCountry(e.target.value)}
              required
            />
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

          <div className="flex justify-end gap-4">
            <button
              type="button"
              onClick={onClose}
              className="bg-gray-500 text-white px-4 py-2 rounded hover:bg-gray-600"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
            >
              Update
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default UpdatePlayerModal;
