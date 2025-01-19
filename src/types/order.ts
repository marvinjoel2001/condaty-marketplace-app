export interface OrderProduct {
  productId: number;
  quantity: number;
}

export interface Order {
  id?: number;
  userId: number;
  products: OrderProduct[];
  total: number;
  status: 'pending' | 'completed' | 'cancelled';
  date: string;
}
