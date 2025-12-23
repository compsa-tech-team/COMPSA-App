import { useLocalSearchParams, useRouter } from "expo-router";
import { DateTime } from "luxon";
import React, { useState } from "react";
import {
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";

export default function BookingDetailsScreen() {
  const router = useRouter();
  const { room, date: dateParam, times } = useLocalSearchParams();
  // Normalize date to string
  const date = Array.isArray(dateParam) ? dateParam[0] : dateParam;

  if (!date) {
    // handle missing date
    alert("No date selected!");
    return null;
  }


  // Normalize times into an array
  let timeArray: string[] = [];

  if (Array.isArray(times)) {
    timeArray = times;
  } else if (typeof times === "string") {
    timeArray = times.split(",");
  }

  // Start time = first block
  const startTime = timeArray[0] ?? "";

  // End time = last block + 30 min
  const endTime = (() => {
    if (timeArray.length === 0) return "";

    const last = timeArray[timeArray.length - 1];
    const [h, m] = last.split(":").map(Number);

    const end = new Date();
    end.setHours(h, m + 30);

    const hh = end.getHours().toString().padStart(2, "0");
    const mm = end.getMinutes().toString().padStart(2, "0");
    return `${hh}:${mm}`;
  })();

  // form fields
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [description, setDescription] = useState("");

  //   handle request
  const handleRequestBooking = async () => {
    if (!fullName || !email) {
      alert("Please fill in your name and Queen's email.");
      return;
    }

    if (!timeArray.length) {
      alert("No times selected!");
      return;
    }

    const start = startTime; 
    const end = endTime; 

    const [startH, startM] = start.split(":").map(Number);
    const [endH, endM] = end.split(":").map(Number);

    const torontoZone = "America/Toronto";

    // Construct ISO strings for API using the selected date
    const selectedDateToronto = DateTime.fromISO(date, { zone: torontoZone });

    const startISO = selectedDateToronto
      .set({ hour: startH, minute: startM, second: 0, millisecond: 0 })
      .toISO();

    const endISO = selectedDateToronto
      .set({ hour: endH, minute: endM, second: 0, millisecond: 0 })
      .toISO();

    console.log("startISO:", startISO);
    console.log("endISO:", endISO);

    // Map room name to room_id
    const room_id = room === "Room A" ? 1 : room === "Room B" ? 2 : null;

    if (!room_id) {
      alert("Invalid room selected");
      return;
    }

    try {
      // Create pending booking
      const bookingRes = await fetch(
        "https://compsa.ca/api/room-booking/bookings",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            room_id,
            user_name: fullName,
            email,
            start_time: startISO,
            end_time: endISO,
          }),
        }
      );

      const bookingData = await bookingRes.json();
      console.log("Booking API response:", bookingData);

      if (!bookingRes.ok) {
        throw new Error(bookingData.error || "Booking failed");
      }

      const verificationToken = bookingData.verificationToken;

      // Send verification email
      const emailRes = await fetch(
        "https://compsa.ca/api/room-booking/emails",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            email,
            firstName: fullName.split(" ")[0],
            roomName: room,
            date,
            startTime: start,
            endTime: end,
            template: "booking",
            verificationToken,
            description: description,
          }),
        }
      );

      const emailData = await emailRes.json();
      if (!emailRes.ok)
        throw new Error(emailData.error || "Failed to send email");

      // Navigate to confirmation page
      router.push({
        pathname: "/room-booking/confirmation",
        params: { room, times: timeArray, fullName, email },
      });
    } catch (err: any) {
      console.log("Booking request error:", err);
      alert("Booking failed:\n" + err.message);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={{ padding: 16 }}>
        <Text style={styles.title}>Booking Details</Text>

        <Text style={styles.notice}>
          These times will be held for you until {date}. If you do not complete
          your booking before that time, another patron may book these times.
        </Text>

        {/* Details */}
        <View style={styles.detailsBox}>
          <Text style={styles.detailLabel}>Room</Text>
          <Text style={styles.detailValue}>{room}</Text>

          <Text style={styles.detailLabel}>Date</Text>
          <Text style={styles.detailValue}>{date}</Text>

          <Text style={styles.detailLabel}>From</Text>
          <Text style={styles.detailValue}>{startTime || "—"}</Text>

          <Text style={styles.detailLabel}>To</Text>
          <Text style={styles.detailValue}>{endTime || "—"}</Text>
        </View>

        {/* Form */}
        <Text style={styles.formLabel}>Full Name *</Text>
        <TextInput
          style={styles.input}
          placeholder="Enter your full name"
          placeholderTextColor="#999"
          value={fullName}
          onChangeText={setFullName}
        />

        <Text style={styles.formLabel}>Queen's Email *</Text>
        <TextInput
          style={styles.input}
          placeholder="netid@queensu.ca"
          placeholderTextColor="#999"
          autoCapitalize="none"
          keyboardType="email-address"
          value={email}
          onChangeText={setEmail}
        />

        <Text style={styles.formLabel}>Booking Description</Text>
        <TextInput
          style={[styles.input, { height: 80 }]}
          multiline
          placeholder="Optional"
          placeholderTextColor="#999"
          value={description}
          onChangeText={setDescription}
        />

        {/* Buttons */}
        <View style={styles.buttonRow}>
          <TouchableOpacity
            style={[styles.button, styles.backButton]}
            onPress={() => router.back()}
          >
            <Text style={styles.backButtonText}>Back</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={[styles.button, styles.submitButton]}
            onPress={handleRequestBooking}
          >
            <Text style={styles.submitButtonText}>Request Booking</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

/* ----------- STYLES ----------- */

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#050505",
  },

  title: {
    color: "white",
    fontSize: 26,
    fontWeight: "700",
    marginBottom: 16,
    textAlign: "center",
  },

  notice: {
    color: "#ccc",
    marginBottom: 20,
    fontSize: 14,
  },

  detailsBox: {
    backgroundColor: "#1e1e1e",
    padding: 18,
    borderRadius: 12,
    marginBottom: 20,
    borderWidth: 1,
    borderColor: "#333",
  },

  detailLabel: {
    color: "#888",
    fontSize: 14,
    marginTop: 10,
  },

  detailValue: {
    color: "white",
    fontSize: 18,
    marginTop: 4,
    marginBottom: 6,
    fontWeight: "500",
  },

  formLabel: {
    color: "#ccc",
    marginBottom: 6,
    marginTop: 16,
    fontSize: 15,
  },

  input: {
    backgroundColor: "#1a1a1a",
    color: "white",
    padding: 12,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: "#333",
  },

  buttonRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 28,
  },

  button: {
    flex: 1,
    padding: 14,
    borderRadius: 10,
    alignItems: "center",
    marginHorizontal: 5,
    borderWidth: 1,
    borderColor: "#888",
  },

  backButton: {
    backgroundColor: "#1a1a1a",
  },

  submitButton: {
    backgroundColor: "#d7de21",
    borderColor: "#d7de21",
  },

  backButtonText: {
    color: "white",
    fontWeight: "700",
    fontSize: 15,
  },

  submitButtonText: {
    color: "#050505",
    fontWeight: "700",
    fontSize: 15,
  },
});
