import React, { createContext, useContext, useEffect, useState } from 'react';
import { AuthAPI } from '../services/api';
import { AuthState, AuthContextType, CreateAccountRequest } from '../types/auth';

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

interface AuthProviderProps {
  children: React.ReactNode;
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [authState, setAuthState] = useState<AuthState>({
    user: null,
    accessToken: null,
    tempToken: null,
    isAuthenticated: false,
    isLoading: true,
  });

  useEffect(() => {
    checkAuthStatus();
  }, []);

  const checkAuthStatus = async () => {
    try {
      const { isAuthenticated, user } = await AuthAPI.checkAuthStatus();
      setAuthState(prev => ({
        ...prev,
        user,
        isAuthenticated,
        isLoading: false,
        accessToken: isAuthenticated ? 'token' : null, // Will be updated by API
      }));
    } catch (error) {
      console.error('Auth check failed:', error);
      setAuthState(prev => ({
        ...prev,
        user: null,
        accessToken: null,
        tempToken: null,
        isAuthenticated: false,
        isLoading: false,
      }));
    }
  };

  const login = async (email: string, password: string) => {
    try {
      const response = await AuthAPI.login({ email, password });
      setAuthState(prev => ({
        ...prev,
        user: response.user,
        accessToken: response.accessToken,
        tempToken: null,
        isAuthenticated: true,
      }));
    } catch (error) {
      throw error;
    }
  };

  const createAccount = async (data: CreateAccountRequest) => {
    try {
      const response = await AuthAPI.createAccount(data);
      setAuthState(prev => ({
        ...prev,
        user: response.user,
        tempToken: response.tempToken,
        accessToken: null,
        isAuthenticated: false,
      }));
    } catch (error) {
      throw error;
    }
  };

  const selectAccountType = async (accountType: 'family' | 'business') => {
    try {
      const response = await AuthAPI.selectAccountType({ accountType });
      setAuthState(prev => ({
        ...prev,
        user: response.user,
      }));
    } catch (error) {
      throw error;
    }
  };

  const verifyEmail = async (email: string, code: string) => {
    try {
      const response = await AuthAPI.verifyEmail({ email, code });
      setAuthState(prev => ({
        ...prev,
        user: response.user,
        accessToken: response.accessToken,
        tempToken: null,
        isAuthenticated: true,
      }));
    } catch (error) {
      throw error;
    }
  };

  const logout = async () => {
    try {
      await AuthAPI.logout();
    } catch (error) {
      console.error('Logout error:', error);
    } finally {
      setAuthState({
        user: null,
        accessToken: null,
        tempToken: null,
        isAuthenticated: false,
        isLoading: false,
      });
    }
  };

  const clearTempToken = () => {
    setAuthState(prev => ({
      ...prev,
      tempToken: null,
    }));
  };

  const value: AuthContextType = {
    authState,
    login,
    createAccount,
    selectAccountType,
    verifyEmail,
    logout,
    clearTempToken,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export default AuthContext;
