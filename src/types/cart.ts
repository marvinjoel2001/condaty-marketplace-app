import {Product} from './product';

export interface CartItem {
  product: Product;
  quantity: number;
}

export interface RenderItemProps {
  item: CartItem;
}
