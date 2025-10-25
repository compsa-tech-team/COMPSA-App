import { LinearGradient } from "expo-linear-gradient";
import { router } from "expo-router";
import { useState } from "react";
import { Dimensions, StyleSheet, Text, TextInput, TouchableOpacity, View } from "react-native";
import DatePicker from 'react-native-date-picker';
import { MultiSelect } from 'react-native-element-dropdown';

const { width } = Dimensions.get("window");

export default function CreatePost() {

   const [open, setOpen] = useState(false);
   const [date, setDate] = useState(new Date());
   const [selected, setSelected] = useState<string[]>([]);

   const data = [
    {label : 'Jobs', value : 'jobs'},
    {label: 'Experience', value : 'experience'}
   ]
    
    return (
        <LinearGradient
                  style={styles.container}
                  colors={['#1f1f1f', '#1f1f1f', '#381c64']}
                  locations={[0, 0.3, 1]}
                >
        <View style={styles.card}>
            <View>
                <Text style={styles.title}>Create Announcement</Text>
                <Text style={styles.subtitle}>Fill out the following form to create an announcement</Text>
            </View>
            <View>
                <TextInput placeholder="Enter Title*" style={styles.input}></TextInput>
                <TextInput 
                    placeholder="Enter Description*" 
                    style={styles.input} 
                    multiline
                    numberOfLines={5}></TextInput>
                <DatePicker open={open} date={date}></DatePicker>
                <MultiSelect 
                    data={data} 
                    placeholder="Select Categories"
                    labelField={"label"}
                    valueField={"value"}
                    value={selected}
                    onChange={(curSelected) => setSelected(curSelected)}
                    style={styles.dropdown}
                    placeholderStyle={styles.placeholderStyle}
                    selectedTextStyle={styles.selectedTextStyle}
                    itemTextStyle={styles.itemTextStyle}
                    inputSearchStyle={styles.inputSearchStyle}
                    activeColor="#e6f0ff"
                    selectedStyle={styles.selectedStyle}
                />
            </View>
            <TouchableOpacity style={styles.button} onPress={() => router.navigate('/announcements/announcements')}>
                <Text style={styles.buttonText}>Create Announcement</Text>
            </TouchableOpacity>
        </View>
        </LinearGradient>
    )
}

const styles = StyleSheet.create({
    container : {
        height: '100%',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center'
    },
    button : {
        backgroundColor : '#d7de21',
        padding: 10,
        borderRadius: 10,
        alignContent: 'center',
        marginTop: 10
    },
    buttonText : {
        fontWeight : 'bold'
    },
    card: {
        backgroundColor: 'rgb(38 38 38)',
        width : width * 0.8,
        borderRadius: 20,
        padding: 10,
        display: 'flex',
        justifyContent: 'space-between'
    },
    title : {
        color: '#d7de21',
        fontSize: 32,
        fontWeight: 'bold'
    },
    subtitle: {
        fontSize: 15,
        textAlign: 'left',
        color: '#f0f0f0'
    },
    input : {
    borderWidth: 1,
    borderColor: '#a0a0a0ff',
    padding: 10,
    borderRadius: 6,
    color: '#ffffff9f',
    marginTop: 10
  },
  dropdown: {
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 8,
    padding: 10,
    backgroundColor: 'rgb(38 38 38)',
    fontSize : 15,
    color: '#ffffff9f'
  },
  placeholderStyle: {
    color: '#ffffff9f',
    fontSize : 14,

  },
  selectedTextStyle: {
    color: 'white',
  },
  itemTextStyle: {
    color: '#000',
  },
  inputSearchStyle: {
    color: '#000',
    backgroundColor: '#f2f2f2',
    borderRadius: 6,
    paddingHorizontal: 8,
  },
  selectedStyle: {
    backgroundColor: 'black',
    color: 'white',
    borderRadius: 8,
  },
})