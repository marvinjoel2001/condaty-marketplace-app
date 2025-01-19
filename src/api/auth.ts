import axios from 'axios';
import {AuthResponse, LoginCredentials} from '../types/user';
import api from './axiosConfig';

import AsyncStorage from '@react-native-async-storage/async-storage';

export const login = async (
  credentials: LoginCredentials,
): Promise<AuthResponse> => {
  try {
    const response = await api.post<AuthResponse>('/auth/login', credentials);
    await AsyncStorage.setItem('@auth_token', response.data.token);
    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error) && error.response) {
      throw new Error(error.response.data.message);
    }
    throw new Error('Error en el inicio de sesión');
  }
};

export const logout = async (): Promise<void> => {
  await AsyncStorage.removeItem('@auth_token');
};
