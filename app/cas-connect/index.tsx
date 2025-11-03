import { StyleSheet, Text, View } from 'react-native';

export default function CasConnectScreen() {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>CAS Connect</Text>
      <Text style={styles.subtitle}>
        Keep an eye out for updates as we bring CAS Connect resources into the app experience.
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
