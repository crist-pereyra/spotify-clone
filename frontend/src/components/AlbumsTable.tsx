import { useMusicStore } from '@/store/music.store';
import { useEffect } from 'react';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from './ui/table';
import { Calendar, Music, Trash2 } from 'lucide-react';
import { Button } from './ui/button';

export const AlbumsTable = () => {
  const albums = useMusicStore((state) => state.albums);
  const deleteAlbum = useMusicStore((state) => state.deleteAlbum);
  const fetchAlbums = useMusicStore((state) => state.fetchAlbums);
  useEffect(() => {
    fetchAlbums();
  }, [fetchAlbums]);
  return (
    <Table>
      <TableHeader>
        <TableRow className='hover:bg-zinc-800/50'>
          <TableHead className='w-[50px] h-10'></TableHead>
          <TableHead>Title</TableHead>
          <TableHead>Artist</TableHead>
          <TableHead>Release Year</TableHead>
          <TableHead>Songs</TableHead>
          <TableHead className='text-right'>Actions</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {albums.map((album) => (
          <TableRow key={album._id} className='hover:bg-zinc-800/50'>
            <TableCell className='w-[50px] h-14 pl-2'>
              <img
                src={album.imageUrl}
                alt={album.title}
                className='w-10 h-10 rounded-none object-cover'
              />
            </TableCell>
            <TableCell className='font-medium'>{album.title}</TableCell>
            <TableCell>{album.artist}</TableCell>
            <TableCell>
              <span className='inline-flex gap-1 items-center text-zinc-400'>
                <Calendar className='size-4' /> {album.releaseYear}
              </span>
            </TableCell>
            <TableCell>
              <span className='inline-flex gap-1 items-center text-zinc-400'>
                <Music className='size-4' /> {album.songs.length} songs
              </span>
            </TableCell>
            <TableCell className='text-right'>
              <div className='flex gap-2 justify-end'>
                <Button
                  variant='ghost'
                  size='sm'
                  className='text-red-400 hover:text-red-300 hover:bg-red-400/10'
                  onClick={() => deleteAlbum(album._id)}
                >
                  <Trash2 className='size-4' />
                </Button>
              </div>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
};