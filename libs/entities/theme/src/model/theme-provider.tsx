import {
  createContext,
  useContext,
  type FC,
  type PropsWithChildren,
} from 'react';

import { tw, Toaster } from '@shared/ui';
import { StatusBar } from 'expo-status-bar';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
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
  <GestureHandlerRootView style={tw`flex-1`}>
    <ThemeContext.Provider value={undefined}>
      <PaperProvider>
        <KeyboardProvider>
          <StatusBar />
          {children}
          <Toaster />
        </KeyboardProvider>
      </PaperProvider>
    </ThemeContext.Provider>
  </GestureHandlerRootView>
);
