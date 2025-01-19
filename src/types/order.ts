export interface OrderItem {
  productId: number;
  quantity: number;
}

export interface Order {
  id?: number;
  userId: number;
  products: OrderItem[];
  total: number;
  status: 'pending' | 'completed' | 'cancelled';
  date: string;
}
