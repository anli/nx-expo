import { supabase } from '@shared/api';

import type { Task } from './task';

export const deleteTask = async (id: Task['id']) => {
  const { data, error } = await supabase.from('tasks').delete().eq('id', id);

  if (error) {
    throw error;
  }

  return { data };
};
