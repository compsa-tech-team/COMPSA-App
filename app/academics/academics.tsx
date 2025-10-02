import { LinearGradient } from "expo-linear-gradient";
import React from "react";
import { Linking, Pressable, ScrollView, StyleSheet, Text, View } from "react-native";
import { ThemedText } from "../../components/themed-text";
import AcademicsTeam from "./academics-team";


export default function AcademicsScreen() {
  return (
    <LinearGradient
      colors={["#050505", "#1a1a1a", "#2b2512"]}
      locations={[0, 0.6, 1]}
      style={styles.gradientBackground}
    >
      <ScrollView
        style={styles.scrollView}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        {/* Hero */}
        <View style={styles.hero}>
          <LinearGradient
            colors={["rgba(18, 18, 18, 0.9)", "rgba(39, 30, 8, 0.6)"]}
            locations={[0, 1]}
            style={styles.heroSurface}
          >
            <ThemedText type="title" style={styles.heroTitle}>
              Academics
            </ThemedText>
            <ThemedText type="subtitle" style={styles.heroSubtitle}>
              Your hub for tutoring, exam support, resources, and professional development. Explore
              everything you need to succeed academically.
            </ThemedText>
          </LinearGradient>
        </View>

        {/* Resources */}
        <View style={styles.section}>
          <ThemedText type="defaultSemiBold" style={styles.sectionTitle}>
            Resources
          </ThemedText>
          {RESOURCES.map((res) => (
            <Pressable key={res.title} style={styles.card} onPress={() => Linking.openURL(res.link)}>
              <ThemedText type="defaultSemiBold" style={styles.cardTitle}>
                {res.title}
              </ThemedText>
              <ThemedText type="default" style={styles.cardDesc}>
                {res.desc}
              </ThemedText>
              <Text style={styles.linkBtn}>Open Resource &gt;</Text>
            </Pressable>
          ))}
        </View>

        {/* Academic Support */}
        <View style={styles.section}>
          <ThemedText type="defaultSemiBold" style={styles.sectionTitle}>
            Academic Support
          </ThemedText>

          <View style={styles.card}>
            <ThemedText type="defaultSemiBold" style={styles.cardTitle}>
              1-on-1 Tutoring
            </ThemedText>
            <ThemedText type="default" style={styles.cardDesc}>
              Need academic support? Explore the list of recognized tutors on the COMPSA Tutor
              Board. Financial aid is also available through our tutoring bursary program!
            </ThemedText>
            <View style={styles.btnRow}>
              {TUTORING_LINKS.map((link) => (
                <Pressable key={link.title} onPress={() => Linking.openURL(link.link)} style={styles.actionBtn}>
                  <Text style={styles.actionBtnText}>{link.title}</Text>
                </Pressable>
              ))}
            </View>
          </View>

          <View style={styles.card}>
            <ThemedText type="defaultSemiBold" style={styles.cardTitle}>
              Exam Tutorials
            </ThemedText>
            <View style={styles.badge}>
              <Text style={styles.badgeText}>Coming Soon</Text>
            </View>
            <ThemedText type="default" style={styles.cardDesc}>
              Exam Tutorials run every year in December and April. Come back then for more info!
            </ThemedText>
            <Pressable disabled style={styles.disabledBtn}>
              <Text style={styles.disabledBtnText}>TBD - Slides &amp; Recordings</Text>
            </Pressable>
          </View>
        </View>

        {/* Contact Info */}
        <View style={styles.section}>
          <ThemedText type="defaultSemiBold" style={styles.sectionTitle}>
            Contact Info
          </ThemedText>
          {CONTACTS.map((c) => (
            <View key={c.role} style={styles.card}>
              <ThemedText type="defaultSemiBold" style={styles.cardTitle}>
                {c.role}
              </ThemedText>
              <ThemedText type="default" style={styles.cardDesc}>
                {c.desc}
              </ThemedText>
              <Pressable onPress={() => Linking.openURL(`mailto:${c.contact}`)}>
                <Text style={styles.mailLink}>{c.contact}</Text>
              </Pressable>
            </View>
          ))}
        </View>

        {/* Team */}
        <View style={styles.section}>
          <ThemedText type="defaultSemiBold" style={[styles.sectionTitle, styles.teamHeading]}>
            Meet the Academics Team
          </ThemedText>
          <AcademicsTeam />
        </View>
      </ScrollView>
    </LinearGradient>
  );
}

const RESOURCES = [
  {
    title: "Grievances Form",
    desc: "Submit academic concerns or grievances to ensure your voice is heard and addressed.",
    link: "https://docs.google.com/forms/d/e/1FAIpQLSf1t6jvP1Hn_jaPuri5A6fkmXqMc4Qi3f_lm9wn3YEF_omzIg/viewform?usp=dialog",
  },
  {
    title: "Academic Consideration",
    desc: "Learn about policies and how to request consideration for extenuating circumstances.",
    link: "https://www.queensu.ca/artsci/undergraduate/student-services/academic-consideration",
  },
  {
    title: "First-Year Handbook",
    desc: "Your go-to guide for navigating first year in Computing (tips, resources, and advice).",
    link: "https://docs.google.com/document/d/106iFGe2qhG_uz-29F-5rOJlkRO-CpWzfQ6KX3CFXdNo/edit?usp=sharing",
  },
];

const TUTORING_LINKS = [
  {
    title: "Tutor Board",
    link: "https://docs.google.com/spreadsheets/d/1Wy5nTjf2Mxej_wEFKkmdp4gJwsRweB8KpZm6Asqmhy4/edit?usp=sharing",
  },
  {
    title: "Apply to be a Tutor",
    link: "https://docs.google.com/forms/d/e/1FAIpQLSdJFa96iBJPJlcLn8Cjj2gJhhIq7dkDiieywAqHtdbpO5yxYA/viewform?usp=dialog",
  },
  {
    title: "Tutor Request",
    link: "https://docs.google.com/forms/d/e/1FAIpQLSdVSPoAH03JnvVRuYQjyp7E_jsgFdOyZQEyrdTCPrRYFrMAPA/viewform?usp=header",
  },
];

const CONTACTS = [
  {
    role: "Undergraduate Chair",
    contact: "dingel@queensu.ca",
    desc: "Oversees academic programs and student matters. Contact them for extenuating circumstances or unjust treatment from professors.",
  },
  {
    role: "Computing Advising Office",
    contact: "advising@cs.queensu.ca",
    desc: "Your first point of contact regarding course selection, enrollment, graduation requirements, and more!",
  },
  {
    role: "Academics Director",
    contact: "academics@compsa.queensu.ca",
    desc: "Handles general academic inquiries and provides support for a wide range of academic concerns.",
  },
  {
    role: "Grievance Coordinator",
    contact: "lea@compsa.queensu.ca",
    desc: "Contact if you want to discuss issues or disputes related to a course or professor, beyond the Grievance Form.",
  },
];

const styles = StyleSheet.create({
  gradientBackground: { flex: 1 },
  scrollView: { flex: 1 },
  scrollContent: { paddingBottom: 80, paddingHorizontal: 20, paddingTop: 40 },
  hero: { alignItems: "center", marginBottom: 32 },
  heroSurface: {
    width: "100%",
    maxWidth: 720,
    borderRadius: 28,
    paddingVertical: 32,
    paddingHorizontal: 24,
    borderWidth: 1,
    borderColor: "rgba(250, 204, 21, 0.32)",
    backgroundColor: "rgba(8, 8, 8, 0.6)",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 18 },
    shadowOpacity: 0.3,
    shadowRadius: 32,
  },
  heroTitle: {
    textAlign: "center",
    fontSize: 32,
    letterSpacing: 0.6,
    marginBottom: 12,
    color: "#FACC15",
  },
  heroSubtitle: { textAlign: "center", color: "#8a8a8aff", opacity: 0.92, fontSize: 17},
  section: { marginBottom: 36 },
  sectionTitle: {
    fontSize: 22,
    marginBottom: 16,
    color: "#FACC15",
    textTransform: "uppercase",
    letterSpacing: 1.2,
  },
  teamHeading: { textAlign: "center" },
  card: {
    backgroundColor: "rgba(22, 22, 22, 0.88)",
    borderRadius: 20,
    padding: 18,
    marginBottom: 14,
    borderWidth: 1,
    borderColor: "rgba(250, 204, 21, 0.25)",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 12 },
    shadowOpacity: 0.24,
    shadowRadius: 22,
  },
  cardTitle: { marginBottom: 6, color: "#f8f8f8" },
  cardDesc: { color: "#d6d6d6", marginBottom: 10, lineHeight: 20 },
  linkBtn: { color: "#FFD24C", fontWeight: "600", letterSpacing: 0.5 },
  btnRow: { flexDirection: "row", flexWrap: "wrap", gap: 10 },
  actionBtn: {
    backgroundColor: "#FACC15",
    paddingHorizontal: 14,
    paddingVertical: 8,
    borderRadius: 999,
    marginRight: 6,
    marginBottom: 8,
  },
  actionBtnText: { color: "#1a1203", fontWeight: "700" },
  badge: {
    position: "absolute",
    right: 18,
    top: 18,
    backgroundColor: "#FACC15",
    borderRadius: 999,
    paddingHorizontal: 12,
    paddingVertical: 4,
  },
  badgeText: { color: "#1a1203", fontSize: 12, fontWeight: "700" },
  disabledBtn: {
    marginTop: 10,
    borderRadius: 999,
    paddingVertical: 8,
    paddingHorizontal: 16,
    backgroundColor: "rgba(90, 90, 90, 0.6)",
  },
  disabledBtnText: { color: "#cecece", fontWeight: "600" },
  mailLink: { color: "#FFD24C", fontFamily: "monospace", marginTop: 8 },
});

