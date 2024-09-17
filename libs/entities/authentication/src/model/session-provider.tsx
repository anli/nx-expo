import {
  createContext,
  useContext,
  useMemo,
  useState,
  type FC,
  type PropsWithChildren,
} from 'react';

type Session = string;

const SessionContext = createContext<{
  data?: Session | null;
  isLoading: boolean;
  login?: () => void;
  logout?: () => void;
}>({
  data: undefined,
  isLoading: true,
  login: undefined,
  logout: undefined,
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
  const [isLoading] = useState(false);

  const value = useMemo(
    () => ({
      data,
      isLoading,
      login: () => {
        setData('ACCESS_TOKEN');
      },
      logout: () => setData(null),
    }),
    [data, isLoading]
  );

  return (
    <SessionContext.Provider value={value}>{children}</SessionContext.Provider>
  );
};
