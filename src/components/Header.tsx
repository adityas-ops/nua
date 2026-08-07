import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import React from 'react';
import { useTheme } from '../theme/ThemeContext';
import Ionicons from '@react-native-vector-icons/ionicons/static';
import { useNavigation } from '@react-navigation/native';

interface Props {
  title: string;
}

const Header = ({ title }: Props) => {
  const { colors } = useTheme();
  const styles = createStyles(colors);
  const navigation = useNavigation();
  return (
    <View style={styles.Container}>
      <TouchableOpacity
        style={styles.touchable}
        onPress={() => navigation.goBack()}
      >
        <Ionicons name="chevron-back" size={28} color={colors.foreground} />
        <Text style={styles.title}>{title}</Text>
      </TouchableOpacity>
    </View>
  );
};

const createStyles = (colors: any) =>
  StyleSheet.create({
    Container: {
      width: '100%',
      height: 60,
      backgroundColor: colors.muted,
      paddingHorizontal: 20,
      marginTop: 20,
      display: 'flex',
      flexDirection: 'row',
      alignItems: 'center',
    },
    touchable: {
      flexDirection: 'row',
      alignItems: 'center',
      gap: 5,
    },
    title: {
      fontSize: 18,
      fontWeight: '900',
      color: colors.foreground,
      //   marginBottom: 12,
    },
  });

export default Header;
