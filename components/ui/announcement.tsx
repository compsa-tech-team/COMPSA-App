import { Dimensions, StyleSheet, Text, View } from "react-native";

const { width } = Dimensions.get("window");

type AnnouncementProps = {
    title: string;
    clubName: string;
    desc: string;
    date: Date;
    deadline?: Date;
    announceType?: string;
}

export default function Announcement({title, clubName, desc, date, deadline, announceType} : AnnouncementProps) {

    const day = date.getDate();
    const month = date.getMonth() + 1;
    const year = date.getFullYear();
    const dateString = month + "/" + day + "/" + year;

    return (
        <View style={styles.card}>
            <Text style={styles.title}>{title}</Text>
            <View style={styles.row}>
                <Text style={styles.text}>{clubName} -</Text>
                <Text style={styles.text}>{dateString}</Text>
            </View>
            <Text style={styles.text}>{desc}</Text>
        </View>
    )
}

const styles = StyleSheet.create({
    card: {
        backgroundColor: 'rgb(38 38 38)',
        width : width * 0.8,
        borderRadius: 20,
        padding: 10,
        marginTop: 10
    },
    title : {
        color: '#d7de21',
        fontSize: 32,
        fontWeight: 'bold'
    },
    text : {
        color: 'rgb(240 240 240)'
    },
    row : {
        display: 'flex',
        'flexDirection': 'row',
        gap: 3
    }
})
