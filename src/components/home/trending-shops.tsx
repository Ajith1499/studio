import ShopCard from '@/components/shared/shop-card';
import type { Shop } from '@/lib/data';

interface TrendingShopsProps {
  shops: Shop[];
}

export default function TrendingShops({ shops }: TrendingShopsProps) {
  return (
    <section>
      <h2 className="font-headline text-3xl font-bold tracking-tight">
        Trending Shops
      </h2>
      <p className="text-muted-foreground mt-2">
        Discover the most popular boutiques right now.
      </p>
      <div className="mt-6 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
        {shops.map((shop) => (
            <ShopCard shop={shop} key={shop.id}/>
        ))}
      </div>
    </section>
  );
}
