import { useAuth } from '@clerk/clerk-react';
import { useEffect, useState } from 'react';
import { Outlet } from 'react-router-dom';
import { Loader } from 'lucide-react';
import { useAuthStore } from './store/auth.store';

function App() {
  const { getToken } = useAuth();
  const [isLoading, setIsLoading] = useState(true);
  const updateApiToken = useAuthStore((state) => state.updateApiToken);
  useEffect(() => {
    const initAuth = async () => {
      try {
        const token = await getToken();
        updateApiToken(token);
      } catch (error) {
        updateApiToken(null);
        console.error('Error getting token', error);
      } finally {
        setIsLoading(false);
      }
    };
    initAuth();
  }, [getToken]);
  if (isLoading) {
    return (
      <div className='h-screen w-full flex items-center justify-center'>
        <Loader className='animate-spin size-8 text-emerald-500' />
      </div>
    );
  }
  return (
    <main>
      <Outlet />
    </main>
  );
}

export default App;
