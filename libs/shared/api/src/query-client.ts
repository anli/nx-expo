import { toast } from '@shared/ui';
import { QueryClient } from '@tanstack/react-query';

export const queryClientDefaultOptions = {
  defaultOptions: {
    queries: {
      staleTime: 5 * 60 * 1000,
      gcTime: 5 * 60 * 1000,
      onError: (error: Error) => {
        toast.error(error.message);
      },
    },
    mutations: {
      onError: (error: Error) => {
        toast.error(error.message);
      },
    },
  },
};

export const queryClient = new QueryClient(queryClientDefaultOptions);
