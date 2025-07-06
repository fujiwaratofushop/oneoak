'use client';
import { useRouter, useSearchParams } from 'next/navigation';
import { useState } from 'react';
import { ISearchBar } from './types';
import { CONTINENTS } from '@/constants/constants';
import { useCountrySuggestions } from '@/hooks/useCountrySuggestions';

export const SearchBar = ({ isCompact }: ISearchBar) => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [continent, setContinent] = useState(searchParams.get('continent') || '');
  const [country, setCountry] = useState(searchParams.get('name') || '');
  const [focused, setFocused] = useState(false);
  
  const {suggestions, setSuggestions } = useCountrySuggestions(country, continent);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    const query = new URLSearchParams();
    if (continent) query.set('continent', continent);
    if (country) query.set('name', country);
    router.push(`/search/results?${query.toString()}`);
    setSuggestions([])
  };

  const handleSuggestionClick = (suggestedName: string) => {
    setCountry(suggestedName);
    setSuggestions([])
  };

  return (
    <div className='searchbar-container'>
      <form
        onSubmit={handleSearch}
        className={`transition-all duration-500 ease-in-out mx-auto flex items-center gap-3 flex-wrap sm:flex-nowrap
          bg-white shadow-lg rounded-xl w-full
          ${isCompact ? 'max-w-2xl p-3 scale-75' : 'max-w-4xl p-6'}
        `}
      >
        {/* Continent Dropdown */}
        <select
          value={continent}
          onChange={(e) => setContinent(e.target.value)}
          className="border border-gray-300 rounded px-3 py-2 flex-1 min-w-[150px]"
        >
          <option value="">All Continents</option>
          {CONTINENTS.map((c) => (
            <option key={c} value={c}>
              {c}
            </option>
          ))}
        </select>

        {/* Country Input */}
        <div className="relative w-full flex-1 min-w-[200px]">
          <input
            type="text"
            value={country}
            onChange={(e) => setCountry(e.target.value)}
            onClick={() => setFocused(true)}
            // onBlur={() => setFocused(false)}
            placeholder="Enter country name..."
            className="border border-gray-300 rounded px-4 py-2 w-full"
          />
          {country && focused && suggestions.length > 0 && (
            <ul className="absolute z-50 bg-white border border-gray-200 w-full mt-1 rounded shadow-md max-h-48 overflow-y-auto">
              {suggestions.map((s) => (
                <li
                  key={s._id}
                  onClick={() => handleSuggestionClick(s.name)}
                  className="px-4 py-2 hover:bg-blue-100 cursor-pointer"
                >
                  {s.name}
                </li>
              ))}
            </ul>
          )}
        </div>

        {/* Submit Button with icon */}
        <button
          type="submit"
          className="bg-blue-600 text-white p-2 rounded hover:bg-blue-700 transition-colors flex items-center justify-center"
          aria-label="Search"
        >
          <span role="img" aria-label="search" className="text-lg h-6 w-6">🔍︎</span>
        </button>
      </form>
    </div>
  );
};

export default SearchBar;
