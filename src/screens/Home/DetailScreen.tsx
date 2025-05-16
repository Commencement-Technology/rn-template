import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { RouteProp } from '@react-navigation/native';
import { RootStackParamList } from '../../navigation/types';

type DetailScreenRouteProp = RouteProp<RootStackParamList, 'Detail'>;

interface DetailScreenProps {
  route: DetailScreenRouteProp;
}

const DetailScreen: React.FC<DetailScreenProps> = ({ route }) => {
  const { id } = route.params;

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Detail Screen</Text>
      <Text style={styles.text}>Item ID: {id}</Text>
      <Text style={styles.text}>This is a detail page for item {id}</Text>
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

export default DetailScreen;