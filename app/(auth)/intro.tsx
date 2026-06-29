import { useState, useRef } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  FlatList,
  Dimensions,
} from 'react-native';
import { useRouter } from 'expo-router';
import { SafeAreaView } from 'react-native-safe-area-context';
import { colors } from '@/constants/colors';
import { fontFamily, fontSize, spacing } from '@/constants/typography';

const { width: W } = Dimensions.get('window');

// ── Card 1 illustration: "this week's Kairo" prompt card ─────────────────────
function PromptCardIllustration() {
  return (
    <View style={il.promptCard}>
      <Text style={il.promptLabel}>THIS WEEK'S KAIRO</Text>
      <Text style={il.promptText}>Find Water</Text>
    </View>
  );
}

// ── Card 2 illustration: fanned postcards ────────────────────────────────────
function FannedPostcardsIllustration() {
  return (
    <View style={il.fanContainer}>
      <View style={[il.fanCard, il.fanBack]}>
        <View style={[il.fanPhoto, { backgroundColor: '#C6B59A' }]} />
      </View>
      <View style={[il.fanCard, il.fanFront]}>
        <View style={[il.fanPhoto, { backgroundColor: '#9E8C72' }]}>
          <Text style={il.fanLocation}>Cedar Creek</Text>
        </View>
      </View>
    </View>
  );
}

// ── Card 3 illustration: 2×2 reveal grid ─────────────────────────────────────
function RevealGridIllustration() {
  const COLORS = ['#B79D7E', '#8E9A86', '#A88C84', '#C2AE8C'];
  return (
    <View style={il.grid}>
      {COLORS.map((c, i) => (
        <View key={i} style={il.gridCell}>
          <View style={[il.gridPhoto, { backgroundColor: c }]} />
        </View>
      ))}
    </View>
  );
}

const il = StyleSheet.create({
  // prompt card
  promptCard: {
    width: 220,
    backgroundColor: colors.surface,
    borderWidth: 1,
    borderColor: colors.border,
    borderRadius: 16,
    paddingHorizontal: 24,
    paddingVertical: 26,
    alignItems: 'center',
    shadowColor: '#26241F',
    shadowOffset: { width: 0, height: 10 },
    shadowOpacity: 0.10,
    shadowRadius: 20,
    elevation: 6,
  },
  promptLabel: {
    fontSize: 10,
    fontWeight: '600',
    letterSpacing: 1.6,
    textTransform: 'uppercase',
    color: colors.text.tertiary,
  },
  promptText: {
    fontFamily: fontFamily.serif,
    fontSize: 32,
    color: colors.text.primary,
    marginTop: 10,
    textAlign: 'center',
  },
  // fanned postcards
  fanContainer: {
    width: 240,
    height: 190,
    position: 'relative',
  },
  fanCard: {
    position: 'absolute',
    width: 188,
    aspectRatio: 1.31,
    backgroundColor: colors.surfaceWhite,
    borderRadius: 11,
    padding: 7,
    shadowColor: '#26241F',
    shadowOffset: { width: 0, height: 10 },
    shadowOpacity: 0.14,
    shadowRadius: 18,
    elevation: 6,
  },
  fanBack: {
    top: 34,
    left: 14,
    transform: [{ rotate: '-7deg' }],
    backgroundColor: colors.surface,
    borderWidth: 1,
    borderColor: '#EDE6D6',
  },
  fanFront: {
    top: 18,
    left: 42,
    transform: [{ rotate: '6deg' }],
  },
  fanPhoto: {
    flex: 1,
    borderRadius: 6,
    overflow: 'hidden',
    justifyContent: 'flex-end',
    padding: 7,
  },
  fanLocation: {
    color: '#fff',
    fontSize: 9,
    fontWeight: '600',
    letterSpacing: 0.8,
    textTransform: 'uppercase',
  },
  // reveal grid
  grid: {
    width: 236,
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 10,
  },
  gridCell: {
    width: (236 - 10) / 2,
    aspectRatio: 1.31,
    backgroundColor: colors.surfaceWhite,
    borderRadius: 9,
    padding: 5,
    shadowColor: '#26241F',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.10,
    shadowRadius: 10,
    elevation: 3,
  },
  gridPhoto: {
    flex: 1,
    borderRadius: 5,
  },
});

// ── Card data ─────────────────────────────────────────────────────────────────
const CARDS = [
  {
    Illustration: PromptCardIllustration,
    title: 'New Kairo, every week.',
    sub: null,
    button: 'Continue',
  },
  {
    Illustration: FannedPostcardsIllustration,
    title: 'Capture your Kairo.',
    sub: 'Collect your week in postcards.',
    button: 'Continue',
  },
  {
    Illustration: RevealGridIllustration,
    title: 'Thursdays, the reveal.',
    sub: "Everyone's take, all at once.",
    button: 'Get started',
  },
] as const;

export default function IntroScreen() {
  const router = useRouter();
  const [index, setIndex] = useState(0);
  const flatListRef = useRef<FlatList>(null);

  const advance = () => {
    if (index < CARDS.length - 1) {
      flatListRef.current?.scrollToIndex({ index: index + 1, animated: true });
    } else {
      router.replace('/(auth)/invite');
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <FlatList
        ref={flatListRef}
        data={CARDS}
        horizontal
        pagingEnabled
        showsHorizontalScrollIndicator={false}
        onMomentumScrollEnd={(e) => {
          setIndex(Math.round(e.nativeEvent.contentOffset.x / W));
        }}
        keyExtractor={(_, i) => String(i)}
        renderItem={({ item }) => {
          const { Illustration } = item;
          return (
            <View style={styles.page}>
              {/* wordmark */}
              <View style={styles.header}>
                <Text style={styles.wordmark}>Kairo</Text>
              </View>

              {/* illustration + text */}
              <View style={styles.body}>
                <Illustration />
                <Text style={styles.title}>{item.title}</Text>
                {item.sub ? <Text style={styles.sub}>{item.sub}</Text> : null}
              </View>

              {/* dots + button — rendered per-page so button label is correct */}
              <View style={styles.footer}>
                <View style={styles.dots}>
                  {CARDS.map((_, i) => (
                    <View key={i} style={[styles.dot, i === index && styles.dotActive]} />
                  ))}
                </View>
                <TouchableOpacity style={styles.button} onPress={advance} activeOpacity={0.85}>
                  <Text style={styles.buttonText}>{item.button}</Text>
                </TouchableOpacity>
              </View>
            </View>
          );
        }}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  page: {
    width: W,
    flex: 1,
    flexDirection: 'column',
  },
  header: {
    paddingTop: 16,
    alignItems: 'center',
  },
  wordmark: {
    fontFamily: fontFamily.serif,
    fontSize: 22,
    fontWeight: '500',
    color: colors.text.primary,
  },
  body: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 36,
    gap: 0,
  },
  title: {
    fontFamily: fontFamily.serif,
    fontSize: 28,
    lineHeight: 34,
    color: colors.text.primary,
    textAlign: 'center',
    marginTop: 40,
  },
  sub: {
    fontSize: fontSize.base,
    lineHeight: 23,
    color: colors.text.secondary,
    textAlign: 'center',
    marginTop: 11,
    maxWidth: 260,
  },
  footer: {
    paddingHorizontal: 36,
    paddingBottom: 46,
    gap: spacing.lg,
  },
  dots: {
    flexDirection: 'row',
    gap: 7,
    justifyContent: 'center',
  },
  dot: {
    width: 7,
    height: 7,
    borderRadius: 4,
    backgroundColor: '#D8CFBC',
  },
  dotActive: {
    backgroundColor: colors.text.primary,
  },
  button: {
    backgroundColor: colors.text.primary,
    borderRadius: 13,
    paddingVertical: 15,
    alignItems: 'center',
  },
  buttonText: {
    color: colors.background,
    fontSize: fontSize.base,
    fontWeight: '600',
  },
});
