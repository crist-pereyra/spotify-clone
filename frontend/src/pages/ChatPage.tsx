import { Topbar } from '@/components/Topbar';
import { UserList } from '@/components/UserList';
import { useChatStore } from '@/store/chat.store';
import { useUser } from '@clerk/clerk-react';
import { useEffect } from 'react';

export const ChatPage = () => {
  const { user } = useUser();
  const messages = useChatStore((state) => state.messages);
  const selectedUser = useChatStore((state) => state.selectedUser);
  const fetchUsers = useChatStore((state) => state.fetchUsers);
  const fetchMessages = useChatStore((state) => state.fetchMessages);
  useEffect(() => {
    if (user) fetchUsers();
  }, [fetchUsers, user]);
  useEffect(() => {
    if (selectedUser) fetchMessages(selectedUser.clerkId);
  }, [selectedUser, fetchMessages]);
  return (
    <main className='h-full rounded-lg bg-gradient-to-b from-zinc-800 to-zinc-900 overflow-hidden'>
      <Topbar />
      <div className='grid lg:grid-cols-[300px_1fr] grid-cols-[80px_1fr] h-[calc(100vh-180px)]'>
        <UserList />
      </div>
    </main>
  );
};
