import { ThemedText } from "@/components/themed-text";
import { LinearGradient } from "expo-linear-gradient";
import { useEffect, useState } from "react";
import { ActivityIndicator, Dimensions, Linking, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { supabase } from "../../utils/supabase";

const {width} = Dimensions.get("window");
type InternData = {
    id: number;
    company : string;
    role: string;
    location : string;
    link : string;
    created_at : Date;
}

const Internships = () => {

    const [internships, setInternships] = useState<InternData[] | null>(null);
    const [isLoading, setIsLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null)

    const handleApply = (url : string) => {
        Linking.openURL(url);
    }

    const loadJobs = async () => {
        
        setIsLoading(true);

        if (!supabase) {
            setInternships(null)
            setIsLoading(false)
            setError("Supabase not logged in")
            return;
        }

        try {
            let { data, error } = await supabase
            .from('internships')
            .select('*')
            
            if (error) {
                setError(error.message)
                setInternships([])
            } else {
                setError(null);
                setInternships(data || []);
            }
            setIsLoading(false);
            
        } catch (caught) {
            setError(caught instanceof Error ? caught.message : "Unknown error");
            setIsLoading(false);
            setInternships(null);
        }
            
    }

    useEffect(() => {
        loadJobs();
    }, [])

    return (
        <LinearGradient
            style={styles.container}
            colors={['#1f1f1f', '#1f1f1f', '#381c64']}
            locations={[0, 0.3, 1]}
        >
            <View style={styles.card}>
                
                <Text style={styles.title}>Internship Board</Text>
                {isLoading ? 
                <View style={styles.loadingState}>
                    <ActivityIndicator size="large" color="#FACC15" />
                    <ThemedText type="default">Loading FAQs?</ThemedText>
                </View> 
                : error ? 
                <View style={styles.loadingState}>
                    <ThemedText type="defaultSemiBold" style={styles.errorTitle}>
                        Unable to load Internships
                    </ThemedText>
                    <ThemedText type="default" style={styles.errorMessage}>
                        {error}
                    </ThemedText>
                    <TouchableOpacity style={styles.button} onPress={loadJobs}>
                        <Text style={styles.buttonText}>Tap to retry</Text>
                    </TouchableOpacity>
                </View>
                : internships?.map(internship => {
                    return (
                        <View style={styles.row}>
                            <Text>{internship.company}</Text>
                            <Text>{internship.role}</Text>
                            <TouchableOpacity style={styles.button} onPress={() => handleApply(internship.link)}>
                                <Text style={styles.buttonText}>Apply</Text>
                            </TouchableOpacity>
                        </View>
                    )
                })}
            </View>
        </LinearGradient>
    )
}

const styles = StyleSheet.create({
    container : {
        height: '100%',
        display: 'flex',
        alignItems: 'center',
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
    row : {
        display: 'flex',
        'flexDirection': 'row',
        gap: 3
    },
    button : {
        backgroundColor : '#d7de21',
        padding: 10,
        borderRadius: 10,
        alignContent: 'center'
    },
    buttonText : {
        fontWeight : 'bold'
    },
    loadingState: {
        alignItems: "center",
        justifyContent: "center",
        paddingVertical: 48,
        gap: 10,
    },
    errorTitle: { color: "#f87171" },
    errorMessage: { textAlign: "center", color: "#f3f4f6" },
})

export default Internships;