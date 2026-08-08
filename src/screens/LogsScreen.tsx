import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, FlatList, TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import Ionicons from '@react-native-vector-icons/ionicons/static';
import { useNavigation } from '@react-navigation/native';
import { useTheme } from '../theme/ThemeContext';
import { Analytics } from '../services/analytics';

const LogsScreen = () => {
  const navigation = useNavigation();
  const { colors, shadows } = useTheme();
  const styles = createStyles(colors, shadows);
  const [logs, setLogs] = useState(Analytics.getHistory());

  useEffect(() => {
    const unsubscribe = Analytics.subscribe(() => {
      setLogs([...Analytics.getHistory()]);
    });
    return unsubscribe;
  }, []);

  const renderItem = ({ item }: { item: any }) => (
    <View style={styles.logCard}>
      <View style={styles.logHeader}>
        <View style={styles.eventNameContainer}>
          <Ionicons name="pulse" size={16} color={colors.primary} />
          <Text style={styles.eventName}>{item.eventName}</Text>
        </View>
        <Text style={styles.timestamp}>{new Date(item.timestamp).toLocaleTimeString()}</Text>
      </View>
      <View style={styles.metadataContainer}>
        <Text style={styles.metadataText}>{JSON.stringify(item.metadata, null, 2)}</Text>
      </View>
    </View>
  );

  return (
    <View style={styles.container}>
      <SafeAreaView style={styles.safeArea}>
        <View style={styles.header}>
          <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
            <Ionicons name="arrow-back" size={24} color={colors.foreground} />
          </TouchableOpacity>
          <Text style={styles.headerTitle}>Analytics Logs</Text>
          <TouchableOpacity onPress={() => Analytics.clearHistory()} style={styles.clearButton}>
            <Text style={styles.clearText}>Clear</Text>
          </TouchableOpacity>
        </View>
        
        <FlatList
          data={logs}
          keyExtractor={(item) => item.id}
          renderItem={renderItem}
          contentContainerStyle={styles.listContent}
          ListEmptyComponent={
            <View style={styles.emptyContainer}>
              <Ionicons name="document-text-outline" size={48} color={colors.mutedForeground} />
              <Text style={styles.emptyText}>No logs recorded yet</Text>
              <Text style={styles.emptySubtext}>Perform actions in the app to see events</Text>
            </View>
          }
        />
      </SafeAreaView>
    </View>
  );
};

const createStyles = (colors: any, shadows: any) => StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  safeArea: {
    flex: 1,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: colors.border,
  },
  backButton: {
    padding: 4,
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: colors.foreground,
  },
  clearButton: {
    padding: 4,
  },
  clearText: {
    color: colors.destructive,
    fontWeight: '600',
  },
  listContent: {
    padding: 16,
    paddingBottom: 40,
  },
  logCard: {
    backgroundColor: colors.card,
    borderRadius: 12,
    padding: 16,
    marginBottom: 12,
    borderWidth: 1,
    borderColor: colors.border,
    ...shadows.sm,
  },
  logHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  eventNameContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  eventName: {
    fontSize: 16,
    fontWeight: 'bold',
    color: colors.foreground,
  },
  timestamp: {
    fontSize: 12,
    color: colors.mutedForeground,
  },
  metadataContainer: {
    backgroundColor: colors.muted,
    padding: 12,
    borderRadius: 8,
  },
  metadataText: {
    fontFamily: 'monospace',
    fontSize: 12,
    color: colors.foreground,
  },
  emptyContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingTop: 80,
  },
  emptyText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: colors.foreground,
    marginTop: 16,
    marginBottom: 8,
  },
  emptySubtext: {
    fontSize: 14,
    color: colors.mutedForeground,
    textAlign: 'center',
  }
});

export default LogsScreen;
