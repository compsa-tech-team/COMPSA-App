import React, { useMemo } from "react";
import { Image, ImageSourcePropType, Pressable, StyleSheet, Text, View } from "react-native";
import { ExternalLink } from "../../components/external-link";
import { ThemedText } from "../../components/themed-text";
import { ThemedView } from "../../components/themed-view";
import type { Href } from "expo-router";

import Aariz from "../../assets/images/team/Aariz-Anish-Bhamani.jpg";
import Garvellia from "../../assets/images/team/Garvellia-Livert.jpg";
import Jeffery from "../../assets/images/team/Jeffery-Wu.jpg";
import Kevin from "../../assets/images/team/Kevin-Yao.jpg";
import Lea from "../../assets/images/team/Lea-D.jpg";

type ExternalHref = Extract<Href, string>;

type TeamMember = {
  name: string;
  role: string;
  image?: ImageSourcePropType | null;
  linkedin?: ExternalHref;
};

const MEMBERS: TeamMember[] = [
  {
    name: "Kevin Yao",
    role: "Academics Director",
    image: Kevin,
    linkedin: "https://linkedin.com/in/ky028",
  },
  {
    name: "Jeffery Wu",
    role: "Academics Co-director / Tutoring",
    image: Jeffery,
    linkedin: "https://www.linkedin.com/in/jefferylwu/",
  },
  {
    name: "Aariz Anish Bhamani",
    role: "Exam Tutorial Coordinator",
    image: Aariz,
    linkedin: "https://www.linkedin.com/in/aariz-bhamani/",
  },
  {
    name: "Zaid Alam",
    role: "Exam Tutorial Coordinator",
    image: null,
    linkedin: "https://www.linkedin.com/in/zaidalam06/",
  },
  {
    name: "Khushi Grover",
    role: "Academic Affairs Coordinator",
    image: null,
    linkedin: "https://www.linkedin.com/in/khushigrover724/",
  },
  {
    name: "Garvellia A. Livert",
    role: "Academic Affairs Coordinator",
    image: Garvellia,
    linkedin: "https://www.linkedin.com/in/garvellia-livert-b89956265/",
  },
  { name: "Lea Desre", role: "Grievances Coordinator", image: Lea },
  { name: "Emanuel Caravaggio", role: "Coffee Chats Coordinator", image: null },
];

export default function AcademicsTeam() {
  const data = useMemo(() => MEMBERS, []);
  const rows = useMemo(() => {
    const chunked: TeamMember[][] = [];
    for (let i = 0; i < data.length; i += 2) {
      chunked.push(data.slice(i, i + 2));
    }
    return chunked;
  }, [data]);

  return (
    <View style={styles.list}>
      {rows.map((row, rowIndex) => (
        <View key={`row-${rowIndex}`} style={styles.row}>
          {row.map((item) => (
            <ThemedView key={item.name} style={styles.card}>
              <View style={styles.avatar}>
                {item.image ? (
                  <Image source={item.image} style={styles.avatarImage} />
                ) : (
                  <View style={styles.avatarFallback}>
                    <Text style={styles.avatarFallbackText}>N/A</Text>
                  </View>
                )}
              </View>

              <ThemedText type="defaultSemiBold" style={styles.name}>
                {item.name}
              </ThemedText>
              <ThemedText type="default" style={styles.role}>
                {item.role}
              </ThemedText>

              {item.linkedin ? (
                <ExternalLink href={item.linkedin}>
                  <Pressable style={({ pressed }) => [styles.linkBtn, pressed && { opacity: 0.75 }]}>
                    <Text style={styles.linkText}>LinkedIn</Text>
                  </Pressable>
                </ExternalLink>
              ) : (
                <View style={[styles.linkBtn, styles.linkBtnDisabled]}>
                  <Text style={styles.linkText}>No Link</Text>
                </View>
              )}
            </ThemedView>
          ))}
          {row.length === 1 && (
            <View pointerEvents="none" style={[styles.card, styles.cardPlaceholder]} />
          )}
        </View>
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  list: { paddingTop: 4, paddingBottom: 8 },
  row: { flexDirection: "row", gap: 12 },
  card: {
    flex: 1,
    backgroundColor: "#1f1f1f",
    borderRadius: 16,
    padding: 14,
    borderWidth: 1,
    borderColor: "rgba(250, 204, 21, 0.35)",
    shadowColor: "#FACC15",
    shadowOpacity: 0.12,
    shadowRadius: 12,
    shadowOffset: { width: 0, height: 6 },
    marginBottom: 12,
    alignItems: "center",
  },
  cardPlaceholder: { opacity: 0 },
  avatar: {
    width: 72,
    height: 72,
    borderRadius: 36,
    borderWidth: 3,
    borderColor: "#FACC15",
    overflow: "hidden",
    marginBottom: 10,
    alignItems: "center",
    justifyContent: "center",
  },
  avatarImage: {
    width: "100%",
    height: "100%",
    resizeMode: "cover",
  },
  avatarFallback: {
    width: "100%",
    height: "100%",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#444",
  },
  avatarFallbackText: { color: "#999", fontWeight: "600" },
  name: { marginBottom: 2, textAlign: "center" },
  role: { opacity: 0.9, marginBottom: 10, textAlign: "center" },
  linkBtn: {
    alignSelf: "center",
    paddingHorizontal: 10,
    paddingVertical: 6,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: "rgba(250, 204, 21, 0.5)",
    backgroundColor: "rgba(250, 204, 21, 0.15)",
  },
  linkBtnDisabled: { opacity: 0.55 },
  linkText: { fontWeight: "600", color: "#F5F5F5", letterSpacing: 0.2 },
});



