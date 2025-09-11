import React from 'react';
import { View, Text } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

// Import screens
import SplashScreen from '../screens/SplashScreen';
import OnboardingScreen from '../screens/OnboardingScreen';

// Navigation types
export type RootStackParamList = {
  Splash: undefined;
  Onboarding: undefined;
  Main: undefined; // Will be implemented later
};

const Stack = createStackNavigator<RootStackParamList>();

interface AppNavigationProps {
  showSplash: boolean;
  showOnboarding: boolean;
  onSplashFinish: () => void;
  onOnboardingComplete: () => void;
}

const AppNavigation: React.FC<AppNavigationProps> = ({
  showSplash,
  showOnboarding,
  onSplashFinish,
  onOnboardingComplete,
}) => {
  return (
    <NavigationContainer>
      <Stack.Navigator
        screenOptions={{
          headerShown: false,
          cardStyle: { backgroundColor: '#ffffff' },
        }}
        initialRouteName={showSplash ? 'Splash' : showOnboarding ? 'Onboarding' : 'Main'}
      >
        {showSplash && (
          <Stack.Screen name="Splash">
            {() => <SplashScreen onFinish={onSplashFinish} />}
          </Stack.Screen>
        )}
        
        {showOnboarding && (
          <Stack.Screen name="Onboarding">
            {() => <OnboardingScreen onComplete={onOnboardingComplete} />}
          </Stack.Screen>
        )}
        
        {/* Placeholder for main app screens */}
        {!showSplash && !showOnboarding && (
          <Stack.Screen name="Main">
            {() => (
              <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                <Text>Main App Coming Soon!</Text>
              </View>
            )}
          </Stack.Screen>
        )}
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default AppNavigation;
