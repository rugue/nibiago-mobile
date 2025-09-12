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
        source={require('../../assets/background.jpg')}
        style={styles.backgroundImage}
        resizeMode="cover"
      >
        {/* Dark overlay for better contrast */}
        <View style={styles.overlay} />
        
        <View style={styles.content}>
          {/* Main Logo in Center */}
          <View style={styles.logoContainer}>
            <Image 
              source={require('../../assets/nibiago-logo.png')}
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
  },
  backgroundImage: {
    flex: 1,
    width: '100%',
    height: '100%',
  },
  overlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(0, 0, 0, 0.3)', // Dark overlay for better text contrast
  },
  content: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: height * 0.1,
  },
  logoContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  mainLogo: {
    width: 120,
    height: 120,
    maxWidth: width * 0.3,
    maxHeight: width * 0.3,
  },
  brandContainer: {
    alignItems: 'center',
    marginBottom: height * 0.05,
  },
  fromText: {
    fontSize: Typography.fontSize.md,
    color: Colors.text.inverse,
    marginBottom: Spacing.sm,
    opacity: 0.8,
    textAlign: 'center',
  },
  brandLogo: {
    width: 150,
    height: 40,
    maxWidth: width * 0.4,
  },
});

export default SplashScreen;
