import { useCallback, useEffect, useState } from 'react';
import { ApiService } from '../services/api-service';

type ApiResponse<T> = {
    data: T | undefined;
    loading: boolean;
    error: string | null;
}

export function useApiRequest<T>(url: string): ApiResponse<T> {
  const [data, setData] = useState<T>();
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const fetchData = useCallback(async () => {
    setLoading(true);
    setError(null);

    try {
      const result = await ApiService.get<T>(url);
      setData(result.data);
    } catch (e) {
      setError(e instanceof Error ? e.message : String(e));
    } finally {
      setLoading(false);
    }
  }, [url]);

  useEffect(() => {
    fetchData();

    return () => {
      setData(undefined);
      setLoading(false);
      setError(null);
    };
  }, [fetchData]);

  return { data, loading, error };
}
