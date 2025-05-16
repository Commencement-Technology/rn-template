import React, {useEffect} from 'react';
import {useAuthStore} from '../../store';
import {View, Text, ActivityIndicator, StyleSheet} from 'react-native';

const SplashScreen = () => {
  const {initializeAuth} = useAuthStore();

  useEffect(() => {
    initializeAuth();
  }, []);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>My App</Text>
      <ActivityIndicator size="large" style={styles.loader} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#ffffff',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  loader: {
    marginTop: 20,
  },
});

export default SplashScreen;
