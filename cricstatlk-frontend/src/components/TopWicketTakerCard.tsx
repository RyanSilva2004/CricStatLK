import React from "react";

type TopWicketTakerProps = {
  position: number;
  name: string;
  country: string;
  image: string;
  totalWickets: number;
  bowlingAverage: number;
  totalRunsConceded : number;
  total5Wickets: number;
};

const getPositionLabelClass = (position: number) => {
  switch (position) {
    case 1:
      return 'bg-gradient-to-r from-yellow-400 via-yellow-500 to-yellow-600 text-white inline-block whitespace-nowrap';
    case 2:
      return 'bg-gradient-to-r from-gray-300 via-gray-400 to-gray-500 text-white inline-block whitespace-nowrap';
    case 3:
      return 'bg-gradient-to-r from-blue-400 via-blue-500 to-blue-600 text-white inline-block whitespace-nowrap';
    default:
      return 'bg-gray-200 text-gray-700 inline-block whitespace-nowrap'; // Default background for positions beyond 3rd
  }
};

const TopWicketTakerCard: React.FC<TopWicketTakerProps> = ({
  position,
  name,
  country,
  image,
  totalWickets,
  bowlingAverage,
  total5Wickets,
  totalRunsConceded,
}) => {
  const positionClass = getPositionLabelClass(position);

  return (
    <div className="border rounded-md p-4 shadow-sm bg-white flex items-center space-x-4 w-25">
      <img
        src={image}
        alt={`${name}'s image`}
        className="h-20 w-20 rounded-full object-cover"
      />
      <div className="flex flex-col justify-between">
        <div className="flex items-center space-x-2">
          <span
            className={`px-3 py-1 rounded-full font-semibold ${positionClass}`}
          >
            {position}{" "}
            {position === 1 ? "st" : position === 2 ? "nd" : position === 3 ? "rd" : "th"}
          </span>
          <h3 className="font-bold text-lg">{name}</h3>
        </div>
        <div className="mb-2"></div>
        <p className="text-sm text-gray-500">{country}</p>
        <p className="text-sm text-gray-600">Wickets: {totalWickets}</p>
        <p className="text-sm text-gray-600">Runs Conceeded: {totalRunsConceded}</p>
        <p className="text-sm text-gray-600">
          Bowling Avg: {bowlingAverage.toFixed(2)}
        </p>
        <p className="text-sm text-gray-600">5W Hauls: {total5Wickets}</p>
      </div>
    </div>
  );
};

export default TopWicketTakerCard;
