import apiClient from './apiClient';

interface LoginResponse {
  user: { id: string; name: string; email: string };
  token: string;
}

export const login = async (email: string, password: string): Promise<LoginResponse> => {
  // const response: any = await apiClient.post('/auth/login', { email, password });
  const response = {
    user: {id: '1', email: email, name: 'bob'},
    token: '123',
  };
  return {
    user: response.user,
    token: response.token,
  };
};

export const getProfile = async () => {
  // return apiClient.get('/auth/profile');
  const response = {
    user: {id: '1', email: 'email', name: 'bob'},
    token: '123',
  };
  await waiting();
  return {
    user: response.user,
    token: response.token,
  };
};

const waiting = (time: number = 1000) => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve({});
    }, time);
  });
};
