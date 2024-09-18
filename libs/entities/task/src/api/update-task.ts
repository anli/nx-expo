import { supabase } from '@shared/api';
import { objectToSnake } from 'ts-case-convert';

import type { Task } from './task';

export const updateTask = async (
  task: Required<Pick<Task, 'id'>> & Partial<Task>
) => {
  const { data, error } = await supabase
    .from('tasks')
    .update(objectToSnake(task))
    .eq('id', task.id);

  if (error) {
    throw error;
  }

  return { data };
};
