import { View, StyleSheet, ActivityIndicator } from 'react-native';
import React from 'react';
import { useTheme } from '../theme/ThemeContext';
import Header from '../components/Header';
import { SafeAreaView } from 'react-native-safe-area-context';
import { WebView } from 'react-native-webview';

const Policy = () => {
  const { colors, shadows } = useTheme();
  const styles = createStyles(colors, shadows);

  return (
    <View style={styles.Container}>
      <SafeAreaView
        style={styles.SafeContainer}
        edges={['top', 'left', 'right']}
      >
        <Header title="Return Policy" />
        <View style={styles.WebViewContainer}>
          <WebView
            source={{
              uri: 'https://www.freeprivacypolicy.com/live/e9d05daa-7aaa-4156-af58-35800bb64fa5',
            }}
            style={styles.WebView}
            startInLoadingState={true}
            renderLoading={() => (
              <ActivityIndicator
                size="large"
                color={colors.primary}
                style={styles.Loading}
              />
            )}
            javaScriptEnabled={true}
            domStorageEnabled={true}
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
    SafeContainer: {
      flex: 1,
    },
    WebViewContainer: {
      flex: 1,
    },
    WebView: {
      flex: 1,
      backgroundColor: colors.background,
    },
    Loading: {
      position: 'absolute',
      top: 0,
      bottom: 0,
      left: 0,
      right: 0,
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: colors.background,
    },
  });

export default Policy;
