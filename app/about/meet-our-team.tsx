import React from "react";
import { View, Text, Image, Linking, StyleSheet, TouchableOpacity, ScrollView } from "react-native";

const teamSections = [
  {
    title: "EXECUTIVE TEAM",
    members: [
      {
        name: "Hugh Tuckwell",
        role: "President",
        image: require("../../assets/images/team/hugh-tuckwell.jpg"),
        linkedin: "https://www.linkedin.com/in/hughtuckwell/",
      },
      {
        name: "Will Wu",
        role: "Vice President of Student Affairs",
        image: require("../../assets/images/team/will-wu.jpg"),
        linkedin: "https://www.linkedin.com/in/will24m",
      },
      {
        name: "Jasmine Zangeneh",
        role: "Vice President of Operations",
        image: require("../../assets/images/team/Jasmine-Zangeneh.jpg"),
        linkedin: "https://www.linkedin.com/in/j-zzz/",
      },
    ],
  },
  {
    title: "DIRECTORS",
    members: [
      {
        name: "Abdel-Rahman Mobarak",
        role: "Athletics Director",
        image: require("../../assets/images/team/Abdel-Rahman-Mobarak.jpg"),
        linkedin: "https://www.linkedin.com/in/abdel-rahman-mobarak/",
      },
      {
        name: "Bosco Ng",
        role: "Tech Director",
        image: require("../../assets/images/team/Bosco-Ng.jpg"),
        linkedin: "https://www.linkedin.com/in/bosco-c-ng/",
      },
      {
        name: "Ella St John",
        role: "Finance Director",
        image: require("../../assets/images/team/Ella-St-John.jpg"),
        linkedin:
          "https://www.linkedin.com/in/ella-st-john-877838270/?original_referer=https%3A%2F%2Fwww%2Egoogle%2Ecom%2F&originalSubdomain=ca",
      },
      {
        name: "Emma Heffernan",
        role: "Events Director",
        image: require("../../assets/images/team/Emma-Heffernan.jpg"),
        linkedin:
          "https://www.linkedin.com/in/emma-heffernan-702ba3211/?originalSubdomain=ca",
      },
      {
        name: "Grace Odunuga",
        role: "EDII Director",
        image: require("../../assets/images/team/Grace-Odunuga.jpg"),
        linkedin: "https://www.linkedin.com/in/grace-odunuga/",
      },
      {
        name: "Hashim Iftikhar",
        role: "Marketing Director",
        image: require("../../assets/images/team/Hashim-Iftikhar.jpg"),
        linkedin: "https://www.linkedin.com/in/hashim-iftikhar",
      },
      {
        name: "Kevin Yao",
        role: "Academics Director",
        image: require("../../assets/images/team/Kevin-Yao.jpg"),
        linkedin: "https://www.linkedin.com/in/ky028/",
      },
      {
        name: "Oran Chiarelli",
        role: "Socials Director",
        image: require("../../assets/images/team/Oran-Chiarelli.jpg"),
        linkedin: "https://compsa.ca/about",
      },
      {
        name: "Radmehr Vafadar",
        role: "Merch Director",
        image: require("../../assets/images/team/Radmehr-Vafadar.jpg"),
        linkedin:
          "https://www.linkedin.com/in/radmehr-vafadar-3b89391a1/?originalSubdomain=ca",
      },
      {
        name: "Reyan Sehgal",
        role: "Industry Outreach Director",
        image: require("../../assets/images/team/Reyan.jpg"),
        linkedin: "https://www.linkedin.com/in/reyansehgal/?originalSubdomain=ca",
      },
      {
        name: "Zain Al Sudani",
        role: "Internal Affairs Director",
        image: require("../../assets/images/team/Zain-Al-Sudani.jpg"),
        linkedin:
          "https://www.linkedin.com/in/zain-al-sudani-2070a9201/?originalSubdomain=ca",
      },
      {
        name: "Zane Al-Hamwy",
        role: "Professional Development Director",
        image: require("../../assets/images/team/Zane-Al-Hamwy.jpg"),
        linkedin: "https://www.linkedin.com/in/zanealhamwy/",
      },
    ],
  },
  {
    title: "YEAR REPRESENTATIVES",
    members: [
      {
        name: "Mohammed Sarhat",
        role: "Fourth Year Representative",
        image: require("../../assets/images/team/Mohammed-Sarhat.jpg"),
        linkedin: "https://www.linkedin.com/in/mosarhat/",
      },
      {
        name: "Shahnoor Sarfraz",
        role: "Second Year Representative",
        image: require("../../assets/images/team/Shahnoor-Sarfraz.jpg"),
        linkedin:
          "https://www.linkedin.com/in/shahnoor-sarfraz-9aa8b02b5/?originalSubdomain=ca",
      },
    ],
  },
];

// removes spaces/newlines
const clean = (s: string = "") =>
  s
    .replace(/\u00A0|\u200B|\u2028|\u2029/g, " ")
    .replace(/\r?\n/g, " ")
    .replace(/\s{2,}/g, " ")
    .trim();

// chunk into rows of two to avoid FlatList's row stretching
const toRows = <T,>(items: T[]) =>
  items.reduce<T[][]>((rows, item, i) => {
    if (i % 2 === 0) rows.push([item]);
    else rows[rows.length - 1].push(item);
    return rows;
  }, []);

const PersonCard = ({ item }: { item: any }) => (
  <View style={styles.person}>
    <Image source={item.image} style={styles.image} />
    <Text style={styles.name}>{clean(item.name)}</Text>
    <Text style={styles.role}>{clean(item.role)}</Text>
    {!!item.linkedin && (
      <TouchableOpacity
        style={styles.linkBtn}
        onPress={() => Linking.openURL(item.linkedin)}
      >
        <Image
          style={styles.icon}
          source={require("../../assets/socials-icons/linkedin.png")}
        />
      </TouchableOpacity>
    )}
  </View>
);

export default function MeetOurTeam() {
  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.mainTitle}>Meet Our Team</Text>

      {teamSections.map((section, index) => (
        <View key={index} style={styles.sectionTile}>
          <Text style={styles.sectionTitle}>{section.title}</Text>

          {section.title === "EXECUTIVE TEAM" ? (
            <>
              {/* President */}
              <View style={styles.fullRow}>
                <Image source={section.members[0].image} style={styles.image} />
                <Text style={styles.name}>{clean(section.members[0].name)}</Text>
                <Text style={styles.role}>{clean(section.members[0].role)}</Text>
                {!!section.members[0].linkedin && (
                  <TouchableOpacity
                    style={styles.linkBtn}
                    onPress={() => Linking.openURL(section.members[0].linkedin)}
                  >
                    <Image
                      style={styles.icon}
                      source={require("../../assets/socials-icons/linkedin.png")}
                    />
                  </TouchableOpacity>
                )}
              </View>

              {/* Remaining 2 */}
              {toRows(section.members.slice(1)).map((row, rIdx) => (
                <View key={`exec-row-${rIdx}`} style={styles.row}>
                  {row.map((m: any) => (
                    <PersonCard key={m.name} item={m} />
                  ))}
                  {row.length === 1 && <View style={[styles.person, { opacity: 0 }]} />}
                </View>
              ))}
            </>
          ) : (
            // All other sections
            toRows(section.members).map((row, rIdx) => (
              <View key={`row-${rIdx}`} style={styles.row}>
                {row.map((m: any) => (
                  <PersonCard key={m.name} item={m} />
                ))}
                {row.length === 1 && <View style={[styles.person, { opacity: 0 }]} />}
              </View>
            ))
          )}
        </View>
      ))}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    paddingTop: 50,
    paddingHorizontal: 20,
    paddingBottom: 40,
  },
  mainTitle: {
    fontSize: 32,
    fontWeight: "bold",
    color: "#d7de21",
    marginBottom: 24,
    textAlign: "center",
  },
  sectionTile: {
    width: "100%",
    backgroundColor: "rgba(36, 36, 36, 0.35)",
    borderRadius: 16,
    padding: 16,
    marginBottom: 24,

    // yellow left border
    borderLeftWidth: 3,
    borderLeftColor: "#d7de21",
    
    //shadow
    shadowColor: "#000",
    shadowOffset: { width: 1, height: 1 },
    shadowOpacity: 0.5,
    shadowRadius: 6,
    elevation: 6,
    overflow: "visible",
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: "bold",
    color: "white",
    marginBottom: 30,
  },
  row: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-start",
    marginBottom: 24,
  },
  person: {
    width: "47.5%",
    alignItems: "center",
    alignSelf: "flex-start",
  },
  fullRow: {
    alignItems: "center",
    marginBottom: 24,
  },
  image: {
    width: 100,
    height: 100,
    borderRadius: 50,
    marginBottom: 8,
    borderWidth: 2,
    borderColor: "#d7de21",
  },
  name: {
    fontSize: 16,
    fontWeight: "bold",
    color: "white",
    textAlign: "center",
    includeFontPadding: false,
    lineHeight: 20,
    marginTop: 6,
    marginBottom: 2,
  },
  role: {
    fontSize: 14,
    color: "#bbb",
    textAlign: "center",
    includeFontPadding: false,
    lineHeight: 18,
    marginTop: 2,
    marginBottom: 8,
  },
  linkBtn: {
    marginTop: 4,
  },
  icon: {
    width: 24,
    height: 24,
    resizeMode: "contain",
  },
});