import { Ionicons } from "@expo/vector-icons";
import { decode } from "html-entities";
import React, { useCallback, useEffect, useMemo, useState } from "react";
import {
  ActivityIndicator,
  Linking,
  Pressable,
  RefreshControl,
  ScrollView,
  SectionList,
  SectionListRenderItem,
  StyleSheet,
  TextInput,
  View,
} from "react-native";
import Hyperlink from "react-native-hyperlink";
import { SafeAreaView } from "react-native-safe-area-context";

import { ThemedText } from "../../components/themed-text";
import { ThemedView } from "../../components/themed-view";
import type { FaqEntry } from "../../types/faq";
import { supabase } from "../../utils/supabase";

const FILTER_ALL = "all";
const FALLBACK_CATEGORY = "General";

type FaqSection = {
  title: string;
  key: string;
  data: FaqEntry[];
};

export default function FaqScreen() {
  const [faqs, setFaqs] = useState<FaqEntry[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<string>(FILTER_ALL);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [expandedIds, setExpandedIds] = useState<Set<string>>(new Set());

  const htmlToPlainText = useCallback((value: string) => {
    const intermediate = value
      .replace(/<br\s*\/?>/gi, "\n")
      .replace(/<\/(p|div)>/gi, "\n\n")
      .replace(/<\/li>/gi, "\n")
      .replace(/<li[^>]*>/gi, "? ")
      .replace(/&nbsp;/gi, " ")
      .replace(/<[^>]+>/g, " ");

    const decoded = decode(intermediate);

    return decoded
      .replace(/\r/g, "")
      .replace(/\u00A0/g, " ")
      .replace(/[ \t]+\n/g, "\n")
      .replace(/\n{3,}/g, "\n\n")
      .replace(/[ \t]{2,}/g, " ")
      .trim();
  }, []);

  const stripHtml = useCallback((value: string) => htmlToPlainText(value), [htmlToPlainText]);

  const loadFaqs = useCallback(async () => {
    if (!supabase) {
      setError("Supabase is not configured. Check your environment variables.");
      setLoading(false);
      setRefreshing(false);
      return;
    }

    try {
      setError(null);
      const { data, error: fetchError } = await supabase
        .from("faq")
        .select(
          "id, question, answer_text, answer_html, category, page, source_url, anchor, tags, updated_at, created_at",
        )
        .order("question", { ascending: true });

      if (fetchError) {
        setError(fetchError.message);
        setFaqs([]);
      } else {
        setFaqs(data ?? []);
      }
    } catch (caught) {
      setError(caught instanceof Error ? caught.message : "Unknown error");
      setFaqs([]);
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  }, []);

  useEffect(() => {
    loadFaqs();
  }, [loadFaqs]);

  useEffect(() => {
    setExpandedIds(new Set());
  }, [selectedCategory, searchTerm]);

  const categories = useMemo(() => {
    const unique = new Set<string>();
    faqs.forEach((item) => {
      if (item.category) {
        unique.add(item.category);
      }
    });
    return [FILTER_ALL, ...Array.from(unique).sort((a, b) => a.localeCompare(b))];
  }, [faqs]);

  const filteredFaqs = useMemo(() => {
    const query = searchTerm.trim().toLowerCase();

    return faqs.filter((item) => {
      const matchesCategory =
        selectedCategory === FILTER_ALL || item.category === selectedCategory;

      if (!matchesCategory) {
        return false;
      }

      if (!query) {
        return true;
      }

      const haystack = [
        item.question ?? "",
        item.answer_text ?? "",
        item.answer_html ? stripHtml(item.answer_html) : "",
        item.category ?? "",
        item.page ?? "",
        Array.isArray(item.tags) ? item.tags.join(" ") : "",
      ]
        .join(" ")
        .toLowerCase();

      return haystack.includes(query);
    });
  }, [faqs, searchTerm, selectedCategory, stripHtml]);

  const totalCount = faqs.length;
  const resultsCount = filteredFaqs.length;
  const hasActiveFilters = selectedCategory !== FILTER_ALL || searchTerm.trim().length > 0;

  const resetFilters = useCallback(() => {
    setSelectedCategory(FILTER_ALL);
    setSearchTerm("");
  }, []);

  const sections = useMemo<FaqSection[]>(() => {
    if (!filteredFaqs.length) {
      return [];
    }

    const buckets = new Map<string, FaqEntry[]>();
    filteredFaqs.forEach((item) => {
      const key = item.category && item.category.trim().length > 0 ? item.category.trim() : FALLBACK_CATEGORY;
      const bucket = buckets.get(key) ?? [];
      bucket.push(item);
      buckets.set(key, bucket);
    });

    return Array.from(buckets.entries())
      .sort(([a], [b]) => a.localeCompare(b))
      .map(([title, data]) => ({
        title,
        key: title.toLowerCase(),
        data: data.sort((a, b) => {
          const aQ = (a.question ?? "").toLowerCase();
          const bQ = (b.question ?? "").toLowerCase();
          return aQ.localeCompare(bQ);
        }),
      }));
  }, [filteredFaqs]);

  const handleTagPress = useCallback(
    (tag: string) => {
      setSelectedCategory(FILTER_ALL);
      setSearchTerm(tag);
    },
    [],
  );

  const toggleExpanded = useCallback((id: FaqEntry["id"]) => {
    setExpandedIds((prev) => {
      const next = new Set(prev);
      const key = String(id);
      if (next.has(key)) {
        next.delete(key);
      } else {
        next.add(key);
      }
      return next;
    });
  }, []);

  const handleRefresh = useCallback(() => {
    setRefreshing(true);
    loadFaqs();
  }, [loadFaqs]);

  const keyExtractor = useCallback((item: FaqEntry) => String(item.id), []);

  const renderSectionHeader = useCallback(
    ({ section }: { section: FaqSection }) => (
      <View style={styles.sectionHeader}>
        <View style={styles.sectionHeaderRow}>
          <Ionicons name="folder-open-outline" size={16} color="#FACC15" />
          <ThemedText type="defaultSemiBold" style={styles.sectionTitle}>
            {section.title}
          </ThemedText>
        </View>
        <View style={styles.sectionDivider} />
      </View>
    ),
    [],
  );

  const renderItem = useCallback<SectionListRenderItem<FaqEntry, FaqSection>>(
    ({ item }) => {
      const key = String(item.id);
      const isExpanded = expandedIds.has(key);
      const baseAnswer =
        item.answer_text ??
        (item.answer_html ? htmlToPlainText(item.answer_html) : "");
      const previewText = baseAnswer.replace(/\s+/g, " ").trim();
      const truncatedPreview =
        previewText.length > 200 ? `${previewText.slice(0, 200)}?` : previewText;
      const linkTarget = item.source_url
        ? item.anchor
          ? `${item.source_url}#${item.anchor}`
          : item.source_url
        : null;

      return (
        <ThemedView style={[styles.card, isExpanded && styles.cardExpanded]}>
          <Pressable
            onPress={() => toggleExpanded(item.id)}
            style={({ pressed }) => [styles.cardHeader, pressed && styles.cardHeaderPressed]}
            accessibilityRole="button"
            accessibilityState={{ expanded: isExpanded }}
          >
            <View style={styles.cardHeading}>
              <ThemedText type="defaultSemiBold" style={styles.question}>
                {item.question ?? "Untitled question"}
              </ThemedText>
              {item.page ? (
                <View style={styles.pageBadge}>
                  <ThemedText type="default" style={styles.pageBadgeText}>
                    {item.page}
                  </ThemedText>
                </View>
              ) : null}
            </View>
            <Ionicons name={isExpanded ? "chevron-up" : "chevron-down"} size={18} color="#FACC15" />
          </Pressable>

          {!isExpanded ? (
            <ThemedText type="default" style={styles.preview} numberOfLines={2}>
              {previewText.length ? truncatedPreview : "Tap to view the answer."}
            </ThemedText>
          ) : (
            <View style={styles.cardBody}>
              <Hyperlink
                linkStyle={styles.inlineLink}
                linkDefault={false}
                onPress={(url) => Linking.openURL(url)}
              >
                <ThemedText type="default" style={styles.answer}>
                  {(baseAnswer || "Answer coming soon.").trim()}
                </ThemedText>
              </Hyperlink>

              <View style={styles.metaRow}>
                {item.page ? (
                  <View style={styles.metaPill}>
                    <Ionicons name="reader-outline" size={14} color="#FACC15" />
                    <ThemedText type="default" style={styles.metaPillText}>
                      {item.page}
                    </ThemedText>
                  </View>
                ) : null}
                {Array.isArray(item.tags)
                  ? item.tags.map((tag) => (
                      <Pressable
                        key={tag}
                        onPress={() => handleTagPress(tag)}
                        accessibilityRole="button"
                        accessibilityLabel={`Search for tag ${tag}`}
                        style={({ pressed }) => [
                          styles.metaPill,
                          styles.tagPill,
                          pressed && styles.tagPillPressed,
                        ]}
                      >
                        <Ionicons name="pricetag-outline" size={14} color="#e5e7eb" />
                        <ThemedText type="default" style={styles.tagPillText}>
                          {tag}
                        </ThemedText>
                      </Pressable>
                    ))
                  : null}
              </View>

              <View style={styles.cardFooter}>
                {linkTarget ? (
                  <Pressable
                    style={({ pressed }) => [styles.linkRow, pressed && styles.linkRowPressed]}
                    onPress={() => Linking.openURL(linkTarget)}
                  >
                    <Ionicons name="link-outline" size={16} color="#FACC15" />
                    <ThemedText type="link" style={styles.linkText}>
                      View original resource
                    </ThemedText>
                  </Pressable>
                ) : null}
                <ThemedText type="default" style={styles.meta}>
                  Updated {item.updated_at ? new Date(item.updated_at).toLocaleDateString() : "recently"}
                </ThemedText>
              </View>
            </View>
          )}
        </ThemedView>
      );
    },
    [expandedIds, handleTagPress, htmlToPlainText, toggleExpanded],
  );

  if (!supabase) {
    return (
      <View style={styles.unconfigured}>
        <ThemedText type="title">Supabase not configured</ThemedText>
        <ThemedText type="default">
          Add EXPO_PUBLIC_SUPABASE_URL and EXPO_PUBLIC_SUPABASE_KEY to your environment before
          using this screen.
        </ThemedText>
      </View>
    );
  }

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.container}>
        <SectionList
          sections={sections}
          keyExtractor={keyExtractor}
          renderItem={renderItem}
          renderSectionHeader={renderSectionHeader}
          stickySectionHeadersEnabled={false}
          contentContainerStyle={styles.listContent}
          refreshControl={<RefreshControl refreshing={refreshing} onRefresh={handleRefresh} />}
          ListHeaderComponent={
            <View style={styles.header}>
              <View style={styles.hero}>
                <ThemedText type="subtitle" style={styles.heroEyebrow}>
                  FAQ HUB
                </ThemedText>
                <ThemedText type="title" style={styles.title}>
                  Find answers fast
                </ThemedText>
                <ThemedText type="default" style={styles.subtitle}>
                  Search by keyword or browse by category to discover what others have asked before
                  you reach out.
                </ThemedText>
              </View>
              <View style={styles.searchContainer}>
                <Ionicons name="search-outline" size={18} color="#9ca3af" style={styles.searchIcon} />
                <TextInput
                  style={styles.searchInput}
                  placeholder="Search by question, answer, or tag"
                  placeholderTextColor="#9ca3af"
                  value={searchTerm}
                  onChangeText={setSearchTerm}
                  autoCapitalize="none"
                  autoCorrect={false}
                  returnKeyType="search"
                />
              </View>
              <ScrollView
                horizontal
                showsHorizontalScrollIndicator={false}
                contentContainerStyle={styles.filterRow}
              >
                {categories.map((category) => {
                  const isActive = category === selectedCategory;
                  const label = category === FILTER_ALL ? "All" : category;
                  return (
                    <Pressable
                      key={category}
                      accessibilityRole="button"
                      accessibilityState={{ selected: isActive }}
                      onPress={() => setSelectedCategory(category)}
                      style={({ pressed }) => [
                        styles.chip,
                        isActive ? styles.chipActive : styles.chipInactive,
                        pressed && styles.chipPressed,
                      ]}
                    >
                      <ThemedText
                        type="defaultSemiBold"
                        style={isActive ? styles.chipTextActive : styles.chipTextInactive}
                      >
                        {label}
                      </ThemedText>
                    </Pressable>
                  );
                })}
              </ScrollView>
              <View style={styles.summaryRow}>
                <ThemedText type="default" style={styles.summaryText}>
                  {totalCount === 0
                    ? "No FAQs available yet"
                    : resultsCount === totalCount
                      ? `Showing ${resultsCount} FAQs`
                      : `Showing ${resultsCount} of ${totalCount} FAQs`}
                </ThemedText>
                {hasActiveFilters ? (
                  <Pressable
                    accessibilityRole="button"
                    onPress={resetFilters}
                    style={({ pressed }) => [styles.resetButton, pressed && styles.resetButtonPressed]}
                  >
                    <Ionicons name="refresh-outline" size={15} color="#1f1304" />
                    <ThemedText type="defaultSemiBold" style={styles.resetButtonText}>
                      Reset
                    </ThemedText>
                  </Pressable>
                ) : null}
              </View>
            </View>
          }
          ListEmptyComponent={
            loading ? (
              <View style={styles.loadingState}>
                <ActivityIndicator size="large" color="#FACC15" />
                <ThemedText type="default">Loading FAQs?</ThemedText>
              </View>
            ) : error ? (
              <View style={styles.loadingState}>
                <ThemedText type="defaultSemiBold" style={styles.errorTitle}>
                  Unable to load FAQs
                </ThemedText>
                <ThemedText type="default" style={styles.errorMessage}>
                  {error}
                </ThemedText>
                <ThemedText type="link" onPress={loadFaqs}>
                  Tap to retry
                </ThemedText>
              </View>
            ) : (
              <View style={styles.loadingState}>
                <Ionicons name="alert-circle-outline" size={20} color="#FACC15" />
                <ThemedText type="defaultSemiBold">No matches found</ThemedText>
                <ThemedText type="default">
                  Try adjusting your search or filter to see more results.
                </ThemedText>
              </View>
            )
          }
          ListFooterComponent={<View style={styles.footerSpacing} />}
        />
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: { flex: 1, backgroundColor: "#0b0b0b" },
  container: { flex: 1, backgroundColor: "#0b0b0b" },
  listContent: { paddingHorizontal: 20, paddingBottom: 32, paddingTop: 16 },
  header: { marginBottom: 24, gap: 18 },
  hero: {
    backgroundColor: "rgba(250, 204, 21, 0.08)",
    borderRadius: 20,
    paddingHorizontal: 18,
    paddingVertical: 16,
    borderWidth: 1,
    borderColor: "rgba(250, 204, 21, 0.18)",
  },
  heroEyebrow: { color: "#fde68a", letterSpacing: 1.2 },
  title: { marginTop: 4, marginBottom: 6, color: "#FACC15" },
  subtitle: { color: "#d1d5db" },
  searchContainer: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "rgba(255, 255, 255, 0.06)",
    borderRadius: 14,
    borderWidth: 1,
    borderColor: "rgba(250, 204, 21, 0.25)",
    paddingHorizontal: 12,
    paddingVertical: 6,
    gap: 8,
  },
  searchIcon: { marginLeft: 2 },
  searchInput: {
    flex: 1,
    paddingVertical: 8,
    color: "#f9fafb",
    fontSize: 16,
  },
  filterRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
    paddingVertical: 2,
  },
  chip: {
    borderRadius: 999,
    paddingVertical: 8,
    paddingHorizontal: 16,
  },
  chipPressed: {
    opacity: 0.85,
  },
  chipInactive: {
    backgroundColor: "rgba(255, 255, 255, 0.04)",
    borderWidth: 1,
    borderColor: "rgba(148, 163, 184, 0.35)",
  },
  chipActive: {
    backgroundColor: "rgba(250, 204, 21, 0.22)",
    borderWidth: 1,
    borderColor: "rgba(250, 204, 21, 0.6)",
  },
  chipTextInactive: { color: "#f3f4f6" },
  chipTextActive: { color: "#1a1203" },
  summaryRow: {
    marginTop: 6,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  summaryText: { color: "#d1d5db" },
  resetButton: {
    flexDirection: "row",
    alignItems: "center",
    gap: 6,
    backgroundColor: "rgba(250, 204, 21, 0.28)",
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 999,
    borderWidth: 1,
    borderColor: "rgba(250, 204, 21, 0.4)",
  },
  resetButtonPressed: { opacity: 0.8 },
  resetButtonText: { color: "#1f1304" },
  sectionHeader: { marginTop: 12, marginBottom: 8 },
  sectionHeaderRow: { flexDirection: "row", alignItems: "center", gap: 8 },
  sectionTitle: { color: "#fde68a" },
  sectionDivider: {
    marginTop: 6,
    height: 1,
    backgroundColor: "rgba(250, 204, 21, 0.2)",
  },
  card: {
    backgroundColor: "rgba(24, 24, 24, 0.94)",
    borderRadius: 18,
    paddingHorizontal: 16,
    paddingVertical: 14,
    borderWidth: 1,
    borderColor: "rgba(250, 204, 21, 0.2)",
    marginBottom: 14,
  },
  cardExpanded: {
    borderColor: "rgba(250, 204, 21, 0.38)",
    shadowColor: "#FACC15",
    shadowOpacity: 0.18,
    shadowRadius: 18,
    shadowOffset: { width: 0, height: 10 },
  },
  cardHeader: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    gap: 16,
  },
  cardHeaderPressed: {
    opacity: 0.9,
  },
  cardHeading: { flex: 1, gap: 8 },
  question: { color: "#facc15" },
  pageBadge: {
    alignSelf: "flex-start",
    borderRadius: 999,
    backgroundColor: "rgba(250, 204, 21, 0.15)",
    paddingHorizontal: 12,
    paddingVertical: 4,
    borderWidth: 1,
    borderColor: "rgba(250, 204, 21, 0.4)",
  },
  pageBadgeText: { color: "#fde68a", fontSize: 13 },
  preview: {
    marginTop: 10,
    color: "#e5e7eb",
    lineHeight: 20,
  },
  cardBody: {
    marginTop: 14,
    gap: 16,
  },
  answer: { color: "#f3f4f6", lineHeight: 22 },
  inlineLink: {
    color: "#facc15",
    textDecorationLine: "underline",
  },
  metaRow: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 8,
  },
  metaPill: {
    flexDirection: "row",
    alignItems: "center",
    gap: 6,
    backgroundColor: "rgba(250, 204, 21, 0.12)",
    borderRadius: 999,
    paddingHorizontal: 12,
    paddingVertical: 6,
  },
  metaPillText: { color: "#fde68a", fontSize: 13 },
  tagPill: {
    backgroundColor: "rgba(148, 163, 184, 0.18)",
  },
  tagPillPressed: { opacity: 0.75 },
  tagPillText: { color: "#e5e7eb", fontSize: 13 },
  cardFooter: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    flexWrap: "wrap",
    gap: 10,
  },
  linkRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 6,
  },
  linkRowPressed: {
    opacity: 0.75,
  },
  linkText: { fontSize: 15 },
  meta: { color: "#9ca3af", fontSize: 13 },
  loadingState: {
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 48,
    gap: 10,
  },
  errorTitle: { color: "#f87171" },
  errorMessage: { textAlign: "center", color: "#f3f4f6" },
  footerSpacing: { height: 32 },
  unconfigured: {
    flex: 1,
    padding: 24,
    justifyContent: "center",
    gap: 12,
  },
});










