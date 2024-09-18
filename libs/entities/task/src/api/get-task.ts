import { supabase } from '@shared/api';

import type { Task } from './task';

export type TaskQuery = Pick<Task, 'id'>;

export const getTask = async ({ id }: TaskQuery) => {
  const { data, error } = await supabase.from('tasks').select().eq('id', id);

  if (error) {
    throw error;
  }

  return data;
};
