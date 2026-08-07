import { View, Text, StyleSheet, TouchableOpacity, ScrollView, Alert } from 'react-native';
import React from 'react';
import { useTheme } from '../../theme/ThemeContext';
import { SafeAreaView } from 'react-native-safe-area-context';
import Ionicons from '@react-native-vector-icons/ionicons/static';

const Profile = () => {
  const { colors, shadows, setThemeMode, isDark } = useTheme();
  const styles = createStyles(colors, shadows);

  const handleComingSoon = () => {
    Alert.alert('Coming Soon', 'This feature will be available in a future update.');
  };

  const handleToggleTheme = () => {
    setThemeMode(isDark ? 'light' : 'dark');
  };

  return (
    <View style={styles.Container}>
      <SafeAreaView style={styles.SafeContainer} edges={['top', 'left', 'right']}>
        <View style={styles.Header}>
          <Text style={styles.HeaderTitle}>Profile</Text>
        </View>

        <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.ScrollContent}>
          {/* User Card */}
          <View style={styles.UserCard}>
            <View style={[styles.Avatar, { backgroundColor: colors.primary }]}>
              <Text style={styles.AvatarText}>MR</Text>
            </View>
            <View style={styles.UserInfo}>
              <Text style={styles.UserName}>Maya Rivera</Text>
              <Text style={styles.UserEmail}>maya@shopease.app</Text>
            </View>
          </View>

          {/* Options */}
          <TouchableOpacity style={styles.OptionCard} onPress={handleComingSoon} activeOpacity={0.7}>
            <View style={styles.OptionLeft}>
              <Ionicons name="cube-outline" size={20} color={colors.primary} />
              <Text style={styles.OptionTitle}>Orders</Text>
            </View>
            <View style={styles.OptionRight}>
              <Text style={styles.OptionValue}>2 in transit</Text>
              <Ionicons name="chevron-forward" size={16} color={colors.mutedForeground} />
            </View>
          </TouchableOpacity>

          <TouchableOpacity style={styles.OptionCard} onPress={handleComingSoon} activeOpacity={0.7}>
            <View style={styles.OptionLeft}>
              <Ionicons name="heart-outline" size={20} color={colors.primary} />
              <Text style={styles.OptionTitle}>Saved items</Text>
            </View>
            <View style={styles.OptionRight}>
              <Text style={styles.OptionValue}>12</Text>
              <Ionicons name="chevron-forward" size={16} color={colors.mutedForeground} />
            </View>
          </TouchableOpacity>

          <TouchableOpacity style={styles.OptionCard} onPress={handleComingSoon} activeOpacity={0.7}>
            <View style={styles.OptionLeft}>
              <Ionicons name="location-outline" size={20} color={colors.primary} />
              <Text style={styles.OptionTitle}>Addresses</Text>
            </View>
            <View style={styles.OptionRight}>
              <Text style={styles.OptionValue}>Home</Text>
              <Ionicons name="chevron-forward" size={16} color={colors.mutedForeground} />
            </View>
          </TouchableOpacity>

          <TouchableOpacity style={styles.OptionCard} onPress={handleComingSoon} activeOpacity={0.7}>
            <View style={styles.OptionLeft}>
              <Ionicons name="notifications-outline" size={20} color={colors.primary} />
              <Text style={styles.OptionTitle}>Notifications</Text>
            </View>
            <View style={styles.OptionRight}>
              <Text style={styles.OptionValue}>On</Text>
              <Ionicons name="chevron-forward" size={16} color={colors.mutedForeground} />
            </View>
          </TouchableOpacity>

          <TouchableOpacity style={styles.OptionCard} onPress={handleToggleTheme} activeOpacity={0.7}>
            <View style={styles.OptionLeft}>
              <Ionicons name="moon-outline" size={20} color={colors.primary} />
              <Text style={styles.OptionTitle}>Dark theme</Text>
            </View>
            <View style={styles.ThemePill}>
              <Text style={styles.ThemePillText}>{isDark ? 'DARK' : 'LIGHT'}</Text>
            </View>
          </TouchableOpacity>
        </ScrollView>
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
    Header: {
      paddingHorizontal: 20,
      paddingTop: 20,
      paddingBottom: 24,
    },
    HeaderTitle: {
      fontSize: 28,
      fontWeight: '900',
      color: colors.foreground,
    },
    ScrollContent: {
      paddingHorizontal: 20,
      paddingBottom: 40,
    },
    UserCard: {
      backgroundColor: colors.card,
      borderRadius: 24,
      padding: 16,
      flexDirection: 'row',
      alignItems: 'center',
      marginBottom: 24,
      ...shadows.card,
    },
    Avatar: {
      width: 60,
      height: 60,
      borderRadius: 30,
      justifyContent: 'center',
      alignItems: 'center',
    },
    AvatarText: {
      color: '#FFFFFF',
      fontSize: 22,
      fontWeight: 'bold',
    },
    UserInfo: {
      marginLeft: 16,
    },
    UserName: {
      fontSize: 18,
      fontWeight: 'bold',
      color: colors.foreground,
      marginBottom: 4,
    },
    UserEmail: {
      fontSize: 14,
      color: colors.mutedForeground,
    },
    OptionCard: {
      backgroundColor: colors.card,
      borderRadius: 24,
      paddingHorizontal: 20,
      paddingVertical: 18,
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between',
      marginBottom: 12,
      ...shadows.card,
    },
    OptionLeft: {
      flexDirection: 'row',
      alignItems: 'center',
    },
    OptionTitle: {
      fontSize: 16,
      fontWeight: 'bold',
      color: colors.foreground,
      marginLeft: 16,
    },
    OptionRight: {
      flexDirection: 'row',
      alignItems: 'center',
    },
    OptionValue: {
      fontSize: 14,
      color: colors.mutedForeground,
      marginRight: 8,
    },
    ThemePill: {
      backgroundColor: colors.background,
      paddingHorizontal: 12,
      paddingVertical: 6,
      borderRadius: 16,
    },
    ThemePillText: {
      fontSize: 12,
      fontWeight: 'bold',
      color: colors.mutedForeground,
    },
  });

export default Profile;
