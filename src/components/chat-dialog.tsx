'use client';

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogFooter
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { MessageSquare, Send } from 'lucide-react';
import { ScrollArea } from './ui/scroll-area';

export default function ChatDialog({ shopName }: { shopName: string }) {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button size="lg" variant="outline">
          <MessageSquare className="mr-2 h-5 w-5" /> Chat with Shop
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px] grid-rows-[auto_1fr_auto] p-0 max-h-[80vh]">
        <DialogHeader className="p-6 pb-2">
          <DialogTitle className="font-headline">Chat with {shopName}</DialogTitle>
        </DialogHeader>
        <ScrollArea className="h-96 w-full px-6">
            <div className='space-y-4'>
                <div className="flex items-end gap-2">
                    <div className="rounded-lg bg-muted p-3 max-w-[80%]">
                        <p className="text-sm">Hi! How can I help you today? Do you have any questions about our new collection?</p>
                    </div>
                </div>
                <div className="flex items-end gap-2 justify-end">
                    <div className="rounded-lg bg-primary text-primary-foreground p-3 max-w-[80%]">
                        <p className="text-sm">Hello! I was wondering if the 'Modern Denim Jacket' is available in a size Medium.</p>
                    </div>
                </div>
                 <div className="flex items-end gap-2">
                    <div className="rounded-lg bg-muted p-3 max-w-[80%]">
                        <p className="text-sm">Let me check for you. Yes, we do have it in Medium! It's a very popular item.</p>
                    </div>
                </div>
            </div>
        </ScrollArea>
        <DialogFooter className="p-6 pt-2">
            <div className="flex w-full items-center space-x-2">
                <Input placeholder="Type a message..." />
                <Button type="submit" size="icon">
                    <Send className="h-4 w-4" />
                    <span className="sr-only">Send</span>
                </Button>
            </div>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
