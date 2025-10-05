'use client';

import Image from 'next/image';
import { PlaceHolderImages } from '@/lib/placeholder-images';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Search } from 'lucide-react';
import { useState } from 'react';
import { useRouter } from 'next/navigation';

export default function HeroSection() {
  const heroImage = PlaceHolderImages.find((img) => img.id === 'hero-1');
  const [searchQuery, setSearchQuery] = useState('');
  const router = useRouter();

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      router.push(`/shops/${searchQuery.trim()}`);
    }
  };

  return (
    <div className="relative h-[50vh] min-h-[400px] w-full overflow-hidden rounded-xl shadow-lg">
      {heroImage && (
        <Image
          src={heroImage.imageUrl}
          alt={heroImage.description}
          fill
          className="object-cover"
          data-ai-hint={heroImage.imageHint}
          priority
        />
      )}
      <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-black/10" />
      <div className="absolute inset-0 flex flex-col items-center justify-center p-8 text-center text-white">
        <h1 className="font-headline text-4xl font-bold md:text-6xl lg:text-7xl drop-shadow-md">
          Your Style, Right Around the Corner
        </h1>
        <p className="mt-4 max-w-2xl text-lg md:text-xl text-white/90">
          Discover unique clothing from the best boutiques and shops near you.
        </p>
        <form
          onSubmit={handleSearchSubmit}
          className="mt-8 flex w-full max-w-2xl items-center space-x-2 rounded-full bg-white/20 p-2 backdrop-blur-sm"
        >
          <Input
            type="search"
            placeholder="Enter a Shop ID (e.g., shop-1)..."
            className="flex-grow rounded-full border-0 bg-transparent text-white placeholder:text-white/80 focus-visible:ring-0 focus-visible:ring-offset-0"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
          <Button
            type="submit"
            size="icon"
            className="rounded-full bg-primary text-primary-foreground hover:bg-primary/90"
          >
            <Search className="h-5 w-5" />
          </Button>
        </form>
        <div className="mt-4 flex flex-wrap justify-center gap-2 text-sm">
          <span className="font-semibold">Recent:</span>
          <Button variant="link" className="p-0 h-auto text-white/80 hover:text-white">Dresses</Button>
          <Button variant="link" className="p-0 h-auto text-white/80 hover:text-white">Vogue Venture</Button>
          <Button variant="link" className="p-0 h-auto text-white/80 hover:text-white">Downtown</Button>
        </div>
      </div>
    </div>
  );
}
