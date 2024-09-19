import {
  infiniteQueryOptions,
  queryOptions,
  type InfiniteData,
  type QueryKey,
  type UndefinedInitialDataInfiniteOptions,
} from '@tanstack/react-query';

import { getTask, type TaskQuery } from './get-task';
import { getTasks } from './get-tasks';
import type { Task } from './task';

export const taskQueries = {
  all: () => ['tasks'],
  list: (
    options: Omit<
      UndefinedInitialDataInfiniteOptions<
        Task[],
        Error,
        InfiniteData<Task[]>,
        QueryKey,
        number | undefined
      >,
      | 'queryKey'
      | 'queryFn'
      | 'initialPageParam'
      | 'getNextPageParam'
      | 'initialData'
    > = {}
  ) =>
    infiniteQueryOptions({
      queryKey: [...taskQueries.all(), 'list'],
      queryFn: ({ pageParam }) => getTasks(pageParam),
      initialPageParam: 0,
      getNextPageParam: (lastPage, allPages) => {
        const nextPage: number | undefined = lastPage?.length
          ? allPages?.length
          : undefined;

        return nextPage;
      },
      ...options,
    }),
  details: () => [...taskQueries.all(), 'detail'],
  detail: (query: TaskQuery) =>
    queryOptions({
      queryKey: [...taskQueries.details(), query.id],
      queryFn: () => getTask({ id: query.id }),
      staleTime: 5000,
    }),
};
