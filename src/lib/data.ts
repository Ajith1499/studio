import { PlaceHolderImages, type ImagePlaceholder } from './placeholder-images';

const getImage = (id: string): ImagePlaceholder => {
  const image = PlaceHolderImages.find(img => img.id === id);
  if (!image) {
    // Return a default or throw an error
    const defaultImage = PlaceHolderImages.find(img => img.id === 'default');
    if (defaultImage) return defaultImage;
    return {
      id: 'default',
      description: 'Default image',
      imageUrl: 'https://picsum.photos/seed/default/600/800',
      imageHint: 'placeholder',
    };
  }
  return image;
};

export type Product = {
  id: string;
  name: string;
  price: number;
  shopId: string;
  category: 'Men' | 'Women' | 'Kids';
  tags: ('trending' | 'new-offer')[];
  rating: number;
  ratingCount: number;
  purchaseCount: number;
} & ImagePlaceholder;

export type Shop = {
  id: string;
  name: string;
  location: string;
  phone: string;
  latitude: number;
  longitude: number;
} & ImagePlaceholder;

export type WalletTransaction = {
    id: string;
    date: string;
    description: string;
    amount: number;
    type: 'credit' | 'debit';
};

const products: Product[] = [
  { id: 'prod-1', name: 'Modern Denim Jacket', price: 89.99, shopId: 'shop-1', category: 'Women', tags: ['trending'], rating: 4.8, ratingCount: 152, purchaseCount: 521, ...getImage('product-1') },
  { id: 'prod-2', name: 'Floral Summer Dress', price: 64.00, shopId: 'shop-1', category: 'Women', tags: ['new-offer'], rating: 4.6, ratingCount: 89, purchaseCount: 312, ...getImage('product-2') },
  { id: 'prod-3', name: 'Classic White Sneakers', price: 120.50, shopId: 'shop-2', category: 'Men', tags: [], rating: 4.9, ratingCount: 230, purchaseCount: 850, ...getImage('product-3') },
  { id: 'prod-4', name: 'Tailored Gray Suit', price: 399.99, shopId: 'shop-2', category: 'Men', tags: ['trending'], rating: 4.7, ratingCount: 45, purchaseCount: 120, ...getImage('product-4') },
  { id: 'prod-5', name: 'Knitted Wool Sweater', price: 75.00, shopId: 'shop-3', category: 'Women', tags: [], rating: 4.5, ratingCount: 110, purchaseCount: 430, ...getImage('product-5') },
  { id: 'prod-6', name: 'Striped Cotton T-Shirt', price: 25.00, shopId: 'shop-1', category: 'Men', tags: ['new-offer'], rating: 4.4, ratingCount: 180, purchaseCount: 950, ...getImage('product-6') },
  { id: 'prod-7', name: 'Black Skinny Jeans', price: 95.00, shopId: 'shop-4', category: 'Women', tags: ['trending'], rating: 4.7, ratingCount: 210, purchaseCount: 780, ...getImage('product-7') },
  { id: 'prod-8', name: 'Red Silk Evening Gown', price: 250.00, shopId: 'shop-2', category: 'Women', tags: [], rating: 4.8, ratingCount: 65, purchaseCount: 150, ...getImage('product-8') },
  { id: 'prod-9', name: 'Women\'s Trench Coat', price: 180.00, shopId: 'shop-1', category: 'Women', tags: ['trending'], rating: 4.6, ratingCount: 95, purchaseCount: 320, ...getImage('product-9') },
  { id: 'prod-10', name: 'Men\'s Casual Chinos', price: 70.00, shopId: 'shop-3', category: 'Men', tags: ['new-offer'], rating: 4.5, ratingCount: 130, purchaseCount: 600, ...getImage('product-10') },
  { id: 'prod-11', name: 'Leather Handbag', price: 150.00, shopId: 'shop-4', category: 'Women', tags: [], rating: 4.9, ratingCount: 190, purchaseCount: 450, ...getImage('product-11') },
  { id: 'prod-12', name: 'Sports Leggings', price: 55.00, shopId: 'shop-1', category: 'Women', tags: ['trending'], rating: 4.3, ratingCount: 140, purchaseCount: 880, ...getImage('product-12') },
  { id: 'prod-13', name: 'Kid\'s Colorful Raincoat', price: 45.00, shopId: 'shop-5', category: 'Kids', tags: [], rating: 4.7, ratingCount: 50, purchaseCount: 250, ...getImage('product-13') },
  { id: 'prod-14', name: 'Baby Onesie', price: 22.00, shopId: 'shop-5', category: 'Kids', tags: ['new-offer'], rating: 4.9, ratingCount: 80, purchaseCount: 400, ...getImage('product-14') },
  { id: 'prod-15', name: 'Men\'s Leather Boots', price: 210.00, shopId: 'shop-2', category: 'Men', tags: ['trending'], rating: 4.8, ratingCount: 175, purchaseCount: 550, ...getImage('product-15') },
  { id: 'prod-16', name: 'Women\'s High Heels', price: 130.00, shopId: 'shop-3', category: 'Women', tags: [], rating: 4.6, ratingCount: 115, purchaseCount: 350, ...getImage('product-16') },
];

const shops: Shop[] = [
  { id: 'shop-1', name: 'Vogue Venture', location: 'Downtown, Springfield', phone: '+1-202-555-0182', latitude: 39.7817, longitude: -89.6501, ...getImage('shop-1') },
  { id: 'shop-2', name: 'Gentleman\'s Quarters', location: 'Uptown, Metropolis', phone: '+1-202-555-0134', latitude: 39.8028, longitude: -89.6436, ...getImage('shop-2') },
  { id: 'shop-3', name: 'Chic Boutique', location: 'SoHo, New York', phone: '+1-202-555-0177', latitude: 40.7233, longitude: -74.0030, ...getImage('shop-3') },
  { id: 'shop-4', name: 'Retro Threads', location: 'Arts District, Los Angeles', phone: '+1-202-555-0191', latitude: 34.0435, longitude: -118.2325, ...getImage('shop-4') },
  { id: 'shop-5', name: 'Tiny Tots Apparel', location: 'Suburb, Greenville', phone: '+1-202-555-0113', latitude: 34.8526, longitude: -82.3940, ...getImage('shop-5') },
];

const walletTransactions: WalletTransaction[] = [
    { id: 'txn-1', date: '2024-07-15', description: 'Cashback from Order #12345', amount: 15.00, type: 'credit' },
    { id: 'txn-2', date: '2024-07-14', description: 'Return for "Red Silk Gown"', amount: 250.00, type: 'credit' },
    { id: 'txn-3', date: '2024-07-12', description: 'Purchase of "Denim Jacket"', amount: 89.99, type: 'debit' },
    { id: 'txn-4', date: '2024-07-10', description: 'Welcome Bonus', amount: 10.00, type: 'credit' },
];

const wishlistItems: Product[] = [
    products[7], // Red Silk Evening Gown
    products[10], // Leather Handbag
    products[4], // Knitted Wool Sweater
    products[14], // Men's Leather Boots
];


export const getProducts = () => products;
export const getProductById = (id: string) => products.find(p => p.id === id);
export const getProductsByShop = (shopId: string) => products.filter(p => p.shopId === shopId);

export const addProduct = (product: Omit<Product, 'id' | keyof ImagePlaceholder | 'rating' | 'ratingCount' | 'purchaseCount'>) => {
  const newId = `prod-${products.length + 1}`;
  const newProduct: Product = {
    id: newId,
    ...product,
    rating: Math.floor(Math.random() * 2) + 3, // 3 to 4
    ratingCount: Math.floor(Math.random() * 50),
    purchaseCount: Math.floor(Math.random() * 100),
    ...getImage('default'), // Use a default image for now
  };
  products.unshift(newProduct);
  return newProduct;
};


export const getShops = () => shops;
export const getShopById = (id: string) => shops.find(s => s.id === id);

export const getWalletTransactions = () => walletTransactions;
export const getWalletBalance = () => walletTransactions.reduce((acc, t) => acc + (t.type === 'credit' ? t.amount : -t.amount), 0);

export const getWishlistItems = () => wishlistItems;

export const addToWishlist = (productId: string) => {
    const product = getProductById(productId);
    if (product && !wishlistItems.find(item => item.id === productId)) {
      wishlistItems.unshift(product);
    }
  };
