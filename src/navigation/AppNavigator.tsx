import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import {useAuth} from '../hooks/useAuth';
import LoginScreen from '../screens/auth/LoginScreen';
import {ProductListScreen} from '../screens/marketplace/ProductListScreen';
import {colors} from '../constants/colors';
import {RootStackParamList} from './types';

const Stack = createStackNavigator<RootStackParamList>();

export const AppNavigator = () => {
  const {user} = useAuth();

  return (
    <NavigationContainer>
      <Stack.Navigator
        screenOptions={{
          headerStyle: {
            backgroundColor: colors.backgroundDark,
          },
          headerTintColor: colors.text,
          headerTitleStyle: {
            fontWeight: 'bold',
          },
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
              name="Home"
              component={ProductListScreen}
              options={{title: 'Marketplace'}}
            />
          </>
        )}
      </Stack.Navigator>
    </NavigationContainer>
  );
};
