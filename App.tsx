import React from 'react';
import {
  StatusBar,
  StyleSheet,
  useColorScheme,
  ActivityIndicator,
  View,
} from 'react-native';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { NavigationContainer } from '@react-navigation/native';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
import { PersistQueryClientProvider } from '@tanstack/react-query-persist-client';
import { store, persistor } from './src/store/store';
import { queryClient, asyncStoragePersister } from './src/services/queryClient';
import { ThemeProvider, useTheme } from './src/theme/ThemeContext';
import AppNavigator from './src/navigation/AppNavigator';
import { useNetworkStatus } from './src/hooks/useNetworkStatus';

function ThemeAwareStatusBar() {
  const { isDark, colors } = useTheme();
  useNetworkStatus();
  return (
    <StatusBar
      backgroundColor={colors.muted}
      barStyle={isDark ? 'light-content' : 'dark-content'}
    />
  );
}

function App() {
  return (
    <Provider store={store}>
      <PersistGate
        loading={
          <View
            style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}
          >
            <ActivityIndicator size="large" />
          </View>
        }
        persistor={persistor}
      >
        <PersistQueryClientProvider
          client={queryClient}
          persistOptions={{
            persister: asyncStoragePersister,
            maxAge: 1000 * 60 * 60 * 24, // 24 hours — match gcTime
          }}
        >
          <ThemeProvider>
            <SafeAreaProvider>
              <ThemeAwareStatusBar />
              <NavigationContainer>
                <AppNavigator />
              </NavigationContainer>
            </SafeAreaProvider>
          </ThemeProvider>
        </PersistQueryClientProvider>
      </PersistGate>
    </Provider>
  );
}

export default App;
