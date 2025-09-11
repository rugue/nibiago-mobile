import React, { useState, useRef } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  Dimensions,
  ScrollView,
  NativeSyntheticEvent,
  NativeScrollEvent,
  ImageBackground,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import Button from '../components/Button';
import Colors from '../constants/Colors';
import { Typography, Spacing, BorderRadius, Layout } from '../constants/Layout';
import { onboardingData, OnboardingSlide } from '../constants/OnboardingData';

const { width, height } = Dimensions.get('window');

interface OnboardingScreenProps {
  onComplete: () => void;
}

const OnboardingScreen: React.FC<OnboardingScreenProps> = ({ onComplete }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const scrollViewRef = useRef<ScrollView>(null);

  const handleScroll = (event: NativeSyntheticEvent<NativeScrollEvent>) => {
    const scrollPosition = event.nativeEvent.contentOffset.x;
    const index = Math.round(scrollPosition / width);
    setCurrentIndex(index);
  };

  const handleNext = () => {
    if (currentIndex < onboardingData.length - 1) {
      const nextIndex = currentIndex + 1;
      scrollViewRef.current?.scrollTo({
        x: nextIndex * width,
        animated: true,
      });
      setCurrentIndex(nextIndex);
    } else {
      onComplete();
    }
  };

  const handleSkip = () => {
    onComplete();
  };

  const renderSlide = (item: OnboardingSlide, index: number) => {
    return (
      <View key={item.id} style={styles.slide}>
        {/* Image Background */}
        <View style={styles.imageContainer}>
          <ImageBackground 
            source={item.image} 
            style={styles.backgroundImage}
            imageStyle={styles.imageStyle}
            defaultSource={require('../../assets/icon.png')} // Fallback image
          >
            {/* Overlay for better text readability */}
            <View style={styles.overlay} />
          </ImageBackground>
        </View>

        {/* Content */}
        <View style={styles.content}>
          {/* Page indicators */}
          <View style={styles.indicatorContainer}>
            {onboardingData.map((_, i) => (
              <View
                key={i}
                style={[
                  styles.indicator,
                  i === currentIndex ? styles.activeIndicator : styles.inactiveIndicator,
                ]}
              />
            ))}
          </View>

          {/* Title and subtitle */}
          <View style={styles.textContainer}>
            <Text style={styles.title}>{item.title}</Text>
            <Text style={styles.subtitle}>{item.subtitle}</Text>
          </View>

          {/* Action buttons */}
          <View style={styles.buttonContainer}>
            <Button
              title={currentIndex === onboardingData.length - 1 ? 'Get Started' : 'Next'}
              onPress={handleNext}
              size="large"
              style={styles.nextButton}
            />
            
            <Button
              title="Skip"
              onPress={handleSkip}
              variant="outline"
              size="medium"
              style={styles.skipButton}
            />
          </View>
        </View>
      </View>
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView
        ref={scrollViewRef}
        horizontal
        pagingEnabled
        showsHorizontalScrollIndicator={false}
        onScroll={handleScroll}
        scrollEventThrottle={16}
        style={styles.scrollView}
      >
        {onboardingData.map((item, index) => renderSlide(item, index))}
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.background.primary,
  },
  scrollView: {
    flex: 1,
  },
  slide: {
    width: width,
    flex: 1,
  },
  imageContainer: {
    flex: 0.6,
    position: 'relative',
  },
  backgroundImage: {
    flex: 1,
    justifyContent: 'flex-end',
  },
  imageStyle: {
    borderBottomLeftRadius: BorderRadius.xxl,
    borderBottomRightRadius: BorderRadius.xxl,
  },
  overlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(0, 0, 0, 0.1)',
    borderBottomLeftRadius: BorderRadius.xxl,
    borderBottomRightRadius: BorderRadius.xxl,
  },
  content: {
    flex: 0.4,
    paddingHorizontal: Spacing.lg,
    paddingTop: Spacing.xl,
    justifyContent: 'space-between',
  },
  indicatorContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: Spacing.lg,
  },
  indicator: {
    width: 8,
    height: 8,
    borderRadius: 4,
    marginHorizontal: 4,
  },
  activeIndicator: {
    backgroundColor: Colors.primary,
    width: 24,
  },
  inactiveIndicator: {
    backgroundColor: Colors.gray[300],
  },
  textContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: Spacing.md,
  },
  title: {
    fontSize: Typography.fontSize.xxl,
    fontWeight: Typography.fontWeight.bold,
    color: Colors.text.primary,
    textAlign: 'center',
    marginBottom: Spacing.md,
    lineHeight: Typography.fontSize.xxl * Typography.lineHeight.tight,
  },
  subtitle: {
    fontSize: Typography.fontSize.md,
    color: Colors.text.secondary,
    textAlign: 'center',
    lineHeight: Typography.fontSize.md * Typography.lineHeight.relaxed,
    paddingHorizontal: Spacing.sm,
  },
  buttonContainer: {
    paddingBottom: Spacing.lg,
  },
  nextButton: {
    marginBottom: Spacing.md,
  },
  skipButton: {
    alignSelf: 'center',
  },
});

export default OnboardingScreen;
