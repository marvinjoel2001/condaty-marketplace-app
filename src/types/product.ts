export interface Product {
  id: number;
  name: string;
  description: string;
  price: number;
  category: string;
  images: string[];
  condominio: string;
  sellerId?: number;
}

export interface ProductFilters {
  search: string;
  category: string;
}

export interface ProductCardProps {
  product: Product;
  onPress: (product: Product) => void;
}

export interface ProductListProps {
  products: Product[];
  onRefresh?: () => void;
  isLoading?: boolean;
}

export interface CategoryOption {
  value: string;
  label: string;
}
