import { View } from 'react-native';

import { useSession } from '@entities/authentication';
import { tw } from '@shared/ui';
import { router } from 'expo-router';
import { Button, Text, TextInput } from 'react-native-paper';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function Login() {
  const { login } = useSession();

  const handleLogin = () => {
    login?.();
    router.replace('/');
  };

  return (
    <SafeAreaView style={tw`flex-1`}>
      <Text variant="displayMedium" style={tw`mx-4`}>
        Login
      </Text>

      <View style={tw`h-4`} />

      <TextInput mode="outlined" label="Email" style={tw`mx-4`} autoFocus />

      <View style={tw`h-2`} />

      <TextInput mode="outlined" label="Password" style={tw`mx-4`} />

      <View style={tw`h-4`} />

      <Button mode="contained" onPress={handleLogin} style={tw`mx-4`}>
        Login
      </Button>
    </SafeAreaView>
  );
}
