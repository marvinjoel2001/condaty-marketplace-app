import React from 'react';
import {StatusBar} from 'react-native';
import {NavigationContainer} from '@react-navigation/native';
import {AuthProvider} from './context/AuthContext';
import {CartProvider} from './context/CartContext';
import {AppNavigator} from './navigation/AppNavigator';
import {colors} from './constants/colors';

function App(): JSX.Element {
  return (
    <NavigationContainer>
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
