'use client';

import { useCountryResults } from '../../../hooks/useCountryResults';
import CountryCard from '../../../components/common/Card/Card';
import { useSearchParams } from 'next/navigation';

export default function SearchResults() {
  const searchParams = useSearchParams();
  const { countries, loading, observerRef } = useCountryResults(searchParams);

  return (
    <div className="p-2 grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 xl:grid-cols-8 gap-2">
      {countries.map((country, idx) => (
        <CountryCard key={idx} {...country} />
      ))}

      {/* Sentinel div for triggering infinite scroll */}
      <div ref={observerRef} className="h-1" />

      {loading && <p className="col-span-full text-center">Loading...</p>}
    </div>
  );
}
