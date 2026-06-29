import { View, Text, TouchableOpacity, StyleSheet, Alert } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useAuth } from '@/contexts/AuthContext';
import { supabase } from '@/lib/supabase';
import { colors } from '@/constants/colors';
import { fontFamily, fontSize, spacing } from '@/constants/typography';

export default function ProfileScreen() {
  const { profile } = useAuth();

  const handleSignOut = () => {
    Alert.alert('Sign out', 'Are you sure you want to sign out?', [
      { text: 'Cancel', style: 'cancel' },
      {
        text: 'Sign out',
        style: 'destructive',
        onPress: () => supabase.auth.signOut(),
      },
    ]);
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.identity}>
        <View style={styles.avatar}>
          <Text style={styles.avatarInitial}>
            {profile?.name?.[0]?.toUpperCase() ?? '?'}
          </Text>
        </View>
        <Text style={styles.name}>{profile?.name ?? '—'}</Text>
        <Text style={styles.username}>@{profile?.username ?? '—'}</Text>
      </View>
      <Text style={styles.archiveHint}>Profile + archive — coming in Stage 6</Text>
      <TouchableOpacity style={styles.signOutButton} onPress={handleSignOut} activeOpacity={0.8}>
        <Text style={styles.signOutText}>Sign out</Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: spacing.xl,
    gap: spacing.lg,
  },
  identity: {
    alignItems: 'center',
    gap: spacing.sm,
  },
  avatar: {
    width: 72,
    height: 72,
    borderRadius: 36,
    backgroundColor: colors.text.secondary,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: spacing.sm,
  },
  avatarInitial: {
    color: colors.background,
    fontSize: fontSize.xl,
    fontFamily: fontFamily.serif,
  },
  name: {
    fontFamily: fontFamily.serif,
    fontSize: fontSize.xl,
    color: colors.text.primary,
  },
  username: {
    fontSize: fontSize.sm,
    color: colors.text.tertiary,
  },
  archiveHint: {
    fontSize: fontSize.sm,
    color: colors.text.tertiary,
    marginTop: spacing.lg,
  },
  signOutButton: {
    marginTop: spacing.xl,
    paddingVertical: 12,
    paddingHorizontal: spacing.xl,
    borderWidth: 1,
    borderColor: colors.border,
    borderRadius: 10,
  },
  signOutText: {
    fontSize: fontSize.sm,
    color: colors.text.secondary,
  },
});
