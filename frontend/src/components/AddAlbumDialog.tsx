import { axiosInstance } from '@/lib/axios';
import { useState } from 'react';
import { useDropzone } from 'react-dropzone';
import toast from 'react-hot-toast';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from './ui/dialog';
import { Button } from './ui/button';
import { Plus, Upload } from 'lucide-react';
import { Input } from './ui/input';
import { ColorPicker } from './ui/color-picker';

export const AddAlbumDialog = () => {
  const [isAlbumDialogOpen, setIsAlbumDialogOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [newAlbum, setNewAlbum] = useState({
    title: '',
    artist: '',
    color: '',
    releaseYear: new Date().getFullYear(),
  });
  const [imageFile, setImageFile] = useState<File | null>(null);
  const onDropImage = (acceptedFiles: File[]) => {
    if (acceptedFiles.length > 0) {
      setImageFile(acceptedFiles[0]);
    }
  };

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    accept: { 'image/*': [] },
    onDrop: onDropImage,
    multiple: false,
  });

  const handleSubmit = async () => {
    setIsLoading(true);
    try {
      if (!imageFile) return toast.error('Please upload an image file');
      const formData = new FormData();
      formData.append('title', newAlbum.title);
      formData.append('artist', newAlbum.artist);
      formData.append('releaseYear', newAlbum.releaseYear.toString());
      formData.append('imageFile', imageFile);
      formData.append('color', newAlbum.color);
      await axiosInstance.post('/admin/albums', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      setNewAlbum({
        title: '',
        artist: '',
        color: '',
        releaseYear: new Date().getFullYear(),
      });
      setImageFile(null);
      setIsAlbumDialogOpen(false);
      toast.success('Album added successfully');
    } catch (error: any) {
      toast.error('Error adding album: ' + error.message);
    } finally {
      setIsLoading(false);
    }
  };
  return (
    <Dialog open={isAlbumDialogOpen} onOpenChange={setIsAlbumDialogOpen}>
      <DialogTrigger asChild>
        <Button className='bg-violet-500 hover:bg-violet-600 text-white'>
          <Plus className='mr-2 h-4 w-4' />
          Add Album
        </Button>
      </DialogTrigger>
      <DialogContent className='bg-zinc-900 border-zinc-700'>
        <DialogHeader>
          <DialogTitle>Add New Album</DialogTitle>
          <DialogDescription>
            Add a new album to your collection
          </DialogDescription>
        </DialogHeader>
        <div
          {...getRootProps()}
          className={`flex items-center justify-center p-6 border-2 border-dashed rounded-lg cursor-pointer ${
            isDragActive ? 'border-emerald-500' : 'border-neutral-700'
          }`}
        >
          <input {...getInputProps()} />
          <div className='text-center'>
            {imageFile ? (
              <div className='space-y-2'>
                <img
                  src={URL.createObjectURL(imageFile)}
                  className='w-20 h-auto object-cover rounded-lg mx-auto'
                />
                <div className='text-sm text-emerald-500'>Image selected:</div>
                <div className='text-xs text-zinc-400'>
                  {imageFile.name.slice(0, 20)}
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
          <label className='text-sm font-medium'>Album Title</label>
          <Input
            value={newAlbum.title}
            onChange={(e) =>
              setNewAlbum({ ...newAlbum, title: e.target.value })
            }
            placeholder='Enter album title'
            className='bg-zinc-800 border-zinc-700'
          />
        </div>
        <div className='space-y-2'>
          <label className='text-sm font-medium'>Artist</label>
          <Input
            value={newAlbum.artist}
            onChange={(e) =>
              setNewAlbum({ ...newAlbum, artist: e.target.value })
            }
            placeholder='Enter artist name'
            className='bg-zinc-800 border-zinc-700'
          />
        </div>
        <div className='space-y-2'>
          <label className='text-sm font-medium'>Release Year</label>
          <Input
            type='number'
            min={1900}
            max={new Date().getFullYear()}
            onWheel={(e: any) => e.target.blur()}
            value={newAlbum.releaseYear}
            onChange={(e) =>
              setNewAlbum({
                ...newAlbum,
                releaseYear: parseInt(e.target.value),
              })
            }
            placeholder='Enter release year'
            className='bg-zinc-800 border-zinc-700'
          />
        </div>
        <div className='space-y-2'>
          <label className='text-sm font-medium'>Color</label>
          <ColorPicker
            onChange={(v) => {
              setNewAlbum({ ...newAlbum, color: v });
            }}
            value={newAlbum.color}
          />
        </div>
        <DialogFooter>
          <Button
            variant='outline'
            onClick={() => setIsAlbumDialogOpen(false)}
            disabled={isLoading}
          >
            Cancel
          </Button>
          <Button
            onClick={handleSubmit}
            disabled={
              isLoading || !imageFile || !newAlbum.title || !newAlbum.artist
            }
            className='bg-violet-500 hover:bg-violet-600'
          >
            {isLoading ? 'Creating...' : 'Add Album'}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
