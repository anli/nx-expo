import { supabase } from '@shared/api';

type CreateTaskProps = {
  name: string;
};

export const createTask = async (task: CreateTaskProps) => {
  const { data, error } = await supabase.from('tasks').insert(task);

  if (error) {
    throw error;
  }

  return { data };
};
