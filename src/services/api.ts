import axios, { AxiosInstance, AxiosError } from 'axios';
import * as SecureStore from 'expo-secure-store';
import {
  CreateAccountRequest,
  CreateAccountResponse,
  VerifyEmailRequest,
  VerifyEmailResponse,
  ResendVerificationCodeRequest,
  ResendVerificationCodeResponse,
  LoginRequest,
  LoginResponse,
  ApiError,
  User,
  WalletData,
  OrderHistory,
  ProductCategory
} from '../types/auth';

// Constants
const BASE_URL = 'https://forage-stores-backend.onrender.com';
const ACCESS_TOKEN_KEY = 'nibiago_access_token';
const USER_KEY = 'nibiago_user';

// Create axios instance
const apiClient: AxiosInstance = axios.create({
  baseURL: BASE_URL,
  timeout: 30000,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Request interceptor to add tokens
apiClient.interceptors.request.use(
  async (config) => {
    try {
      const accessToken = await SecureStore.getItemAsync(ACCESS_TOKEN_KEY);
      
      if (accessToken) {
        config.headers.Authorization = `Bearer ${accessToken}`;
      }
    } catch (error) {
      console.error('Error getting tokens from SecureStore:', error);
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// Response interceptor to handle errors
apiClient.interceptors.response.use(
  (response) => response,
  (error: AxiosError) => {
    const responseData = error.response?.data as any;
    const apiError: ApiError = {
      message: responseData?.message || error.message || 'An error occurred',
      statusCode: error.response?.status || 500,
      error: responseData?.error || 'Unknown Error'
    };
    return Promise.reject(apiError);
  }
);

// SecureStore utilities
export const SecureStorage = {
  async setAccessToken(token: string): Promise<void> {
    await SecureStore.setItemAsync(ACCESS_TOKEN_KEY, token);
  },

  async getAccessToken(): Promise<string | null> {
    return await SecureStore.getItemAsync(ACCESS_TOKEN_KEY);
  },

  async setUser(user: any): Promise<void> {
    await SecureStore.setItemAsync(USER_KEY, JSON.stringify(user));
  },

  async getUser(): Promise<any | null> {
    const userStr = await SecureStore.getItemAsync(USER_KEY);
    return userStr ? JSON.parse(userStr) : null;
  },

  async clearAccessToken(): Promise<void> {
    await SecureStore.deleteItemAsync(ACCESS_TOKEN_KEY);
  },

  async clearUser(): Promise<void> {
    await SecureStore.deleteItemAsync(USER_KEY);
  },

  async clearAll(): Promise<void> {
    await Promise.all([
      this.clearAccessToken(),
      this.clearUser(),
    ]);
  },
};

// Authentication API calls
export const AuthAPI = {
  async createAccount(data: CreateAccountRequest): Promise<CreateAccountResponse> {
    const response = await apiClient.post<CreateAccountResponse>('/auth/create-account', data);
    
    // Store user data (no token returned, user needs email verification)
    await SecureStorage.setUser(response.data.user);
    
    return response.data;
  },

  async verifyEmail(data: VerifyEmailRequest): Promise<VerifyEmailResponse> {
    const response = await apiClient.post<VerifyEmailResponse>('/auth/verify-email-code', data);
    
    // Store access token and updated user data after successful verification
    await SecureStorage.setAccessToken(response.data.accessToken);
    await SecureStorage.setUser(response.data.user);
    
    return response.data;
  },

  async resendVerificationCode(data: ResendVerificationCodeRequest): Promise<ResendVerificationCodeResponse> {
    const response = await apiClient.post<ResendVerificationCodeResponse>('/auth/resend-verification-code', data);
    return response.data;
  },

  async login(data: LoginRequest): Promise<LoginResponse> {
    const response = await apiClient.post<LoginResponse>('/auth/login', data);
    
    // Store access token and user data
    await SecureStorage.setAccessToken(response.data.accessToken);
    await SecureStorage.setUser(response.data.user);
    
    return response.data;
  },

  async logout(): Promise<void> {
    try {
      // You might want to call a logout endpoint here if your API has one
      // await apiClient.post('/auth/logout');
    } catch (error) {
      console.error('Logout API error:', error);
    } finally {
      // Always clear local storage
      await SecureStorage.clearAll();
    }
  },

  async refreshToken(): Promise<void> {
    // Implement token refresh logic if your API supports it
    // This would be called when the access token expires
    try {
      // const response = await apiClient.post('/auth/refresh-token');
      // await SecureStorage.setAccessToken(response.data.accessToken);
    } catch (error) {
      console.error('Token refresh failed:', error);
      // If refresh fails, logout the user
      await this.logout();
      throw error;
    }
  },

  async checkAuthStatus(): Promise<{ isAuthenticated: boolean; user: any | null }> {
    try {
      const accessToken = await SecureStorage.getAccessToken();
      const user = await SecureStorage.getUser();
      
      return {
        isAuthenticated: !!accessToken && !!user,
        user: user,
      };
    } catch (error) {
      console.error('Error checking auth status:', error);
      return {
        isAuthenticated: false,
        user: null,
      };
    }
  }
};

// Home Screen API calls
export const HomeAPI = {
  async getUserProfile(): Promise<User> {
    const response = await apiClient.get<User>('/auth/profile');
    await SecureStorage.setUser(response.data);
    return response.data;
  },

  async getWalletBalance(): Promise<WalletData> {
    const response = await apiClient.get('/wallets/my-wallet');
    const walletData = response.data;
    
    // Calculate food safe percentage
    const foodSafePercentage = walletData.foodSafe > 0 && walletData.totalBalance > 0 
      ? Math.round((walletData.foodSafe / walletData.totalBalance) * 100)
      : 0;
    
    return {
      ...walletData,
      foodSafePercentage
    };
  },

  async getOrderHistory(page: number = 1, limit: number = 10): Promise<OrderHistory> {
    const response = await apiClient.get('/orders', {
      params: {
        page,
        limit,
        sortBy: 'createdAt',
        sortOrder: 'desc'
      }
    });
    return response.data;
  },

  async getProductCategories(): Promise<ProductCategory[]> {
    const response = await apiClient.get('/products', {
      params: {
        page: 1,
        limit: 100
      }
    });
    
    // Extract unique categories from products
    const products = response.data.products || [];
    const categoryMap = new Map<string, ProductCategory>();
    
    products.forEach((product: any) => {
      if (product.category && !categoryMap.has(product.category)) {
        categoryMap.set(product.category, {
          id: product.category.toLowerCase().replace(/\s+/g, '-'),
          name: product.category,
          image: product.images?.[0] || '',
          productCount: 0
        });
      }
    });
    
    // Count products per category
    categoryMap.forEach((category) => {
      category.productCount = products.filter(
        (product: any) => product.category === category.name
      ).length;
    });
    
    return Array.from(categoryMap.values()).slice(0, 4); // Return first 4 categories for grid
  },

  async searchProducts(query: string, page: number = 1, limit: number = 20): Promise<any> {
    const response = await apiClient.get('/products', {
      params: {
        search: query,
        page,
        limit
      }
    });
    return response.data;
  }
};

// Utility functions
export const formatPhoneNumber = (phone: string): string => {
  // Format phone number for Nigerian format
  const cleaned = phone.replace(/\D/g, '');
  
  if (cleaned.length === 10) {
    // Add country code for 10-digit numbers
    return `+234${cleaned}`;
  } else if (cleaned.length === 11 && cleaned.startsWith('0')) {
    // Replace leading 0 with +234
    return `+234${cleaned.substring(1)}`;
  } else if (cleaned.length === 13 && cleaned.startsWith('234')) {
    // Add + to country code
    return `+${cleaned}`;
  } else if (cleaned.length === 14 && cleaned.startsWith('+234')) {
    return cleaned;
  }
  
  return phone; // Return original if format is unknown
};

export const validateEmail = (email: string): boolean => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
};

export const validatePassword = (password: string): {
  isValid: boolean;
  errors: string[];
} => {
  const errors: string[] = [];
  
  if (password.length < 8) {
    errors.push('Password must be at least 8 characters long');
  }
  
  if (!/(?=.*[a-z])/.test(password)) {
    errors.push('Password must contain at least one lowercase letter');
  }
  
  if (!/(?=.*[A-Z])/.test(password)) {
    errors.push('Password must contain at least one uppercase letter');
  }
  
  if (!/(?=.*\d)/.test(password)) {
    errors.push('Password must contain at least one number');
  }
  
  if (!/(?=.*[@$!%*?&])/.test(password)) {
    errors.push('Password must contain at least one special character');
  }
  
  return {
    isValid: errors.length === 0,
    errors,
  };
};

export default apiClient;
