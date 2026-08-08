import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  ActivityIndicator,
  TouchableOpacity,
  Linking,
} from 'react-native';
import React, { useEffect } from 'react';
import { useTheme } from '../theme/ThemeContext';
import { RouteProp, useNavigation, useRoute } from '@react-navigation/native';
import { RootStackParamList } from '../navigation/AppNavigator';
import { getProductById } from '../api/productApi';
import { Product } from '../types/product';
import { useDispatch, useSelector } from 'react-redux';
import { addToCart } from '../store/slices/cartSlice';
import Ionicons from '@react-native-vector-icons/ionicons/static';
import Toast from 'react-native-toast-message';
import { useQuery } from '@tanstack/react-query';
import { Analytics } from '../services/analytics';

import ProductHeaderImage from '../components/productDetails/ProductHeaderImage';
import ProductTitleInfo from '../components/productDetails/ProductTitleInfo';
import ProductPriceBox from '../components/productDetails/ProductPriceBox';
import ProductDescription from '../components/productDetails/ProductDescription';
import ProductInfoList from '../components/productDetails/ProductInfoList';
import ProductSpecifications from '../components/productDetails/ProductSpecifications';
import ProductReviews from '../components/productDetails/ProductReviews';
import ProductBottomBar from '../components/productDetails/ProductBottomBar';
import { RootState } from '../store/store';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { SafeAreaView } from 'react-native-safe-area-context';

type ProductDetailRouteProp = RouteProp<RootStackParamList, 'ProductDetail'>;

const ProductDetail = () => {
  const navigation =
    useNavigation<NativeStackNavigationProp<RootStackParamList>>();
  const { colors, shadows } = useTheme();
  const styles = createStyles(colors, shadows);
  const route = useRoute<ProductDetailRouteProp>();
  const { id } = route.params;
  const dispatch = useDispatch();
  const cartItems = useSelector((state: RootState) => state.cart.items);

  const { data: product, isLoading: loading } = useQuery({
    queryKey: ['product', id],
    queryFn: () => getProductById(id),
  });

  useEffect(() => {
    if (product) {
      Analytics.logEvent('product_viewed', {
        productId: product.id,
        productName: product.title,
      });
    }
  }, [product]);

  const handleAddToCart = () => {
    if (product) {
      Analytics.logEvent('add_to_cart', {
        productId: product.id,
        productName: product.title,
      });
      dispatch(addToCart({ ...product, count: 1 }));
      Toast.show({
        type: 'success',
        text1: 'Product added',
        position: 'bottom',
      });
    }
  };

  if (loading) {
    return (
      <View style={[styles.Container, styles.center]}>
        <ActivityIndicator size="large" color={colors.primary} />
      </View>
    );
  }

  if (!product) {
    return (
      <View style={[styles.Container, styles.center]}>
        <Text style={{ color: colors.foreground }}>Product not found.</Text>
      </View>
    );
  }

  return (
    <View style={styles.Container}>
      <SafeAreaView
        edges={['top', 'left', 'right', 'bottom']}
        style={{ flex: 1 }}
      >
        <ScrollView
          showsVerticalScrollIndicator={false}
          contentContainerStyle={styles.scrollContent}
        >
          <ProductHeaderImage images={product.images && product.images.length > 0 ? product.images : [product.thumbnail]} />

          <ProductTitleInfo
            brand={product.brand}
            title={product.title}
            rating={product.rating}
            reviewsCount={product.reviews?.length || 0}
            stock={product.stock}
            tags={product.tags}
          />
          {product.price && (
            <ProductPriceBox
              price={product.price}
              discountPercentage={product.discountPercentage}
            />
          )}
          {product.description && (
            <ProductDescription description={product.description} />
          )}
          {product.shippingInformation &&
            product.warrantyInformation &&
            product.returnPolicy &&
            product.minimumOrderQuantity && (
              <ProductInfoList
                shippingInformation={product.shippingInformation}
                warrantyInformation={product.warrantyInformation}
                returnPolicy={product.returnPolicy}
                minimumOrderQuantity={product.minimumOrderQuantity}
              />
            )}
          {product.category &&
            product.sku &&
            product.weight &&
            product.dimensions &&
            product.minimumOrderQuantity &&
            product.meta?.barcode && (
              <ProductSpecifications
                category={product.category}
                sku={product.sku}
                weight={product.weight}
                dimensions={product.dimensions}
                minimumOrderQuantity={product.minimumOrderQuantity}
                barcode={product.meta?.barcode}
              />
            )}

          {product.reviews && product.reviews.length > 0 && (
            <ProductReviews reviews={product.reviews} />
          )}

          <View style={styles.returnPolicyContainer}>
            <TouchableOpacity
              style={[
                styles.returnPolicyButton,
                { borderColor: colors.primary },
              ]}
              activeOpacity={0.7}
              onPress={() => {
                navigation.navigate('ReturnPolicy');
              }}
            >
              <Text
                style={[styles.returnPolicyText, { color: colors.primary }]}
              >
                Return Policy
              </Text>
              <Ionicons
                name="open-outline"
                size={16}
                color={colors.primary}
                style={{ marginLeft: 6 }}
              />
            </TouchableOpacity>
          </View>
        </ScrollView>

        <View style={styles.bottomBarWrapper}>
          <ProductBottomBar
            price={product.price}
            discountPercentage={product.discountPercentage}
            onAddToCart={handleAddToCart}
            isAdded={cartItems.some(item => item.id === product.id)}
          />
        </View>
      </SafeAreaView>
    </View>
  );
};

const createStyles = (colors: any, shadows: any) =>
  StyleSheet.create({
    Container: {
      flex: 1,
      backgroundColor: colors.background,
    },
    center: {
      justifyContent: 'center',
      alignItems: 'center',
    },
    scrollContent: {
      paddingBottom: 100, // Make room for bottom bar
    },
    returnPolicyContainer: {
      paddingHorizontal: 20,
      marginBottom: 32,
    },
    returnPolicyButton: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'center',
      paddingVertical: 14,
      borderRadius: 24,
      borderWidth: 1,
    },
    returnPolicyText: {
      fontSize: 16,
      fontWeight: 'bold',
    },
    bottomBarWrapper: {
      position: 'absolute',
      bottom: 0,
      left: 0,
      right: 0,
    },
  });

export default ProductDetail;
