import { supabase } from '@shared/api';

export function getRange(page: number, limit: number) {
  const from = page * limit;
  const to = from + limit - 1;

  return [from, to];
}

export const getTasks = async (page = 1, limit = 20) => {
  const [from, to] = getRange(page, limit);
  const { data, error } = await supabase
    .from('tasks')
    .select(
      '*, isCompleted: is_completed, updatedAt: updated_at, userId: user_id'
    )
    .order('id', { ascending: false })
    .range(from, to);

  if (error) {
    throw error;
  }

  return data;
};
