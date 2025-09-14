import React, { useEffect } from 'react';
import { StatusBar } from 'expo-status-bar';
import * as SplashScreen from 'expo-splash-screen';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import TestScreen from './src/screens/TestScreen';
import Colors from './src/constants/Colors';

// Prevent the splash screen from auto-hiding
SplashScreen.preventAutoHideAsync();

export default function App() {
  useEffect(() => {
    // Hide splash screen immediately when app loads
    console.log('App loaded, hiding splash screen...');
    const hideSplash = async () => {
      try {
        await SplashScreen.hideAsync();
        console.log('Splash screen hidden successfully');
      } catch (error) {
        console.warn('Error hiding splash screen:', error);
      }
    };
    
    // Add small delay to ensure app is ready
    setTimeout(hideSplash, 1000);
  }, []);

  console.log('App component rendering...');

  return (
    <SafeAreaProvider>
      <StatusBar style="light" backgroundColor={Colors.primary} />
      <TestScreen />
    </SafeAreaProvider>
  );
}
