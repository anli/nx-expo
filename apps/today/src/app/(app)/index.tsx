import { Button, SafeAreaView, Text } from 'react-native';

import { useSession } from '@entities/authentication';
import { router } from 'expo-router';

export default function Tasks() {
  const { logout } = useSession();

  const handleLogout = () => {
    logout?.();
    router.replace('/');
  };

  return (
    <SafeAreaView>
      <Text>Tasks</Text>
      <Button onPress={handleLogout} title="Logout" />
    </SafeAreaView>
  );
}
