import Image from 'next/image';
import { notFound } from 'next/navigation';
import { getShopById, getProductsByShop, getShopStats } from '@/lib/data';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { MapPin, Phone, Users, ShoppingBag } from 'lucide-react';
import ProductCard from '@/components/shared/product-card';
import ChatDialog from '@/components/chat-dialog';
import Link from 'next/link';
import { Separator } from '@/components/ui/separator';

export default function ShopDetailsPage({
  params,
}: {
  params: { shopId: string };
}) {
  const shop = getShopById(params.shopId);

  if (!shop) {
    notFound();
  }

  const allProducts = getProductsByShop(shop.id);
  const { totalSales, totalRatings } = getShopStats(shop.id);

  const menProducts = allProducts.filter((p) => p.category === 'Men');
  const womenProducts = allProducts.filter((p) => p.category === 'Women');
  const kidsProducts = allProducts.filter((p) => p.category === 'Kids');

  const mapUrl = `https://www.google.com/maps/search/?api=1&query=${shop.latitude},${shop.longitude}`;

  return (
    <div className="space-y-8">
      <header className="relative h-64 w-full overflow-hidden rounded-xl">
        <Image
          src={shop.imageUrl}
          alt={shop.description}
          fill
          className="object-cover"
          data-ai-hint={shop.imageHint}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
        <div className="absolute bottom-0 left-0 p-8 text-white">
          <Link
            href={mapUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="hover:underline"
          >
            <h1 className="font-headline text-5xl font-bold">{shop.name}</h1>
          </Link>
          <Link
            href={mapUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-2 flex items-center gap-2 text-lg hover:underline"
          >
            <MapPin className="h-5 w-5" />
            <span>{shop.location}</span>
          </Link>
          <div className="mt-4 flex items-center gap-6 text-sm text-white/90">
            <div className="flex items-center gap-2">
              <Users className="h-4 w-4" />
              <span>{totalRatings.toLocaleString()} Ratings</span>
            </div>
            <Separator orientation="vertical" className="h-4 bg-white/50" />
            <div className="flex items-center gap-2">
              <ShoppingBag className="h-4 w-4" />
              <span>{totalSales.toLocaleString()} Products Sold</span>
            </div>
          </div>
        </div>
      </header>

      <div className="flex flex-wrap items-center gap-4">
        <a href={`tel:${shop.phone}`}>
          <Button
            size="lg"
            className="bg-accent text-accent-foreground hover:bg-accent/90"
          >
            <Phone className="mr-2 h-5 w-5" /> Call Shop
          </Button>
        </a>
        <ChatDialog shopName={shop.name} />
      </div>

      <Tabs defaultValue="all" className="w-full">
        <TabsList className="grid w-full grid-cols-4 md:w-[400px]">
          <TabsTrigger value="all">All</TabsTrigger>
          <TabsTrigger value="women">Women</TabsTrigger>
          <TabsTrigger value="men">Men</TabsTrigger>
          <TabsTrigger value="kids">Kids</TabsTrigger>
        </TabsList>
        <div className="mt-6">
          <TabsContent value="all">
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
              {allProducts.map((p) => (
                <ProductCard key={p.id} product={p} />
              ))}
            </div>
          </TabsContent>
          <TabsContent value="women">
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
              {womenProducts.map((p) => (
                <ProductCard key={p.id} product={p} />
              ))}
            </div>
          </TabsContent>
          <TabsContent value="men">
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
              {menProducts.map((p) => (
                <ProductCard key={p.id} product={p} />
              ))}
            </div>
          </TabsContent>
          <TabsContent value="kids">
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
              {kidsProducts.map((p) => (
                <ProductCard key={p.id} product={p} />
              ))}
            </div>
          </TabsContent>
        </div>
      </Tabs>
    </div>
  );
}
