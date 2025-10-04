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
          <Sheet key={shop.id}>
            <SheetTrigger asChild>
              <ShopCard shop={shop} />
            </SheetTrigger>
            <SheetContent>
              <SheetHeader>
                <SheetTitle>{shop.name}</SheetTitle>
              </SheetHeader>
              <div className="py-4">
                {/* Full shop details could be rendered here */}
                <p>{shop.location}</p>
                <Link href={`/shops/${shop.id}`} className="text-primary hover:underline mt-4 inline-block">
                  Visit Shop
                </Link>
              </div>
            </SheetContent>
          </Sheet>
        ))}
      </div>
    </section>
  );
}
