import { useChatStore } from '@/store/chat.store';
import { useUser } from '@clerk/clerk-react';
import { useState } from 'react';
import { Input } from './ui/input';
import { Button } from './ui/button';
import { Send } from 'lucide-react';

export const MessageInput = () => {
  const [newMessage, setNewMessage] = useState('');
  const { user } = useUser();
  const selectedUser = useChatStore((state) => state.selectedUser);
  const sendMessage = useChatStore((state) => state.sendMessage);
  const handleSend = () => {
    if (!user || !selectedUser || !newMessage) return;
    sendMessage(selectedUser.clerkId, user.id, newMessage.trim());
    setNewMessage('');
  };
  return (
    <div className='p-4 mt-auto border-t border-zinc-800'>
      <div className='flex gap-2'>
        <Input
          placeholder='Type a message'
          value={newMessage}
          onChange={(e) => setNewMessage(e.target.value)}
          className='bg-zinc-800 border-none'
          onKeyDown={(e) => e.key === 'Enter' && handleSend()}
        />
        <Button size='icon' onClick={handleSend} disabled={!newMessage.trim()}>
          <Send className='size-4' />
        </Button>
      </div>
    </div>
  );
};
