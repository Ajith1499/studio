'use server';

/**
 * @fileOverview A personalized product recommendation AI agent.
 *
 * - getPersonalizedRecommendations - A function that generates product recommendations based on user demographics and browsing history.
 * - PersonalizedRecommendationsInput - The input type for the getPersonalizedRecommendations function.
 * - PersonalizedRecommendationsOutput - The return type for the getPersonalizedRecommendations function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const PersonalizedRecommendationsInputSchema = z.object({
  userDemographics: z.object({
    gender: z.string().describe('The gender of the user.'),
    location: z.string().describe('The location of the user.'),
    ageRange: z.string().describe('The age range of the user.'),
  }).describe('Demographic information about the user.'),
  browsingHistory: z.array(z.string()).describe('A list of product names or categories the user has previously viewed.'),
  numberOfRecommendations: z.number().default(5).describe('The number of product recommendations to return.'),
});

export type PersonalizedRecommendationsInput = z.infer<typeof PersonalizedRecommendationsInputSchema>;

const PersonalizedRecommendationsOutputSchema = z.object({
  recommendations: z.array(z.string()).describe('A list of product recommendations personalized for the user.'),
});

export type PersonalizedRecommendationsOutput = z.infer<typeof PersonalizedRecommendationsOutputSchema>;


export async function getPersonalizedRecommendations(input: PersonalizedRecommendationsInput): Promise<PersonalizedRecommendationsOutput> {
  return personalizedRecommendationsFlow(input);
}

const prompt = ai.definePrompt({
  name: 'personalizedRecommendationsPrompt',
  input: {schema: PersonalizedRecommendationsInputSchema},
  output: {schema: PersonalizedRecommendationsOutputSchema},
  prompt: `You are a personal shopping assistant that recommends products to users based on their demographics and browsing history.

  User Demographics:
  Gender: {{{userDemographics.gender}}}
  Location: {{{userDemographics.location}}}
  Age Range: {{{userDemographics.ageRange}}}

  Browsing History:
  {{#if browsingHistory}}
  {{#each browsingHistory}}- {{{this}}}\n{{/each}}
  {{else}}
  No browsing history available.
  {{/if}}

  Based on this information, recommend {{{numberOfRecommendations}}} products that the user might be interested in.  Respond as a JSON array of strings (product names).
  Ensure you only return product names, without any additional formatting.
  Do not include introductory or concluding statements.
  `,
});

const personalizedRecommendationsFlow = ai.defineFlow(
  {
    name: 'personalizedRecommendationsFlow',
    inputSchema: PersonalizedRecommendationsInputSchema,
    outputSchema: PersonalizedRecommendationsOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return {
      recommendations: output!.recommendations,
    };
  }
);
