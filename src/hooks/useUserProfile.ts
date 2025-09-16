import { useState, useEffect } from 'react';
import { User } from '../types/auth';
import { HomeAPI, SecureStorage } from '../services/api';

interface UseUserProfileReturn {
  user: User | null;
  loading: boolean;
  error: string | null;
  refetch: () => Promise<void>;
}

export const useUserProfile = (): UseUserProfileReturn => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchUser = async () => {
    try {
      setLoading(true);
      setError(null);
      
      // First try to get user from local storage
      const localUser = await SecureStorage.getUser();
      if (localUser) {
        setUser(localUser);
      }
      
      // Then fetch fresh data from API
      const userData = await HomeAPI.getUserProfile();
      setUser(userData);
    } catch (err: any) {
      setError(err.message || 'Failed to fetch user profile');
      console.error('User profile fetch error:', err);
      
      // Fallback to local user if API fails
      try {
        const localUser = await SecureStorage.getUser();
        if (localUser) {
          setUser(localUser);
        }
      } catch (localErr) {
        console.error('Failed to get local user:', localErr);
      }
    } finally {
      setLoading(false);
    }
  };

  const refetch = async () => {
    await fetchUser();
  };

  useEffect(() => {
    fetchUser();
  }, []);

  return {
    user,
    loading,
    error,
    refetch,
  };
};
