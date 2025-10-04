'use client';
import { useState } from 'react';
import type { Shop } from '@/lib/data';
import { Button } from '@/components/ui/button';
import ShopCard from '../shared/shop-card';
import Link from 'next/link';

interface ShopsMapProps {
  shops: Shop[];
}

export default function ShopsMap({ shops }: ShopsMapProps) {
  const [selectedShop, setSelectedShop] = useState<Shop | null>(null);
  
  // Note: You'll need to replace this with a real Google Maps embed and your API key.
  // The following is a placeholder to demonstrate the layout.
  const apiKey = process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY || 'YOUR_API_KEY_HERE';
  const getMapUrl = () => {
    if (selectedShop) {
      return `https://www.google.com/maps/embed/v1/place?key=${apiKey}&q=${selectedShop.latitude},${selectedShop.longitude}`;
    }
    const centerPoint = shops.reduce(
      (acc, shop) => {
        acc.lat += shop.latitude;
        acc.lng += shop.longitude;
        return acc;
      },
      { lat: 0, lng: 0 }
    );
    const avgLat = centerPoint.lat / shops.length;
    const avgLng = centerPoint.lng / shops.length;
    return `https://www.google.com/maps/embed/v1/view?key=${apiKey}&center=${avgLat},${avgLng}&zoom=12`;
  };

  return (
    <section>
      <h2 className="font-headline text-3xl font-bold tracking-tight">
        Explore Shops on the Map
      </h2>
      <div className="mt-6 grid grid-cols-1 md:grid-cols-3 gap-8">
        <div className="md:col-span-1 h-96 md:h-full overflow-y-auto space-y-4 pr-2">
          {shops.map((shop) => (
            <div key={shop.id} onClick={() => setSelectedShop(shop)} className="cursor-pointer">
              <ShopCard shop={shop} />
            </div>
          ))}
        </div>
        <div className="md:col-span-2 h-[60vh] rounded-xl overflow-hidden relative shadow-lg">
          <iframe
            width="100%"
            height="100%"
            style={{ border: 0 }}
            loading="lazy"
            allowFullScreen
            src={getMapUrl()}
          ></iframe>
          {selectedShop && (
            <div className="absolute bottom-4 left-4 right-4 bg-background p-4 rounded-lg shadow-2xl max-w-sm">
                <h3 className="font-headline text-xl font-bold">{selectedShop.name}</h3>
                <p className="text-muted-foreground">{selectedShop.location}</p>
                <Button asChild className='mt-2'>
                    <Link href={`/shops/${selectedShop.id}`}>Visit Shop</Link>
                </Button>
            </div>
          )}
        </div>
      </div>
       <div className="mt-4 p-4 bg-secondary rounded-lg text-sm text-secondary-foreground">
          <p>
            <strong>Note:</strong> To make the map fully functional, you need to add your Google Maps API key.
            Create a <code>.env.local</code> file in the root of your project and add the following line:
          </p>
          <pre className="mt-2 p-2 bg-muted rounded-md font-code"><code>NEXT_PUBLIC_GOOGLE_MAPS_API_KEY=YOUR_API_KEY_HERE</code></pre>
          <p className="mt-2">
            You can get an API key from the {' '}
            <a href="https://console.cloud.google.com/google/maps-apis" target="_blank" rel="noopener noreferrer" className="text-primary underline">
              Google Cloud Console
            </a>
            .
          </p>
        </div>
    </section>
  );
}
