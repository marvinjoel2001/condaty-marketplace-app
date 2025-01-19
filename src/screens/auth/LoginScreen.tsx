import React, {useState, useEffect, useRef} from 'react';
import {
  View,
  Text,
  StyleSheet,
  KeyboardAvoidingView,
  Platform,
  Alert,
  Image,
  Animated,
} from 'react-native';
import {useAuth} from '../../hooks/useAuth';
import Input from '../../components/common/Input';
import Button from '../../components/common/Button';
import {colors} from '../../constants/colors';
import {LinearGradient} from 'react-native-linear-gradient';

const LoginScreen = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const {signIn} = useAuth();

  const fadeAnim = useRef(new Animated.Value(0)).current;
  const slideAnim = useRef(new Animated.Value(50)).current;

  useEffect(() => {
    const startAnimation = () => {
      Animated.parallel([
        Animated.timing(fadeAnim, {
          toValue: 1,
          duration: 700,
          useNativeDriver: true,
        }),
        Animated.timing(slideAnim, {
          toValue: 0,
          duration: 700,
          useNativeDriver: true,
        }),
      ]).start();
    };

    startAnimation();
  }, [fadeAnim, slideAnim]);

  const handleLogin = async () => {
    if (!email || !password) {
      Alert.alert('Error', 'Por favor ingresa todos los campos');
      return;
    }

    try {
      setLoading(true);
      console.log('Iniciando login...');
      await signIn({email, password});
      console.log('Login exitoso');
    } catch (error) {
      console.log('Error en LoginScreen:', error);
      Alert.alert(
        'Error de inicio de sesión',
        error instanceof Error ? error.message : 'Ocurrió un error inesperado',
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <LinearGradient
      colors={[
        colors.background,
        colors.backgroundDark,
        colors.backgroundDarker,
      ]}
      style={styles.gradient}>
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={styles.container}>
        <Animated.View
          style={[
            styles.formContainer,
            {
              opacity: fadeAnim,
              transform: [{translateY: slideAnim}],
            },
          ]}>
          <Image
            source={require('../../assets/images/logo.webp')}
            style={styles.logo}
            resizeMode="contain"
          />

          <Text style={styles.title}>Conectando tu comunidad</Text>

          <View style={styles.inputsContainer}>
            <Input
              placeholder="Email"
              value={email}
              onChangeText={setEmail}
              keyboardType="email-address"
              autoCapitalize="none"
              autoCorrect={false}
            />

            <Input
              placeholder="Contraseña"
              value={password}
              onChangeText={setPassword}
              secureTextEntry
            />

            <Button
              onPress={handleLogin}
              title="Iniciar sesión"
              disabled={loading}
              loading={loading}
            />
          </View>
        </Animated.View>
      </KeyboardAvoidingView>
    </LinearGradient>
  );
};

const styles = StyleSheet.create({
  gradient: {
    flex: 1,
  },
  container: {
    flex: 1,
    justifyContent: 'center',
  },
  formContainer: {
    padding: 20,
    width: '100%',
    maxWidth: 400,
    alignSelf: 'center',
  },
  logo: {
    height: 48,
    width: 190,
    alignSelf: 'center',
    marginBottom: 24,
  },
  title: {
    fontSize: 24,
    fontWeight: '600',
    color: colors.text,
    textAlign: 'center',
    marginBottom: 32,
  },
  inputsContainer: {
    gap: 16,
  },
});

export default LoginScreen;
