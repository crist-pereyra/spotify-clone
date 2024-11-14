import { Album, Song } from '@/interfaces';
import { axiosInstance } from '@/lib/axios';
import { create } from 'zustand';
interface MusicState {
  albums: Album[];
  songs: Song[];
  isLoading: boolean;
  error: null | string;
  fetchAlbums: () => Promise<void>;
}
export const useMusicStore = create<MusicState>((set) => ({
  albums: [],
  songs: [],
  isLoading: false,
  error: null,
  fetchAlbums: async () => {
    set({ isLoading: true, error: null });
    try {
      const response = await axiosInstance.get('/albums');
      set({ albums: response.data });
    } catch (error: any) {
      set({ error: error.response.data.message });
    } finally {
      set({ isLoading: false });
    }
  },
}));
