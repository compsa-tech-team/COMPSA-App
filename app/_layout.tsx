import { Stack } from 'expo-router';

export default function RootLayout() {
  return (
    <Stack>
      <Stack.Screen name='login' options={{title: 'COMPSA Login'}} />
      <Stack.Screen name='createAccount' options={{title: 'Create COMPSA Account'}} />
      <Stack.Screen name="index" options={{ title: 'COMPSA App' }} />
    </Stack>
  );
}
