import { View, Text, TouchableOpacity, StyleSheet, Share } from 'react-native';
import { useRouter } from 'expo-router';
import { SafeAreaView } from 'react-native-safe-area-context';
import { colors } from '@/constants/colors';
import { fontFamily, fontSize, spacing } from '@/constants/typography';

const AVATARS: { initial: string; color: string; large?: boolean }[] = [
  { initial: 'M', color: '#9E8462' },
  { initial: 'J', color: '#8A7392', large: true },
  { initial: 'P', color: '#74866A' },
];

function AvatarCluster() {
  return (
    <View style={av.row}>
      {AVATARS.map((a, i) => {
        const size = a.large ? 60 : 54;
        return (
          <View
            key={i}
            style={[
              av.circle,
              {
                width: size,
                height: size,
                borderRadius: size / 2,
                backgroundColor: a.color,
                zIndex: a.large ? 2 : 1,
                marginHorizontal: a.large ? -12 : 0,
              },
            ]}
          >
            <Text style={[av.initial, { fontSize: a.large ? 24 : 22 }]}>
              {a.initial}
            </Text>
          </View>
        );
      })}
    </View>
  );
}

const av = StyleSheet.create({
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 34,
  },
  circle: {
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 3,
    borderColor: colors.background,
    shadowColor: '#26241F',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.10,
    shadowRadius: 10,
    elevation: 4,
  },
  initial: {
    fontFamily: fontFamily.serif,
    color: '#FBF8F1',
    fontWeight: '500',
  },
});

export default function InviteScreen() {
  const router = useRouter();

  const handleInvite = async () => {
    try {
      await Share.share({
        message:
          'Join me on Kairo — a private weekly photo journal. Download the app and add me as a friend.',
      });
    } catch {
      // user cancelled
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <TouchableOpacity style={styles.skipButton} onPress={() => router.replace('/(tabs)/')} activeOpacity={0.7}>
        <Text style={styles.skipText}>Skip</Text>
      </TouchableOpacity>

      <View style={styles.body}>
        <AvatarCluster />
        <Text style={styles.title}>Kairo's better with friends</Text>
        <Text style={styles.sub}>
          Invite the people you'd actually send a postcard to.
        </Text>
      </View>

      <View style={styles.footer}>
        <TouchableOpacity style={styles.inviteButton} onPress={handleInvite} activeOpacity={0.85}>
          <Text style={styles.plus}>+</Text>
          <Text style={styles.inviteButtonText}>Invite a friend</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => router.replace('/(tabs)/')} activeOpacity={0.7}>
          <Text style={styles.maybeLater}>Maybe later</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  skipButton: {
    alignSelf: 'flex-end',
    paddingHorizontal: spacing.xl,
    paddingTop: spacing.sm,
    paddingBottom: spacing.sm,
  },
  skipText: {
    fontSize: fontSize.base,
    color: colors.text.tertiary,
    fontWeight: '500',
  },
  body: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 38,
  },
  title: {
    fontFamily: fontFamily.serif,
    fontSize: 29,
    lineHeight: 34,
    color: colors.text.primary,
    textAlign: 'center',
    fontWeight: '500',
  },
  sub: {
    fontSize: fontSize.base,
    lineHeight: 23,
    color: colors.text.secondary,
    textAlign: 'center',
    marginTop: 13,
    maxWidth: 264,
  },
  footer: {
    paddingHorizontal: 36,
    paddingBottom: 46,
    gap: spacing.base,
    alignItems: 'center',
  },
  inviteButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 9,
    backgroundColor: colors.text.primary,
    borderRadius: 13,
    paddingVertical: 15,
    width: '100%',
  },
  plus: {
    color: colors.background,
    fontSize: 18,
    fontWeight: '400',
    lineHeight: 20,
  },
  inviteButtonText: {
    color: colors.background,
    fontSize: fontSize.base,
    fontWeight: '600',
  },
  maybeLater: {
    fontSize: 14,
    fontWeight: '500',
    color: colors.text.tertiary,
    textAlign: 'center',
    marginTop: spacing.sm,
  },
});
