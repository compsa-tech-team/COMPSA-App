import { Ionicons } from '@expo/vector-icons';
import { Stack, useRouter } from 'expo-router';
import { Pressable, View } from 'react-native';

export default function RootLayout() {
  const router = useRouter();

  return (
    <Stack
      screenOptions={{
        headerStyle: { backgroundColor: '#050505' },
        headerTintColor: '#ffffff',
        headerTitleStyle: { fontWeight: '600' },
        headerBackVisible: false,
        headerRight: () => (
          <Pressable
            onPress={() => router.push('/')}
            hitSlop={12}
            accessibilityHint="Go back to the COMPSA home screen"
            accessibilityRole="button"
            style={{ paddingHorizontal: 6 }}
          >
            <View
              style={{
                backgroundColor: '#1a1a1a',
                borderRadius: 16,
                padding: 6,
              }}
            >
              <Ionicons name="home" size={20} color="#d7de21" />
            </View>
          </Pressable>
        ),
      }}
    >
      <Stack.Screen name="index" options={{ headerShown: false }} />
      <Stack.Screen name="faq/index" options={{ title: 'FAQs' }} />
      <Stack.Screen name="about/index" options={{ title: 'About COMPSA' }} />
      <Stack.Screen name="announcements/index" options={{ title: 'Announcement Hub' }} />
      <Stack.Screen name="academics/index" options={{ title: 'Academics' }} />
      <Stack.Screen name="room-booking/index" options={{ title: 'Room Booking' }} />
      <Stack.Screen name="cas-connect/index" options={{ title: 'CAS Connect' }} />
    </Stack>
  );
}
