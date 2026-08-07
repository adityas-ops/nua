import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import Ionicons from '@react-native-vector-icons/ionicons/static';
import { useTheme } from '../../theme/ThemeContext';

interface Props {
  shippingInformation: string;
  warrantyInformation: string;
  returnPolicy: string;
  minimumOrderQuantity: number;
}

const ProductInfoList: React.FC<Props> = ({
  shippingInformation,
  warrantyInformation,
  returnPolicy,
  minimumOrderQuantity,
}) => {
  const { colors } = useTheme();

  const infoItems = [
    {
      label: 'SHIPPING',
      value: shippingInformation,
      icon: 'car-outline',
    },
    {
      label: 'WARRANTY',
      value: warrantyInformation,
      icon: 'shield-checkmark-outline',
    },
    {
      label: 'RETURNS',
      value: returnPolicy,
      icon: 'refresh-outline',
    },
    {
      label: 'MINIMUM ORDER',
      value: `${minimumOrderQuantity} unit${
        minimumOrderQuantity > 1 ? 's' : ''
      }`,
      icon: 'cube-outline',
    },
  ];

  return (
    <View style={styles.container}>
      {infoItems.map((item, index) => (
        <View
          key={index}
          style={[
            styles.card,
            { backgroundColor: colors.card, borderColor: colors.border },
          ]}
        >
          <View
            style={[styles.iconContainer, { backgroundColor: '#FF634720' }]}
          >
            <Ionicons name={item.icon as any} size={20} color="#FF6347" />
          </View>
          <View style={styles.textContainer}>
            <Text style={[styles.label, { color: colors.mutedForeground }]}>
              {item.label}
            </Text>
            <Text style={[styles.value, { color: colors.foreground }]}>
              {item.value}
            </Text>
          </View>
        </View>
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 20,
    marginBottom: 24,
    gap: 12,
  },
  card: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
    borderRadius: 24,
    borderWidth: 1,
  },
  iconContainer: {
    width: 40,
    height: 40,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 16,
  },
  textContainer: {
    flex: 1,
  },
  label: {
    fontSize: 10,
    fontWeight: 'bold',
    letterSpacing: 1,
    marginBottom: 4,
  },
  value: {
    fontSize: 14,
    fontWeight: 'bold',
  },
});

export default ProductInfoList;
