import React, {useState, useEffect} from 'react';
import {
  View,
  Text,
  Image,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  ActivityIndicator,
  Alert,
} from 'react-native';
import {useNavigation, useRoute} from '@react-navigation/native';
import Icon from 'react-native-vector-icons/Feather';
import {getProductById} from '../../api/products';
import {Product} from '../../types/product';
import {colors} from '../../constants/colors';
import {useCart} from '../../context/CartContext';

export const ProductDetailScreen = () => {
  const navigation = useNavigation();
  const route = useRoute();
  const {addToCart} = useCart();
  const [product, setProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState(true);
  const [quantity, setQuantity] = useState(1);

  const productId = (route.params as any)?.productId;

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const data = await getProductById(productId);
        setProduct(data);
      } catch (error) {
        Alert.alert('Error', 'No se pudo cargar el producto');
      } finally {
        setLoading(false);
      }
    };

    fetchProduct();
  }, [productId]);

  const handleAddToCart = () => {
    if (product) {
      addToCart(product, quantity);
      Alert.alert('Éxito', 'Producto agregado al carrito');
    }
  };

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color={colors.primary} />
      </View>
    );
  }

  if (!product) {
    return (
      <View style={styles.errorContainer}>
        <Text style={styles.errorText}>Producto no encontrado</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <ScrollView showsVerticalScrollIndicator={false}>
        {/* Header con botón de retroceso */}
        <View style={styles.header}>
          <TouchableOpacity
            onPress={() => navigation.goBack()}
            style={styles.backButton}>
            <Icon name="arrow-left" size={24} color={colors.text} />
          </TouchableOpacity>
        </View>

        {/* Imagen del producto */}
        <View style={styles.imageContainer}>
          {product.images?.[0] ? (
            <Image
              source={{uri: `http://10.0.2.2:3001/${product.images[0]}`}}
              style={styles.image}
              resizeMode="cover"
            />
          ) : (
            <View style={styles.placeholderImage}>
              <Icon name="image" size={50} color={colors.text} />
            </View>
          )}
        </View>

        {/* Información del producto */}
        <View style={styles.infoContainer}>
          <View style={styles.categoryContainer}>
            <Text style={styles.category}>{product.category}</Text>
          </View>

          <Text style={styles.title}>{product.name}</Text>
          <Text style={styles.description}>{product.description}</Text>

          <View style={styles.priceContainer}>
            <Text style={styles.price}>
              Bs. {product.price.toLocaleString()}
            </Text>
            <View style={styles.location}>
              <Icon name="map-pin" size={14} color={colors.text} />
              <Text style={styles.locationText}>{product.condominio}</Text>
            </View>
          </View>

          {/* Control de cantidad */}
          <View style={styles.quantityContainer}>
            <TouchableOpacity
              onPress={() => quantity > 1 && setQuantity(q => q - 1)}
              style={styles.quantityButton}>
              <Icon name="minus" size={20} color={colors.text} />
            </TouchableOpacity>
            <Text style={styles.quantityText}>{quantity}</Text>
            <TouchableOpacity
              onPress={() => setQuantity(q => q + 1)}
              style={styles.quantityButton}>
              <Icon name="plus" size={20} color={colors.text} />
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>

      {/* Botón de agregar al carrito */}
      <View style={styles.footer}>
        <TouchableOpacity
          style={styles.addToCartButton}
          onPress={handleAddToCart}>
          <Icon name="shopping-cart" size={20} color={colors.backgroundDark} />
          <Text style={styles.addToCartText}>Agregar al carrito</Text>
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
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  errorContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  errorText: {
    color: colors.text,
    fontSize: 16,
  },
  header: {
    padding: 16,
    flexDirection: 'row',
    alignItems: 'center',
  },
  backButton: {
    padding: 8,
  },
  imageContainer: {
    width: '100%',
    height: 300,
    backgroundColor: colors.backgroundDark,
  },
  image: {
    width: '100%',
    height: '100%',
  },
  placeholderImage: {
    width: '100%',
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: colors.backgroundDark,
  },
  infoContainer: {
    padding: 16,
  },
  categoryContainer: {
    backgroundColor: `${colors.primary}20`,
    paddingHorizontal: 12,
    paddingVertical: 4,
    borderRadius: 16,
    alignSelf: 'flex-start',
    borderWidth: 1,
    borderColor: `${colors.primary}30`,
  },
  category: {
    color: colors.primary,
    fontSize: 12,
    fontWeight: '600',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: colors.text,
    marginTop: 12,
  },
  description: {
    fontSize: 16,
    color: colors.text + '80',
    marginTop: 8,
    lineHeight: 24,
  },
  priceContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 16,
  },
  price: {
    fontSize: 24,
    fontWeight: 'bold',
    color: colors.primary,
  },
  location: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  locationText: {
    color: colors.text + '80',
    fontSize: 14,
  },
  quantityContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 24,
    gap: 16,
  },
  quantityButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: colors.backgroundDark,
    justifyContent: 'center',
    alignItems: 'center',
  },
  quantityText: {
    fontSize: 18,
    color: colors.text,
    minWidth: 40,
    textAlign: 'center',
  },
  footer: {
    padding: 16,
    borderTopWidth: 1,
    borderTopColor: colors.backgroundDark,
  },
  addToCartButton: {
    flexDirection: 'row',
    backgroundColor: colors.primary,
    padding: 16,
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
    gap: 8,
  },
  addToCartText: {
    color: colors.backgroundDark,
    fontSize: 16,
    fontWeight: 'bold',
  },
});
