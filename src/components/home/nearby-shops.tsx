import Link from 'next/link';
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from '@/components/ui/sheet';
import ShopCard from '@/components/shared/shop-card';
import type { Shop } from '@/lib/data';

interface NearbyShopsProps {
  shops: Shop[];
}

export default function NearbyShops({ shops }: NearbyShopsProps) {
  return (
    <section>
      <h2 className="font-headline text-3xl font-bold tracking-tight">
        Explore Shops Near You
      </h2>
      <div className="mt-6 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
        {shops.map((shop) => (
            <ShopCard shop={shop} key={shop.id}/>
        ))}
      </div>
    </section>
  );
}
