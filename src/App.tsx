import React from 'react';
import {StatusBar} from 'react-native';
import {NavigationContainer} from '@react-navigation/native';
import {AuthProvider} from './context/AuthContext';
import {CartProvider} from './context/CartContext';
import {AppNavigator} from './navigation/AppNavigator';
import {colors} from './constants/colors';
import { navigationRef } from './navigation/navigationRef';

function App(): JSX.Element {
  return (
    <NavigationContainer ref={navigationRef}>
      <AuthProvider>
        <CartProvider>
          <StatusBar
            barStyle="light-content"
            backgroundColor={colors.background}
            translucent
          />
          <AppNavigator />
        </CartProvider>
      </AuthProvider>
    </NavigationContainer>
  );
}

export default App;