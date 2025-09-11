import React, { useState, useEffect } from 'react';
import { StatusBar } from 'expo-status-bar';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import AsyncStorage from '@react-native-async-storage/async-storage';

import AppNavigation from './src/navigation/AppNavigation';
import Colors from './src/constants/Colors';

const ONBOARDING_KEY = '@nibiago_onboarding_completed';

export default function App() {
  const [showSplash, setShowSplash] = useState(true);
  const [showOnboarding, setShowOnboarding] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    checkOnboardingStatus();
  }, []);

  const checkOnboardingStatus = async () => {
    try {
      const hasCompletedOnboarding = await AsyncStorage.getItem(ONBOARDING_KEY);
      setShowOnboarding(!hasCompletedOnboarding);
      setIsLoading(false);
    } catch (error) {
      console.error('Error checking onboarding status:', error);
      setShowOnboarding(true);
      setIsLoading(false);
    }
  };

  const handleSplashFinish = () => {
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

  if (isLoading) {
    return null; // or a loading component
  }

  return (
    <SafeAreaProvider>
      <StatusBar style="light" backgroundColor={Colors.primary} />
      <AppNavigation
        showSplash={showSplash}
        showOnboarding={showOnboarding && !showSplash}
        onSplashFinish={handleSplashFinish}
        onOnboardingComplete={handleOnboardingComplete}
      />
    </SafeAreaProvider>
  );
}
