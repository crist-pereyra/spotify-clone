import { StateCreator, create } from 'zustand';
import { persist } from 'zustand/middleware';

export interface AuthState {
  token?: string | null;
  updateApiToken: (token: string | null) => void;
}

const storeApi: StateCreator<AuthState> = (set) => ({
  token: undefined,
  updateApiToken: (token: string | null) => set({ token }),
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
