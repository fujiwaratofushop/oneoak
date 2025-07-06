import { debounce } from '@/utils/helpers';
import { useState, useEffect, useMemo } from 'react';

export function useCountrySuggestions(name: string, continent?: string) {
  const [suggestions, setSuggestions] = useState<any[]>([]);

  const debouncedFetchSuggestions = useMemo(() => {
    return debounce(async (name: string, continent?: string) => {
      const url = new URL('/api/suggestions', window.location.origin);
      url.searchParams.set('name', name);
      if (continent) url.searchParams.set('continent', continent);

      const res = await fetch(url.toString());
      const data = await res.json();
      setSuggestions(data);
    }, 1000);
  }, []);

  useEffect(() => {
    if (!name) {
      setSuggestions([]);
      return;
    }
    debouncedFetchSuggestions(name, continent);
  }, [name, continent]);

  return {suggestions, setSuggestions};
}