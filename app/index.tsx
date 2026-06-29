import { useEffect } from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { useRouter } from 'expo-router';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useAuth } from '@/contexts/AuthContext';
import { colors } from '@/constants/colors';
import { fontFamily, fontSize, spacing } from '@/constants/typography';

export default function LaunchScreen() {
  const router = useRouter();
  const { session, profile, loading } = useAuth();

  useEffect(() => {
    if (loading) return;
    if (session && profile) {
      router.replace('/(tabs)/');
    } else if (session && !profile) {
      router.replace('/(auth)/profile');
    }
  }, [session, profile, loading]);

  if (loading || session) return null;

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.top}>
        <Text style={styles.wordmark}>Kairo</Text>
        <View style={styles.divider} />
        <Text style={styles.tagline}>Make the day count.</Text>
      </View>
      <View style={styles.bottom}>
        <TouchableOpacity
          style={styles.primaryButton}
          onPress={() => router.push('/(auth)/signup')}
          activeOpacity={0.85}
        >
          <Text style={styles.primaryButtonText}>Get started</Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => router.push('/(auth)/signup')}
          activeOpacity={0.7}
        >
          <Text style={styles.secondaryLink}>I already have an account.</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
    justifyContent: 'space-between',
    paddingHorizontal: spacing.xl,
  },
  top: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingTop: '15%',
  },
  wordmark: {
    fontFamily: fontFamily.serif,
    fontSize: 42,
    color: colors.text.primary,
    letterSpacing: 0.5,
  },
  divider: {
    width: 32,
    height: 1,
    backgroundColor: colors.border,
    marginVertical: spacing.lg,
  },
  tagline: {
    fontSize: fontSize.base,
    color: colors.text.secondary,
    letterSpacing: 0.2,
  },
  bottom: {
    paddingBottom: spacing.xl * 2,
    gap: spacing.lg,
    alignItems: 'center',
  },
  primaryButton: {
    backgroundColor: colors.text.primary,
    borderRadius: 13,
    paddingVertical: 16,
    width: '100%',
    alignItems: 'center',
  },
  primaryButtonText: {
    color: colors.background,
    fontSize: fontSize.base,
    fontWeight: '600',
    letterSpacing: 0.2,
  },
  secondaryLink: {
    fontSize: fontSize.sm,
    color: colors.text.tertiary,
  },
});
