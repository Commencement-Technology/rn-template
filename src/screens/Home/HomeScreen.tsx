import React, {useEffect} from 'react';
import { View, Text, Button, StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { RootStackParamList } from '../../navigation/types';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { useAuthStore } from '../../store';
import AsyncStorage from '@react-native-async-storage/async-storage';

type HomeScreenNavigationProp = NativeStackNavigationProp<RootStackParamList, 'Main'>;

const HomeScreen = () => {
  const navigation = useNavigation<HomeScreenNavigationProp>();
  const { user, logout } = useAuthStore();

  useEffect(() => {
    checkStorage()
  }, [])

  const checkStorage = async () => {
    const keys = await AsyncStorage.getAllKeys();
    console.log('Storage keys:', keys);
    const authData = await AsyncStorage.getItem('auth-storage');
    console.log('Auth storage:', authData);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Home Screen</Text>
      <Text style={styles.text}>Welcome, {user?.name || 'Guest'}!</Text>
      <Button
        title="Go to Detail"
        onPress={() => navigation.navigate('Detail', { id: '123' })}
      />
      <View style={styles.logoutButton}>
        <Button title="Logout" onPress={logout} color="red" />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  title: {
    fontSize: 24,
    marginBottom: 20,
  },
  text: {
    fontSize: 16,
    marginBottom: 20,
  },
  logoutButton: {
    marginTop: 20,
  },
});

export default HomeScreen;