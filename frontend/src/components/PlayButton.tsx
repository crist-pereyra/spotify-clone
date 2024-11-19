import { Song } from '@/interfaces';
import { usePlayerStore } from '@/store/player.store';
import { Button } from './ui/button';
import { Pause, Play } from 'lucide-react';

interface Props {
  song: Song;
}
export const PlayButton = ({ song }: Props) => {
  const currentSong = usePlayerStore((state) => state.currentSong);
  const isPlaying = usePlayerStore((state) => state.isPlaying);
  const setCurrentSong = usePlayerStore((state) => state.setCurrentSong);
  const togglePlay = usePlayerStore((state) => state.togglePlay);
  const isCurrentSong = currentSong?._id === song._id;
  const handlePlay = () => {
    if (isCurrentSong) togglePlay();
    else setCurrentSong(song);
  };
  return (
    <Button
      onClick={handlePlay}
      size='icon'
      className={`absolute bottom-3 right-2 bg-green-500 hover:bg-green-400 hover:scale-105 transition-all opacity-0 translate-y-2 group-hover:translate-y-0 ${isCurrentSong ? 'opacity-100' : 'opacity-0 group-hover:opacity-100'}`}
    >
      {isCurrentSong && isPlaying ? (
        <Pause className='size-5 text-black' />
      ) : (
        <Play className='size-5 text-black' />
      )}
    </Button>
  );
};
