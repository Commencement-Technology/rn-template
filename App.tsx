/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import React, {useEffect} from 'react';
import {useAuthStore} from './src/store';
import {enableScreens} from 'react-native-screens';
import {SafeAreaProvider} from 'react-native-safe-area-context';
import {RootNavigator} from './src/navigation/RootNavigator';
import {GestureHandlerRootView} from 'react-native-gesture-handler';

enableScreens(true);

function App(): React.JSX.Element {
  useEffect(() => {
    const init = async () => {
      // 确保先等待持久化完成
      await useAuthStore.persist.rehydrate();
      // 只需要这一行即可，zustand会自动处理持久化
      await useAuthStore.getState().initializeAuth();
    };
    init();
  }, []);

  return (
    <SafeAreaProvider>
      <GestureHandlerRootView style={{flex: 1}}>
        <RootNavigator />
      </GestureHandlerRootView>
    </SafeAreaProvider>
  );
}

export default App;
