import { useMusicStore } from '@/store/music.store';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from './ui/table';
import { Calendar, Trash2 } from 'lucide-react';
import { Button } from './ui/button';

export const SongsTable = () => {
  const songs = useMusicStore((state) => state.songs);
  const isLoading = useMusicStore((state) => state.isLoading);
  const error = useMusicStore((state) => state.error);
  const deleteSong = useMusicStore((state) => state.deleteSong);

  if (isLoading)
    return (
      <div className='flex items-center justify-center py-8'>
        <div className='text-zinc-400'>Loading...</div>
      </div>
    );
  if (error)
    return (
      <div className='flex items-center justify-center py-8'>
        <div className='text-red-400'></div>
        {error}
      </div>
    );
  return (
    <Table>
      <TableHeader>
        <TableRow className='hover:bg-zinc-800/50'>
          <TableHead className='w-[50px] h-10'></TableHead>
          <TableHead>Title</TableHead>
          <TableHead>Artist</TableHead>
          <TableHead>Release Date</TableHead>
          <TableHead className='text-right'>Actions</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody className='space-y-2 py-4 px-4'>
        {songs.map((song) => (
          <TableRow key={song._id} className='hover:bg-zinc-800/50'>
            <TableCell className='h-14 pl-2'>
              <img
                src={song.imageUrl}
                alt={song.title}
                className='size-10 rounded object-cover'
              />
            </TableCell>
            <TableCell className='font-medium pl-2'>{song.title}</TableCell>
            <TableCell>{song.artist}</TableCell>
            <TableCell>
              <span className='inline-flex items-center gap-1 text-zinc-400'>
                <Calendar className='w-4 h-4' /> {song.createdAt.split('T')[0]}
              </span>
            </TableCell>
            <TableCell className='text-right pr-2'>
              <div className='flex gap-2 justify-end'>
                <Button
                  variant='ghost'
                  size='sm'
                  className='text-red-400 hover:text-red-300 hover:bg:red-400/10'
                  onClick={() => deleteSong(song._id)}
                >
                  <Trash2 className='w-4 h-4' />
                </Button>
              </div>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
};
