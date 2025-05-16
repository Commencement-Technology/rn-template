// src/navigation/RootNavigator.tsx
import {AuthStack} from './AuthStack';
import {MainStack} from './MainStack';
import {useAuthStore} from '../store';
import {RootStackParamList} from './types';
import SplashScreen from '../screens/Auth/SplashScreen';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';

const Stack = createNativeStackNavigator<RootStackParamList>();

export const RootNavigator = () => {
  const {isAuthenticated, isInitialized} = useAuthStore();

  // 如果未初始化，显示Splash屏
  if (!isInitialized) {
    return <SplashScreen />;
  }

  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{headerShown: false}}>
        {isAuthenticated ? (
          <Stack.Screen name="Main" component={MainStack} />
        ) : (
          <Stack.Screen name="Auth" component={AuthStack} />
        )}
      </Stack.Navigator>
    </NavigationContainer>
  );
};
