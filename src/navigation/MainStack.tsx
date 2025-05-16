import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {MainTabNavigator} from './MainTabNavigator';
import DetailScreen from '../screens/Home/DetailScreen';
import {RootStackParamList} from './types';

const Stack = createNativeStackNavigator<RootStackParamList>();

export const MainStack = () => {
  return (
    <Stack.Navigator screenOptions={{headerShown: false}}>
      <Stack.Screen name="MainTab" component={MainTabNavigator} />
      <Stack.Screen name="Detail" component={DetailScreen} />
    </Stack.Navigator>
  );
};
