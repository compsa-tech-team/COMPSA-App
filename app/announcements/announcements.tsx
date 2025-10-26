import Announcement from "@/components/ui/announcement";
import { LinearGradient } from "expo-linear-gradient";
import { router } from "expo-router";
import { useState } from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";

type AnnounceType = "job" | "event";

    const ALL_ANNOUNCEMENTS = [
        {
          id: "1",
          title: "iOS Dev Hiring",
          desc: "COMPSA is hiring a part-time iOS dev.",
          date: new Date(),
          clubName: "COMPSA",
          announceType: "job" as AnnounceType,
        },
        {
          id: "2",
          title: "AI Conference",
          desc: "Guest speakers and pizza.",
          date: new Date(),
          clubName: "QMind",
          announceType: "event" as AnnounceType,
        },
      ];

export default function Announcements() {
    const [visible, setVisible] = useState(ALL_ANNOUNCEMENTS);

    const CLUBS = ["All", "COMPSA", "QMind"] as const;
    const TYPES = ["All", "job", "event"] as const;

    const [selectedClub, setSelectedClub] = useState<(typeof CLUBS)[number]>("All");
    const [selectedType, setSelectedType] = useState<(typeof TYPES)[number]>("All");

    function applyFilter(nextClub = selectedClub, nextType = selectedType) {
        const filtered = ALL_ANNOUNCEMENTS.filter(a => {
          const clubOk = nextClub === "All" || a.clubName === nextClub;
          const typeOk = nextType === "All" || a.announceType === nextType;
          return clubOk && typeOk;
        });
        setVisible(filtered);
    }
    function resetFilters() {
        setSelectedClub("All");
        setSelectedType("All");
        setVisible(ALL_ANNOUNCEMENTS);
    }

    return (
        <LinearGradient
          style={styles.container}
          colors={['#1f1f1f', '#1f1f1f', '#381c64']}
          locations={[0, 0.3, 1]}
        >
            <View>
                <TouchableOpacity style={styles.button} onPress={() => router.push('/announcements/create/createAnnouncement')}>
                    <Text style={styles.buttonText}>Create Announcement</Text>
                </TouchableOpacity>
            </View>
                
            {/* Filter Bar */}
            <View style={styles.filterBar}>
            <Text style={styles.filterLabel}>Club</Text>
            <View style={styles.toggleRow}>
                {CLUBS.map(c => (
                <TouchableOpacity
                    key={c}
                    style={[styles.toggle, selectedClub === c && styles.toggleSelected]}
                    onPress={() => {
                    setSelectedClub(c);
                    applyFilter(c, selectedType);
                    }}
                >
                    <Text style={[styles.toggleText, selectedClub === c && styles.toggleTextSelected]}>{c}</Text>
                </TouchableOpacity>
                ))}
            </View>

            <Text style={[styles.filterLabel, { marginTop: 8 }]}>Type</Text>
            <View style={styles.toggleRow}>
                {TYPES.map(t => (
                <TouchableOpacity
                    key={t}
                    style={[styles.toggle, selectedType === t && styles.toggleSelected]}
                    onPress={() => {
                    setSelectedType(t);
                    applyFilter(selectedClub, t);
                    }}
                >
                    <Text style={[styles.toggleText, selectedType === t && styles.toggleTextSelected]}>{t}</Text>
                </TouchableOpacity>
                ))}
            </View>

            <View style={{ height: 10 }} />
            
            <View style={styles.filterActionsRow}>
            <Text style={styles.resultCount}>
                {visible.length} result{visible.length === 1 ? "" : "s"}
            </Text>
            <TouchableOpacity onPress={resetFilters} style={styles.clearBtn}>
                <Text style={styles.clearBtnText}>Clear filters</Text>
            </TouchableOpacity>
            </View>
            </View>

            {visible.length === 0 ? (
            <View style={styles.emptyState}>
                <Text style={styles.emptyTitle}>No announcements found</Text>
                <Text style={styles.emptySub}>Try different filters or clear them.</Text>
            </View>
            ) : (
            visible.map(a => (
                <Announcement
                key={a.id}
                title={a.title}
                desc={a.desc}
                date={a.date}
                clubName={a.clubName}
                announceType={a.announceType}
                />
            ))
            )}
        </LinearGradient>
    )
}

const styles = StyleSheet.create({
    container : {
        height: '100%',
        display: 'flex',
        alignItems: 'center',
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
    filterBar: {
        marginTop: 20,
        marginBottom: 10,
      },
      filterLabel: {
        color: '#f0f0f0',
        fontWeight: '600',
        marginBottom: 6,
      },
      toggleRow: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        gap: 8,
      },
      toggle: {
        paddingVertical: 6,
        paddingHorizontal: 12,
        borderRadius: 16,
        borderWidth: 1,
        borderColor: '#a0a0a0',
        backgroundColor: 'transparent',
      },
      toggleSelected: {
        backgroundColor: '#d7de21',
        borderColor: '#d7de21',
      },
      toggleText: {
        color: '#ffffffc0',
        fontWeight: '500',
        textTransform: 'capitalize',
      },
      toggleTextSelected: {
        color: '#1a1a1a',
      },
      filterActionsRow: {
        marginTop: 8,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
      },
      resultCount: {
        color: '#ffffffc0',
        fontWeight: '500',
      },
      clearBtn: {
        paddingVertical: 6,
        paddingHorizontal: 12,
        borderRadius: 14,
        borderWidth: 1,
        borderColor: '#a0a0a0',
      },
      clearBtnText: {
        color: '#ffffffc0',
        fontWeight: '600',
      },
      emptyState: {
        marginTop: 16,
        alignItems: 'center',
        padding: 16,
        borderRadius: 12,
        borderWidth: 1,
        borderColor: '#2d2d2d',
        backgroundColor: 'rgba(255,255,255,0.03)',
      },
      emptyTitle: {
        color: '#f0f0f0',
        fontWeight: '700',
        fontSize: 16,
      },
      emptySub: {
        color: '#bdbdbd',
        marginTop: 4,
      },
})