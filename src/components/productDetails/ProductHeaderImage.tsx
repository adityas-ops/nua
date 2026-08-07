import React from 'react';
import { View, Image, TouchableOpacity, StyleSheet } from 'react-native';
import Ionicons from '@react-native-vector-icons/ionicons/static';
import { useNavigation } from '@react-navigation/native';
import { useTheme } from '../../theme/ThemeContext';

interface Props {
  thumbnail: string;
}

const ProductHeaderImage: React.FC<Props> = ({ thumbnail }) => {
  const navigation = useNavigation();
  const { colors } = useTheme();

  return (
    <View style={[styles.container, { backgroundColor: '#F3E1D2' }]}>
      <Image source={{ uri: thumbnail }} style={styles.image} />
      <TouchableOpacity
        style={[styles.backButton, { backgroundColor: colors.card }]}
        onPress={() => navigation.goBack()}
        activeOpacity={0.8}
      >
        <Ionicons name="chevron-back" size={24} color={colors.foreground} />
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: '100%',
    height: 300,
    justifyContent: 'center',
    alignItems: 'center',
    position: 'relative',
  },
  image: {
    width: '80%',
    height: '80%',
    resizeMode: 'contain',
  },
  backButton: {
    position: 'absolute',
    top: 28, // Assuming some safe area inset padding
    left: 20,
    width: 44,
    height: 44,
    borderRadius: 22,
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
});

export default ProductHeaderImage;
