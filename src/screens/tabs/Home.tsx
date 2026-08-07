import {
  View,
  Text,
  StyleSheet,
  Pressable,
  TextInput,
  ActivityIndicator,
  Keyboard,
} from 'react-native';
import React, { useState, useEffect } from 'react';
import { useTheme } from '../../theme/ThemeContext';
import { SafeAreaView } from 'react-native-safe-area-context';
import Ionicons from '@react-native-vector-icons/ionicons/static';
import ProductCard from '../../components/Home/ProductCard';
import { Product } from '../../types/product';
import { FlashList } from '@shopify/flash-list';
import useDebounce from '../../hooks/useDebounce';
import { getProducts, searchProducts } from '../../api/productApi';

const Home = () => {
  const { colors, setThemeMode, isDark } = useTheme();
  const styles = createStyles(colors);

  const [products, setProducts] = useState<Product[]>([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [loading, setLoading] = useState(false);
  const [skip, setSkip] = useState(0);
  const [hasMore, setHasMore] = useState(true);

  const debouncedSearch = useDebounce(searchQuery, 500);
  const limit = 10;

  const loadProducts = async (isReset = false) => {
    if (loading || (!hasMore && !isReset)) return;

    setLoading(true);
    const currentSkip = isReset ? 0 : skip;

    try {
      let response;
      if (debouncedSearch.trim().length > 0) {
        response = await searchProducts({
          query: debouncedSearch,
          limit,
          skip: currentSkip,
        });
      } else {
        response = await getProducts({ limit, skip: currentSkip });
      }

      setProducts(prev =>
        isReset ? response.products : [...prev, ...response.products],
      );
      setSkip(currentSkip + limit);

      if (response.products.length < limit || response.products.length === 0) {
        setHasMore(false);
      } else {
        setHasMore(true);
      }
    } catch (error) {
      console.error('Error fetching products:', error);
    } finally {
      setLoading(false);
    }
  };

  // eslint-disable-next-line react-hooks/exhaustive-deps
  useEffect(() => {
    loadProducts(true);
  }, [debouncedSearch]);

  const handleLoadMore = () => {
    loadProducts(false);
  };

  return (
    <View style={styles.Container}>
      <SafeAreaView style={styles.SafeContainer}>
        {/* Header Section */}
        <View style={styles.HeaderContainer}>
          <View style={styles.HeaderLeft}>
            {/* Avatar */}
            <View style={styles.Avatar}>
              <Text style={styles.AvatarText}>A</Text>
            </View>

            {/* Title & Subtitle */}
            <View style={styles.TitleContainer}>
              <Text style={styles.Title}>ShopEase</Text>
              <Text style={styles.Subtitle}>Curated everyday goods</Text>
            </View>
          </View>

          {/* Theme Toggle Button */}
          <Pressable
            style={styles.ThemeToggle}
            onPress={() => setThemeMode(isDark ? 'light' : 'dark')}
          >
            <Ionicons
              name={isDark ? 'sunny-outline' : 'moon-outline'}
              size={18}
              color={colors.foreground}
            />
          </Pressable>
        </View>

        {/* Search Bar */}
        <View style={styles.SearchParentContainer}>
          <View style={styles.SearchContainer}>
            <Ionicons
              name="search-outline"
              size={20}
              color={colors.mutedForeground}
              style={styles.SearchIcon}
            />
            <TextInput
              style={styles.SearchInput}
              placeholder="Search products or brands"
              placeholderTextColor={colors.mutedForeground}
              value={searchQuery}
              onChangeText={setSearchQuery}
            />
          </View>
        </View>
        <View style={styles.ProductContainer}>
          <FlashList
            data={products}
            numColumns={2}
            renderItem={({ item, index }) => (
              <View>
                <ProductCard product={item} />
              </View>
            )}
            onEndReached={handleLoadMore}
            onEndReachedThreshold={0.5}
            keyExtractor={(item, index) => item.id.toString() + index}
            showsVerticalScrollIndicator={false}
            ListFooterComponent={() =>
              loading ? (
                <ActivityIndicator
                  size="large"
                  color={colors.primary}
                  style={{ marginVertical: 20 }}
                />
              ) : null
            }
            ListEmptyComponent={() =>
              !loading ? (
                <Text style={styles.EmptyText}>No products found.</Text>
              ) : null
            }
          />
        </View>
      </SafeAreaView>
    </View>
  );
};

const createStyles = (colors: any) =>
  StyleSheet.create({
    Container: {
      flex: 1,
      backgroundColor: colors.background,
    },
    SafeContainer: {
      flex: 1,
      paddingHorizontal: 5,
      paddingTop: 10,
    },
    HeaderContainer: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      marginBottom: 10,
      padding: 10,
    },
    HeaderLeft: {
      flexDirection: 'row',
      alignItems: 'center',
    },
    Avatar: {
      width: 44,
      height: 44,
      borderRadius: 22,
      backgroundColor: colors.primary,
      justifyContent: 'center',
      alignItems: 'center',
      marginRight: 12,
    },
    AvatarText: {
      color: colors.primaryForeground,
      fontSize: 20,
      fontWeight: '800',
    },
    TitleContainer: {
      justifyContent: 'center',
    },
    Title: {
      fontSize: 20,
      fontWeight: 'bold',
      color: colors.foreground,
      marginBottom: 1,
    },
    Subtitle: {
      fontSize: 14,
      color: colors.mutedForeground,
    },
    ThemeToggle: {
      width: 40,
      height: 40,
      borderRadius: 22,
      backgroundColor: colors.secondary,
      justifyContent: 'center',
      alignItems: 'center',
    },
    SearchParentContainer: {
      paddingHorizontal: 10,
    },
    SearchContainer: {
      flexDirection: 'row',
      alignItems: 'center',
      backgroundColor: colors.secondary,
      borderRadius: 24,
      paddingHorizontal: 16,
      height: 52,
    },
    SearchIcon: {
      marginRight: 10,
    },
    SearchInput: {
      flex: 1,
      fontSize: 16,
      color: colors.foreground,
    },
    ProductContainer: {
      flex: 1,
      paddingTop: 20,
    },
    EmptyText: {
      textAlign: 'center',
      color: colors.mutedForeground,
      marginTop: 40,
      fontSize: 16,
    },
  });

export default Home;
