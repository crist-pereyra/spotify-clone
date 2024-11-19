import { FeaturedSection } from '@/components/FeaturedSection';
import { GridSection } from '@/components/GridSection';
import { Topbar } from '@/components/Topbar';
import { ScrollArea } from '@/components/ui/scroll-area';
import { useMusicStore } from '@/store/music.store';
import { useEffect } from 'react';

export const HomePage = () => {
  const fetchFeaturedSongs = useMusicStore((state) => state.fetchFeaturedSongs);
  const fetchMadeForYouSongs = useMusicStore(
    (state) => state.fetchMadeForYouSongs
  );
  const fetchTrendingSongs = useMusicStore((state) => state.fetchTrendingSongs);
  const isLoading = useMusicStore((state) => state.isLoading);
  const madeForYouSongs = useMusicStore((state) => state.madeForYouSongs);
  const trendingSongs = useMusicStore((state) => state.trendingSongs);
  useEffect(() => {
    fetchFeaturedSongs();
    fetchMadeForYouSongs();
    fetchTrendingSongs();
  }, [fetchFeaturedSongs, fetchMadeForYouSongs, fetchTrendingSongs]);
  return (
    <main className='rounded-md overflow-hidden h-full bg-gradient-to-b from-zinc-800 to-zinc-900'>
      <Topbar />
      <ScrollArea className='h-[calc(100vh-180px)]'>
        <div className='p-4 sm:p-6'>
          <h1 className='text-2xl sm:text-3xl font-bold mb-6'>
            Good Afternoon
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
