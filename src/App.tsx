import React from 'react';
import {StatusBar} from 'react-native';
import {AuthProvider} from './context/AuthContext';
import {colors} from './constants/colors';
import LoginScreen from './screens/auth/LoginScreen';

function App(): JSX.Element {
  return (
    <AuthProvider>
      <StatusBar
        barStyle="light-content"
        backgroundColor={colors.background}
        translucent
      />
      <LoginScreen />
    </AuthProvider>
  );
}

export default App;
