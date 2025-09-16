import React, { useEffect, useState } from 'react';
import {
  View,
  ScrollView,
  StyleSheet,
  RefreshControl,
  Alert,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import Colors from '../../constants/Colors';
import { Spacing } from '../../constants/Layout';

// Import custom hooks
import { useWalletData } from '../../hooks/useWalletData';
import { useUserProfile } from '../../hooks/useUserProfile';
import { useOrderHistory } from '../../hooks/useOrderHistory';
import { useCategories } from '../../hooks/useCategories';

// Import components
import HomeHeader from './components/HomeHeader';
import SearchBar from './components/SearchBar';
import BalanceCard from './components/BalanceCard';
import FoodSafeCard from './components/FoodSafeCard';
import PromotionalBanner from './components/PromotionalBanner';
import CategoriesGrid from './components/CategoriesGrid';
import FloatingActionButton from './components/FloatingActionButton';

interface HomeScreenProps {
  navigation: any;
}

const HomeScreen: React.FC<HomeScreenProps> = ({ navigation }) => {
  const [refreshing, setRefreshing] = useState(false);

  // Custom hooks for data fetching
  const { wallet, loading: walletLoading, error: walletError, refetch: refetchWallet } = useWalletData();
  const { user, loading: profileLoading, error: profileError, refetch: refetchProfile } = useUserProfile();
  const { orders, loading: ordersLoading, error: ordersError, refetch: refetchOrders } = useOrderHistory();
  const { categories, loading: categoriesLoading, error: categoriesError, refetch: refetchCategories } = useCategories();

  useEffect(() => {
    // Show error alerts if any data fetching fails
    if (walletError) {
      Alert.alert('Wallet Error', 'Failed to load wallet data. Please try again.');
    }
    if (profileError) {
      Alert.alert('Profile Error', 'Failed to load profile data. Please try again.');
    }
    if (ordersError) {
      Alert.alert('Orders Error', 'Failed to load order history. Please try again.');
    }
    if (categoriesError) {
      Alert.alert('Categories Error', 'Failed to load categories. Please try again.');
    }
  }, [walletError, profileError, ordersError, categoriesError]);

  const handleRefresh = async () => {
    setRefreshing(true);
    
    try {
      // Refresh all data
      await Promise.all([
        refetchWallet(),
        refetchProfile(),
        refetchOrders(),
        refetchCategories(),
      ]);
    } catch (error) {
      console.error('Error refreshing data:', error);
    } finally {
      setRefreshing(false);
    }
  };

  const handleSearch = (query: string) => {
    if (query.trim()) {
      // Navigate to search results screen
      navigation.navigate('SearchResults', { query: query.trim() });
    }
  };

  const handleNotificationsPress = () => {
    navigation.navigate('Notifications');
  };

  const handleProfilePress = () => {
    navigation.navigate('Profile');
  };

  const handleAddMoneyPress = () => {
    navigation.navigate('AddMoney');
  };

  const handleViewHistoryPress = () => {
    navigation.navigate('OrderHistory');
  };

  const handleFoodSafetyPress = () => {
    navigation.navigate('FoodSafety');
  };

  const handleBannerPress = (bannerId: string) => {
    console.log(`Banner pressed: ${bannerId}`);
    // Navigate to appropriate screen based on banner
    // navigation.navigate('Promotion', { bannerId });
  };

  const handleCategoryPress = (categoryId: string) => {
    navigation.navigate('CategoryProducts', { categoryId });
  };

  const handleFloatingActionPress = () => {
    // Navigate to quick order or cart screen
    navigation.navigate('QuickOrder');
  };

  const isLoading = walletLoading || profileLoading || ordersLoading || categoriesLoading;

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView
        style={styles.scrollView}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
        refreshControl={
          <RefreshControl
            refreshing={refreshing}
            onRefresh={handleRefresh}
            tintColor={Colors.primary}
            colors={[Colors.primary]}
          />
        }
      >
        {/* Header */}
        <HomeHeader
          userName={user?.name || 'User'}
          location={user?.location || 'Current Location'}
          profileImage={user?.profileImage}
          onNotificationPress={handleNotificationsPress}
          onProfilePress={handleProfilePress}
        />

        {/* Search Bar */}
        <SearchBar
          onPress={() => navigation.navigate('Search')}
          placeholder="Search for food, restaurants..."
        />

        {/* Balance Card */}
        <BalanceCard
          balance={wallet?.totalBalance || 0}
          isLoading={walletLoading}
          onAddMoneyPress={handleAddMoneyPress}
          onViewHistoryPress={handleViewHistoryPress}
        />

        {/* Food Safety Card */}
        <FoodSafeCard
          onPress={handleFoodSafetyPress}
        />

        {/* Promotional Banners */}
        <PromotionalBanner
          onBannerPress={handleBannerPress}
        />

        {/* Categories Grid */}
        <CategoriesGrid
          categories={categories}
          isLoading={categoriesLoading}
          onCategoryPress={handleCategoryPress}
        />

        {/* Bottom spacing for floating action button */}
        <View style={styles.bottomSpacing} />
      </ScrollView>

      {/* Floating Action Button */}
      <FloatingActionButton
        icon="restaurant"
        onPress={handleFloatingActionPress}
        backgroundColor={Colors.buttonAccent}
        iconColor={Colors.buttonAccentText}
      />
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
  scrollContent: {
    paddingBottom: 100, // Extra space for floating action button
  },
  bottomSpacing: {
    height: 80,
  },
});

export default HomeScreen;
