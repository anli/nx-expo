import {
  createContext,
  useContext,
  useEffect,
  useMemo,
  useState,
  type FC,
  type PropsWithChildren,
} from 'react';

import { supabase } from '@shared/api';
import type { Session } from '@supabase/supabase-js';

const SessionContext = createContext<{
  data?: Session | null;
  isLoading: boolean;
}>({
  data: undefined,
  isLoading: true,
});

export const useSession = () => {
  const value = useContext(SessionContext);
  if (process.env.NODE_ENV !== 'production') {
    if (!value) {
      throw new Error('useSession must be wrapped in a <SessionProvider />');
    }
  }

  return value;
};

export const SessionProvider: FC<PropsWithChildren> = ({ children }) => {
  const [data, setData] = useState<Session | null | undefined>(undefined);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    void supabase.auth.getSession().then(({ data: { session: _session } }) => {
      setIsLoading(true);
      setData(_session);
      setIsLoading(false);
    });

    supabase.auth.onAuthStateChange((_event, _session) => {
      setIsLoading(true);
      setData(_session);
      setIsLoading(false);
    });
  }, []);

  const value = useMemo(
    () => ({
      data,
      isLoading,
    }),
    [data, isLoading]
  );

  return (
    <SessionContext.Provider value={value}>{children}</SessionContext.Provider>
  );
};
