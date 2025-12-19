'use client';

import { useEffect, useState } from 'react';

export interface UseAsyncState<T> {
  data: T | null;
  error: string | null;
  loading: boolean;
}

export function useAsync<T>(fn: () => Promise<T>, deps: unknown[] = []): UseAsyncState<T> {
  const [state, setState] = useState<UseAsyncState<T>>({ data: null, error: null, loading: true });

  useEffect(() => {
    let mounted = true;
    setState((s) => ({ ...s, loading: true, error: null }));
    fn()
      .then((res) => {
        if (!mounted) return;
        setState({ data: res, error: null, loading: false });
      })
      .catch((err: unknown) => {
        if (!mounted) return;
        const msg = err instanceof Error ? err.message : 'Request failed';
        setState({ data: null, error: msg, loading: false });
      });
    return () => {
      mounted = false;
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, deps);

  return state;
}
