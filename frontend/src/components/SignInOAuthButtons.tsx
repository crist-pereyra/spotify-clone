import { useSignIn } from '@clerk/clerk-react';
import { Button } from './ui/button';

export const SignInOAuthButtons = () => {
  const { signIn, isLoaded } = useSignIn();
  const signInGoogle = () =>
    signIn?.authenticateWithRedirect({
      strategy: 'oauth_google',
      redirectUrl: '/sso-callback',
      redirectUrlComplete: '/auth-callback',
    });
  if (!isLoaded) return null;
  return (
    <Button
      onClick={signInGoogle}
      variant='secondary'
      className='w-full text-white border-zinc-200 h-11'
    >
      Continue with Google
    </Button>
  );
};
