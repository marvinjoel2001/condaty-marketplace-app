import React, {useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  TouchableOpacity,
  Image,
  ListRenderItem,
  Alert,
  ActivityIndicator,
} from 'react-native';
import Icon from 'react-native-vector-icons/Feather';
import {useCart} from '../../context/CartContext';
import {useAuth} from '../../hooks/useAuth';
import {colors} from '../../constants/colors';
import {CartItem} from '../../types/cart';
import {createOrder} from '../../api/orders';

export const CartScreen = () => {
  const {items, removeFromCart, updateQuantity, total, clearCart} = useCart();
  const {user} = useAuth();
  const [isLoading, setIsLoading] = useState(false);

  const handleConfirmOrder = async () => {
    if (!user) {
      Alert.alert('Error', 'Debes iniciar sesión para realizar un pedido');
      return;
    }

    try {
      setIsLoading(true);
      const order = {
        userId: user.id,
        products: items.map(item => ({
          productId: item.product.id,
          quantity: item.quantity,
        })),
        total,
        status: 'pending' as const,
        date: new Date().toISOString().split('T')[0],
      };

      await createOrder(order);
      clearCart();
      Alert.alert('Éxito', 'Tu pedido ha sido confirmado', [{text: 'OK'}]);
    } catch (error) {
      Alert.alert(
        'Error',
        'No se pudo procesar tu pedido. Por favor, intenta nuevamente.',
      );
    } finally {
      setIsLoading(false);
    }
  };

  const renderItem: ListRenderItem<CartItem> = ({item}) => (
    <View style={styles.cartItem}>
      <Image
        source={{
          uri:
            item.product.images && item.product.images.length > 0
              ? `http://10.0.2.2:3001/${item.product.images[0]}`
              : undefined,
        }}
        style={styles.productImage}
        defaultSource={require('../../assets/images/placeholder.png')}
      />
      <View style={styles.productInfo}>
        <Text style={styles.productName}>{item.product.name}</Text>
        <Text style={styles.productPrice}>
          Bs. {(item.product.price * item.quantity).toLocaleString()}
        </Text>
        <View style={styles.quantityContainer}>
          <TouchableOpacity
            onPress={() =>
              item.quantity > 1 &&
              updateQuantity(item.product.id, item.quantity - 1)
            }
            style={styles.quantityButton}>
            <Icon name="minus" size={16} color={colors.text} />
          </TouchableOpacity>
          <Text style={styles.quantityText}>{item.quantity}</Text>
          <TouchableOpacity
            onPress={() => updateQuantity(item.product.id, item.quantity + 1)}
            style={styles.quantityButton}>
            <Icon name="plus" size={16} color={colors.text} />
          </TouchableOpacity>
        </View>
      </View>
      <TouchableOpacity
        onPress={() => removeFromCart(item.product.id)}
        style={styles.removeButton}>
        <Icon name="trash-2" size={20} color={colors.error} />
      </TouchableOpacity>
    </View>
  );

  if (items.length === 0) {
    return (
      <View style={styles.emptyContainer}>
        <Icon name="shopping-cart" size={48} color={colors.text + '80'} />
        <Text style={styles.emptyText}>Tu carrito está vacío</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <FlatList
        data={items}
        renderItem={renderItem}
        keyExtractor={item => item.product.id.toString()}
        contentContainerStyle={styles.listContainer}
      />
      <View style={styles.footer}>
        <View style={styles.totalContainer}>
          <Text style={styles.totalLabel}>Total:</Text>
          <Text style={styles.totalAmount}>Bs. {total.toLocaleString()}</Text>
        </View>
        <TouchableOpacity
          style={[
            styles.checkoutButton,
            isLoading && styles.checkoutButtonDisabled,
          ]}
          onPress={handleConfirmOrder}
          disabled={isLoading || items.length === 0}>
          {isLoading ? (
            <ActivityIndicator color={colors.backgroundDark} />
          ) : (
            <Text style={styles.checkoutButtonText}>Confirmar pedido</Text>
          )}
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  listContainer: {
    padding: 16,
  },
  cartItem: {
    flexDirection: 'row',
    backgroundColor: colors.backgroundDark,
    borderRadius: 12,
    padding: 12,
    marginBottom: 12,
  },
  productImage: {
    width: 80,
    height: 80,
    borderRadius: 8,
    backgroundColor: colors.backgroundDarker,
  },
  productInfo: {
    flex: 1,
    marginLeft: 12,
    justifyContent: 'space-between',
  },
  productName: {
    fontSize: 16,
    fontWeight: '600',
    color: colors.text,
  },
  productPrice: {
    fontSize: 14,
    color: colors.primary,
    fontWeight: '600',
  },
  quantityContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  quantityButton: {
    width: 28,
    height: 28,
    borderRadius: 14,
    backgroundColor: colors.backgroundDarker,
    justifyContent: 'center',
    alignItems: 'center',
  },
  quantityText: {
    color: colors.text,
    fontSize: 14,
    minWidth: 20,
    textAlign: 'center',
  },
  removeButton: {
    padding: 8,
  },
  footer: {
    padding: 16,
    borderTopWidth: 1,
    borderTopColor: colors.backgroundDark,
  },
  totalContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  totalLabel: {
    fontSize: 16,
    color: colors.text,
  },
  totalAmount: {
    fontSize: 20,
    fontWeight: 'bold',
    color: colors.primary,
  },
  checkoutButton: {
    backgroundColor: colors.primary,
    padding: 16,
    borderRadius: 8,
    alignItems: 'center',
  },
  checkoutButtonText: {
    color: colors.backgroundDark,
    fontSize: 16,
    fontWeight: 'bold',
  },
  emptyContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    gap: 12,
  },
  emptyText: {
    color: colors.text,
    fontSize: 16,
  },
  checkoutButtonDisabled: {
    opacity: 0.7,
  },
});
