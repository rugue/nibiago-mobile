import React, { useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  Dimensions,
  ImageBackground,
} from 'react-native';
import Colors from '../constants/Colors';
import { Typography, Spacing } from '../constants/Layout';

const { width, height } = Dimensions.get('window');

interface SplashScreenProps {
  onFinish: () => void;
}

const SplashScreen: React.FC<SplashScreenProps> = ({ onFinish }) => {
  useEffect(() => {
    const timer = setTimeout(() => {
      onFinish();
    }, 3000); // Show splash for 3 seconds

    return () => clearTimeout(timer);
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
});

export default SplashScreen;
