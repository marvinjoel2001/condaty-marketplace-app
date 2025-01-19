import React from 'react';
import {View, StyleSheet, ActivityIndicator} from 'react-native';
import {ProductList} from '../../components/products/ProductList';
import {SearchBar} from '../../components/common/SearchBar';
import {CategoryFilter} from '../../components/common/CategoryFilter';
import {useProducts} from '../../hooks/useProducts';
import {colors} from '../../constants/colors';

export const ProductListScreen = () => {
  const {
    products,
    isLoading,
    searchQuery,
    selectedCategory,
    searchProducts,
    filterByCategory,
    refreshProducts,
  } = useProducts();

  if (isLoading && products.length === 0) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color={colors.primary} />
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <View style={styles.filtersContainer}>
        <SearchBar
          value={searchQuery}
          onChangeText={searchProducts}
          placeholder="Buscar productos..."
        />
        <CategoryFilter
          selectedCategory={selectedCategory}
          onSelectCategory={filterByCategory}
        />
      </View>
      <ProductList
        products={products}
        onRefresh={refreshProducts}
        isLoading={isLoading}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: colors.background,
  },
  filtersContainer: {
    padding: 16,
    gap: 12,
  },
});
