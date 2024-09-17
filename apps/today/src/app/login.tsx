import { Button, SafeAreaView, Text } from 'react-native';

import { useSession } from '@entities/authentication';
import { router } from 'expo-router';

export default function Login() {
  const { login } = useSession();

  const handleLogin = () => {
    login?.();
    router.replace('/');
  };

  return (
    <SafeAreaView>
      <Text>Login</Text>

      <Button onPress={handleLogin} title="Login" />
    </SafeAreaView>
  );
}
