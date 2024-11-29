import { PlaylistSkeleton } from '@/components/skeletons/PlaylistSkeleton';
import { buttonVariants } from '@/components/ui/button';
import { ScrollArea } from '@/components/ui/scroll-area';
import { cn } from '@/lib/utils';
import { useMusicStore } from '@/store/music.store';
import { SignedIn } from '@clerk/clerk-react';
import { HomeIcon, Library, MessageCircle } from 'lucide-react';
import { useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';

export const LeftSidebar = () => {
  const isLoading = useMusicStore((state) => state.isLoading);
  const location = useLocation();
  // const songs = useMusicStore((state) => state.songs);
  const albums = useMusicStore((state) => state.albums);
  const fetchAlbums = useMusicStore((state) => state.fetchAlbums);
  useEffect(() => {
    fetchAlbums();
  }, [fetchAlbums]);
  return (
    <div className='h-full flex flex-col gap-2'>
      <div className='rounded-lg bg-zinc-900 p-4'>
        <div className='space-y-2'>
          <Link
            to='/'
            className={cn(
              buttonVariants({
                variant: 'ghost',
                className: `w-full justify-start hover:bg-zinc-800 ${
                  location.pathname === '/'
                    ? 'text-green-500 bg-[#1F1F22]'
                    : 'text-white'
                }`,
              })
            )}
          >
            <HomeIcon className='mr-2 size-5' />
            <span className='hidden md:inline font-semibold'>Home</span>
          </Link>
          <SignedIn>
            <Link
              to='/chat'
              className={cn(
                buttonVariants({
                  variant: 'ghost',
                  className: `w-full justify-start hover:bg-zinc-800 ${
                    location.pathname === '/chat'
                      ? 'text-green-500 bg-[#1F1F22]'
                      : 'text-white'
                  }`,
                })
              )}
            >
              <MessageCircle className='mr-2 size-5' />
              <span className='hidden md:inline font-semibold'>Messages</span>
            </Link>
          </SignedIn>
        </div>
      </div>
      <div className='flex-1 rounded-lg bg-gradient-to-t from-[#010A05] to-zinc-900 p-4'>
        <div className='flex items-center justify-between mb-4'>
          <div className='flex items-center text-white px-2'>
            <Library className='mr-2 size-5' />
            <span className='hidden md:inline font-semibold'>Playlists</span>
          </div>
        </div>
        <ScrollArea className='h-[calc(100vh-300px)]'>
          <div className='space-y-2'>
            {isLoading ? (
              <PlaylistSkeleton />
            ) : (
              albums.map((album) => (
                <Link
                  key={album._id}
                  to={`/album/${album._id}`}
                  className='p-2 hover:bg-zinc-800 rounded-md flex items-center gap-3 group cursor-pointer'
                >
                  <img
                    src={album.imageUrl}
                    className='size-12 rounded-md flex-shrink-0 object-cover'
                    alt='playlist image'
                  />
                  <div className='flex-1 min-w-0 hidden md:block'>
                    <p className='font-semibold truncate'>{album.title}</p>
                    <p className='text-sm text-zinc-400 truncate'>
                      Album • {album.artist}
                    </p>
                  </div>
                </Link>
              ))
            )}
          </div>
        </ScrollArea>
      </div>
    </div>
  );
};
