import {useState, useCallback, useEffect} from 'react';
import {Product} from '../types/product';
import * as productsApi from '../api/products';

export const useProducts = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [filteredProducts, setFilteredProducts] = useState<Product[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('');

  const fetchProducts = useCallback(async () => {
    setIsLoading(true);
    setError(null);
    try {
      const data = await productsApi.getProducts();
      setProducts(data);
      setFilteredProducts(data);
    } catch (err) {
      setError(
        err instanceof Error ? err.message : 'Error al cargar productos',
      );
    } finally {
      setIsLoading(false);
    }
  }, []);

  const filterProducts = useCallback(() => {
    const filtered = products.filter(product => {
      const matchesSearch =
        product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        product.description.toLowerCase().includes(searchQuery.toLowerCase());

      const matchesCategory =
        !selectedCategory || product.category === selectedCategory;

      return matchesSearch && matchesCategory;
    });
    setFilteredProducts(filtered);
  }, [products, searchQuery, selectedCategory]);

  useEffect(() => {
    filterProducts();
  }, [filterProducts, searchQuery, selectedCategory]);

  useEffect(() => {
    fetchProducts();
  }, [fetchProducts]);

  const searchProducts = (query: string) => {
    setSearchQuery(query);
  };

  const filterByCategory = (category: string) => {
    setSelectedCategory(category);
  };

  const refreshProducts = async () => {
    await fetchProducts();
  };

  return {
    products: filteredProducts,
    isLoading,
    error,
    searchQuery,
    selectedCategory,
    searchProducts,
    filterByCategory,
    refreshProducts,
  };
};
