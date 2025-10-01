import { LinearGradient } from "expo-linear-gradient";
import React from "react";
import {
  Alert,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  View,
} from "react-native";

// import MapView from "react-native-maps";

const onPress = () => {
  Alert.alert("This should submit the message somewhere");
};

export default function About() {
  return (
    <ScrollView>
      <View style={styles.container}>
        <LinearGradient
          // Background Linear Gradient
          colors={["#1f1f1f", "#1f1f1f", "#381c64"]}
          locations={[0, 0.1, 1]}
          style={styles.background}
        ></LinearGradient>

        <Text style={styles.contactH1}>CONTACT US!</Text>
        <Text style={styles.contactP}>
          Leave us a message with any concerns or feedback.
        </Text>
        <Text style={styles.contactP}>
          If you would like us to get back to you personally, please leave your
          name & email. Otherwise, this form is anonymous.
        </Text>
        <View style={styles.inputsContainer}>
          <TextInput
            style={styles.contactInputs}
            placeholder="Name"
          ></TextInput>
          <TextInput
            style={styles.contactInputs}
            placeholder="Email"
          ></TextInput>
          <TextInput
            style={styles.contactMsg}
            placeholder="Message"
            numberOfLines={10}
            multiline={true}
          ></TextInput>
          <Pressable style={styles.submitBtn} onPress={onPress}>
            <Text style={styles.buttonTxt}>Submit Message</Text>
          </Pressable>
        </View>

        {/* <MapView style={styles.map} /> */}

        <Text style={styles.portfolioHeading}>
          LOOKING FOR A SPECIFIC PORTFOLIO?
        </Text>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    display: "flex",
    justifyContent: "center",
    alignItems: "flex-start",
    height: "100%",
    padding: 50,
    paddingTop: 30,
  },
  background: {
    position: "absolute",
    left: 0,
    right: 0,
    top: 0,
    height: "100%",
  },
  contactH1: {
    color: "yellow",
    fontWeight: "700",
    fontSize: 30,
    marginBottom: 20,
  },
  contactP: {
    color: "white",
    fontSize: 15,
    marginBottom: 25,
  },
  inputsContainer: {
    display: "flex",
    gap: 20,
    width: "100%",
    alignItems: "flex-start",
  },
  contactInputs: {
    backgroundColor: "white",
    padding: 15,
    borderRadius: 10,
    width: "100%",
  },
  contactMsg: {
    backgroundColor: "white",
    padding: 15,
    borderRadius: 10,
    width: "100%",
    height: 200,
    textAlignVertical: "top",
    justifyContent: "flex-start",
  },
  submitBtn: {
    padding: 15,
    width: "100%",
    backgroundColor: "transparent",
    borderRadius: 5,
    borderWidth: 2,
    borderColor: "white",
    marginBottom: 30,
  },
  buttonTxt: {
    color: "white",
    textAlign: "center",
  },
  map: {
    width: "50%",
    height: "50%",
  },
  portfolioHeading: {
    color: "white",
    fontWeight: "700",
    fontSize: 30,
  },
});
