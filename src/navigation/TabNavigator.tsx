import React from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import Icon from 'react-native-vector-icons/Feather';
import {ProductListScreen} from '../screens/marketplace/ProductListScreen';
import {CartScreen} from '../screens/cart/CartScreen';
import {colors} from '../constants/colors';
import {useCart} from '../context/CartContext';
import {View, Text} from 'react-native';
import {CartIconProps} from '../types/cartprops';

const Tab = createBottomTabNavigator();

const CartIcon: React.FC<CartIconProps> = ({color, size}) => {
  const {items} = useCart();
  return (
    <View>
      <Icon name="shopping-cart" size={size} color={color} />
      {items.length > 0 && (
        <View
          style={{
            position: 'absolute',
            right: -6,
            top: -3,
            backgroundColor: colors.primary,
            borderRadius: 10,
            width: 16,
            height: 16,
            justifyContent: 'center',
            alignItems: 'center',
          }}>
          <Text
            style={{
              color: colors.backgroundDark,
              fontSize: 10,
              fontWeight: 'bold',
            }}>
            {items.length}
          </Text>
        </View>
      )}
    </View>
  );
};

export const TabNavigator = () => {
  return (
    <Tab.Navigator
      screenOptions={{
        tabBarStyle: {
          backgroundColor: colors.backgroundDark,
          borderTopColor: colors.backgroundDarker,
          height: 60,
          paddingBottom: 8,
        },
        tabBarActiveTintColor: colors.primary,
        tabBarInactiveTintColor: colors.text + '80',
        headerStyle: {
          backgroundColor: colors.backgroundDark,
        },
        headerTintColor: colors.text,
      }}>
      <Tab.Screen
        name="Marketplace"
        component={ProductListScreen}
        options={{
          tabBarIcon: ({color, size}) => (
            <Icon name="home" size={size} color={color} />
          ),
        }}
      />
      <Tab.Screen
        name="Carrito"
        component={CartScreen}
        options={{
          tabBarIcon: ({color, size}) => <CartIcon color={color} size={size} />,
        }}
      />
    </Tab.Navigator>
  );
};
