import { useMusicStore } from '@/store/music.store';
import { useRef, useState } from 'react';
import { useDropzone } from 'react-dropzone';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTrigger,
} from './ui/dialog';
import { Button } from './ui/button';
import { Check, ChevronsUpDown, Plus, Upload } from 'lucide-react';
import { DialogTitle } from '@radix-ui/react-dialog';
import { Input } from './ui/input';
import { Popover, PopoverContent, PopoverTrigger } from './ui/popover';
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from './ui/command';
import { cn } from '@/lib/utils';
import toast from 'react-hot-toast';
import { axiosInstance } from '@/lib/axios';

export const AddSongDialog = () => {
  const albums = useMusicStore((state) => state.albums);
  const [isSongDialogOpen, setIsSongDialogOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [open, setOpen] = useState(false);
  const [newSong, setNewSong] = useState({
    title: '',
    artist: '',
    album: '',
    duration: 0,
  });
  const [files, setFiles] = useState<{
    audio: File | null;
    image: File | null;
  }>({
    audio: null,
    image: null,
  });
  const audioInputRef = useRef<HTMLInputElement>(null);
  const onDropImage = (acceptedFiles: File[]) => {
    if (acceptedFiles.length > 0) {
      setFiles((prev) => ({ ...prev, image: acceptedFiles[0] }));
    }
  };

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    accept: { 'image/*': [] },
    onDrop: onDropImage,
    multiple: false,
  });

  const onSubmit = async () => {
    setIsLoading(true);
    try {
      if (!files.audio || !files.image)
        return toast.error('Please upload both audio and image files');
      const formData = new FormData();
      formData.append('title', newSong.title);
      formData.append('artist', newSong.artist);
      formData.append('duration', newSong.duration.toString());
      if (newSong.album && newSong.album !== '')
        formData.append('albumId', newSong.album);

      formData.append('audioFile', files.audio);
      formData.append('imageFile', files.image);
      await axiosInstance.post('/admin/songs', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      setNewSong({
        title: '',
        artist: '',
        album: '',
        duration: 0,
      });
      setFiles({
        audio: null,
        image: null,
      });
      toast.success('Song added successfully');
    } catch (error: any) {
      toast.error('Error adding song ' + error.message);
    } finally {
      setIsLoading(false);
    }
  };
  return (
    <Dialog open={isSongDialogOpen} onOpenChange={setIsSongDialogOpen}>
      <DialogTrigger asChild>
        <Button className='bg-emerald-500 hover:bg-emerald-600 text-black'>
          <Plus className='mr-2 h-4 w-4' />
          Add Song
        </Button>
      </DialogTrigger>
      <DialogContent className='bg-zinc-900 border-zinc-700 max-h-[80vh] overflow-auto'>
        <DialogHeader>
          <DialogTitle>Add New Song</DialogTitle>
          <DialogDescription>
            Add a new song to your music library
          </DialogDescription>
        </DialogHeader>
        <div className='space-y-4 py-4'>
          <input
            type='file'
            accept='audio/*'
            ref={audioInputRef}
            onChange={(e) =>
              setFiles((prev) => ({ ...prev, audio: e.target.files![0] }))
            }
            hidden
          />
          <div
            {...getRootProps()}
            className={`flex items-center justify-center p-6 border-2 border-dashed rounded-lg cursor-pointer ${
              isDragActive ? 'border-emerald-500' : 'border-neutral-700'
            }`}
          >
            <input {...getInputProps()} />
            <div className='text-center'>
              {files.image ? (
                <div className='space-y-2'>
                  <div className='text-sm text-emerald-500'>
                    Image selected:
                  </div>
                  <div className='text-xs text-zinc-400'>
                    {files.image.name.slice(0, 20)}
                  </div>
                </div>
              ) : (
                <>
                  <div className='p-3 bg-zinc-800 rounded-full inline-block mb-2'>
                    <Upload className='size-6 text-zinc-400' />
                  </div>
                  <div className='text-sm text-zinc-400 mb-2'>
                    {isDragActive
                      ? 'Drop the image here...'
                      : 'Drag and drop an image, or click to upload'}
                  </div>
                  <Button variant='outline' size='sm' className='text-xs'>
                    Choose File
                  </Button>
                </>
              )}
            </div>
          </div>
          <div className='space-y-2'>
            <label className='text-sm font-medium'>Audio File</label>
            <div className='flex items-center gap-2'>
              <Button
                variant='outline'
                className='w-full'
                onClick={() => audioInputRef.current?.click()}
              >
                {files.audio
                  ? files.audio.name.slice(0, 20)
                  : 'Select Audio File'}
              </Button>
            </div>
          </div>
        </div>
        <div className='space-y-2'>
          <label className='text-sm font-medium'>Title</label>
          <Input
            value={newSong.title}
            onChange={(e) =>
              setNewSong((prev) => ({ ...prev, title: e.target.value }))
            }
            className='bg-zinc-800 border-zinc-700'
          />
        </div>
        <div className='space-y-2'>
          <label className='text-sm font-medium'>Artist</label>
          <Input
            value={newSong.artist}
            onChange={(e) =>
              setNewSong((prev) => ({ ...prev, artist: e.target.value }))
            }
            className='bg-zinc-800 border-zinc-700'
          />
        </div>
        <div className='space-y-2'>
          <label className='text-sm font-medium'>Duration</label>
          <Input
            type='number'
            min={0}
            onWheel={(e) => e.currentTarget.blur()}
            value={newSong.duration}
            onChange={(e) =>
              setNewSong((prev) => ({
                ...prev,
                duration: parseInt(e.target.value) || 0,
              }))
            }
            className='bg-zinc-800 border-zinc-700'
          />
        </div>
        <div className='space-y-2'>
          <label className='text-sm font-medium'>Album (optional)</label>
          <Popover open={open} onOpenChange={setOpen}>
            <PopoverTrigger asChild>
              <Button
                variant='outline'
                role='combobox'
                aria-expanded={open}
                className='w-full justify-between bg-zinc-800 border-zinc-700'
              >
                {newSong.album
                  ? albums.find((album) => album._id === newSong.album)?.title
                  : 'Select album...'}
                <ChevronsUpDown className='ml-2 h-4 w-4 shrink-0 opacity-50' />
              </Button>
            </PopoverTrigger>
            <PopoverContent className='w-[--radix-popover-trigger-width] max-h-[--radix-popover-content-available-height] p-0'>
              <Command>
                <CommandInput placeholder='Search album...' />
                <CommandList>
                  <CommandEmpty>No framework found.</CommandEmpty>
                  <CommandGroup>
                    {albums.map((album) => (
                      <CommandItem
                        key={album._id}
                        value={album.title}
                        onSelect={() => {
                          setNewSong((prev) => ({
                            ...prev,
                            album: album._id ?? prev.album,
                          }));
                          setOpen(false);
                        }}
                      >
                        <Check
                          className={cn(
                            'mr-2 h-4 w-4',
                            newSong.album === album._id
                              ? 'opacity-100'
                              : 'opacity-0'
                          )}
                        />
                        {album.title}
                      </CommandItem>
                    ))}
                  </CommandGroup>
                </CommandList>
              </Command>
            </PopoverContent>
          </Popover>
        </div>
        <DialogFooter>
          <Button
            variant='outline'
            onClick={() => setIsSongDialogOpen(false)}
            disabled={isLoading}
          >
            Cancel
          </Button>
          <Button onClick={onSubmit} disabled={isLoading}>
            {isLoading ? 'Uploading...' : 'Add Song'}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
