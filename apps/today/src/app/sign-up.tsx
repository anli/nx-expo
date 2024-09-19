import { View } from 'react-native';

import { useSignUpWithEmail } from '@entities/authentication';
import { yupResolver } from '@hookform/resolvers/yup';
import { tw } from '@shared/ui';
import { Link, router } from 'expo-router';
import { useForm, Controller } from 'react-hook-form';
import { KeyboardAwareScrollView } from 'react-native-keyboard-controller';
import { Button, Text, TextInput } from 'react-native-paper';
import { SafeAreaView } from 'react-native-safe-area-context';
import * as yup from 'yup';

export type SignUpFormValues = {
  email: string;
  password: string;
};

const schema = yup
  .object({
    email: yup
      .string()
      .email('Please enter a valid email')
      .required('Email is required'),
    password: yup
      .string()
      .min(6, 'Password must be at least 6 characters')
      .required('Password is required'),
  })
  .required();

export default function SignUp() {
  const { mutate: signUpWithEmail, loading } = useSignUpWithEmail({
    onSuccess: () => {
      router.replace('/');
    },
  });
  const { control, handleSubmit } = useForm<SignUpFormValues>({
    mode: 'onChange',
    resolver: yupResolver(schema),
  });

  return (
    <SafeAreaView style={tw`flex-1`}>
      <KeyboardAwareScrollView contentContainerStyle={tw`flex-1`}>
        <View style={tw`flex-1`} />
        <View>
          <Text variant="displayMedium" style={tw`mx-4`}>
            Sign Up
          </Text>

          <View style={tw`h-4`} />

          <Controller
            control={control}
            rules={{
              required: true,
            }}
            render={({
              field: { onChange, onBlur, value },
              fieldState: { error },
            }) => (
              <>
                <TextInput
                  mode="outlined"
                  label="Email"
                  style={tw`mx-4`}
                  autoFocus
                  value={value}
                  onChangeText={onChange}
                  onBlur={onBlur}
                  autoCapitalize="none"
                  autoCorrect={false}
                  autoComplete="email"
                  aria-errormessage="emailError"
                  aria-labelledby="emailLabel"
                />
                {error?.message && (
                  <Text
                    variant="labelSmall"
                    style={tw`mx-4 mt-1`}
                    nativeID="emailError"
                  >
                    {error?.message}
                  </Text>
                )}
              </>
            )}
            name="email"
          />

          <View style={tw`h-2`} />

          <Controller
            control={control}
            rules={{
              required: true,
            }}
            render={({
              field: { onChange, onBlur, value },
              fieldState: { error },
            }) => (
              <>
                <TextInput
                  mode="outlined"
                  label="Password"
                  style={tw`mx-4`}
                  value={value}
                  onChangeText={onChange}
                  onBlur={onBlur}
                  autoCapitalize="none"
                  autoCorrect={false}
                  secureTextEntry
                  aria-labelledby="passwordLabel"
                  aria-errormessage="passwordError"
                  autoComplete="password"
                />
                {error?.message && (
                  <Text
                    variant="labelSmall"
                    style={tw`mx-4 mt-1`}
                    nativeID="passwordError"
                  >
                    {error?.message}
                  </Text>
                )}
              </>
            )}
            name="password"
          />

          <View style={tw`h-4`} />

          <Button
            mode="contained"
            // eslint-disable-next-line @typescript-eslint/no-misused-promises
            onPress={handleSubmit(signUpWithEmail)}
            style={tw`mx-4`}
            loading={loading}
          >
            Sign Up
          </Button>
          <Link href="/login" asChild>
            <Button mode="text" style={tw`mx-4`}>
              Already have an account? Login
            </Button>
          </Link>
        </View>
      </KeyboardAwareScrollView>
    </SafeAreaView>
  );
}
