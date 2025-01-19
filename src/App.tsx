import React from 'react';
import {StatusBar} from 'react-native';
import {AuthProvider} from './context/AuthContext';
import {colors} from './constants/colors';

import {AppNavigator} from './navigation/AppNavigator';

function App(): JSX.Element {
  return (
    <AuthProvider>
      <StatusBar
        barStyle="light-content"
        backgroundColor={colors.background}
        translucent
      />
      <AppNavigator />
    </AuthProvider>
  );
}

export default App;
