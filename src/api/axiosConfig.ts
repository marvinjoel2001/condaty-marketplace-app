import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {navigate} from '../navigation/navigationRef';
import {Alert} from 'react-native';

const api = axios.create({
  baseURL: 'https://1066-2800-cd0-4304-e000-e794-e0c8-b7b8-dbb4.ngrok-free.app',
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Interceptor para logs
api.interceptors.request.use(request => {
  console.log('Request:', {
    url: request.url,
    method: request.method,
    data: request.data,
    headers: request.headers,
  });
  return request;
});

// Interceptor para añadir el token a las peticiones
api.interceptors.request.use(
  async config => {
    const token = await AsyncStorage.getItem('@auth_token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  error => {
    return Promise.reject(error);
  },
);

// Interceptor para manejar errores de autenticación
api.interceptors.response.use(
  response => response,
  async error => {
    if (error.response?.status === 401) {
      // Token expirado o inválido
      await AsyncStorage.removeItem('@auth_token');
      await AsyncStorage.removeItem('@auth_user');

      // Navegar al login
      navigate('Login');
      Alert.alert('Sesión expirada', 'Por favor, inicia sesión nuevamente');
    }
    return Promise.reject(error);
  },
);

export default api;
