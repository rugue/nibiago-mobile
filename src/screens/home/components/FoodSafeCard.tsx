import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import Colors from '../../../constants/Colors';
import { Spacing } from '../../../constants/Layout';

interface FoodSafeCardProps {
  title?: string;
  subtitle?: string;
  onPress?: () => void;
}

const FoodSafeCard: React.FC<FoodSafeCardProps> = ({
  title = "Check if Food is safe to consume!",
  subtitle = "Scan or upload food items to verify quality and safety",
  onPress,
}) => {
  const handlePress = () => {
    if (onPress) {
      onPress();
    } else {
      // Navigate to food safety scanner screen
      console.log('Navigate to food safety screen');
    }
  };

  return (
    <TouchableOpacity
      style={styles.container}
      onPress={handlePress}
      activeOpacity={0.9}
    >
      <View style={styles.contentContainer}>
        <View style={styles.textContainer}>
          <Text style={styles.titleText}>{title}</Text>
          <Text style={styles.subtitleText}>{subtitle}</Text>
        </View>

        <View style={styles.iconContainer}>
          <View style={styles.iconBackground}>
            <Ionicons name="camera" size={24} color={Colors.white} />
          </View>
        </View>
      </View>

      {/* Decorative elements */}
      <View style={styles.decorativeContainer}>
        <View style={[styles.decorativeCircle, styles.circle1]} />
        <View style={[styles.decorativeCircle, styles.circle2]} />
        <View style={[styles.decorativeCircle, styles.circle3]} />
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: Colors.buttonAccent,
    marginHorizontal: Spacing.lg,
    marginBottom: Spacing.lg,
    borderRadius: 16,
    padding: Spacing.lg,
    minHeight: 120,
    overflow: 'hidden',
    position: 'relative',
  },
  contentContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    zIndex: 2,
  },
  textContainer: {
    flex: 1,
    paddingRight: Spacing.md,
  },
  titleText: {
    fontSize: 16,
    fontWeight: '700',
    color: Colors.white,
    fontFamily: 'Inter-Bold',
    marginBottom: 4,
    lineHeight: 22,
  },
  subtitleText: {
    fontSize: 13,
    color: Colors.white,
    fontFamily: 'Inter-Regular',
    lineHeight: 18,
    opacity: 0.9,
  },
  iconContainer: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  iconBackground: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.3)',
  },
  decorativeContainer: {
    position: 'absolute',
    top: 0,
    right: 0,
    bottom: 0,
    left: 0,
    zIndex: 1,
  },
  decorativeCircle: {
    position: 'absolute',
    borderRadius: 50,
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
  },
  circle1: {
    width: 80,
    height: 80,
    top: -20,
    right: -30,
  },
  circle2: {
    width: 60,
    height: 60,
    bottom: -20,
    left: -20,
  },
  circle3: {
    width: 40,
    height: 40,
    top: 20,
    left: 20,
  },
});

export default FoodSafeCard;
