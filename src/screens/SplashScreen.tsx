import React, { useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  Dimensions,
  ImageBackground,
  ActivityIndicator,
} from 'react-native';
import Colors from '../constants/Colors';
import { Typography, Spacing } from '../constants/Layout';

const { width, height } = Dimensions.get('window');

interface SplashScreenProps {
  onFinish: () => void;
}

const SplashScreen: React.FC<SplashScreenProps> = ({ onFinish }) => {
  useEffect(() => {
    console.log('SplashScreen mounted, setting up timers...');
    
    // Primary timer - 3 seconds
    const primaryTimer = setTimeout(() => {
      console.log('Primary splash timer finished, calling onFinish');
      onFinish();
    }, 3000);

    // Fallback timer - 5 seconds (in case something goes wrong)
    const fallbackTimer = setTimeout(() => {
      console.log('Fallback splash timer triggered, calling onFinish');
      onFinish();
    }, 5000);

    // Cleanup function
    return () => {
      console.log('SplashScreen unmounting, clearing timers');
      clearTimeout(primaryTimer);
      clearTimeout(fallbackTimer);
    };
  }, [onFinish]);

  return (
    <View style={styles.container}>
      <ImageBackground
        source={require('../../assets/nbiago-background.png')}
        style={styles.backgroundImage}
        resizeMode="cover"
      >
        {/* Dark overlay for better contrast */}
        <View style={styles.overlay} />
        
        <View style={styles.content}>
          {/* Main Logo in Center */}
          <View style={styles.logoContainer}>
            <Image 
              source={require('../../assets/nbiago-logo3.png')}
              style={styles.mainLogo}
              resizeMode="contain"
            />
          </View>
          
          {/* Bottom Brand Section */}
          <View style={styles.brandContainer}>
            <Text style={styles.fromText}>from</Text>
            <Image 
              source={require('../../assets/nibiago-lemon.png')}
              style={styles.brandLogo}
              resizeMode="contain"
            />
          </View>

          {/* Simple loading indicator */}
          <View style={styles.loadingSection}>
            <ActivityIndicator size="small" color={Colors.accent} />
            <Text style={styles.loadingText}>Loading...</Text>
          </View>
        </View>
      </ImageBackground>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.primary, // Fallback color in case image doesn't load
  },
  backgroundImage: {
    flex: 1,
    width: '100%',
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  overlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(0, 0, 0, 0.2)', // Lighter overlay to preserve image visibility
  },
  content: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: height * 0.08, // Responsive padding
    paddingHorizontal: width * 0.05, // Add horizontal padding for edge cases
    width: '100%',
  },
  logoContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    maxWidth: '100%',
  },
  mainLogo: {
    width: Math.min(width * 0.4, 160), // Responsive sizing with max limit
    height: Math.min(width * 0.4, 160),
    maxWidth: '80%', // Ensure it doesn't overflow on small screens
    maxHeight: '40%', // Limit height for very tall screens
  },
  brandContainer: {
    alignItems: 'center',
    marginBottom: height * 0.03, // Responsive bottom margin
    maxWidth: '100%',
  },
  fromText: {
    fontSize: Math.min(Typography.fontSize.md, width * 0.04), // Responsive font size
    color: Colors.text.inverse,
    marginBottom: Spacing.sm,
    opacity: 0.9,
    textAlign: 'center',
    fontWeight: Typography.fontWeight.regular,
  },
  brandLogo: {
    width: Math.min(width * 0.4, 150), // Responsive sizing
    height: Math.min(width * 0.1, 40),
    maxWidth: '80%', // Ensure it doesn't overflow
  },
  loadingSection: {
    alignItems: 'center',
    marginTop: height * 0.02,
  },
  loadingText: {
    fontSize: Typography.fontSize.sm,
    color: Colors.text.inverse,
    marginTop: Spacing.xs,
    opacity: 0.8,
  },
});

export default SplashScreen;
