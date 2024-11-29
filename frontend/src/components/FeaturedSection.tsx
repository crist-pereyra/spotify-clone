import { useMusicStore } from '@/store/music.store';
import { FeaturedSkeleton } from './skeletons/FeaturedSkeleton';
import { PlayButton } from './PlayButton';

export const FeaturedSection = () => {
  const isLoading = useMusicStore((state) => state.isLoading);
  const featuredSongs = useMusicStore((state) => state.featuredSongs);
  const error = useMusicStore((state) => state.error);
  if (isLoading) return <FeaturedSkeleton />;
  if (error) return <p className='text-red-500 mb-4 text-lg'>{error}</p>;
  return (
    <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mb-8'>
      {featuredSongs.map((song) => (
        <div
          key={song._id}
          className='flex items-center bg-[#102116] rounded-md overflow-hidden hover:bg-[#24342A] transition-colors group cursor-pointer relative'
        >
          <img
            src={song.imageUrl}
            alt={song.title}
            className='w-16 sm:w-20 h-16 sm:h-20 flex-shrink-0 object-cover'
          />
          <div className='flex-1 p-4 overflow-hidden'>
            <p className='font-semibold truncate'>{song.title}</p>
            <p className='text-sm text-zinc-400 truncate'>{song.artist}</p>
          </div>
          <PlayButton song={song} />
        </div>
      ))}
    </div>
  );
};
