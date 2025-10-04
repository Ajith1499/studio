'use client';

import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { generateRecommendationsAction } from '@/app/actions';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Loader2, Wand2 } from 'lucide-react';

const recommendationSchema = z.object({
  gender: z.string().min(1, 'Please select a gender.'),
  location: z.string().min(1, 'Please enter a location.'),
  ageRange: z.string().min(1, 'Please select an age range.'),
  browsingHistory: z.string().optional()
});

type RecommendationFormValues = z.infer<typeof recommendationSchema>;

export default function RecommendationsSection() {
  const [isLoading, setIsLoading] = useState(false);
  const [recommendations, setRecommendations] = useState<string[]>([]);
  const [error, setError] = useState<string | null>(null);

  const form = useForm<RecommendationFormValues>({
    resolver: zodResolver(recommendationSchema),
    defaultValues: {
      gender: '',
      location: '',
      ageRange: '',
      browsingHistory: '',
    },
  });

  async function onSubmit(values: RecommendationFormValues) {
    setIsLoading(true);
    setError(null);
    setRecommendations([]);

    const input = {
      userDemographics: {
        gender: values.gender,
        location: values.location,
        ageRange: values.ageRange,
      },
      browsingHistory: values.browsingHistory
        ? values.browsingHistory.split(',').map((item) => item.trim())
        : [],
      numberOfRecommendations: 5,
    };

    const result = await generateRecommendationsAction(input);

    if (result.success && result.data) {
      setRecommendations(result.data);
    } else {
      setError(result.error || 'An unknown error occurred.');
    }
    setIsLoading(false);
  }

  return (
    <section>
      <h2 className="font-headline text-3xl font-bold tracking-tight">
        For You
      </h2>
      <p className="text-muted-foreground mt-2">
        Get personalized recommendations powered by AI.
      </p>

      <div className="mt-6 grid grid-cols-1 gap-8 md:grid-cols-2">
        <Card>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)}>
              <CardHeader>
                <CardTitle className="font-headline flex items-center gap-2">
                  <Wand2 className="h-6 w-6 text-primary" />
                  <span>Tell Us About Yourself</span>
                </CardTitle>
                <CardDescription>
                  The more we know, the better your recommendations will be.
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                  <FormField
                    control={form.control}
                    name="gender"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Gender</FormLabel>
                        <Select onValueChange={field.onChange} defaultValue={field.value}>
                          <FormControl>
                            <SelectTrigger>
                              <SelectValue placeholder="Select gender" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            <SelectItem value="Male">Male</SelectItem>
                            <SelectItem value="Female">Female</SelectItem>
                            <SelectItem value="Non-binary">Non-binary</SelectItem>
                          </SelectContent>
                        </Select>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                   <FormField
                    control={form.control}
                    name="ageRange"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Age Range</FormLabel>
                        <Select onValueChange={field.onChange} defaultValue={field.value}>
                          <FormControl>
                            <SelectTrigger>
                              <SelectValue placeholder="Select age" />
                            </Trigger>
                          </FormControl>
                          <SelectContent>
                            <SelectItem value="18-24">18-24</SelectItem>
                            <SelectItem value="25-34">25-34</SelectItem>
                            <SelectItem value="35-44">35-44</SelectItem>
                            <SelectItem value="45+">45+</SelectItem>
                          </SelectContent>
                        </Select>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
                <FormField
                  control={form.control}
                  name="location"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Location (City)</FormLabel>
                      <FormControl>
                        <Input placeholder="e.g., New York" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="browsingHistory"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Browsing History (Optional)</FormLabel>
                      <FormControl>
                        <Input placeholder="e.g., summer dresses, sneakers" {...field} />
                      </FormControl>
                       <FormDescription>
                        Separate items with a comma.
                      </FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </CardContent>
              <CardFooter>
                <Button type="submit" disabled={isLoading} className="w-full">
                  {isLoading ? (
                    <Loader2 className="animate-spin" />
                  ) : (
                    <>
                      <Wand2 className="mr-2 h-4 w-4" />
                      Get Recommendations
                    </>
                  )}
                </Button>
              </CardFooter>
            </form>
          </Form>
        </Card>

        <Card className="flex flex-col">
          <CardHeader>
             <CardTitle className="font-headline">Your AI Picks</CardTitle>
             <CardDescription>Products we think you'll love.</CardDescription>
          </CardHeader>
          <CardContent className="flex-grow">
            {isLoading && (
              <div className="flex h-full items-center justify-center">
                 <Loader2 className="h-8 w-8 animate-spin text-primary" />
              </div>
            )}
            {!isLoading && recommendations.length > 0 && (
                <ul className="space-y-3">
                    {recommendations.map((rec, index) => (
                        <li key={index} className="flex items-center gap-3 rounded-lg bg-secondary p-3">
                           <div className="flex h-8 w-8 items-center justify-center rounded-full bg-primary/20 text-primary font-bold">{rec.charAt(0)}</div>
                           <span className="font-medium">{rec}</span>
                        </li>
                    ))}
                </ul>
            )}
            {!isLoading && recommendations.length === 0 && !error && (
                <div className="flex h-full flex-col items-center justify-center text-center text-muted-foreground">
                    <Wand2 className="h-12 w-12 mb-4"/>
                    <p>Your recommendations will appear here.</p>
                </div>
            )}
            {error && <p className="text-destructive">{error}</p>}
          </CardContent>
        </Card>
      </div>
    </section>
  );
}
