import { useRouter } from "expo-router";
import React from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";

export default function ConfirmationScreen() {
  const router = useRouter();

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Booking Details</Text>

      <Text style={styles.bodyText}>
        We’ve received your booking request. Please check your email to verify
        your booking.
      </Text>

      <Text style={styles.boldText}>
        Your reservation will not be confirmed until you complete this
        verification.
      </Text>

      <TouchableOpacity
        style={styles.button}
        onPress={() => router.push("/room-booking")}
      >
        <Text style={styles.buttonText}>Back to Room Booking</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#050505",
    padding: 24,
  },

  title: {
    fontSize: 36,
    fontWeight: "800",
    color: "#d7de21",
    marginBottom: 20,
    textAlign: "left",
  },

  bodyText: {
    fontSize: 18,
    color: "white",
    marginBottom: 16,
    lineHeight: 26,
  },

  boldText: {
    fontSize: 18,
    color: "white",
    fontWeight: "700",
    marginBottom: 30,
    lineHeight: 26,
  },

  button: {
    marginTop: 10,
    paddingVertical: 14,
    backgroundColor: "#d7de21",
    borderRadius: 10,
    alignItems: "center",
  },

  buttonText: {
    color: "#050505",
    fontWeight: "700",
    fontSize: 16,
  },
});
