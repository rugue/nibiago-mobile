import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Image,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import Colors from '../../../constants/Colors';
import { Spacing } from '../../../constants/Layout';

interface HomeHeaderProps {
  userName: string;
  location: string;
  profileImage?: string;
  onNotificationPress?: () => void;
  onProfilePress?: () => void;
}

const HomeHeader: React.FC<HomeHeaderProps> = ({
  userName,
  location,
  profileImage,
  onNotificationPress,
  onProfilePress,
}) => {
  const navigation = useNavigation();

  const handleNotificationPress = () => {
    if (onNotificationPress) {
      onNotificationPress();
    } else {
      // Navigate to notifications screen
      // navigation.navigate('Notifications' as never);
      console.log('Navigate to notifications');
    }
  };

  const handleProfilePress = () => {
    if (onProfilePress) {
      onProfilePress();
    } else {
      // Navigate to profile screen
      // navigation.navigate('Profile' as never);
      console.log('Navigate to profile');
    }
  };

  return (
    <View style={styles.container}>
      {/* Location */}
      <View style={styles.locationContainer}>
        <Ionicons name="location-outline" size={20} color={Colors.white} />
        <Text style={styles.locationText}>{location}</Text>
      </View>

      {/* Welcome Message */}
      <View style={styles.welcomeContainer}>
        <Text style={styles.welcomeText}>Welcome {userName} 👋</Text>
      </View>

      {/* Right Side - Notifications and Profile */}
      <View style={styles.rightContainer}>
        <TouchableOpacity
          style={styles.notificationButton}
          onPress={handleNotificationPress}
        >
          <Ionicons name="notifications-outline" size={24} color={Colors.white} />
          {/* Optional notification badge */}
          <View style={styles.notificationBadge} />
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.profileButton}
          onPress={handleProfilePress}
        >
          {profileImage ? (
            <Image source={{ uri: profileImage }} style={styles.profileImage} />
          ) : (
            <View style={styles.profilePlaceholder}>
              <Ionicons name="person" size={24} color={Colors.white} />
            </View>
          )}
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: Colors.authHeader, // Dark green background
    paddingHorizontal: Spacing.lg,
    paddingTop: Spacing.xl + 20, // Account for status bar
    paddingBottom: Spacing.lg,
  },
  locationContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: Spacing.xs,
  },
  locationText: {
    fontSize: 14,
    color: Colors.white,
    marginLeft: Spacing.xs,
    opacity: 0.8,
  },
  welcomeContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: Spacing.sm,
  },
  welcomeText: {
    fontSize: 24,
    fontWeight: '700',
    color: Colors.white,
    flex: 1,
  },
  rightContainer: {
    position: 'absolute',
    top: Spacing.xl + 20,
    right: Spacing.lg,
    flexDirection: 'row',
    alignItems: 'center',
  },
  notificationButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: Spacing.sm,
    position: 'relative',
  },
  notificationBadge: {
    position: 'absolute',
    top: 8,
    right: 8,
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: Colors.status.error,
  },
  profileButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    overflow: 'hidden',
  },
  profileImage: {
    width: 40,
    height: 40,
    borderRadius: 20,
  },
  profilePlaceholder: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: Colors.buttonAccent,
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default HomeHeader;
