import React from 'react';
import {View, Text, StyleSheet} from 'react-native';
import {useAuthStore} from '../../store';

const ProfileScreen = () => {
  const {user} = useAuthStore();

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Profile</Text>
      <Text style={styles.text}>Name: {user?.name}</Text>
      <Text style={styles.text}>Email: {user?.email}</Text>
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
    marginBottom: 10,
  },
});

export default ProfileScreen;
