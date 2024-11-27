import { useChatStore } from '@/store/chat.store';
import { Avatar, AvatarFallback, AvatarImage } from './ui/avatar';

export const ChatHeader = () => {
  const onlineUsers = useChatStore((state) => state.onlineUsers);
  const selectedUser = useChatStore((state) => state.selectedUser);
  if (!selectedUser) return null;
  return (
    <div className='p-4 border-b border-zinc-800'>
      <div className='flex items-center gap-3'>
        <Avatar>
          <AvatarImage
            src={selectedUser.imageUrl}
            alt={selectedUser.fullName}
          />
          <AvatarFallback>{selectedUser.fullName[0]}</AvatarFallback>
        </Avatar>
        <div>
          <h2 className='font-medium'>{selectedUser?.fullName}</h2>
          <p className='text-sm text-zinc-400'>
            {onlineUsers.has(selectedUser.clerkId) ? 'Online' : 'Offline'}
          </p>
        </div>
      </div>
    </div>
  );
};
