import AsyncStorage from '@react-native-async-storage/async-storage';

// 存储数据
export const storeData = async (key: string, value: any) => {
  try {
    const jsonValue = JSON.stringify(value);
    await AsyncStorage.setItem(key, jsonValue);
  } catch (e) {
    console.error('Error storing data:', e);
  }
};

// 读取数据
export const getData = async (key: string) => {
  try {
    const jsonValue = await AsyncStorage.getItem(key);
    return jsonValue != null ? JSON.parse(jsonValue) : null;
  } catch (e) {
    console.error('Error reading data:', e);
    return null;
  }
};

// 删除数据
export const removeData = async (key: string) => {
  try {
    await AsyncStorage.removeItem(key);
  } catch (e) {
    console.error('Error removing data:', e);
  }
};

// 专用于auth的快捷方法
export const storeAuthToken = (token: string) => storeData('@auth_token', token);
export const getAuthToken = () => getData('@auth_token');
export const removeAuthToken = () => removeData('@auth_token');
