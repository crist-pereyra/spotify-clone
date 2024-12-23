import { AlbumSkeleton } from '@/components/skeletons/AlbumSkeleton';
import { Button } from '@/components/ui/button';
import { ScrollArea } from '@/components/ui/scroll-area';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { useMusicStore } from '@/store/music.store';
import { usePlayerStore } from '@/store/player.store';
import { Clock, Pause, Play } from 'lucide-react';
import { useEffect } from 'react';
import { useParams } from 'react-router-dom';

export const formatDuration = (seconds: number) => {
  const minutes = Math.floor(seconds / 60);
  const remainingSeconds = seconds % 60;
  return `${minutes}:${remainingSeconds.toString().padStart(2, '0')}`;
};
export const AlbumPage = () => {
  const { albumId } = useParams();
  const fetchAlbumById = useMusicStore((state) => state.fetchAlbumById);
  const currentAlbum = useMusicStore((state) => state.currentAlbum);
  const isLoading = useMusicStore((state) => state.isLoading);

  const currentSong = usePlayerStore((state) => state.currentSong);
  const isPlaying = usePlayerStore((state) => state.isPlaying);
  const playAlbum = usePlayerStore((state) => state.playAlbum);
  const togglePlay = usePlayerStore((state) => state.togglePlay);
  useEffect(() => {
    if (albumId) fetchAlbumById(albumId);
  }, [fetchAlbumById, albumId]);
  if (isLoading) return <AlbumSkeleton />;

  const handlePlayAlbum = () => {
    if (!currentAlbum) return;
    const isCurrentAlbumPlaying = currentAlbum?.songs.some(
      (song) => song._id === currentSong?._id
    );
    if (isCurrentAlbumPlaying) togglePlay();
    else playAlbum(currentAlbum?.songs, 0);
  };
  const handlePlaySong = (index: number) => {
    if (!currentAlbum) return;
    playAlbum(currentAlbum?.songs, index);
  };
  return (
    <section className='h-full'>
      <ScrollArea className='h-full rounded-md'>
        <div className='relative min-h-full'>
          <div
            className={`absolute inset-0 pointer-events-none`}
            aria-hidden='true'
            style={{
              background: `linear-gradient(to bottom, ${currentAlbum?.color || '#5038a0'}80, rgba(24, 24, 27, 0.8) 50%, #18181b)`,
            }}
          />
          <div className='relative z-10'>
            <div className='flex p-6 gap-6 pb-8'>
              <img
                src={currentAlbum?.imageUrl}
                alt={currentAlbum?.title}
                className='w-[240px] h-[240px] shadow-xl rounded'
              />
              <div className='flex flex-col justify-end'>
                <p className='text-sm font-medium'>Album</p>
                <h1 className='text-7xl font-bold my-4'>
                  {currentAlbum?.title}
                </h1>
                <div className='flex items-center gap-2 text-zinc-100 text-sm'>
                  <span className='font-medium text-white'>
                    {currentAlbum?.artist}
                  </span>
                  <span>• {currentAlbum?.songs.length} songs</span>
                  <span>• {currentAlbum?.releaseYear}</span>
                </div>
              </div>
            </div>
            <div className='px-6 pb-4 flex items-center gap-6'>
              <Button
                onClick={handlePlayAlbum}
                size='icon'
                className='w-14 h-14 rounded-full bg-green-500 hover:bg-green-400 hover:scale-105 transition-all'
              >
                {isPlaying &&
                currentAlbum?.songs.some(
                  (song) => song._id === currentSong?._id
                ) ? (
                  <Pause className='w-7 h-7 text-black' />
                ) : (
                  <Play className='w-7 h-7 text-black' />
                )}
              </Button>
            </div>
            <Table className='bg-black/20 backdrop-blur-sm'>
              <TableHeader>
                <TableRow className='grid grid-cols-[16px_4fr_2fr_1fr] gap-4 px-10 py-2 text-sm text-zinc-400 border-b border-white/5'>
                  <TableHead className='font-bold'>#</TableHead>
                  <TableHead className='font-bold'>Title</TableHead>
                  <TableHead className='font-bold'>Released Date</TableHead>
                  <TableHead>
                    <Clock className='size-4' />
                  </TableHead>
                </TableRow>
              </TableHeader>
              <TableBody className='flex flex-col space-y-2 py-4 px-4'>
                {currentAlbum?.songs.map((song, index) => {
                  const isCurrentSong = song._id === currentSong?._id;
                  return (
                    <TableRow
                      key={song._id}
                      onClick={() => handlePlaySong(index)}
                      className='grid grid-cols-[16px_4fr_2fr_1fr] gap-4 px-6 py-2 text-sm text-zinc-400 hover:bg-white/5 rounded-md group cursor-pointer'
                    >
                      <TableCell className='flex items-center justify-center'>
                        {isCurrentSong && isPlaying ? (
                          <div className='size-4 text-green-500'>♫</div>
                        ) : (
                          <span className='group-hover:hidden'>
                            {index + 1}
                          </span>
                        )}
                        {!isCurrentSong && (
                          <Play className='hidden group-hover:block size-4' />
                        )}
                      </TableCell>
                      <TableCell className='flex items-center gap-3'>
                        <img
                          src={song.imageUrl}
                          alt={song.title}
                          className='w-10 h-10 rounded'
                        />
                        <div>
                          <p className='font-medium text-white'>{song.title}</p>
                          <p>{song.artist}</p>
                        </div>
                      </TableCell>
                      <TableCell className='flex items-center'>
                        {song.createdAt.split('T')[0]}
                      </TableCell>
                      <TableCell className='flex items-center'>
                        {formatDuration(song.duration)}
                      </TableCell>
                    </TableRow>
                  );
                })}
              </TableBody>
            </Table>
          </div>
        </div>
      </ScrollArea>
    </section>
  );
};
