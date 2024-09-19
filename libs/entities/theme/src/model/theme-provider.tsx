import {
  createContext,
  useContext,
  type FC,
  type PropsWithChildren,
} from 'react';

import { StatusBar } from 'expo-status-bar';
import { KeyboardProvider } from 'react-native-keyboard-controller';
import { PaperProvider } from 'react-native-paper';

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
    <PaperProvider>
      <KeyboardProvider>
        <StatusBar />
        {children}
      </KeyboardProvider>
    </PaperProvider>
  </ThemeContext.Provider>
);
