import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  FlatList,
  Image,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import Colors from '../../../constants/Colors';
import { Spacing } from '../../../constants/Layout';
import type { ProductCategory } from '../../../types/auth';

interface CategoriesGridProps {
  categories: ProductCategory[];
  isLoading?: boolean;
  onCategoryPress?: (categoryId: string) => void;
}

const CategoriesGrid: React.FC<CategoriesGridProps> = ({
  categories,
  isLoading = false,
  onCategoryPress,
}) => {
  const handleCategoryPress = (category: ProductCategory) => {
    if (onCategoryPress) {
      onCategoryPress(category.id);
    } else {
      console.log(`Category pressed: ${category.name}`);
    }
  };

  const renderCategoryItem = ({ item }: { item: ProductCategory }) => (
    <TouchableOpacity
      style={styles.categoryItem}
      onPress={() => handleCategoryPress(item)}
      activeOpacity={0.8}
    >
      <View style={styles.categoryImageContainer}>
        {item.image ? (
          <Image 
            source={{ uri: item.image }}
            style={styles.categoryImage}
            resizeMode="cover"
          />
        ) : (
          <View style={styles.placeholderImage}>
            <Ionicons 
              name="restaurant" 
              size={24} 
              color={Colors.text.secondary}
            />
          </View>
        )}
      </View>
      
      <Text style={styles.categoryName} numberOfLines={2}>
        {item.name}
      </Text>
      
      {item.productCount !== undefined && (
        <Text style={styles.productCount}>
          {item.productCount} {item.productCount === 1 ? 'item' : 'items'}
        </Text>
      )}
    </TouchableOpacity>
  );

  const renderLoadingSkeleton = () => (
    <View style={styles.loadingGrid}>
      {Array.from({ length: 6 }).map((_, index) => (
        <View key={index} style={styles.skeletonItem}>
          <View style={styles.skeletonImage} />
          <View style={styles.skeletonText} />
          <View style={[styles.skeletonText, styles.skeletonTextSmall]} />
        </View>
      ))}
    </View>
  );

  const renderHeader = () => (
    <View style={styles.header}>
      <Text style={styles.headerTitle}>Shop by Category</Text>
      <TouchableOpacity onPress={() => console.log('View all categories')}>
        <View style={styles.viewAllLink}>
          <Text style={styles.viewAllText}>View All</Text>
          <Ionicons name="chevron-forward" size={16} color={Colors.primary} />
        </View>
      </TouchableOpacity>
    </View>
  );

  if (isLoading) {
    return (
      <View style={styles.container}>
        {renderHeader()}
        {renderLoadingSkeleton()}
      </View>
    );
  }

  if (categories.length === 0) {
    return (
      <View style={styles.container}>
        {renderHeader()}
        <View style={styles.emptyState}>
          <Ionicons name="restaurant-outline" size={48} color={Colors.text.secondary} />
          <Text style={styles.emptyStateText}>No categories available</Text>
        </View>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      {renderHeader()}
      <FlatList
        data={categories.slice(0, 6)} // Show first 6 categories
        renderItem={renderCategoryItem}
        numColumns={3}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.grid}
        columnWrapperStyle={styles.row}
        scrollEnabled={false}
        showsVerticalScrollIndicator={false}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginHorizontal: Spacing.lg,
    marginBottom: Spacing.lg,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: Spacing.md,
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: Colors.text.primary,
    fontFamily: 'Inter-Bold',
  },
  viewAllLink: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  viewAllText: {
    fontSize: 14,
    color: Colors.primary,
    fontFamily: 'Inter-Medium',
    marginRight: 4,
  },
  grid: {
    flexGrow: 1,
  },
  row: {
    justifyContent: 'space-between',
  },
  categoryItem: {
    flex: 1,
    alignItems: 'center',
    marginBottom: Spacing.lg,
    maxWidth: '31%',
  },
  categoryImageContainer: {
    width: 72,
    height: 72,
    borderRadius: 16,
    marginBottom: Spacing.sm,
    overflow: 'hidden',
    backgroundColor: Colors.gray[100],
  },
  categoryImage: {
    width: '100%',
    height: '100%',
  },
  placeholderImage: {
    width: '100%',
    height: '100%',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: Colors.gray[200],
  },
  categoryName: {
    fontSize: 14,
    fontWeight: '500',
    color: Colors.text.primary,
    fontFamily: 'Inter-Medium',
    textAlign: 'center',
    marginBottom: 2,
    lineHeight: 18,
  },
  productCount: {
    fontSize: 12,
    color: Colors.text.secondary,
    fontFamily: 'Inter-Regular',
    textAlign: 'center',
  },
  loadingGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  skeletonItem: {
    alignItems: 'center',
    marginBottom: Spacing.lg,
    width: '31%',
  },
  skeletonImage: {
    width: 72,
    height: 72,
    borderRadius: 16,
    backgroundColor: Colors.gray[200],
    marginBottom: Spacing.sm,
  },
  skeletonText: {
    width: 60,
    height: 14,
    borderRadius: 4,
    backgroundColor: Colors.gray[200],
    marginBottom: 4,
  },
  skeletonTextSmall: {
    width: 40,
    height: 12,
  },
  emptyState: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: Spacing.xl * 2,
  },
  emptyStateText: {
    fontSize: 16,
    color: Colors.text.secondary,
    fontFamily: 'Inter-Regular',
    marginTop: Spacing.md,
    textAlign: 'center',
  },
});

export default CategoriesGrid;
