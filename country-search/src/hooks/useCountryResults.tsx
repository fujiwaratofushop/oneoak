'use client';

import { useEffect, useState, useRef } from 'react';

const LIMIT = 12;

export function useCountryResults(searchParams: URLSearchParams) {
  const [countries, setCountries] = useState<any[]>([]);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const [hasMore, setHasMore] = useState(true);
  const observerRef = useRef<HTMLDivElement | null>(null);

  const fetchCountries = async (pageNum: number) => {
    setLoading(true);

    const params = new URLSearchParams(searchParams);
    params.set('page', pageNum.toString());
    params.set('limit', LIMIT.toString());

    const res = await fetch(`/api/countries?${params.toString()}`);
    const data = await res.json();

    if (pageNum === 1) {
      setCountries(data);
    } else {
      setCountries(prev => [...prev, ...data]);
    }

    setHasMore(data.length === LIMIT); // no more data if result < limit
    setLoading(false);
  };

  useEffect(() => {
    setCountries([]);
    setPage(1);
    setHasMore(true);
  }, [searchParams.toString()]);

  useEffect(() => {
    if (hasMore) {
      fetchCountries(page);
    }
  }, [page, searchParams.toString()]);

  useEffect(() => {
    const observer = new IntersectionObserver(entries => {
      if (entries[0].isIntersecting && !loading && hasMore) {
        setPage(prev => prev + 1);
      }
    });

    const el = observerRef.current;
    if (el) observer.observe(el);

    return () => {
      if (el) observer.unobserve(el);
    };
  }, [loading, hasMore]);

  return { countries, loading, observerRef };
}
