import Image from 'next/image';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardTitle,
} from '@/components/ui/card';
import type { Product } from '@/lib/data';
import { Heart } from 'lucide-react';
import { cn } from '@/lib/utils';
import Link from 'next/link';

interface ProductCardProps {
  product: Product;
  className?: string;
}

export default function ProductCard({ product, className }: ProductCardProps) {
  return (
    <Card className={cn('overflow-hidden transition-all hover:shadow-xl group', className)}>
      <CardContent className="p-0">
        <Link href={`/shops/${product.shopId}?product=${product.id}`}>
        <div className="relative aspect-[3/4] w-full overflow-hidden">
          <Image
            src={product.imageUrl}
            alt={product.description}
            fill
            className="object-cover transition-transform duration-300 group-hover:scale-105"
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            data-ai-hint={product.imageHint}
          />
          <Button
            size="icon"
            variant="secondary"
            className="absolute top-3 right-3 z-10 h-9 w-9 rounded-full bg-white/80 text-foreground hover:bg-white hover:text-primary"
            onClick={(e) => {
              e.preventDefault();
              e.stopPropagation();
              // Add to wishlist logic
            }}
          >
            <Heart className="h-5 w-5" />
            <span className="sr-only">Add to wishlist</span>
          </Button>
        </div>
        </Link>
      </CardContent>
      <CardFooter className="flex-col items-start p-4">
        <CardTitle className="font-headline text-lg leading-tight">
          <Link href={`/shops/${product.shopId}?product=${product.id}`} className="hover:text-primary transition-colors">
            {product.name}
          </Link>
        </CardTitle>
        <CardDescription className="mt-2 text-base font-semibold text-foreground">
          ${product.price.toFixed(2)}
        </CardDescription>
      </CardFooter>
    </Card>
  );
}
