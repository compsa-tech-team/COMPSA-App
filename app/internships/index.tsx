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
                : internships?.map((internship, index) => {
                    return (
                      <View key={internship.id ?? index} style={{ width: "100%" }}>
                        <View style={styles.row}>
                          <View style={styles.jobInfo}>
                            <Text style={styles.companyText}>{internship.company}</Text>
                            <Text style={styles.jobText}>{internship.role}</Text>
                            <View style={styles.locationDate}>
                                <Text style={styles.locationText}>{internship.location}</Text>
                                <Text style={styles.dateText}>
                                    {new Date(internship.created_at).toLocaleDateString()}
                                </Text>
                            </View>
                          </View>
                          <TouchableOpacity style={styles.button} onPress={() => handleApply(internship.link)}>
                            <Text style={styles.buttonText}>Apply</Text>
                          </TouchableOpacity>
                        </View>
                  
                        <View style={styles.separator}/>
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
        justifyContent: 'space-between',
        alignItems:"center"
    },
    title : {
        color: '#d7de21',
        fontSize: 32,
        fontWeight: 'bold',
        marginBottom: 20,
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
        alignContent: 'center',
        height: 40,
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
    jobInfo: {
        flex: 1,
        minWidth: 0,
        gap: 4,
    },
    companyText: {
        color: '#f0f0f0',
        fontWeight: '700',
        fontSize: 20,
        flexShrink: 1,
        flexWrap: "wrap",
    },
    jobText: {
        color: '#f0f0f0',
        fontWeight: '600',
        fontSize: 14,
        flexShrink: 1,
        flexWrap: "wrap",
    },
    locationDate: {
        flexDirection: "row",
        alignItems: "center",
        gap: 8,
        marginTop: 8,
    },
    locationText: {
        color: '#d7de21',
        fontWeight: '600',
        fontSize: 14,
        borderColor: '#d7de21',
        borderWidth: 1.5,
        borderRadius: 50,
        paddingVertical: 4,
        paddingHorizontal: 8,
        marginRight: 8,
        alignSelf: "flex-start",
        flexShrink: 1,
        flexWrap: "wrap",
    },
    dateText: {
        color: '#f0f0f0',
        fontWeight: '400',
        fontSize: 14,
        flexShrink: 1,
        flexWrap: "wrap",
    },
    separator: {
        height: 1,
        backgroundColor: "rgba(255,255,255,0.2)",
        marginVertical: 18,
        width: "100%",
    },
    errorTitle: { color: "#f87171" },
    errorMessage: { textAlign: "center", color: "#f3f4f6" },
})

export default Internships;