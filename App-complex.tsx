import React, { useState, useEffect } from 'react';
import { StatusBar } from 'expo-status-bar';
import * as SplashScreen from 'expo-splash-screen';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { View, Text, ActivityIndicator, StyleSheet } from 'react-native';

import { AuthProvider, useAuth } from './src/context/AuthContext';
import AppNavigation from './src/navigation/AppNavigation';
import TestScreen from './src/screens/TestScreen';
import Colors from './src/constants/Colors';

const ONBOARDING_KEY = '@nibiago_onboarding_completed';

// Temporary bypass for testing
const BYPASS_MODE = true;

// Keep the splash screen visible while we fetch resources
SplashScreen.preventAutoHideAsync();

const AppContent: React.FC = () => {
  const [showSplash, setShowSplash] = useState(true);
  const [showOnboarding, setShowOnboarding] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [appReady, setAppReady] = useState(false);
  
  // Only use auth context in non-bypass mode
  let authState = { isAuthenticated: false, isLoading: false };
  if (!BYPASS_MODE) {
    const auth = useAuth();
    authState = auth.authState;
  }

  useEffect(() => {
    console.log('App starting...');
    if (BYPASS_MODE) {
      // Bypass all complex loading logic
      console.log('Bypass mode enabled');
      const timer = setTimeout(() => {
        console.log('Setting app as ready...');
        setIsLoading(false);
        setShowSplash(false);
        setAppReady(true);
      }, 500); // Very short delay
      return () => clearTimeout(timer);
    } else {
      checkOnboardingStatus();
    }
  }, []);

  useEffect(() => {
    // Hide splash screen when app is ready
    if (appReady) {
      console.log('App is ready, hiding splash screen');
      SplashScreen.hideAsync().catch(console.warn);
    }
  }, [appReady]);

  const checkOnboardingStatus = async () => {
    try {
      console.log('Checking onboarding status...');
      const hasCompletedOnboarding = await AsyncStorage.getItem(ONBOARDING_KEY);
      console.log('Onboarding status:', hasCompletedOnboarding);
      
      setShowOnboarding(!hasCompletedOnboarding);
      setIsLoading(false);
      setAppReady(true);
      console.log('Onboarding check complete');
    } catch (error) {
      console.error('Error checking onboarding status:', error);
      setError('Failed to load app data');
      setShowOnboarding(true);
      setIsLoading(false);
      setAppReady(true);
    }
  };

  const handleSplashFinish = () => {
    console.log('Splash screen finished');
    setShowSplash(false);
  };

  const handleOnboardingComplete = async () => {
    try {
      await AsyncStorage.setItem(ONBOARDING_KEY, 'true');
      setShowOnboarding(false);
    } catch (error) {
      console.error('Error saving onboarding status:', error);
      setShowOnboarding(false);
    }
  };

  // Show test screen in bypass mode
  if (BYPASS_MODE && appReady && !isLoading) {
    console.log('Showing test screen');
    return <TestScreen />;
  }

  // Don't render anything until app is ready
  if (!appReady) {
    console.log('App not ready yet, returning null');
    return null;
  }

  // Show loading screen if still loading
  if (isLoading || authState.isLoading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color={Colors.accent} />
        <Text style={styles.loadingText}>Loading...</Text>
      </View>
    );
  }

  // Show error screen if there's an error
  if (error) {
    return (
      <View style={styles.errorContainer}>
        <Text style={styles.errorText}>Error: {error}</Text>
        <Text style={styles.retryText}>Please restart the app</Text>
      </View>
    );
  }

  return (
    <AppNavigation
      showSplash={showSplash}
      showOnboarding={showOnboarding && !showSplash}
      isAuthenticated={authState.isAuthenticated}
      onSplashFinish={handleSplashFinish}
      onOnboardingComplete={handleOnboardingComplete}
    />
  );
};

export default function App() {
  return (
    <SafeAreaProvider>
      <StatusBar style="light" backgroundColor={Colors.primary} />
      {BYPASS_MODE ? (
        <AppContent />
      ) : (
        <AuthProvider>
          <AppContent />
        </AuthProvider>
      )}
    </SafeAreaProvider>
  );
}

const styles = StyleSheet.create({
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: Colors.primary,
  },
  loadingText: {
    color: Colors.text.inverse,
    marginTop: 16,
    fontSize: 16,
  },
  errorContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: Colors.primary,
    padding: 20,
  },
  errorText: {
    color: Colors.text.inverse,
    fontSize: 18,
    textAlign: 'center',
    marginBottom: 10,
  },
  retryText: {
    color: Colors.text.secondary,
    fontSize: 14,
    textAlign: 'center',
  },
});
