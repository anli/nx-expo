import { keepPreviousData, queryOptions } from '@tanstack/react-query';

import { getTask, type TaskQuery } from './get-task';
import { getTasks } from './get-tasks';

export const taskQueries = {
  all: () => ['tasks'],
  lists: () => [...taskQueries.all(), 'list'],
  list: (page?: number, limit?: number) =>
    queryOptions({
      queryKey: [...taskQueries.lists(), page, limit],
      queryFn: () => getTasks(page, limit),
      placeholderData: keepPreviousData,
    }),
  details: () => [...taskQueries.all(), 'detail'],
  detail: (query: TaskQuery) =>
    queryOptions({
      queryKey: [...taskQueries.details(), query.id],
      queryFn: () => getTask({ id: query.id }),
      staleTime: 5000,
    }),
};
