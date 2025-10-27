import { Link } from 'expo-router';
import { StyleSheet, Text, View } from 'react-native';

export default function HomeScreen() {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Welcome to COMPSA App</Text>
      <Text style={styles.subtitle}>Your app is now set up and ready to go!</Text>
      <Link href="/about/about">Go to About Page</Link>
      <Link href="/contact/contact">Go to Contact Page</Link>
      <Link href="/academics/academics">Go to Academics Page</Link>
      <Link href="/faq">Go to FAQs</Link>
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
