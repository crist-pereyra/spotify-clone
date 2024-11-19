import { axiosInstance } from '@/lib/axios';
import { StateCreator, create } from 'zustand';
import { persist } from 'zustand/middleware';

export interface AuthState {
  token?: string | null;
  isAdmin: boolean;
  error: null | string;
  isLoading: boolean;
  updateApiToken: (token: string | null) => void;
  checkAdminStatus: () => Promise<void>;
  reset: () => void;
}

const storeApi: StateCreator<AuthState> = (set) => ({
  token: undefined,
  isAdmin: false,
  error: null,
  isLoading: false,
  updateApiToken: (token: string | null) => set({ token }),
  checkAdminStatus: async () => {
    set({ isLoading: true, error: null });
    try {
      const response = await axiosInstance.get('/admin/check');
      set({ isAdmin: response.data.admin });
    } catch (error: any) {
      set({ error: error.response.data.message, isAdmin: false });
    } finally {
      set({ isLoading: false });
    }
  },
  reset: () => {},
  // loginUser: async (email: string, password: string) => {
  //     try {
  //         const { token, ...user } = await AuthService.login(email, password);
  //         set({ status: 'authorized', token, user });
  //     } catch (error) {
  //         set({ status: 'unauthorized', token: undefined, user: undefined });
  //         throw 'UnAuthorized';
  //     }
  // },
});

export const useAuthStore = create<AuthState>()(
  persist(storeApi, { name: 'auth-storage' })
);
