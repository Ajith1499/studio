
'use client';

import Image from 'next/image';
import { notFound, useRouter } from 'next/navigation';
import { getProductById, getShopById, addToWishlist } from '@/lib/data';
import { Button } from '@/components/ui/button';
import { Heart, MapPin, ShoppingCart, Store, CreditCard, Star, Users } from 'lucide-react';
import Link from 'next/link';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { useState } from 'react';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Label } from '@/components/ui/label';
import { useToast } from '@/hooks/use-toast';

const StarRating = ({ rating }: { rating: number }) => {
  const fullStars = Math.floor(rating);
  const halfStar = rating % 1 !== 0;
  const emptyStars = 5 - fullStars - (halfStar ? 1 : 0);

  return (
    <div className="flex items-center">
      {[...Array(fullStars)].map((_, i) => (
        <Star key={`full-${i}`} className="h-5 w-5 fill-yellow-400 text-yellow-400" />
      ))}
      {halfStar && <Star key="half" className="h-5 w-5 fill-yellow-400 text-yellow-400" style={{ clipPath: 'inset(0 50% 0 0)' }} />}
      {[...Array(emptyStars)].map((_, i) => (
        <Star key={`empty-${i}`} className="h-5 w-5 text-gray-300" />
      ))}
    </div>
  );
};

export default function ProductDetailsPage({
  params,
}: {
  params: { productId: string };
}) {
  const [selectedSize, setSelectedSize] = useState('M');
  const router = useRouter();
  const { toast } = useToast();

  const product = getProductById(params.productId);

  if (!product) {
    notFound();
  }

  const shop = getShopById(product.shopId);
  const sizes = ['S', 'M', 'L', 'XL'];

  const handleAddToWishlist = () => {
    addToWishlist(product.id);
    toast({
      title: "Added to Wishlist!",
      description: `${product.name} has been added to your wishlist.`,
    });
    router.push('/wishlist');
  };

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
          
          <div className="mt-4 flex items-center gap-4 text-sm text-muted-foreground">
            <div className="flex items-center gap-1">
              <StarRating rating={product.rating} />
              <span className="font-semibold text-foreground ml-1">{product.rating.toFixed(1)}</span>
              <span>({product.ratingCount} ratings)</span>
            </div>
            <Separator orientation="vertical" className="h-4" />
            <div className="flex items-center gap-1">
              <Users className="h-4 w-4" />
              <span>{product.purchaseCount} bought</span>
            </div>
          </div>
        </div>

        <p className="text-muted-foreground leading-relaxed">
          {product.description}. A must-have item that combines style and comfort. Perfect for any occasion.
        </p>
        
        <div>
          <Label className="text-base font-medium">Size</Label>
          <RadioGroup 
            defaultValue={selectedSize} 
            onValueChange={setSelectedSize}
            className="flex items-center gap-2 mt-2"
          >
            {sizes.map((size) => (
              <Label
                key={size}
                htmlFor={`size-${size}`}
                className={`flex items-center justify-center rounded-md border-2 w-12 h-12 text-base font-semibold cursor-pointer transition-colors
                  ${selectedSize === size ? 'border-primary bg-primary/10 text-primary' : 'border-input hover:bg-accent'}`}
              >
                <RadioGroupItem value={size} id={`size-${size}`} className="sr-only" />
                {size}
              </Label>
            ))}
          </RadioGroup>
        </div>

        <div className="flex flex-col gap-4">
            <Button size="lg" className="w-full">
                <CreditCard className="mr-2" /> Buy Now
            </Button>
            <div className="flex gap-4">
                <Button size="lg" variant="outline" className="flex-1">
                    <ShoppingCart className="mr-2" /> Add to Cart
                </Button>
                <Button size="lg" variant="outline" className="flex-1" onClick={handleAddToWishlist}>
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
