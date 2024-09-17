import { useEffect } from 'react';

import { useSession } from '@entities/authentication';
import { Redirect, SplashScreen, Stack } from 'expo-router';

const defaultScreenOptions = {
  headerShown: false,
};

export default function AppLayout() {
  const { data: session, isLoading } = useSession();

  useEffect(() => {
    !isLoading && void SplashScreen.hideAsync();
  }, [isLoading]);

  if (isLoading) {
    return null;
  }

  if (!session) {
    return <Redirect href="/login" />;
  }

  return <Stack screenOptions={defaultScreenOptions} />;
}
