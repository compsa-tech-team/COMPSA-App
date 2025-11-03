import { StyleSheet, Text, View } from 'react-native';

export default function RoomBookingScreen() {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Room Booking</Text>
      <Text style={styles.subtitle}>
        Room booking functionality is coming soon. Check back shortly to reserve campus spaces.
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#050505',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 24,
  },
  title: {
    fontSize: 28,
    fontWeight: '700',
    color: '#d7de21',
    marginBottom: 12,
  },
  subtitle: {
    fontSize: 16,
    color: '#cacaca',
    textAlign: 'center',
    lineHeight: 22,
  },
});
