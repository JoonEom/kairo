import { useEffect, useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { supabase } from '@/lib/supabase';
import { colors } from '@/constants/colors';
import { fontSize } from '@/constants/typography';

export default function App() {
  const [dbStatus, setDbStatus] = useState<'checking' | 'connected' | 'error'>('checking');

  useEffect(() => {
    supabase
      .from('_dummy_ping')
      .select('*')
      .limit(1)
      .then(({ error }) => {
        // Any PostgREST/Postgres "table not found" response means Supabase is reachable
        if (!error || error.code === '42P01' || error.code === 'PGRST205') {
          setDbStatus('connected');
        } else {
          setDbStatus('error');
        }
      });
  }, []);

  return (
    <View style={styles.container}>
      <Text style={styles.wordmark}>Kairo</Text>
      <Text style={styles.meta}>
        {dbStatus === 'checking' && 'Checking Supabase…'}
        {dbStatus === 'connected' && '✓ Supabase connected'}
        {dbStatus === 'error' && '✗ Supabase unreachable — check .env'}
      </Text>
      <StatusBar style="dark" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
    alignItems: 'center',
    justifyContent: 'center',
    gap: 12,
  },
  wordmark: {
    fontSize: fontSize.wordmark,
    color: colors.text.primary,
    letterSpacing: 1,
  },
  meta: {
    fontSize: fontSize.sm,
    color: colors.text.tertiary,
  },
});
