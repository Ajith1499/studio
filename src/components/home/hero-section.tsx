'use client';

import Image from 'next/image';
import { PlaceHolderImages } from '@/lib/placeholder-images';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Search } from 'lucide-react';
import { useState, useEffect, useRef } from 'react';
import { useRouter } from 'next/navigation';
import { getShops, type Shop } from '@/lib/data';

export default function HeroSection() {
  const heroImage = PlaceHolderImages.find((img) => img.id === 'hero-1');
  const [searchQuery, setSearchQuery] = useState('');
  const [suggestions, setSuggestions] = useState<Shop[]>([]);
  const [isInputFocused, setIsInputFocused] = useState(false);
  const router = useRouter();
  const searchContainerRef = useRef<HTMLDivElement>(null);

  const allShops = getShops();

  useEffect(() => {
    if (searchQuery.trim()) {
      const filteredShops = allShops
        .filter((shop) =>
          shop.name.toLowerCase().includes(searchQuery.toLowerCase())
        )
        .slice(0, 5); // Limit to 5 suggestions
      setSuggestions(filteredShops);
    } else {
      setSuggestions([]);
    }
  }, [searchQuery, allShops]);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (searchContainerRef.current && !searchContainerRef.current.contains(event.target as Node)) {
        setIsInputFocused(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const query = searchQuery.trim().toLowerCase();
    if (query) {
      const shop = allShops.find((s) => s.name.toLowerCase() === query);
      if (shop) {
        router.push(`/shops/${shop.id}`);
      } else {
        alert(`Shop "${searchQuery}" not found.`);
      }
      setIsInputFocused(false);
    }
  };

  const handleSuggestionClick = (shop: Shop) => {
    setSearchQuery(shop.name);
    setSuggestions([]);
    setIsInputFocused(false);
    router.push(`/shops/${shop.id}`);
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
        <div ref={searchContainerRef} className="relative mt-8 w-full max-w-2xl">
          <form
            onSubmit={handleSearchSubmit}
            className="flex w-full items-center space-x-2 rounded-full bg-white/20 p-2 backdrop-blur-sm"
          >
            <Input
              type="search"
              placeholder="Enter a shop name (e.g., Vogue Venture)..."
              className="flex-grow rounded-full border-0 bg-transparent text-white placeholder:text-white/80 focus-visible:ring-0 focus-visible:ring-offset-0"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              onFocus={() => setIsInputFocused(true)}
            />
            <Button
              type="submit"
              size="icon"
              className="rounded-full bg-primary text-primary-foreground hover:bg-primary/90"
            >
              <Search className="h-5 w-5" />
            </Button>
          </form>
          {isInputFocused && suggestions.length > 0 && (
            <div className="absolute mt-2 w-full rounded-md bg-background border border-border shadow-lg z-10 text-left">
              <ul className="py-1">
                {suggestions.map((shop) => (
                  <li
                    key={shop.id}
                    className="px-4 py-2 cursor-pointer text-foreground hover:bg-accent"
                    onClick={() => handleSuggestionClick(shop)}
                  >
                    {shop.name}
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>
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