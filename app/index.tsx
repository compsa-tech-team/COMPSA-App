import { Ionicons, MaterialCommunityIcons } from '@expo/vector-icons';
import { type ReactNode } from 'react';
import { Link, type Href } from 'expo-router';
import {
  Image,
  Pressable,
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  View,
} from 'react-native';

type FeatureCard = {
  key: string;
  title: string;
  description: string;
  href: Href;
  icon: (color: string) => ReactNode;
};

type BottomNavItem = {
  key: string;
  label: string;
  href: Href;
  icon: (color: string) => ReactNode;
};

const featureCards = [
  {
    key: 'room-booking',
    title: 'Room Booking',
    description: 'Reserve rooms for study sessions and events.',
    href: '/room-booking/index',
    icon: (color: string) => (
      <MaterialCommunityIcons name="door" size={22} color={color} />
    ),
  },
  {
    key: 'faqs',
    title: 'FAQs',
    description: 'Find answers to common questions quickly.',
    href: '/faq',
    icon: (color: string) => <Ionicons name="help-circle-outline" size={22} color={color} />,
  },
  {
    key: 'announcements',
    title: 'Announcement Hub',
    description: 'Stay up to date with the latest COMPSA news.',
    href: '/announcements/index',
    icon: (color: string) => <Ionicons name="megaphone-outline" size={22} color={color} />,
  },
  {
    key: 'academics',
    title: 'Academics',
    description: 'Explore academic resources tailored to you.',
    href: '/academics/index',
    icon: (color: string) => <Ionicons name="school-outline" size={22} color={color} />,
  },
  {
    key: 'about',
    title: 'About COMPSA',
    description: 'Learn more about our mission and team.',
    href: '/about/index',
    icon: (color: string) => <Ionicons name="information-circle-outline" size={22} color={color} />,
  },
  {
    key: 'cas-connect',
    title: 'CAS Connect',
    description: 'Access the CAS Connect resources and updates.',
    href: '/cas-connect/index',
    icon: (color: string) => <MaterialCommunityIcons name="account-group" size={22} color={color} />,
  },
] satisfies ReadonlyArray<FeatureCard>;

const bottomNavItems = [
  {
    key: 'academics',
    label: 'Academics',
    href: '/academics/index',
    icon: (color: string) => <Ionicons name="school" size={22} color={color} />,
  },
  {
    key: 'bookings',
    label: 'Bookings',
    href: '/room-booking/index',
    icon: (color: string) => <MaterialCommunityIcons name="calendar-clock" size={22} color={color} />,
  },
  {
    key: 'about',
    label: 'About',
    href: '/about/index',
    icon: (color: string) => <Ionicons name="information-circle" size={22} color={color} />,
  },
] satisfies ReadonlyArray<BottomNavItem>;

export default function HomeScreen() {
  return (
    <SafeAreaView style={styles.safeArea}>
      <StatusBar barStyle="light-content" />

      <ScrollView
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.heroContent}>
          <View style={styles.heroRow}>
            <Image
              source={require('../assets/images/compsa_logo.png')}
              resizeMode="contain"
              style={styles.logo}
            />
            <View style={styles.heroTextGroup}>
              <Text style={styles.appName}>COMPSA</Text>
              <Text style={styles.heroTitle}>Welcome to COMPSA</Text>
            </View>
          </View>
          <Text style={styles.heroSubtitle}>
            Centralize your campus experience with quick access to every corner of the app.
          </Text>

          <Link href="/announcements/index" asChild>
            <Pressable style={styles.ctaButton}>
              <Text style={styles.ctaLabel}>Go to Events Calendar</Text>
              <Ionicons name="arrow-forward" size={20} color="#0e0e0e" />
            </Pressable>
          </Link>
        </View>

        <View style={styles.sectionHeader}>
          <Text style={styles.sectionTitle}>Explore the app</Text>
          <Text style={styles.sectionSubtitle}>
            Explore features that help you stay engaged and informed.
          </Text>
        </View>

        <View style={styles.cardsGrid}>
          {featureCards.map((card) => (
            <Link key={card.key} href={card.href} asChild>
              <Pressable style={styles.card}>
                <View style={styles.cardIcon}>{card.icon('#d7de21')}</View>
                <Text style={styles.cardTitle}>{card.title}</Text>
                <Text style={styles.cardDescription}>{card.description}</Text>
              </Pressable>
            </Link>
          ))}
        </View>
      </ScrollView>

      <View style={styles.bottomNav}>
        {bottomNavItems.map((item) => (
          <Link key={item.key} href={item.href} asChild>
            <Pressable style={styles.navItem}>
              <View style={styles.navItemIcon}>{item.icon('#d7de21')}</View>
              <Text style={styles.navLabel}>{item.label}</Text>
            </Pressable>
          </Link>
        ))}
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#050505',
  },
  scrollContent: {
    paddingHorizontal: 24,
    paddingBottom: 160,
  },
  logo: {
    width: 64,
    height: 64,
  },
  appName: {
    fontSize: 14,
    letterSpacing: 3,
    color: '#d7de21',
    fontWeight: '600',
    textTransform: 'uppercase',
  },
  heroContent: {
    marginTop: 32,
    marginBottom: 32,
  },
  heroRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 18,
  },
  heroTextGroup: {
    flexShrink: 1,
  },
  heroTitle: {
    fontSize: 32,
    fontWeight: '700',
    color: '#ffffff',
    marginBottom: 8,
  },
  heroSubtitle: {
    fontSize: 16,
    color: '#9ea0a6',
    lineHeight: 22,
    marginBottom: 18,
  },
  ctaButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#d7de21',
    paddingVertical: 14,
    borderRadius: 12,
    paddingHorizontal: 16,
  },
  ctaLabel: {
    fontSize: 16,
    fontWeight: '600',
    color: '#0e0e0e',
    textTransform: 'uppercase',
    letterSpacing: 0.5,
  },
  sectionHeader: {
    marginBottom: 20,
  },
  sectionTitle: {
    fontSize: 20,
    color: '#ffffff',
    fontWeight: '600',
    marginBottom: 6,
  },
  sectionSubtitle: {
    fontSize: 14,
    color: '#7c7f86',
    lineHeight: 20,
  },
  cardsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    paddingBottom: 16,
  },
  card: {
    width: '48%',
    backgroundColor: '#111111',
    borderRadius: 18,
    padding: 18,
    borderWidth: 1,
    borderColor: '#1f1f1f',
    marginBottom: 16,
  },
  cardIcon: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#202020',
    alignItems: 'center',
    justifyContent: 'center',
  },
  cardTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#ffffff',
    marginBottom: 6,
  },
  cardDescription: {
    fontSize: 13,
    color: '#868b96',
    lineHeight: 18,
  },
  bottomNav: {
    position: 'absolute',
    left: 0,
    right: 0,
    bottom: 0,
    borderTopWidth: 1,
    borderTopColor: '#1f1f1f',
    backgroundColor: '#000000',
    flexDirection: 'row',
    justifyContent: 'space-around',
    paddingVertical: 18,
    paddingBottom: 28,
  },
  navItem: {
    alignItems: 'center',
  },
  navItemIcon: {
    marginBottom: 4,
  },
  navLabel: {
    fontSize: 12,
    color: '#d7de21',
    fontWeight: '500',
  },
});
