'use client';

import Image from 'next/image';
import Link from 'next/link';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import type { Shop } from '@/lib/data';
import { cn } from '@/lib/utils';
import { MapPin } from 'lucide-react';

interface ShopCardProps {
  shop: Shop;
  className?: string;
}

export default function ShopCard({ shop, className }: ShopCardProps) {
  return (
    <Link href={`/shops/${shop.id}`} className="group block">
      <Card className={cn('overflow-hidden transition-all hover:shadow-xl', className)}>
        <CardContent className="p-0">
          <div className="relative aspect-video w-full overflow-hidden">
            <Image
              src={shop.imageUrl}
              alt={shop.description}
              fill
              className="object-cover transition-transform duration-300 group-hover:scale-105"
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
              data-ai-hint={shop.imageHint}
            />
          </div>
        </CardContent>
        <CardHeader className="p-4">
          <CardTitle className="font-headline text-xl">{shop.name}</CardTitle>
          <CardDescription className="mt-1 flex items-center gap-1">
            <MapPin className="h-4 w-4" />
            <span>{shop.location}</span>
          </CardDescription>
        </CardHeader>
      </Card>
    </Link>
  );
}
