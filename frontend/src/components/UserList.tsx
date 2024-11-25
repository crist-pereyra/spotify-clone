import { useChatStore } from '@/store/chat.store';
import { ScrollArea } from './ui/scroll-area';
import { UserListSkeleton } from './skeletons/UserListSkeleton';
import { Avatar, AvatarFallback, AvatarImage } from './ui/avatar';

export const UserList = () => {
  const users = useChatStore((state) => state.users);
  const selectedUser = useChatStore((state) => state.selectedUser);
  const isLoading = useChatStore((state) => state.isLoading);
  const onlineUsers = useChatStore((state) => state.onlineUsers);
  const setSelectedUser = useChatStore((state) => state.setSelectedUser);
  return (
    <div className='border-r border-zinc-800'>
      <div className='flex flex-col h-full'>
        <ScrollArea className='h-[calc(100vh-280px)]'>
          <div className='space-y-2 p-4'>
            {isLoading ? (
              <UserListSkeleton />
            ) : (
              users.map((user) => (
                <div
                  key={user._id}
                  className={`flex items-center justify-center lg:justify-start gap-3 p-3 rounded-lg cursor-pointer transition-colors ${selectedUser?.clerkId === user.clerkId ? 'bg-zinc-800' : 'hover:bg-zinc-800/50'}`}
                  onClick={() => setSelectedUser(user)}
                >
                  <div className='relative'>
                    <Avatar className='size-8 md:size-12'>
                      <AvatarImage src={user.imageUrl} alt={user.fullName} />
                      <AvatarFallback>{user.fullName[0]}</AvatarFallback>
                    </Avatar>
                    <div
                      className={`absolute bottom-0 right-0 w-3 h-3 rounded-full ${onlineUsers.has(user.clerkId) ? 'bg-green-500' : 'bg-zinc-500'}`}
                    />
                  </div>
                  <div className='flex-1 min=w-0 lg:block hidden'>
                    <span className='font-medium truncate'>
                      {user.fullName}
                    </span>
                  </div>
                </div>
              ))
            )}
          </div>
        </ScrollArea>
      </div>
    </div>
  );
};
