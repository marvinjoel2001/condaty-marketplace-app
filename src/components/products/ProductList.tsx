import React from 'react';
import {
  FlatList,
  StyleSheet,
  RefreshControl,
  ListRenderItemInfo,
} from 'react-native';
import {Product, ProductListProps} from '../../types/product';
import {ProductCard} from './ProductCard';
import {colors} from '../../constants/colors';

export const ProductList = ({
  products,
  onRefresh,
  isLoading,
}: ProductListProps) => {
  const renderItem = ({item}: ListRenderItemInfo<Product>) => (
    <ProductCard product={item} onPress={() => {}} />
  );

  const keyExtractor = (item: Product) => item.id.toString();

  return (
    <FlatList
      data={products}
      renderItem={renderItem}
      keyExtractor={keyExtractor}
      numColumns={2}
      columnWrapperStyle={styles.columnWrapper}
      contentContainerStyle={styles.contentContainer}
      refreshControl={
        <RefreshControl
          refreshing={isLoading || false}
          onRefresh={onRefresh}
          tintColor={colors.primary}
        />
      }
      showsVerticalScrollIndicator={false}
    />
  );
};

const styles = StyleSheet.create({
  contentContainer: {
    padding: 16,
  },
  columnWrapper: {
    justifyContent: 'space-between',
  },
});
