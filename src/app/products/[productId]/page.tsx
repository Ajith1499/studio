import Image from 'next/image';
import { notFound } from 'next/navigation';
import { getProductById, getShopById } from '@/lib/data';
import { Button } from '@/components/ui/button';
import { Heart, MapPin, ShoppingCart, Store, CreditCard } from 'lucide-react';
import Link from 'next/link';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';

export default function ProductDetailsPage({
  params,
}: {
  params: { productId: string };
}) {
  const product = getProductById(params.productId);

  if (!product) {
    notFound();
  }

  const shop = getShopById(product.shopId);

  return (
    <div className="grid md:grid-cols-2 gap-8 lg:gap-12">
      <div className="relative aspect-[3/4] w-full overflow-hidden rounded-xl shadow-lg">
        <Image
          src={product.imageUrl}
          alt={product.description}
          fill
          className="object-cover"
          sizes="(max-width: 768px) 100vw, 50vw"
          data-ai-hint={product.imageHint}
        />
      </div>

      <div className="space-y-6">
        <div>
          <h1 className="font-headline text-4xl font-bold">{product.name}</h1>
          <p className="mt-2 text-3xl font-semibold">${product.price.toFixed(2)}</p>
        </div>

        <p className="text-muted-foreground leading-relaxed">
          {product.description}. A must-have item that combines style and comfort. Perfect for any occasion.
        </p>

        <div className="flex flex-col gap-4">
            <Button size="lg" className="w-full">
                <CreditCard className="mr-2" /> Buy Now
            </Button>
            <div className="flex gap-4">
                <Button size="lg" variant="outline" className="flex-1">
                    <ShoppingCart className="mr-2" /> Add to Cart
                </Button>
                <Button size="lg" variant="outline" className="flex-1">
                    <Heart className="mr-2" /> Add to Wishlist
                </Button>
            </div>
        </div>
        
        <Separator />

        {shop && (
          <Card>
            <CardHeader>
              <CardTitle className="font-headline text-xl">Sold By</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-center gap-4">
                <div className="relative h-16 w-16 overflow-hidden rounded-lg">
                    <Image src={shop.imageUrl} alt={shop.name} fill className="object-cover" />
                </div>
                <div>
                  <Link href={`/shops/${shop.id}`} className="font-semibold text-lg hover:text-primary transition-colors">
                    {shop.name}
                  </Link>
                  <p className="text-sm text-muted-foreground flex items-center gap-1">
                    <MapPin className="h-4 w-4" />
                    {shop.location}
                  </p>
                </div>
                <Button asChild variant="secondary" className="ml-auto">
                    <Link href={`/shops/${shop.id}`}>
                        <Store className="mr-2" />
                        Visit Shop
                    </Link>
                </Button>
              </div>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
}
