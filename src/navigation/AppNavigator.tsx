import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import {useAuth} from '../hooks/useAuth';
import LoginScreen from '../screens/auth/LoginScreen';
import {ProductDetailScreen} from '../screens/marketplace/ProductDetailScreen';
import {TabNavigator} from './TabNavigator';
import {colors} from '../constants/colors';

const Stack = createStackNavigator();

export const AppNavigator = () => {
  const {user} = useAuth();

  return (
    <Stack.Navigator
      screenOptions={{
        headerStyle: {
          backgroundColor: colors.backgroundDark,
        },
        headerTintColor: colors.text,
        headerTitleStyle: {
          fontWeight: 'bold',
        },
        headerBackTitleVisible: false,
      }}>
      {!user ? (
        <Stack.Screen
          name="Login"
          component={LoginScreen}
          options={{headerShown: false}}
        />
      ) : (
        <>
          <Stack.Screen
            name="MainTabs"
            component={TabNavigator}
            options={{headerShown: false}}
          />
          <Stack.Screen
            name="ProductDetail"
            component={ProductDetailScreen}
            options={{
              headerShown: false,
              presentation: 'modal',
            }}
          />
        </>
      )}
    </Stack.Navigator>
  );
};
