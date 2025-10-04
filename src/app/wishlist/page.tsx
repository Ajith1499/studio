import ProductCard from '@/components/shared/product-card';
import { getWishlistItems } from '@/lib/data';
import { Button } from '@/components/ui/button';
import { Plus } from 'lucide-react';

export default function WishlistPage() {
  const wishlistItems = getWishlistItems();

  return (
    <div className="space-y-8">
      <div className="flex flex-wrap items-center justify-between gap-4">
        <h1 className="font-headline text-4xl font-bold">Your Wishlist</h1>
        <Button>
          <Plus className="mr-2 h-4 w-4" /> Create Wishlist Group
        </Button>
      </div>

      {wishlistItems.length > 0 ? (
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
          {wishlistItems.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      ) : (
        <div className="flex flex-col items-center justify-center rounded-lg border-2 border-dashed p-12 text-center">
          <h3 className="text-xl font-semibold">Your wishlist is empty</h3>
          <p className="mt-2 text-muted-foreground">
            Add items you love to your wishlist to see them here.
          </p>
          <Button className="mt-4">Start Shopping</Button>
        </div>
      )}
    </div>
  );
}
