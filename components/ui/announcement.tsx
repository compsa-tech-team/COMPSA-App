import { router } from "expo-router";
import { Dimensions, Image, Pressable, StyleSheet, Text, View } from "react-native";

const { width } = Dimensions.get("window");

type AnnouncementProps = {
    id: string;
    title: string;
    clubName: string;
    desc: string;
    date: Date;
    deadline?: Date;
    announceType?: string;
}

export default function Announcement({id, title, clubName, desc, date, deadline, announceType} : AnnouncementProps) {

    const day = date.getDate();
    const month = date.getMonth() + 1;
    const year = date.getFullYear();
    const dateString = month + "/" + day + "/" + year;

    const updateAnnounce = () => {
        router.push({
            pathname: '/announcements/update/updateAnnouncement',
            params : {id : id, title: title, desc: desc, deadline: deadline?.toDateString(), announceType : announceType}
        })
    }

    return (
        <View style={styles.card}>
            <View style={styles.row}>
                <Text style={styles.title}>{title}</Text>
                <View style={styles.iconRow}>
                    <Pressable onPress={() => updateAnnounce()}>
                        <Image style={styles.image} source={require('../../assets/images/edit.png')}/>
                    </Pressable>
                    <Pressable>
                        <Image style={styles.image} source={require('../../assets/images/trash.png')}/>
                    </Pressable>
                </View>
            </View>
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
        width : width * 0.9,
        borderRadius: 20,
        padding: 10,
        marginTop: 10
    },
    title : {
        color: '#d7de21',
        fontSize: 32,
        fontWeight: 'bold',
        width: '90%'
    },
    text : {
        color: 'rgb(240 240 240)'
    },
    row : {
        display: 'flex',
        'flexDirection': 'row',
        gap: 3
    },
    iconRow : {
        display : 'flex',
        flexDirection : 'row',
        justifyContent: 'flex-end',
        width : '10%',
        alignItems: 'center'
    },
    image : {
        width : 30,
        height : 30,
        margin: 5,
        tintColor : 'rgb(240 240 240)'
    }
})
