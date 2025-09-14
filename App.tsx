import React, { useEffect, useState } from 'react';
import { StatusBar } from 'expo-status-bar';
import * as SplashScreen from 'expo-splash-screen';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { AuthProvider, useAuth } from './src/context/AuthContext';
import AppNavigation from './src/navigation/AppNavigation';
import Colors from './src/constants/Colors';

const ONBOARDING_KEY = '@nibiago_onboarding_completed';

// Prevent the splash screen from auto-hiding
SplashScreen.preventAutoHideAsync();

const AppContent: React.FC = () => {
  const [showSplash, setShowSplash] = useState(true);
  const [showOnboarding, setShowOnboarding] = useState(false);
  const [appReady, setAppReady] = useState(false);
  const { authState } = useAuth();

  useEffect(() => {
    initializeApp();
  }, []);

  const initializeApp = async () => {
    try {
      console.log('Initializing app...');
      
      // Check onboarding status while splash is showing
      const hasCompletedOnboarding = await AsyncStorage.getItem(ONBOARDING_KEY);
      console.log('Onboarding completed:', !!hasCompletedOnboarding);
      
      // Set onboarding state
      setShowOnboarding(!hasCompletedOnboarding);
      
      // Hide Expo splash screen and show custom splash
      await SplashScreen.hideAsync();
      console.log('Expo splash screen hidden, showing custom splash');
      
      // Mark app as ready (this enables the custom splash screen to show)
      setAppReady(true);
      
      // BACKUP: Force transition after 6 seconds if splash doesn't call onFinish
      setTimeout(() => {
        if (showSplash) {
          console.log('🚨 BACKUP TIMEOUT: Force finishing splash screen after 6s');
          setShowSplash(false);
        }
      }, 6000);
      
    } catch (error) {
      console.error('App initialization error:', error);
      // On error, still proceed to avoid hanging
      setShowOnboarding(true);
      setAppReady(true);
      await SplashScreen.hideAsync().catch(console.warn);
    }
  };

  const handleSplashFinish = () => {
    console.log('🎬 SPLASH FINISH CALLED! Transitioning from splash screen...');
    setShowSplash(false);
    console.log('✅ showSplash set to false, should show next screen now');
  };

  const handleOnboardingComplete = async () => {
    try {
      console.log('Completing onboarding...');
      await AsyncStorage.setItem(ONBOARDING_KEY, 'true');
      setShowOnboarding(false);
      console.log('Onboarding completed and saved');
    } catch (error) {
      console.error('Error saving onboarding status:', error);
      // Still proceed even if storage fails
      setShowOnboarding(false);
    }
  };

  // Wait until app is ready and auth is loaded
  if (!appReady || authState.isLoading) {
    console.log('App not ready yet, waiting...');
    return null; // Expo splash screen will show
  }

  console.log('Rendering AppNavigation with:', {
    showSplash,
    showOnboarding: showOnboarding && !showSplash,
    isAuthenticated: authState.isAuthenticated
  });

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
  console.log('App component rendering...');

  return (
    <SafeAreaProvider>
      <StatusBar style="light" backgroundColor={Colors.primary} />
      <AuthProvider>
        <AppContent />
      </AuthProvider>
    </SafeAreaProvider>
  );
}
