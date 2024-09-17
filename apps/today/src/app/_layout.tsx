import { SessionProvider } from '@entities/authentication';
import { ThemeProvider } from '@entities/theme';
import { SplashScreen, Stack } from 'expo-router';

export { ErrorBoundary } from 'expo-router';

// Prevent the splash screen from auto-hiding before getting the color scheme.
// currently does not work on iOS correctly
void SplashScreen.preventAutoHideAsync();

const defaultScreenOptions = {
  headerShown: false,
};

export default function RootLayout() {
  return (
    <SessionProvider>
      <ThemeProvider>
        <Stack screenOptions={defaultScreenOptions} />
      </ThemeProvider>
    </SessionProvider>
  );
}
