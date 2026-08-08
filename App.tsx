import React, { useEffect } from 'react';
import {
  StatusBar,
  StyleSheet,
  useColorScheme,
  ActivityIndicator,
  View,
  AppState,
  Text,
  TouchableOpacity,
} from 'react-native';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { NavigationContainer } from '@react-navigation/native';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
import Toast from 'react-native-toast-message';
import { PersistQueryClientProvider } from '@tanstack/react-query-persist-client';
import { store, persistor } from './src/store/store';
import { queryClient, asyncStoragePersister } from './src/services/queryClient';
import { ThemeProvider, useTheme } from './src/theme/ThemeContext';
import AppNavigator from './src/navigation/AppNavigator';
import { useNetworkStatus } from './src/hooks/useNetworkStatus';
import { Analytics } from './src/services/analytics';
import Ionicons from '@react-native-vector-icons/ionicons/static';

const toastConfig = {
  success: (props: any) => (
    <View
      style={{
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#10B981',
        paddingVertical: 12,
        paddingHorizontal: 20,
        borderRadius: 999,
        width: '90%',
        maxWidth: 400,
        justifyContent: 'space-between',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 5,
      }}
    >
      <View style={{ flexDirection: 'row', alignItems: 'center', flex: 1 }}>
        <Ionicons
          name="checkmark-circle"
          size={24}
          color="#FFF"
          style={{ marginRight: 10 }}
        />
        <Text style={{ color: '#FFF', fontSize: 16, fontWeight: '600' }}>
          {props.text1}
        </Text>
      </View>
      <TouchableOpacity
        onPress={() => Toast.hide()}
        style={{ padding: 4 }}
        hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}
      >
        <Ionicons name="close" size={24} color="#FFF" />
      </TouchableOpacity>
    </View>
  ),
};

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
  useEffect(() => {
    const subscription = AppState.addEventListener('change', nextAppState => {
      if (nextAppState === 'background') {
        Analytics.logEvent('app_backgrounded');
      }
    });

    return () => {
      subscription.remove();
    };
  }, []);

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
            maxAge: 1000 * 60 * 60 * 24,
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
      <Toast config={toastConfig} position="bottom" bottomOffset={60} />
    </Provider>
  );
}

export default App;
