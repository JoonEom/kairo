import { useEffect, useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { supabase } from './lib/supabase';

export default function App() {
  const [dbStatus, setDbStatus] = useState<'checking' | 'connected' | 'error'>('checking');

  useEffect(() => {
    supabase
      .from('_dummy_ping')
      .select('*')
      .limit(1)
      .then(({ error }) => {
        // "relation does not exist" (42P01) still means Supabase is reachable
        if (!error || error.code === '42P01') {
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
    backgroundColor: '#F7F3EA',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 12,
  },
  wordmark: {
    fontSize: 36,
    color: '#26241F',
    letterSpacing: 1,
  },
  meta: {
    fontSize: 13,
    color: '#9C9484',
  },
});
