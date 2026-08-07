import { View, Text, TouchableOpacity, StyleSheet, Image } from 'react-native';
import React from 'react';
import { useTheme } from '../../theme/ThemeContext';
import { Product } from '../../types/product';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '../../navigation/AppNavigator';
import { useDispatch } from 'react-redux';
import { addToCart } from '../../store/slices/cartSlice';

interface ProductCardProps {
  product: Product;
}

const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  const { colors, shadows } = useTheme();
  const styles = createStyles(colors, shadows);
  const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList>>();
  const dispatch = useDispatch();

  // Calculate prices based on discount
  const originalPrice = product.price;
  const discountedPrice =
    originalPrice * (1 - (product.discountPercentage || 0) / 100);

  const handlePressCard = () => {
    navigation.navigate('ProductDetail', { id: product.id });
  };

  const handleAddToCart = () => {
    dispatch(addToCart({ ...product, count: 1 }));
  };

  return (
    <View
      style={{
        flex: 1,
        padding: 10,
      }}
    >
      <TouchableOpacity style={styles.CardContainer} activeOpacity={0.9} onPress={handlePressCard}>
        <View style={styles.InnerContainer}>
          <View style={styles.ImageWrapper}>
            <Image source={{ uri: product.thumbnail }} style={styles.Image} />
            {product.discountPercentage > 0 && (
              <View style={styles.Badge}>
                <Text style={styles.BadgeText}>
                  -{Math.round(product.discountPercentage)}%
                </Text>
              </View>
            )}
          </View>

          <View style={styles.InfoContainer}>
            <Text numberOfLines={1} style={styles.BrandText}>
              {product.brand?.toUpperCase() || 'BRAND'}
            </Text>
            <Text style={styles.TitleText} numberOfLines={2}>
              {product.title}
            </Text>
            <View style={styles.PriceRow}>
              <Text style={styles.DiscountedPriceText}>
                ${Math.round(discountedPrice)}
              </Text>
              {product.discountPercentage > 0 && (
                <Text style={styles.OriginalPriceText}>
                  ${Math.round(originalPrice)}
                </Text>
              )}
            </View>
          </View>
          
          <TouchableOpacity 
            style={styles.AddToCartButton} 
            activeOpacity={0.8}
            onPress={handleAddToCart}
          >
            <Text style={styles.AddToCartText}>Add to Cart</Text>
          </TouchableOpacity>
        </View>
      </TouchableOpacity>
    </View>
  );
};

const createStyles = (colors: any, shadows: any) =>
  StyleSheet.create({
    CardContainer: {
      backgroundColor: colors.card,
      borderRadius: 24,
      height: 310,

      ...shadows.card,
    },
    InnerContainer: {
      flex: 1,
      borderRadius: 24,
      overflow: 'hidden',
    },
    ImageWrapper: {
      height: 140,
      width: '100%',
      backgroundColor: '#F3E1D2', // Peach background from design
      justifyContent: 'center',
      alignItems: 'center',
      position: 'relative',
    },
    Image: {
      width: '70%',
      height: '70%',
      resizeMode: 'contain',
    },
    Badge: {
      position: 'absolute',
      top: 10,
      left: 10,
      backgroundColor: colors.primary,
      paddingHorizontal: 8,
      paddingVertical: 4,
      borderRadius: 16,
    },
    BadgeText: {
      color: colors.primaryForeground,
      fontWeight: 'bold',
      fontSize: 10,
    },
    InfoContainer: {
      padding: 10,
    },
    BrandText: {
      color: colors.mutedForeground,
      fontSize: 12,
      fontWeight: '600',
      letterSpacing: 1.5,
      marginBottom: 8,
    },
    TitleText: {
      color: colors.foreground,
      fontSize: 14,
      fontWeight: 'bold',
      marginBottom: 8,
      lineHeight: 20,
    },
    PriceRow: {
      flexDirection: 'row',
      alignItems: 'center',
    },
    DiscountedPriceText: {
      color: colors.foreground,
      fontSize: 18,
      fontWeight: '900',
      marginRight: 6,
    },
    OriginalPriceText: {
      color: colors.mutedForeground,
      fontSize: 12,
      textDecorationLine: 'line-through',
      fontWeight: '500',
    },
    AddToCartButton: {
      width: '100%',
      height: 40,
      backgroundColor: colors.primary,
      justifyContent: 'center',
      alignItems: 'center',
      marginTop: 'auto',
    },
    AddToCartText: {
      color: colors.primaryForeground,
      fontWeight: 'bold',
      fontSize: 14,
    },
  });

export default ProductCard;
