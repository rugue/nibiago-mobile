import React, { useState, useRef, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  Dimensions,
  Image,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import Colors from '../../../constants/Colors';
import { Spacing } from '../../../constants/Layout';

interface BannerData {
  id: string;
  title: string;
  subtitle?: string;
  imageUrl?: string;
  backgroundColor: string;
  textColor: string;
  ctaText?: string;
  onPress?: () => void;
}

interface PromotionalBannerProps {
  banners?: BannerData[];
  autoScrollInterval?: number;
  onBannerPress?: (bannerId: string) => void;
}

const { width: screenWidth } = Dimensions.get('window');
const bannerWidth = screenWidth - (Spacing.lg * 2);

const defaultBanners: BannerData[] = [
  {
    id: '1',
    title: 'Get 20% Off Your First Order!',
    subtitle: 'Use code WELCOME20 at checkout',
    backgroundColor: Colors.accent,
    textColor: Colors.white,
    ctaText: 'Order Now',
  },
  {
    id: '2',
    title: 'Free Delivery on Orders Over $25',
    subtitle: 'No delivery fees for qualifying orders',
    backgroundColor: Colors.primary,
    textColor: Colors.white,
    ctaText: 'Learn More',
  },
  {
    id: '3',
    title: 'Fresh Produce Daily',
    subtitle: 'Farm-fresh vegetables and fruits delivered',
    backgroundColor: Colors.primary,
    textColor: Colors.white,
    ctaText: 'Shop Now',
  },
];

const PromotionalBanner: React.FC<PromotionalBannerProps> = ({
  banners = defaultBanners,
  autoScrollInterval = 5000,
  onBannerPress,
}) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const scrollViewRef = useRef<ScrollView>(null);

  useEffect(() => {
    if (banners.length <= 1) return;

    const interval = setInterval(() => {
      const nextIndex = (currentIndex + 1) % banners.length;
      setCurrentIndex(nextIndex);
      
      if (scrollViewRef.current) {
        scrollViewRef.current.scrollTo({
          x: nextIndex * bannerWidth,
          animated: true,
        });
      }
    }, autoScrollInterval);

    return () => clearInterval(interval);
  }, [currentIndex, banners.length, autoScrollInterval]);

  const handleBannerPress = (banner: BannerData) => {
    if (banner.onPress) {
      banner.onPress();
    } else if (onBannerPress) {
      onBannerPress(banner.id);
    } else {
      console.log(`Banner pressed: ${banner.id}`);
    }
  };

  const handleScroll = (event: any) => {
    const contentOffset = event.nativeEvent.contentOffset;
    const index = Math.round(contentOffset.x / bannerWidth);
    setCurrentIndex(index);
  };

  if (banners.length === 0) {
    return null;
  }

  return (
    <View style={styles.container}>
      <ScrollView
        ref={scrollViewRef}
        horizontal
        pagingEnabled
        showsHorizontalScrollIndicator={false}
        onMomentumScrollEnd={handleScroll}
        scrollEventThrottle={16}
        contentContainerStyle={styles.scrollContent}
      >
        {banners.map((banner) => (
          <TouchableOpacity
            key={banner.id}
            style={[
              styles.bannerContainer,
              { backgroundColor: banner.backgroundColor }
            ]}
            onPress={() => handleBannerPress(banner)}
            activeOpacity={0.9}
          >
            <View style={styles.bannerContent}>
              <View style={styles.textContainer}>
                <Text style={[styles.titleText, { color: banner.textColor }]}>
                  {banner.title}
                </Text>
                {banner.subtitle && (
                  <Text style={[styles.subtitleText, { color: banner.textColor }]}>
                    {banner.subtitle}
                  </Text>
                )}
                {banner.ctaText && (
                  <View style={styles.ctaContainer}>
                    <Text style={[styles.ctaText, { color: banner.textColor }]}>
                      {banner.ctaText}
                    </Text>
                    <Ionicons 
                      name="chevron-forward" 
                      size={16} 
                      color={banner.textColor} 
                      style={styles.ctaIcon}
                    />
                  </View>
                )}
              </View>

              {banner.imageUrl && (
                <View style={styles.imageContainer}>
                  <Image 
                    source={{ uri: banner.imageUrl }}
                    style={styles.bannerImage}
                    resizeMode="cover"
                  />
                </View>
              )}
            </View>

            {/* Decorative elements */}
            <View style={styles.decorativeContainer}>
              <View style={[styles.decorativeCircle, { backgroundColor: `${banner.textColor}20` }]} />
            </View>
          </TouchableOpacity>
        ))}
      </ScrollView>

      {/* Pagination Dots */}
      {banners.length > 1 && (
        <View style={styles.paginationContainer}>
          {banners.map((_, index) => (
            <View
              key={index}
              style={[
                styles.paginationDot,
                index === currentIndex && styles.activePaginationDot,
              ]}
            />
          ))}
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginBottom: Spacing.lg,
  },
  scrollContent: {
    paddingHorizontal: Spacing.lg,
  },
  bannerContainer: {
    width: bannerWidth,
    height: 140,
    borderRadius: 16,
    marginRight: Spacing.md,
    overflow: 'hidden',
    position: 'relative',
  },
  bannerContent: {
    flex: 1,
    flexDirection: 'row',
    padding: Spacing.lg,
    zIndex: 2,
  },
  textContainer: {
    flex: 1,
    justifyContent: 'center',
  },
  titleText: {
    fontSize: 18,
    fontWeight: '700',
    fontFamily: 'Inter-Bold',
    marginBottom: 4,
    lineHeight: 24,
  },
  subtitleText: {
    fontSize: 14,
    fontFamily: 'Inter-Regular',
    marginBottom: Spacing.sm,
    lineHeight: 20,
    opacity: 0.9,
  },
  ctaContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 4,
  },
  ctaText: {
    fontSize: 14,
    fontWeight: '600',
    fontFamily: 'Inter-SemiBold',
  },
  ctaIcon: {
    marginLeft: 4,
  },
  imageContainer: {
    width: 80,
    height: 80,
    alignSelf: 'center',
  },
  bannerImage: {
    width: '100%',
    height: '100%',
    borderRadius: 8,
  },
  decorativeContainer: {
    position: 'absolute',
    top: -30,
    right: -30,
    zIndex: 1,
  },
  decorativeCircle: {
    width: 100,
    height: 100,
    borderRadius: 50,
  },
  paginationContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: Spacing.md,
  },
  paginationDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: Colors.gray[300],
    marginHorizontal: 3,
  },
  activePaginationDot: {
    backgroundColor: Colors.primary,
    width: 24,
  },
});

export default PromotionalBanner;
