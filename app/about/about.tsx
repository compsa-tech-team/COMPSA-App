import { StyleSheet, ScrollView, Text, View, ImageBackground } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';

import MeetOurTeam from './meet-our-team';

export default function About() {
  return (
    <View style={styles.container}>
      <ScrollView>
        <ImageBackground
          source={require('../../assets/images/about.jpg')}
          style={styles.photo}
          resizeMode="cover"
        >
          <LinearGradient
            colors={['transparent', '#1f1f1f']} // fade photo to grey
            style={styles.gradient}
            locations={[0, 1]}
          />
          <View style={styles.description}>
            <Text style={[styles.title, { marginTop: 200 }]}>
              WHAT IS COMPSA?{"\n"}
            </Text>

            <Text style={styles.subtitle}>
              Queen&apos;s University Computing Students&apos; Association (COMPSA) is the student
              government for Queen&apos;s University School of Computing.{"\n"}
            </Text>
            <Text style={styles.subtitle}>
              We organize social events, workshops, information sessions, and work together with
              the faculty to advocate for Computing students&apos; needs.
            </Text>
          </View>
        </ImageBackground>

        <LinearGradient
          colors={['#1f1f1f', '#1f1f1f', '#381c64']}
          locations={[0, 0.1, 1]}
          style={styles.greyFade}
        >
          <View style={styles.content}>
            <MeetOurTeam></MeetOurTeam>
          </View>
        </LinearGradient>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#381c64',
    width: '100%',
  },
  photo: {
    height: 300,
    width: '100%',
  },
  gradient: {
    ...StyleSheet.absoluteFillObject,
  },
  description: {
    zIndex: 1,
    marginLeft: 20,
  },
  title: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#d7de21',
    marginBottom: -20,
  },
  subtitle: {
    fontSize: 14,
    textAlign: 'left',
    color: 'white',
    marginLeft: 10,
    marginRight: 10,
    marginTop: -5,
  },
  greyFade: {
    width: '100%',
    paddingTop: 8,
    paddingBottom: 32,
  },
  content: {
    backgroundColor: 'transparent',     //let the gradient show through (no solid background here)
    paddingTop: 100,
    paddingBottom: 24,
    alignItems: "center"
  },
});
