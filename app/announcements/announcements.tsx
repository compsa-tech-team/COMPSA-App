import Announcement from "@/components/ui/announcement";
import { LinearGradient } from "expo-linear-gradient";
import { StyleSheet, View } from "react-native";

export default function Announcements() {

    const today = new Date();

    return (
        <LinearGradient
          style={styles.container}
          colors={['#1f1f1f', '#1f1f1f', '#381c64']}
          locations={[0, 0.3, 1]}
        >
        <View>
            <Announcement title="Test" desc="Testing" date={today} clubName="test club"></Announcement>
            <Announcement title="Test" desc="Testing" date={today} clubName="test club"></Announcement>
        </View>
        </LinearGradient>
    )
}

const styles = StyleSheet.create({
    container : {
        height: '100%',
        display: 'flex',
        alignItems: 'center',
    }
})