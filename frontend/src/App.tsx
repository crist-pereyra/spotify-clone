import { useAuth } from '@clerk/clerk-react';
import { useEffect, useState } from 'react';
import { Outlet } from 'react-router-dom';
import { Loader } from 'lucide-react';
import { useAuthStore } from './store/auth.store';
import { useChatStore } from './store/chat.store';

function App() {
  const { getToken, userId } = useAuth();
  const [isLoading, setIsLoading] = useState(true);
  const updateApiToken = useAuthStore((state) => state.updateApiToken);
  const checkAdminStatus = useAuthStore((state) => state.checkAdminStatus);
  const initSocket = useChatStore((state) => state.initSocket);
  const disconnectSocket = useChatStore((state) => state.disconnectSocket);
  useEffect(() => {
    const initAuth = async () => {
      try {
        const token = await getToken();
        updateApiToken(token);
        if (token) {
          await checkAdminStatus();
          // init socket
          if (userId) initSocket(userId);
        }
      } catch (error) {
        updateApiToken(null);
        console.error('Error getting token', error);
      } finally {
        setIsLoading(false);
      }
    };
    initAuth();
    return () => disconnectSocket();
  }, [getToken, userId, checkAdminStatus, initSocket]);
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
