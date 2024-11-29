import { FeaturedSection } from '@/components/FeaturedSection';
import { GridSection } from '@/components/GridSection';
import { Topbar } from '@/components/Topbar';
import { ScrollArea } from '@/components/ui/scroll-area';
import { useMusicStore } from '@/store/music.store';
import { usePlayerStore } from '@/store/player.store';
import { useUser } from '@clerk/clerk-react';
import { useEffect } from 'react';

export const HomePage = () => {
  const { user } = useUser();
  const getGreeting = () => {
    const currentHour = new Date().getHours();
    if (currentHour < 12) {
      return '☀️ Good Morning';
    } else if (currentHour < 18) {
      return '🌤️ Good Afternoon';
    } else {
      return '🌕 Good Evening';
    }
  };
  const fetchFeaturedSongs = useMusicStore((state) => state.fetchFeaturedSongs);
  const fetchMadeForYouSongs = useMusicStore(
    (state) => state.fetchMadeForYouSongs
  );
  const fetchTrendingSongs = useMusicStore((state) => state.fetchTrendingSongs);
  const isLoading = useMusicStore((state) => state.isLoading);
  const featuredSongs = useMusicStore((state) => state.featuredSongs);
  const madeForYouSongs = useMusicStore((state) => state.madeForYouSongs);
  const trendingSongs = useMusicStore((state) => state.trendingSongs);
  const initializeQueue = usePlayerStore((state) => state.initializeQueue);
  useEffect(() => {
    fetchFeaturedSongs();
    fetchMadeForYouSongs();
    fetchTrendingSongs();
  }, [fetchFeaturedSongs, fetchMadeForYouSongs, fetchTrendingSongs]);

  useEffect(() => {
    if (
      madeForYouSongs.length > 0 &&
      featuredSongs.length > 0 &&
      trendingSongs.length > 0
    ) {
      const allSongs = [...madeForYouSongs, ...featuredSongs, ...trendingSongs];
      initializeQueue(allSongs);
    }
  }, [initializeQueue, madeForYouSongs, featuredSongs, trendingSongs]);
  return (
    <main className='rounded-md overflow-hidden h-full bg-gradient-to-b from-[#03150A] via-[#03150A] to-zinc-900'>
      <Topbar />
      <ScrollArea className='h-[calc(100vh-180px)]'>
        <div className='p-4 sm:p-6'>
          <h1 className='text-white text-2xl font-semibold mb-6'>
            {getGreeting()}
            {user && ', '}
            {user?.firstName}
          </h1>
          <FeaturedSection />
          <div className='space-y-8'>
            <GridSection
              title='Made for you'
              songs={madeForYouSongs}
              isLoading={isLoading}
            />
            <GridSection
              title='Trending'
              songs={trendingSongs}
              isLoading={isLoading}
            />
          </div>
        </div>
      </ScrollArea>
    </main>
  );
};
