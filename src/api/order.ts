import api from './axiosConfig';
import {Order} from '../types/order';

export const createOrder = async (order: Order): Promise<Order> => {
  try {
    const response = await api.post<Order>('/orders', order);
    return response.data;
  } catch (error) {
    console.error('Error creating order:', error);
    throw error;
  }
};
