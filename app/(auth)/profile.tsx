import { useState, useEffect } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Image,
  ScrollView,
  ActivityIndicator,
  KeyboardAvoidingView,
  Platform,
  Alert,
} from 'react-native';
import { useRouter, useLocalSearchParams } from 'expo-router';
import { SafeAreaView } from 'react-native-safe-area-context';
import * as ImagePicker from 'expo-image-picker';
import { supabase } from '@/lib/supabase';
import { useAuth } from '@/contexts/AuthContext';
import { colors } from '@/constants/colors';
import { fontFamily, fontSize, spacing, radius } from '@/constants/typography';

type UsernameStatus = 'idle' | 'checking' | 'available' | 'taken' | 'invalid';

const USERNAME_REGEX = /^[a-z0-9_]{3,20}$/;

async function uploadProfilePhoto(userId: string, uri: string): Promise<string> {
  const ext = uri.split('.').pop()?.toLowerCase() ?? 'jpg';
  const contentType = ext === 'png' ? 'image/png' : 'image/jpeg';
  const path = `${userId}/avatar.${ext}`;

  const response = await fetch(uri);
  const arrayBuffer = await response.arrayBuffer();

  const { error } = await supabase.storage
    .from('profile-photos')
    .upload(path, arrayBuffer, { contentType, upsert: true });

  if (error) throw error;

  return supabase.storage.from('profile-photos').getPublicUrl(path).data.publicUrl;
}

export default function ProfileSetupScreen() {
  const router = useRouter();
  const { appleName } = useLocalSearchParams<{ appleName?: string }>();
  const { session, refreshProfile } = useAuth();

  const [name, setName] = useState(appleName ?? '');
  const [username, setUsername] = useState('');
  const [photoUri, setPhotoUri] = useState<string | null>(null);
  const [usernameStatus, setUsernameStatus] = useState<UsernameStatus>('idle');
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    if (!username) {
      setUsernameStatus('idle');
      return;
    }

    if (!USERNAME_REGEX.test(username)) {
      setUsernameStatus('invalid');
      return;
    }

    setUsernameStatus('checking');
    const timer = setTimeout(async () => {
      const { data } = await supabase
        .from('users')
        .select('username')
        .eq('username', username)
        .maybeSingle();
      setUsernameStatus(data ? 'taken' : 'available');
    }, 500);

    return () => clearTimeout(timer);
  }, [username]);

  const pickPhoto = async () => {
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: 'images',
      allowsEditing: true,
      aspect: [1, 1],
      quality: 0.8,
    });
    if (!result.canceled) {
      setPhotoUri(result.assets[0].uri);
    }
  };

  const canContinue =
    name.trim().length > 0 &&
    usernameStatus === 'available' &&
    !submitting;

  const handleContinue = async () => {
    if (!canContinue || !session?.user?.id) return;
    setSubmitting(true);
    try {
      let profilePhotoUrl: string | null = null;
      if (photoUri) {
        profilePhotoUrl = await uploadProfilePhoto(session.user.id, photoUri);
      }

      const { error } = await supabase.from('users').insert({
        id: session.user.id,
        name: name.trim(),
        username: username.toLowerCase(),
        profile_photo_url: profilePhotoUrl,
      });

      if (error) throw error;

      await refreshProfile();
      router.replace('/(auth)/intro');
    } catch (err: any) {
      Alert.alert('Something went wrong', err?.message ?? 'Please try again.');
    } finally {
      setSubmitting(false);
    }
  };

  const usernameHint = () => {
    switch (usernameStatus) {
      case 'checking': return { text: 'Checking…', color: colors.text.tertiary };
      case 'available': return { text: '✓ Available', color: '#5A8A5A' };
      case 'taken': return { text: '✗ Already taken', color: '#B85A5A' };
      case 'invalid': return { text: 'Lowercase letters, numbers, and _ only (3–20 chars)', color: colors.text.tertiary };
      default: return null;
    }
  };

  const hint = usernameHint();

  return (
    <KeyboardAvoidingView
      style={{ flex: 1 }}
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}
    >
      <SafeAreaView style={styles.container}>
        <ScrollView
          contentContainerStyle={styles.scroll}
          keyboardShouldPersistTaps="handled"
          showsVerticalScrollIndicator={false}
        >
          <Text style={styles.title}>Set up your profile</Text>

          <TouchableOpacity style={styles.avatarContainer} onPress={pickPhoto} activeOpacity={0.8}>
            {photoUri ? (
              <Image source={{ uri: photoUri }} style={styles.avatar} />
            ) : (
              <View style={styles.avatarPlaceholder}>
                <Text style={styles.avatarInitial}>
                  {name.trim()[0]?.toUpperCase() ?? '?'}
                </Text>
              </View>
            )}
            <Text style={styles.avatarLabel}>
              {photoUri ? 'Change photo' : 'Add photo'}
            </Text>
          </TouchableOpacity>

          <View style={styles.fields}>
            <View style={styles.field}>
              <Text style={styles.label}>NAME</Text>
              <TextInput
                style={styles.input}
                value={name}
                onChangeText={setName}
                placeholder="Your name"
                placeholderTextColor={colors.text.placeholder}
                autoCapitalize="words"
                returnKeyType="next"
              />
            </View>

            <View style={styles.field}>
              <Text style={styles.label}>USERNAME</Text>
              <TextInput
                style={[
                  styles.input,
                  usernameStatus === 'taken' && styles.inputError,
                  usernameStatus === 'available' && styles.inputValid,
                ]}
                value={username}
                onChangeText={(t) => setUsername(t.toLowerCase())}
                placeholder="yourhandle"
                placeholderTextColor={colors.text.placeholder}
                autoCapitalize="none"
                autoCorrect={false}
                returnKeyType="done"
              />
              {hint && (
                <Text style={[styles.fieldHint, { color: hint.color }]}>
                  {hint.text}
                </Text>
              )}
            </View>
          </View>
        </ScrollView>

        <View style={styles.footer}>
          <TouchableOpacity
            style={[styles.continueButton, !canContinue && styles.continueButtonDisabled]}
            onPress={handleContinue}
            activeOpacity={0.85}
            disabled={!canContinue}
          >
            {submitting ? (
              <ActivityIndicator color={colors.background} />
            ) : (
              <Text style={styles.continueButtonText}>Continue</Text>
            )}
          </TouchableOpacity>
        </View>
      </SafeAreaView>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  scroll: {
    paddingHorizontal: spacing.xl,
    paddingTop: spacing.xl * 2,
    paddingBottom: spacing.xl,
  },
  title: {
    fontFamily: fontFamily.serif,
    fontSize: fontSize.xl,
    color: colors.text.primary,
    marginBottom: spacing.xl * 1.5,
  },
  avatarContainer: {
    alignItems: 'center',
    marginBottom: spacing.xl * 1.5,
    gap: spacing.sm,
  },
  avatar: {
    width: 84,
    height: 84,
    borderRadius: 42,
  },
  avatarPlaceholder: {
    width: 84,
    height: 84,
    borderRadius: 42,
    backgroundColor: colors.text.secondary,
    alignItems: 'center',
    justifyContent: 'center',
  },
  avatarInitial: {
    color: colors.background,
    fontSize: fontSize.xl,
    fontFamily: fontFamily.serif,
  },
  avatarLabel: {
    fontSize: fontSize.sm,
    color: colors.text.tertiary,
  },
  fields: {
    gap: spacing.xl,
  },
  field: {
    gap: spacing.xs,
  },
  label: {
    fontSize: fontSize.xs,
    color: colors.text.tertiary,
    letterSpacing: 0.8,
    fontWeight: '500',
  },
  input: {
    backgroundColor: colors.surface,
    borderWidth: 1,
    borderColor: colors.border,
    borderRadius: radius.input,
    paddingHorizontal: spacing.base,
    paddingVertical: 13,
    fontSize: fontSize.base,
    color: colors.text.primary,
  },
  inputValid: {
    borderColor: '#5A8A5A',
  },
  inputError: {
    borderColor: '#B85A5A',
  },
  fieldHint: {
    fontSize: fontSize.xs,
    marginTop: 4,
  },
  footer: {
    paddingHorizontal: spacing.xl,
    paddingBottom: spacing.xl * 2,
    paddingTop: spacing.base,
  },
  continueButton: {
    backgroundColor: colors.text.primary,
    borderRadius: 13,
    paddingVertical: 16,
    alignItems: 'center',
  },
  continueButtonDisabled: {
    opacity: 0.35,
  },
  continueButtonText: {
    color: colors.background,
    fontSize: fontSize.base,
    fontWeight: '600',
    letterSpacing: 0.2,
  },
});
