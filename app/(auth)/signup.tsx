import { useState } from 'react';
import { View, Text, StyleSheet, Alert, TouchableOpacity, Platform } from 'react-native';
import { useRouter } from 'expo-router';
import { SafeAreaView } from 'react-native-safe-area-context';
import * as AppleAuthentication from 'expo-apple-authentication';
import { supabase } from '@/lib/supabase';
import { colors } from '@/constants/colors';
import { fontFamily, fontSize, spacing } from '@/constants/typography';

export default function SignupScreen() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  const afterAuth = async (userId: string, displayName?: string) => {
    const { data: existingProfile } = await supabase
      .from('users')
      .select('id')
      .eq('id', userId)
      .maybeSingle();

    if (existingProfile) {
      router.replace('/(tabs)/');
    } else {
      router.replace({ pathname: '/(auth)/profile', params: { appleName: displayName ?? '' } });
    }
  };

  const handleAppleSignIn = async () => {
    setLoading(true);
    try {
      const credential = await AppleAuthentication.signInAsync({
        requestedScopes: [
          AppleAuthentication.AppleAuthenticationScope.FULL_NAME,
          AppleAuthentication.AppleAuthenticationScope.EMAIL,
        ],
      });

      const { data, error } = await supabase.auth.signInWithIdToken({
        provider: 'apple',
        token: credential.identityToken!,
      });
      if (error) throw error;

      const givenName = credential.fullName?.givenName ?? '';
      const familyName = credential.fullName?.familyName ?? '';
      await afterAuth(data.user!.id, [givenName, familyName].filter(Boolean).join(' '));
    } catch (err: any) {
      if (err.code !== 'ERR_REQUEST_CANCELED') {
        Alert.alert('Sign in failed', 'Something went wrong. Please try again.');
      }
    } finally {
      setLoading(false);
    }
  };

  // DEV ONLY — anonymous sign-in, no email or password needed
  const handleDevSignIn = async () => {
    setLoading(true);
    const { data, error } = await supabase.auth.signInAnonymously();
    setLoading(false);
    if (error) { Alert.alert('Error', error.message); return; }
    await afterAuth(data.user!.id);
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.top}>
        <Text style={styles.wordmark}>Kairo</Text>
      </View>

      <View style={styles.bottom}>
        {Platform.OS === 'ios' && (
          <>
            <Text style={styles.hint}>Sign in to continue.</Text>
            <AppleAuthentication.AppleAuthenticationButton
              buttonType={AppleAuthentication.AppleAuthenticationButtonType.SIGN_IN}
              buttonStyle={AppleAuthentication.AppleAuthenticationButtonStyle.BLACK}
              cornerRadius={13}
              style={styles.appleButton}
              onPress={handleAppleSignIn}
            />
          </>
        )}

        {__DEV__ && (
          <View style={styles.devSection}>
            <Text style={styles.devLabel}>DEV ONLY</Text>
            <TouchableOpacity
              style={styles.devButton}
              onPress={handleDevSignIn}
              disabled={loading}
              activeOpacity={0.8}
            >
              <Text style={styles.devButtonText}>Continue without account</Text>
            </TouchableOpacity>
          </View>
        )}
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
    paddingHorizontal: spacing.xl,
    justifyContent: 'space-between',
  },
  top: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  wordmark: {
    fontFamily: fontFamily.serif,
    fontSize: 42,
    color: colors.text.primary,
    letterSpacing: 0.5,
  },
  bottom: {
    paddingBottom: spacing.xl * 2,
    gap: spacing.base,
    alignItems: 'center',
  },
  hint: {
    fontSize: fontSize.sm,
    color: colors.text.tertiary,
  },
  appleButton: {
    width: '100%',
    height: 52,
  },
  devSection: {
    width: '100%',
    gap: spacing.sm,
    marginTop: spacing.lg,
    paddingTop: spacing.lg,
    borderTopWidth: 1,
    borderTopColor: colors.border,
  },
  devLabel: {
    fontSize: fontSize.xs,
    color: colors.text.tertiary,
    letterSpacing: 0.8,
    fontWeight: '500',
    textAlign: 'center',
  },
  devButton: {
    backgroundColor: colors.text.secondary,
    borderRadius: 13,
    paddingVertical: 14,
    alignItems: 'center',
  },
  devButtonText: {
    color: colors.background,
    fontSize: fontSize.sm,
    fontWeight: '600',
  },
});
