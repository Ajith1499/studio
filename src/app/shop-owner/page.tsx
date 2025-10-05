'use client';
import { useState, useEffect } from 'react';
import { getProductsByShop, getShopById, type Product } from '@/lib/data';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { PlusCircle } from 'lucide-react';
import Image from 'next/image';
import ProductForm from '@/components/shop-owner/product-form';

// For now, we'll hardcode the shop owner's shop ID
const SHOP_ID = 'shop-1';

export default function ShopOwnerDashboard() {
  const [shop, setShop] = useState(getShopById(SHOP_ID));
  const [products, setProducts] = useState<Product[]>([]);
  const [isFormOpen, setIsFormOpen] = useState(false);

  useEffect(() => {
    setProducts(getProductsByShop(SHOP_ID));
  }, []);

  const handleProductAdded = (newProduct: Product) => {
    setProducts(prev => [newProduct, ...prev]);
    setIsFormOpen(false);
  };
  
  if (!shop) {
    return <div>Shop not found.</div>;
  }

  return (
    <div className="space-y-8">
      <header className="flex flex-wrap items-center justify-between gap-4">
        <div>
          <h1 className="font-headline text-4xl font-bold">{shop.name}</h1>
          <p className="text-muted-foreground">Your Shop Dashboard</p>
        </div>
        <ProductForm 
          shopId={SHOP_ID} 
          onProductAdded={handleProductAdded}
          open={isFormOpen}
          onOpenChange={setIsFormOpen}
        >
          <Button size="lg">
            <PlusCircle className="mr-2" />
            Add New Product
          </Button>
        </ProductForm>
      </header>

      <Card>
        <CardHeader>
          <CardTitle>Your Products</CardTitle>
          <CardDescription>
            A list of all products in your shop. You can add, edit, or delete them.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="divide-y divide-border">
            {products.map((product) => (
              <div key={product.id} className="flex items-center gap-4 py-4">
                <Image
                  src={product.imageUrl}
                  alt={product.description}
                  width={80}
                  height={100}
                  className="rounded-md object-cover aspect-[4/5]"
                />
                <div className="flex-grow">
                  <h3 className="font-semibold">{product.name}</h3>
                  <p className="text-sm text-muted-foreground">${product.price.toFixed(2)}</p>
                </div>
                <Button variant="outline" size="sm">Edit</Button>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
