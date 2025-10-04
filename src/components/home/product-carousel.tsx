import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from '@/components/ui/carousel';
import ProductCard from '@/components/shared/product-card';
import type { Product } from '@/lib/data';

interface ProductCarouselProps {
  title: string;
  products: Product[];
}

export default function ProductCarousel({
  title,
  products,
}: ProductCarouselProps) {
  return (
    <section>
      <h2 className="font-headline text-3xl font-bold tracking-tight">{title}</h2>
      <Carousel
        opts={{
          align: 'start',
          loop: true,
        }}
        className="mt-6"
      >
        <CarouselContent>
          {products.map((product) => (
            <CarouselItem
              key={product.id}
              className="md:basis-1/2 lg:basis-1/3 xl:basis-1/4"
            >
              <div className="p-1">
                <ProductCard product={product} />
              </div>
            </CarouselItem>
          ))}
        </CarouselContent>
        <CarouselPrevious className="ml-14" />
        <CarouselNext className="mr-14" />
      </Carousel>
    </section>
  );
}
