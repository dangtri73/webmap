import { fetcher } from '@/lib/fetch';
import useSWRInfinite from 'swr/infinite';

export function useMapPages() {
  const { data, error, size, ...props } = useSWRInfinite(
    () => {
      return `/api/map`;
    },
    fetcher,
    {
      refreshInterval: 10000,
      revalidateAll: false,
    }
  );

  return {
    data,
    error,
    size,
    ...props,
  };
}
