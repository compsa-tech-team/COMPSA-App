import DateTimePicker from "@react-native-community/datetimepicker";
import { addMinutes, format, startOfDay } from "date-fns";
import { useRouter } from "expo-router";
import React, { useState } from "react";
import {
  Alert,
  SafeAreaView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

type Room = "Room A" | "Room B";

export default function RoomBookingScreen() {
  const router = useRouter();
  const [selectedRoom, setSelectedRoom] = useState<Room | null>(null);
  const [selectedDate, setSelectedDate] = useState<Date>(new Date());
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [selectedTimes, setSelectedTimes] = useState<Date[]>([]);

  // generate timeslots (9 AM - 5 PM, every 30 mins)
  const generateTimeSlots = (date: Date) => {
    const slots: Date[] = [];
    const base = startOfDay(date);
    const start = new Date(
      base.getFullYear(),
      base.getMonth(),
      base.getDate(),
      9,
      0
    );
    for (let i = 0; i < 16; i++) {
      slots.push(addMinutes(start, i * 30));
    }
    return slots;
  };

  const timeSlots = generateTimeSlots(selectedDate);

  const handleSubmit = async () => {
    if (!selectedRoom || !selectedDate || selectedTimes.length === 0) {
      Alert.alert("Missing info", "Please select a room, date, and time.");
      return;
    }

    await new Promise((resolve) => setTimeout(resolve, 1000));

    router.push({
      pathname: "/room-booking/details",
      params: {
        room: selectedRoom,
        date: format(selectedDate, "PPP"),
        times: selectedTimes.map((t) => format(t, "HH:mm")),
      },
    });
  };

  const areAdjacent = (d1: Date, d2: Date) => {
    return Math.abs(d1.getTime() - d2.getTime()) === 30 * 60 * 1000;
  };

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.title}>Book a Room</Text>

      {/* Room Picker */}
      <Text style={styles.label}>Select Room:</Text>
      <View style={styles.row}>
        {(["Room A", "Room B"] as Room[]).map((room) => (
          <TouchableOpacity
            key={room}
            style={[
              styles.roomButton,
              selectedRoom === room && styles.selectedRoom,
            ]}
            onPress={() => setSelectedRoom(room)}
          >
            <Text
              style={[
                styles.roomText,
                selectedRoom === room && styles.selectedRoomText,
              ]}
            >
              {room}
            </Text>
          </TouchableOpacity>
        ))}
      </View>

      {/* Date Picker */}
      <Text style={styles.label}>Select Date:</Text>
      <TouchableOpacity
        style={styles.dateButton}
        onPress={() => setShowDatePicker(true)}
      >
        <Text style={{ color: "white" }}>
          {format(selectedDate, "yyyy-MM-dd")}
        </Text>
      </TouchableOpacity>

      {showDatePicker && (
        <DateTimePicker
          value={selectedDate}
          mode="date"
          display="spinner"
          themeVariant="dark"
          style={styles.datePicker}
          onChange={(event, date) => {
            setShowDatePicker(false);

            if (date) {
              setSelectedDate(date);
            }
          }}
        />
      )}

      {/* Time Picker */}
      <Text style={styles.label}>Select Time:</Text>
      <View style={styles.timeGrid}>
        {timeSlots.map((slot) => {
          const label = format(slot, "HH:mm");
          const isSelected = selectedTimes.some(
            (t) => format(t, "HH:mm") === label
          );

          return (
            <TouchableOpacity
              key={label}
              style={[styles.timeButton, isSelected && styles.selectedTimes]}
              onPress={() => {
                const already = selectedTimes.find(
                  (t) => format(t, "HH:mm") === format(slot, "HH:mm")
                );

                // If already selected → unselect
                if (already) {
                  setSelectedTimes(
                    selectedTimes.filter(
                      (t) => format(t, "HH:mm") !== format(slot, "HH:mm")
                    )
                  );
                  return;
                }

                // No selections yet → select
                if (selectedTimes.length === 0) {
                  setSelectedTimes([slot]);
                  return;
                }

                // One selected → allow only if adjacent
                if (selectedTimes.length === 1) {
                  if (areAdjacent(selectedTimes[0], slot)) {
                    const sorted = [selectedTimes[0], slot].sort(
                      (a, b) => a.getTime() - b.getTime()
                    );
                    setSelectedTimes(sorted);
                  } else {
                    // Replace if not adjacent
                    setSelectedTimes([slot]);
                  }
                  return;
                }

                // Two already selected → reset to only this one
                if (selectedTimes.length === 2) {
                  setSelectedTimes([slot]);
                }
              }}
            >
              <Text
                style={[
                  styles.timeText,
                  isSelected && styles.selectedTimesText,
                ]}
              >
                {label}
              </Text>
            </TouchableOpacity>
          );
        })}
      </View>

      {/* Submit */}
      <View style={styles.submitButtonContainer}>
        <TouchableOpacity style={styles.submitButton} onPress={handleSubmit}>
          <Text style={styles.submitButtonText}>Submit Booking</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: "#050505", // main black background
  },
  title: {
    fontSize: 24,
    fontWeight: "700",
    marginBottom: 20,
    textAlign: "center",
    color: "#ffffff", // white text
  },
  label: {
    fontSize: 16,
    marginBottom: 8,
    color: "#ffffff", // white text
  },
  row: {
    flexDirection: "row",
    gap: 10,
    marginBottom: 16,
  },
  roomButton: {
    flex: 1,
    padding: 12,
    borderWidth: 1,
    borderColor: "#888888", // light grey border
    borderRadius: 8,
    alignItems: "center",
    backgroundColor: "#1a1a1a", // dark grey background
  },
  selectedRoom: {
    backgroundColor: "#d7de21", // yellow accent
    borderColor: "#d7de21",
  },
  roomText: {
    color: "#ffffff",
    fontWeight: "500",
  },
  selectedRoomText: {
    color: "#050505", // black text on yellow
    fontWeight: "700",
  },
  dateButton: {
    padding: 12,
    borderWidth: 1,
    borderColor: "#888888",
    borderRadius: 8,
    alignItems: "center",
    marginBottom: 16,
    backgroundColor: "#1a1a1a",
    color: "#ffffff",
  },
  dateText: {
    color: "#ffffff",
  },
  datePicker: {
    flex: 1,
    padding: 12,
    borderWidth: 1,
    borderColor: "#888888",
    borderRadius: 8,
    justifyContent: "center",
    alignItems: "center",
    alignSelf: "center",
    marginTop: 25,
    marginBottom: 25,
  },
  timeGrid: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 8,
    marginBottom: 16,
    justifyContent: "center",
  },
  timeButton: {
    width: "22%",
    paddingVertical: 10,
    borderWidth: 1,
    borderColor: "#888888",
    borderRadius: 8,
    alignItems: "center",
    backgroundColor: "#1a1a1a",
  },
  selectedTimes: {
    backgroundColor: "#d7de21", // yellow accent
    borderColor: "#d7de21",
  },
  timeText: {
    fontSize: 14,
    color: "#ffffff",
    fontWeight: "500",
  },
  selectedTimesText: {
    color: "#050505", // black text on yellow
    fontWeight: "700",
  },
  submitButtonContainer: {
    marginTop: 20,
    borderRadius: 8,
    overflow: "hidden",
    height: 50,
    alignItems: "center",
  },
  submitButton: {
    backgroundColor: "#d7de21",
    flex: 1,
    padding: 12,
    borderWidth: 1,
    borderColor: "#888888", // light grey border
    borderRadius: 8,
    alignItems: "center",
    justifyContent: "center",
    height: 100,
  },
  submitButtonText: {
    color: "#050505",
    fontWeight: "700",
    fontSize: 16,
  },
});
