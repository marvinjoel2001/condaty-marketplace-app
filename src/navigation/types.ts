import {NavigatorScreenParams} from '@react-navigation/native';

export type RootStackParamList = {
  Login: undefined;
  Home: undefined;
  MainTabs: NavigatorScreenParams<TabParamList>;
  ProductDetail: {productId: number};
};

export type TabParamList = {
  Marketplace: undefined;
  Carrito: undefined;
};
declare global {
  namespace ReactNavigation {
    interface RootParamList extends RootStackParamList {}
  }
}