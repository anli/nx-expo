import {
  createContext,
  useContext,
  type FC,
  type PropsWithChildren,
} from 'react';

import { StatusBar } from 'expo-status-bar';

const ThemeContext = createContext<undefined>(undefined);

export const useTheme = () => {
  const value = useContext(ThemeContext);
  if (process.env.NODE_ENV !== 'production') {
    if (!value) {
      throw new Error('useTheme must be wrapped in a <ThemeProvider />');
    }
  }

  return value;
};

export const ThemeProvider: FC<PropsWithChildren> = ({ children }) => (
  <ThemeContext.Provider value={undefined}>
    <StatusBar />
    {children}
  </ThemeContext.Provider>
);
