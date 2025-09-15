import React, { useEffect } from 'react';
import { View, Text } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

// Import screens
import SplashScreen from '../screens/SplashScreen';
import OnboardingScreen from '../screens/OnboardingScreen';
import AccountTypeScreen from '../screens/auth/AccountTypeScreen';
import AccountTypeSelectionScreen from '../screens/auth/AccountTypeSelectionScreen';
import FamilyRegistrationScreen from '../screens/auth/FamilyRegistrationScreen';
import BusinessRegistrationScreen from '../screens/auth/BusinessRegistrationScreen';
import EmailVerificationScreen from '../screens/auth/EmailVerificationScreen';
import SignInScreen from '../screens/auth/SignInScreen';

// Navigation types
export type RootStackParamList = {
  Splash: undefined;
  Onboarding: undefined;
  SignIn: undefined;
  AccountTypeSelection: undefined;
  FamilyRegistration: undefined;
  BusinessRegistration: undefined;
  EmailVerification: {
    email: string;
    accountId: string;
  };
  AccountType: undefined; // Keep for backward compatibility
  Dashboard: undefined;
  Main: undefined;
};

const Stack = createStackNavigator<RootStackParamList>();

interface AppNavigationProps {
  showSplash: boolean;
  showOnboarding: boolean;
  isAuthenticated: boolean;
  onSplashFinish: () => void;
  onOnboardingComplete: () => void;
}

// Simple conditional rendering instead of changing initialRouteName
const AppNavigation: React.FC<AppNavigationProps> = ({
  showSplash,
  showOnboarding,
  isAuthenticated,
  onSplashFinish,
  onOnboardingComplete,
}) => {
  console.log('AppNavigation rendering with:', { showSplash, showOnboarding, isAuthenticated });

  // Show splash screen if needed
  if (showSplash) {
    return <SplashScreen onFinish={onSplashFinish} />;
  }

  // Show onboarding if needed
  if (showOnboarding) {
    return <OnboardingScreen onComplete={onOnboardingComplete} />;
  }

  // Show main navigation stack
  return (
    <NavigationContainer>
      <Stack.Navigator
        screenOptions={{
          headerShown: false,
          cardStyle: { backgroundColor: '#ffffff' },
        }}
        initialRouteName={isAuthenticated ? 'Dashboard' : 'AccountTypeSelection'}
      >
        {/* Authentication Screens */}
        <Stack.Screen name="AccountTypeSelection" component={AccountTypeSelectionScreen} />
        <Stack.Screen name="FamilyRegistration" component={FamilyRegistrationScreen} />
        <Stack.Screen name="BusinessRegistration" component={BusinessRegistrationScreen} />
        <Stack.Screen name="EmailVerification" component={EmailVerificationScreen} />
        <Stack.Screen name="SignIn" component={SignInScreen} />
        
        {/* Legacy Authentication Screens - Keep for backward compatibility */}
        <Stack.Screen name="AccountType" component={AccountTypeScreen} />

        {/* Main App Screens */}
        <Stack.Screen name="Dashboard">
          {() => (
            <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
              <Text>Welcome to Nibiago!</Text>
              <Text>Dashboard Coming Soon</Text>
            </View>
          )}
        </Stack.Screen>
        
        {/* Legacy Main Screen */}
        <Stack.Screen name="Main">
          {() => (
            <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
              <Text>Main App Coming Soon!</Text>
            </View>
          )}
        </Stack.Screen>
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default AppNavigation;
