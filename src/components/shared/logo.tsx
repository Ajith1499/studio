import { cn } from '@/lib/utils';
import { Scissors } from 'lucide-react';

export default function Logo({ className }: { className?: string }) {
  return (
    <div
      className={cn(
        'flex items-center gap-2 text-sidebar-foreground group-data-[collapsible=icon]:justify-center',
        className
      )}
    >
      <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary text-primary-foreground">
        <Scissors className="h-5 w-5" />
      </div>
      <span className="font-headline text-lg font-bold group-data-[collapsible=icon]:hidden">
        NearThreads
      </span>
    </div>
  );
}
