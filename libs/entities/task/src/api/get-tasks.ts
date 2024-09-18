import { supabase } from '@shared/api';

const calculatePage = (totalCount: number, limit: number) =>
  Math.floor(totalCount / limit);

export const getTasks = async (page = 1, limit = 20) => {
  const from = (page - 1) * limit;
  const to = page * limit;
  const { count, error: countError } = await supabase
    .from('tasks')
    .select('*', { count: 'exact', head: true });

  if (countError) {
    throw countError;
  }

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

  return {
    data,
    limit,
    skip: from,
    total: count,
    totalPages: calculatePage(count ?? 0, limit),
  };
};
