import React, {useEffect, useState, useCallback} from 'react';
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  ActivityIndicator,
} from 'react-native';
import Icon from 'react-native-vector-icons/Feather';
import {colors} from '../../constants/colors';
import {useAuth} from '../../hooks/useAuth';
import {Order} from '../../types/order';
import {getOrders} from '../../api/orders';

export const OrdersScreen = () => {
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);
  const {user} = useAuth();

  const fetchOrders = useCallback(async () => {
    if (!user?.id) {
      return;
    }

    try {
      const response = await getOrders(user.id);
      setOrders(response);
    } catch (error) {
      console.error('Error fetching orders:', error);
    } finally {
      setLoading(false);
    }
  }, [user?.id]);

  const keyExtractor = useCallback(
    (item: Order) => item.id?.toString() || '',
    [],
  );

  useEffect(() => {
    fetchOrders();
  }, [fetchOrders]);

  const renderItem = useCallback(
    ({item}: {item: Order}) => (
      <View style={styles.orderCard}>
        <View style={styles.orderHeader}>
          <Text style={styles.orderDate}>
            Fecha: {new Date(item.date).toLocaleDateString()}
          </Text>
          <View style={styles.statusContainer}>
            <Text style={styles.statusText}>{item.status}</Text>
          </View>
        </View>

        <View style={styles.orderDetails}>
          {item.products.map(product => (
            <Text key={product.productId} style={styles.productText}>
              • {product.quantity}x Producto ID: {product.productId}
            </Text>
          ))}
        </View>

        <View style={styles.orderFooter}>
          <Text style={styles.totalText}>
            Total: Bs. {item.total.toLocaleString()}
          </Text>
        </View>
      </View>
    ),
    [],
  );

  if (loading) {
    return (
      <View style={styles.mainContainer}>
        <View style={styles.loadingContainer}>
          <ActivityIndicator size="large" color={colors.primary} />
        </View>
      </View>
    );
  }

  if (orders.length === 0) {
    return (
      <View style={styles.mainContainer}>
        <View style={styles.emptyContainer}>
          <Icon name="shopping-bag" size={48} color={colors.text + '80'} />
          <Text style={styles.emptyText}>No tienes pedidos realizados</Text>
        </View>
      </View>
    );
  }

  return (
    <View style={styles.mainContainer}>
      <FlatList
        data={orders}
        renderItem={renderItem}
        keyExtractor={keyExtractor}
        contentContainerStyle={styles.container}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    backgroundColor: colors.background,
  },
  container: {
    padding: 16,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  emptyContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  emptyText: {
    color: colors.text,
    fontSize: 16,
    marginTop: 10,
  },
  orderCard: {
    backgroundColor: colors.backgroundDark,
    borderRadius: 12,
    padding: 16,
    marginBottom: 16,
  },
  orderHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  orderDate: {
    color: colors.text,
    fontSize: 14,
  },
  statusContainer: {
    backgroundColor: colors.primary + '20',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
  },
  statusText: {
    color: colors.primary,
    fontSize: 12,
    fontWeight: '600',
  },
  orderDetails: {
    borderTopWidth: 1,
    borderBottomWidth: 1,
    borderColor: colors.backgroundDarker,
    paddingVertical: 12,
    marginBottom: 12,
  },
  productText: {
    color: colors.text,
    fontSize: 14,
    marginBottom: 4,
  },
  orderFooter: {
    alignItems: 'flex-end',
  },
  totalText: {
    color: colors.primary,
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default OrdersScreen;
