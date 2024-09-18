import { useState } from 'react';

import { supabase } from '@shared/api';
import type {
  AuthError,
  Session,
  SignUpWithPasswordCredentials,
  User,
} from '@supabase/supabase-js';

type UseSignUpWithEmailProps = {
  onError?: (error: AuthError) => void;
  onSuccess?: (data: { user: User | null; session: Session | null }) => void;
};

export const useSignUpWithEmail = ({
  onError,
  onSuccess,
}: UseSignUpWithEmailProps = {}) => {
  const [loading, setLoading] = useState(false);

  const mutateAsync = async (values: SignUpWithPasswordCredentials) => {
    setLoading(true);
    const response = await supabase.auth.signUp(values);
    setLoading(false);
    if (response?.error) {
      return onError?.(response?.error);
    }

    onSuccess?.(response?.data);
    return response?.data;
  };

  return {
    mutate: (values: SignUpWithPasswordCredentials) => void mutateAsync(values),
    loading,
  };
};
