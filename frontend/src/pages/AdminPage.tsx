import { AlbumTabContent } from '@/components/AlbumTabContent';
import { DashboardStats } from '@/components/DashboardStats';
import { Header } from '@/components/Header';
import { SongsTabContent } from '@/components/SongsTabContent';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { useAuthStore } from '@/store/auth.store';
import { useMusicStore } from '@/store/music.store';
import { Album, Music } from 'lucide-react';
import { useEffect } from 'react';
import { Navigate } from 'react-router-dom';

export const AdminPage = () => {
  const isAdmin = useAuthStore((state) => state);
  const isLoading = useAuthStore((state) => state.isLoading);

  const fetchAlbums = useMusicStore((state) => state.fetchAlbums);
  const fetchSongs = useMusicStore((state) => state.fetchSongs);
  const fetchStats = useMusicStore((state) => state.fetchStats);
  if (!isAdmin && !isLoading) return <Navigate to='/' />;

  useEffect(() => {
    fetchAlbums();
    fetchSongs();
    fetchStats();
  }, [fetchAlbums, fetchSongs, fetchStats]);
  return (
    <div className='min-h-screen bg-gradient-to-b from-zinc-900 via-zinc-900 to-black text-zinc-100 p-8'>
      <Header />
      <DashboardStats />
      <Tabs defaultValue='songs' className='space-y-6'>
        <TabsList className='p-1 bg-zinc-800/50'>
          <TabsTrigger
            value='songs'
            className='data-[state=active]:bg-zinc-700'
          >
            <Music className='mr-2 size-4' />
            Songs
          </TabsTrigger>
          <TabsTrigger
            value='albums'
            className='data-[state=active]:bg-zinc-700'
          >
            <Album className='mr-2 size-4' />
            Albums
          </TabsTrigger>
        </TabsList>
        <TabsContent value='songs'>
          <SongsTabContent />
        </TabsContent>
        <TabsContent value='albums'>
          <AlbumTabContent />
        </TabsContent>
      </Tabs>
    </div>
  );
};
