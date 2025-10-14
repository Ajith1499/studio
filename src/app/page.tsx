import HeroSection from '@/components/home/hero-section';
import ProductCarousel from '@/components/home/product-carousel';
import RecommendationsSection from '@/components/home/recommendations-section';
import { getProducts, getTrendingShops } from '@/lib/data';
import { Separator } from '@/components/ui/separator';
import TrendingShops from '@/components/home/trending-shops';

export default function Home() {
  const topSellingProducts = getProducts().slice(0, 8);
  const trendingProducts = getProducts().slice(8, 16).reverse();
  const trendingShops = getTrendingShops(4);

  return (
    <div className="space-y-12">
      <HeroSection />
      
      <RecommendationsSection />

      <Separator />

      <ProductCarousel title="Top Selling" products={topSellingProducts} />
      
      <ProductCarousel title="Trending Now" products={trendingProducts} />

      <Separator />

      <TrendingShops shops={trendingShops} />

    </div>
  );
}
