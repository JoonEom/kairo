import { View, Text, StyleSheet } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { colors } from '@/constants/colors';
import { fontFamily, fontSize } from '@/constants/typography';

export default function CreateScreen() {
  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.title}>Create</Text>
      <Text style={styles.label}>Coming in Stage 3</Text>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
  },
  title: {
    fontFamily: fontFamily.serif,
    fontSize: fontSize.xl,
    color: colors.text.primary,
  },
  label: {
    fontSize: fontSize.sm,
    color: colors.text.tertiary,
  },
});
