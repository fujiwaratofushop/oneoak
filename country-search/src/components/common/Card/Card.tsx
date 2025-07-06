import { ICard } from "./types";

export const CountryCard = ({ name, flag, capital, continent }: ICard) => {
  return (
    <div className="rounded-lg border-gray-300 p-2 shadow-sm bg-white">
      <img src={flag} alt={`${name} flag`} className="w-full h-24 object-cover rounded" />
      <h2 className="text-base font-medium mt-1">{name}</h2>
      <p className="text-xs text-gray-600">Capital: {capital}</p>
      <p className="text-xs text-gray-600">Continent: {continent}</p>
    </div>
  );
};

export default CountryCard