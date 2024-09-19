import { useState } from 'react';

import { queryClientDefaultOptions, supabase } from '@shared/api';
import type { AuthError } from '@supabase/supabase-js';

type UseLogoutProps = {
  onError?: (error: AuthError) => void;
  onSuccess?: () => void;
};

export const useLogout = ({
  onError = queryClientDefaultOptions.defaultOptions.mutations?.onError,
  onSuccess,
}: UseLogoutProps = {}) => {
  const [loading, setLoading] = useState(false);

  const mutateAsync = async () => {
    setLoading(true);
    const response = await supabase.auth.signOut();
    setLoading(false);
    if (response?.error) {
      return onError?.(response?.error);
    }

    onSuccess?.();
    return;
  };

  return {
    mutate: () => void mutateAsync(),
    loading,
  };
};
