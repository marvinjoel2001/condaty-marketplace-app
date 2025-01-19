import React, {createContext, useState, useEffect} from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {User, LoginCredentials} from '../types/user';
import * as authApi from '../api/auth';

interface AuthContextData {
  user: User | null;
  loading: boolean;
  signIn: (credentials: LoginCredentials) => Promise<void>;
  signOut: () => Promise<void>;
}

export const AuthContext = createContext<AuthContextData>(
  {} as AuthContextData,
);

export const AuthProvider: React.FC<{children: React.ReactNode}> = ({
  children,
}) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadStoredData();
  }, []);

  async function loadStoredData() {
    try {
      const [storedUser, token] = await Promise.all([
        AsyncStorage.getItem('@auth_user'),
        AsyncStorage.getItem('@auth_token'),
      ]);

      if (storedUser && token) {
        setUser(JSON.parse(storedUser));
      }
    } catch (error) {
      console.error('Error loading stored data:', error);
    } finally {
      setLoading(false);
    }
  }

  const signIn = async (credentials: LoginCredentials) => {
    try {
      const response = await authApi.login(credentials);
      setUser(response.user);
      await AsyncStorage.setItem('@auth_user', JSON.stringify(response.user));
      await AsyncStorage.setItem('@auth_token', response.token);
    } catch (error) {
      console.error('Error signing in:', error);
      throw error;
    }
  };

  const signOut = async () => {
    try {
      setUser(null);
      await Promise.all([
        AsyncStorage.removeItem('@auth_user'),
        AsyncStorage.removeItem('@auth_token'),
      ]);
    } catch (error) {
      console.error('Error signing out:', error);
    }
  };

  return (
    <AuthContext.Provider value={{user, loading, signIn, signOut}}>
      {children}
    </AuthContext.Provider>
  );
};
