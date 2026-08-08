import {
  View,
  Text,
  StyleSheet,
  Pressable,
  TextInput,
  ActivityIndicator,
} from 'react-native';
import React, { useState, useMemo, useEffect } from 'react';
import { useTheme } from '../../theme/ThemeContext';
import { SafeAreaView } from 'react-native-safe-area-context';
import Ionicons from '@react-native-vector-icons/ionicons/static';
import ProductCard from '../../components/Home/ProductCard';
import { FlashList } from '@shopify/flash-list';
import useDebounce from '../../hooks/useDebounce';
import { getProducts, searchProducts } from '../../api/productApi';
import { useInfiniteQuery } from '@tanstack/react-query';
import { Analytics } from '../../services/analytics';

const LIMIT = 10;

const Home = () => {
  const { colors, setThemeMode, isDark } = useTheme();
  const styles = createStyles(colors);

  const [searchQuery, setSearchQuery] = useState('');
  const debouncedSearch = useDebounce(searchQuery, 500);

  const isSearching = debouncedSearch.trim().length > 0;

  useEffect(() => {
    if (isSearching) {
      Analytics.logEvent('search_performed', { query: debouncedSearch });
    }
  }, [debouncedSearch, isSearching]);

  const {
    data,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    isLoading,
    refetch,
    isRefetching,
  } = useInfiniteQuery({
    queryKey: isSearching
      ? ['products', 'search', debouncedSearch]
      : ['products', 'list'],
    queryFn: async ({ pageParam = 0 }) => {
      if (isSearching) {
        return searchProducts({
          query: debouncedSearch,
          limit: LIMIT,
          skip: pageParam,
        });
      }
      return getProducts({ limit: LIMIT, skip: pageParam });
    },
    getNextPageParam: (lastPage, allPages) => {
      const totalFetched = allPages.reduce(
        (sum, page) => sum + page.products.length,
        0,
      );
      if (lastPage.products.length < LIMIT || totalFetched >= lastPage.total) {
        return undefined;
      }
      return totalFetched;
    },
    initialPageParam: 0,
  });

  const products = useMemo(() => {
    return data?.pages.flatMap(page => page.products) ?? [];
  }, [data]);

  const handleLoadMore = () => {
    if (hasNextPage && !isFetchingNextPage) {
      fetchNextPage();
    }
  };

  const handleRefresh = () => {
    refetch();
  };

  return (
    <View style={styles.Container}>
      <SafeAreaView style={styles.SafeContainer}>
        {/* Header Section */}
        <View style={styles.HeaderContainer}>
          <View style={styles.HeaderLeft}>
            {/* Avatar */}
            <View style={styles.Avatar}>
              <Text style={styles.AvatarText}>S</Text>
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
            {searchQuery.length > 0 && (
              <Pressable
                onPress={() => setSearchQuery('')}
                style={styles.ClearButton}
              >
                <Ionicons
                  name="close-circle"
                  size={20}
                  color={colors.mutedForeground}
                />
              </Pressable>
            )}
          </View>
        </View>
        <View style={styles.ProductContainer}>
          <FlashList
            data={products}
            numColumns={2}
            renderItem={({ item, index }) => (
              <View key={index}>
                <ProductCard product={item} />
              </View>
            )}
            onRefresh={handleRefresh}
            refreshing={isRefetching && !isFetchingNextPage}
            onEndReached={handleLoadMore}
            onEndReachedThreshold={0.5}
            keyExtractor={(item, index) => item.id.toString() + index}
            showsVerticalScrollIndicator={false}
            ListFooterComponent={() =>
              isFetchingNextPage || isLoading ? (
                <ActivityIndicator
                  size="large"
                  color={colors.primary}
                  style={{ marginVertical: 20 }}
                />
              ) : null
            }
            ListEmptyComponent={() =>
              !isLoading ? (
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
      fontWeight: '900',
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
      borderWidth: 1,
      borderColor: colors.border,
    },
    SearchIcon: {
      marginRight: 10,
    },
    SearchInput: {
      flex: 1,
      fontSize: 16,
      color: colors.foreground,
    },
    ClearButton: {
      padding: 4,
    },
    ProductContainer: {
      flex: 1,
      paddingTop: 10,
    },
    EmptyText: {
      textAlign: 'center',
      color: colors.mutedForeground,
      marginTop: 40,
      fontSize: 16,
    },
  });

export default Home;
