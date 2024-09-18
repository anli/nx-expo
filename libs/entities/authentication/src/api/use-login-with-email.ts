import { useState } from 'react';

import { supabase } from '@shared/api';
import type {
  AuthError,
  Session,
  SignInWithPasswordCredentials,
  User,
} from '@supabase/supabase-js';

type UseLoginWithEmailProps = {
  onError?: (error: AuthError) => void;
  onSuccess?: (data: { user: User | null; session: Session | null }) => void;
};

export const useLoginWithEmail = ({
  onError,
  onSuccess,
}: UseLoginWithEmailProps = {}) => {
  const [loading, setLoading] = useState(false);

  const mutateAsync = async (values: SignInWithPasswordCredentials) => {
    setLoading(true);
    const response = await supabase.auth.signInWithPassword(values);
    setLoading(false);
    if (response?.error) {
      return onError?.(response?.error);
    }

    onSuccess?.(response?.data);
    return response?.data;
  };

  return {
    mutate: (values: SignInWithPasswordCredentials) => void mutateAsync(values),
    loading,
  };
};
