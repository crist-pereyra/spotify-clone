import { Button } from '@/components/ui/button';
import { Home, Music2 } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

export const NotFoundPage = () => {
  const navigate = useNavigate();
  return (
    <div className='h-screen bg-neutral-900 flex items-center justify-center'>
      <div className='text-center space-y-8 px-4'>
        <div className='flex justify-center animate-bounce'>
          <Music2 className='w-24 h-24 text-emerald-500' />
        </div>
        <div className='space-y-4'>
          <h1 className='text-7xl font-bold text-white'>404</h1>
          <h2 className='text-2xl font-semibold text-white'>Page not found</h2>
          <p className='text-neutral-400 max-w-md mx-auto'>
            Looks like this track got lost in the shuffle. Let's get you back to
            the music
          </p>
        </div>
        <div className='flex flex-col sm:flex-row gap-4 justify-center items-center mt-8'>
          <Button
            onClick={() => navigate(-1)}
            variant='outline'
            className='bg-neutral-800 hover:bg-neutral-700 text-white border-neutral-700 w-full sm:w-auto'
          >
            Go back
          </Button>
          <Button
            onClick={() => navigate('/')}
            className='bg-emerald-500 hover:bg-emerald-600 text-white w-full sm:w-auto'
          >
            <Home className='w-4 h-4 mr-2' /> Back to Home
          </Button>
        </div>
      </div>
    </div>
  );
};
