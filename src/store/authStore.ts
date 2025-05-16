import {create} from 'zustand';
import {persist, createJSONStorage} from 'zustand/middleware';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {login as apiLogin} from '../api/authService';
import {getProfile} from '../api/authService';

interface AuthState {
  user: null | {id: string; name: string; email: string};
  token: null | string;
  isAuthenticated: boolean;
  isLoading: boolean;
  isInitialized: boolean; // 新增初始化状态
  error: null | string;
  login: (email: string, password: string) => Promise<void>;
  logout: () => void;
  clearError: () => void;
  initializeAuth: () => Promise<void>;
}

/**
 * persist 是 Zustand 的官方中间件，用于自动将状态持久化到存储介质（如 AsyncStorage）。
 * */
export const useAuthStore = create<AuthState>()(
  persist(
    (set, get) => ({
      user: null,
      token: null,
      isAuthenticated: false,
      isLoading: false,
      error: null,
      isInitialized: false, // 初始为false

      login: async (email, password) => {
        try {
          set({isLoading: true, error: null});
          const response = await apiLogin(email, password);
          set({
            user: response.user,
            token: response.token, // 自动触发persist
            isAuthenticated: true,
            isLoading: false,
          });
        } catch (error) {
          set({
            error: error instanceof Error ? error.message : 'Login failed',
            isLoading: false,
          });
        }
      },

      logout: () => {
        console.log('logout');
        set({
          user: null,
          token: null,
          isAuthenticated: false,
        });
      },

      clearError: () => {
        set({error: null});
      },

      initializeAuth: async () => {
        try {
          set({isLoading: true});

          const {token} = get();
          if (token) {
            const user: any = await getProfile();
            set({
              user,
              isAuthenticated: true,
              isInitialized: true,
              isLoading: false,
            });
          } else {
            // token无效的情况
            set({
              user: null,
              token: null,
              isInitialized: true,
              isLoading: false,
              isAuthenticated: false,
            });
          }
        } catch (error) {
          set({
            isInitialized: true,
            isLoading: false,
          });
        }
      },
    }),
    {
      name: 'auth-storage', // 本地存储的key
      storage: createJSONStorage(() => AsyncStorage), // 指定存储引擎
      // 确保包含所有需要持久化的字段
      partialize: state => ({
        token: state.token,
        user: state.user,
        isAuthenticated: state.isAuthenticated,
      }),
    },
  ),
);
