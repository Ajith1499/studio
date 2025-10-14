'use client';

import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { addProduct, type Product } from '@/lib/data';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
  DialogTrigger,
} from '@/components/ui/dialog';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { useToast } from '@/hooks/use-toast';
import React from 'react';
import { Upload } from 'lucide-react';


const productSchema = z.object({
  name: z.string().min(1, 'Product name is required'),
  price: z.coerce.number().positive('Price must be a positive number'),
  category: z.enum(['Men', 'Women', 'Kids']),
  productType: z.enum(['Shirt', 'Pants', 'Jacket', 'Dress', 'Shoes', 'Accessory']),
  image: z.any().optional(), // In a real app, this would have more robust validation
});

type ProductFormValues = z.infer<typeof productSchema>;

interface ProductFormProps {
  shopId: string;
  onProductAdded: (newProduct: Product) => void;
  open: boolean;
  onOpenChange: (open: boolean) => void;
  children: React.ReactNode;
}

export default function ProductForm({ shopId, onProductAdded, open, onOpenChange, children }: ProductFormProps) {
  const { toast } = useToast();
  const form = useForm<ProductFormValues>({
    resolver: zodResolver(productSchema),
    defaultValues: {
      name: '',
      price: 0,
      category: 'Women',
      productType: 'Shirt',
    },
  });

  const onSubmit = (values: ProductFormValues) => {
    try {
      // In a real app, you'd handle file upload here.
      // For now, we'll just log the image info if present.
      if (values.image && values.image.length > 0) {
        console.log('Image to upload:', values.image[0].name);
      }

      const newProduct = addProduct({
        name: values.name,
        price: values.price,
        category: values.category,
        productType: values.productType,
        shopId: shopId,
        tags: [],
      });
      toast({
        title: 'Product Added!',
        description: `${newProduct.name} has been successfully added to your shop.`,
      });
      onProductAdded(newProduct);
      form.reset();
    } catch (error) {
      toast({
        variant: 'destructive',
        title: 'Uh oh! Something went wrong.',
        description: 'There was a problem adding your product.',
      });
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogTrigger asChild>
        {children}
      </DialogTrigger>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Add New Product</DialogTitle>
          <DialogDescription>
            Fill in the details below to add a new product to your shop.
          </DialogDescription>
        </DialogHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4 py-4">
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Product Name</FormLabel>
                  <FormControl>
                    <Input placeholder="e.g., Summer Dress" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="price"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Price</FormLabel>
                  <FormControl>
                    <Input type="number" placeholder="e.g., 59.99" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <div className="grid grid-cols-2 gap-4">
              <FormField
                control={form.control}
                name="category"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Audience</FormLabel>
                    <Select onValueChange={field.onChange} defaultValue={field.value}>
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Select a category" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectItem value="Women">Women</SelectItem>
                        <SelectItem value="Men">Men</SelectItem>
                        <SelectItem value="Kids">Kids</SelectItem>
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="productType"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Product Type</FormLabel>
                    <Select onValueChange={field.onChange} defaultValue={field.value}>
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Select a type" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectItem value="Shirt">Shirt</SelectItem>
                        <SelectItem value="Pants">Pants</SelectItem>
                        <SelectItem value="Jacket">Jacket</SelectItem>
                        <SelectItem value="Dress">Dress</SelectItem>
                        <SelectItem value="Shoes">Shoes</SelectItem>
                        <SelectItem value="Accessory">Accessory</SelectItem>
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
             <FormField
                control={form.control}
                name="image"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Product Image</FormLabel>
                    <FormControl>
                        <div className="relative">
                            <Input
                                type="file"
                                className="w-full pr-16"
                                accept="image/*"
                                onChange={(e) => field.onChange(e.target.files)}
                            />
                            <Button type="button" size="sm" className="absolute right-1 top-1/2 -translate-y-1/2" disabled>
                                <Upload className="mr-2 h-4 w-4" />
                                Upload
                            </Button>
                        </div>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            <DialogFooter>
              <Button type="submit">Add Product</Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}
