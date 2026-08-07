import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import TabNavigator from './TabNavigator';
import ProductDetail from '../screens/ProductDetail';
import { useTheme } from '../theme/ThemeContext';
import Policy from '../screens/Policy';

export type RootStackParamList = {
  Tabs: undefined;
  ProductDetail: { id: number };
  ReturnPolicy: undefined;
};

const Stack = createNativeStackNavigator<RootStackParamList>();

const AppNavigator = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="Tabs"
        component={TabNavigator}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="ProductDetail"
        component={ProductDetail}
        options={{ title: 'Product Details', headerShown: false }}
      />
      <Stack.Screen
        name="ReturnPolicy"
        component={Policy}
        options={{ title: 'Return Policy', headerShown: false }}
      />
    </Stack.Navigator>
  );
};

export default AppNavigator;
