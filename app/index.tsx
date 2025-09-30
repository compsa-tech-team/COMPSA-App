import { StyleSheet, Text, View } from 'react-native';

export default function HomeScreen() {

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Welcome to COMPSA App</Text>
      <Text style={styles.subtitle}>Your app is now set up and ready to go!</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 10,
    textAlign: 'center',
  },
  subtitle: {
    fontSize: 16,
    color: '#666',
    textAlign: 'center',
  },
});
