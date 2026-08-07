import { View, Text, StyleSheet } from 'react-native';
import React from 'react';
import { useTheme } from '../theme/ThemeContext';
import { SafeAreaView } from 'react-native-safe-area-context';

const ProductDetail = () => {
  const { colors, shadows } = useTheme();
  const styles = createStyles(colors, shadows);
  return (
    <View style={styles.Container}>
      <SafeAreaView
        style={styles.SafeContainer}
        edges={['top', 'left', 'right']}
      >
        <Text>hello</Text>
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
    SafeContainer: {
      flex: 1,
    },
  });

export default ProductDetail;
