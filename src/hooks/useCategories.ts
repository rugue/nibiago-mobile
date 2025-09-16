import { useState, useEffect } from 'react';
import { ProductCategory } from '../types/auth';
import { HomeAPI } from '../services/api';

interface UseCategoriesReturn {
  categories: ProductCategory[];
  loading: boolean;
  error: string | null;
  refetch: () => Promise<void>;
}

// Default categories to show if API doesn't return enough
const DEFAULT_CATEGORIES: ProductCategory[] = [
  {
    id: 'food-boxes',
    name: 'Food Boxes',
    image: '',
    productCount: 0
  },
  {
    id: 'grains',
    name: 'Grains',
    image: '',
    productCount: 0
  },
  {
    id: 'beverages',
    name: 'Beverages',
    image: '',
    productCount: 0
  },
  {
    id: 'food-boxes-2',
    name: 'Food Boxes',
    image: '',
    productCount: 0
  }
];

export const useCategories = (): UseCategoriesReturn => {
  const [categories, setCategories] = useState<ProductCategory[]>(DEFAULT_CATEGORIES);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchCategories = async () => {
    try {
      setLoading(true);
      setError(null);
      const categoryData = await HomeAPI.getProductCategories();
      
      if (categoryData.length > 0) {
        // Ensure we have exactly 4 categories for the grid
        const finalCategories = [...categoryData];
        while (finalCategories.length < 4) {
          finalCategories.push(DEFAULT_CATEGORIES[finalCategories.length % DEFAULT_CATEGORIES.length]);
        }
        setCategories(finalCategories.slice(0, 4));
      } else {
        // Fallback to default categories if none found
        setCategories(DEFAULT_CATEGORIES);
      }
    } catch (err: any) {
      setError(err.message || 'Failed to fetch categories');
      console.error('Categories fetch error:', err);
      // Keep default categories on error
      setCategories(DEFAULT_CATEGORIES);
    } finally {
      setLoading(false);
    }
  };

  const refetch = async () => {
    await fetchCategories();
  };

  useEffect(() => {
    fetchCategories();
  }, []);

  return {
    categories,
    loading,
    error,
    refetch,
  };
};
