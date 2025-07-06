'use client';

import { useEffect, useRef } from 'react';

export function useInfiniteScrollObserver(callback: () => void, canLoadMore: boolean, loading: boolean) {
  const observerRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (!canLoadMore || loading) return;

    const observer = new IntersectionObserver(entries => {
      if (entries[0].isIntersecting) {
        callback();
      }
    });

    const el = observerRef.current;
    if (el) observer.observe(el);

    return () => {
      if (el) observer.unobserve(el);
    };
  }, [callback, canLoadMore, loading]);

  return observerRef;
}
