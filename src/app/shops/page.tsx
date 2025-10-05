import { getShops } from '@/lib/data';
import ShopCard from '@/components/shared/shop-card';

export default function ShopsPage() {
  const shops = getShops();

  return (
    <div className="space-y-8">
      <h1 className="font-headline text-4xl font-bold">Nearby Shops</h1>
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {shops.map((shop) => (
          <ShopCard key={shop.id} shop={shop} />
        ))}
      </div>
    </div>
  );
}
