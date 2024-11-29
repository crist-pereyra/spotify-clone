import { SignedOut, UserButton } from '@clerk/clerk-react';
import { LayoutDashboardIcon } from 'lucide-react';
import { Link } from 'react-router-dom';
import { SignInOAuthButtons } from './SignInOAuthButtons';
import { useAuthStore } from '@/store/auth.store';
import { cn } from '@/lib/utils';
import { buttonVariants } from './ui/button';

export const Topbar = () => {
  const isAdmin = useAuthStore((state) => state.isAdmin);
  return (
    <div className='flex items-center justify-between p-4 sticky top-0 bg-[#062B13] backdrop-blur-md z-10'>
      <div className='flex gap-2 items-center'>
        <img src='/spotify.png' className='size-8' alt='Spotify' />
        <span className='font-semibold'>Spotify</span>
      </div>
      <div className='flex items-center gap-4'>
        {isAdmin && (
          <Link
            to='/admin'
            className={cn(
              buttonVariants({ variant: 'outline' }),
              'border-transparent bg-[#041F0E] hover:bg-[#24342A] font-semibold'
            )}
          >
            <LayoutDashboardIcon className='size-4 mr-2' />
            Admin Dashboard
          </Link>
        )}
        <SignedOut>
          <SignInOAuthButtons />
        </SignedOut>
        <UserButton />
      </div>
    </div>
  );
};
