'use server';

import {
  getPersonalizedRecommendations,
  type PersonalizedRecommendationsInput,
} from '@/ai/flows/personalized-product-recommendations';

export async function generateRecommendationsAction(
  input: PersonalizedRecommendationsInput
) {
  try {
    const result = await getPersonalizedRecommendations(input);
    if (!result || !result.recommendations) {
        return { success: false, error: 'Failed to get a valid response from AI.' };
    }
    return { success: true, data: result.recommendations };
  } catch (error) {
    console.error('Error in generateRecommendationsAction:', error);
    return { success: false, error: 'Failed to generate recommendations.' };
  }
}
