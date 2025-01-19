import React from 'react';
import {
  TouchableOpacity,
  Text,
  StyleSheet,
  ActivityIndicator,
} from 'react-native';
import {colors} from '../../constants/colors';

interface ButtonProps {
  onPress: () => void;
  title: string;
  disabled?: boolean;
  loading?: boolean;
}

const Button: React.FC<ButtonProps> = ({onPress, title, disabled, loading}) => {
  return (
    <TouchableOpacity
      style={[styles.button, disabled || loading ? styles.disabled : null]}
      onPress={onPress}
      disabled={disabled || loading}>
      {loading ? (
        <ActivityIndicator color={colors.textDark} />
      ) : (
        <Text style={styles.text}>{title}</Text>
      )}
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button: {
    height: 48,
    backgroundColor: colors.primary,
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
    transform: [{scale: 1}],
  },
  disabled: {
    backgroundColor: colors.disabled,
    opacity: 0.7,
  },
  text: {
    color: colors.textDark,
    fontSize: 16,
    fontWeight: '600',
  },
});

export default Button;
