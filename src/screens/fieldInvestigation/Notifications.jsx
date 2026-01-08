// src/screens/fieldInvestigation/Notifications.js
import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  FlatList,
  TouchableOpacity,
  ScrollView,
} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';

const COLORS = {
  primary: '#5D6AFF',
  success: '#10B981',
  warning: '#F59E0B',
  danger: '#EF4444',
  info: '#3B82F6',
  white: '#FFFFFF',
  gray50: '#F9FAFB',
  gray200: '#E5E7EB',
  gray400: '#9CA3AF',
  gray500: '#6B7280',
  text: { primary: '#1F2937', secondary: '#6B7280' },
  background: '#F5F7FA',
};

const Notifications = ({ navigation }) => {
  const [selectedTab, setSelectedTab] = useState('All'); // All, Cases, System

  const [notifications] = useState([
    {
      id: 1,
      type: 'case_assigned',
      title: 'New Case Assigned',
      message: 'LOC-2025-8901 - Priya Sharma has been assigned to you',
      timestamp: '2 minutes ago',
      read: false,
      category: 'Cases',
      icon: 'clipboard',
      iconBg: COLORS.primary,
    },
    {
      id: 2,
      type: 'urgent',
      title: 'Urgent: Priority Case',
      message: 'LOC-2025-8832 requires immediate attention',
      timestamp: '15 minutes ago',
      read: false,
      category: 'Cases',
      icon: 'alert-circle',
      iconBg: COLORS.danger,
    },
    {
      id: 3,
      type: 'sync_complete',
      title: 'Data Sync Complete',
      message: '5 verifications uploaded successfully',
      timestamp: '1 hour ago',
      read: true,
      category: 'System',
      icon: 'sync',
      iconBg: COLORS.success,
    },
    {
      id: 4,
      type: 'route_updated',
      title: 'Route Optimized',
      message: 'Your daily route has been updated with 3 new locations',
      timestamp: '2 hours ago',
      read: true,
      category: 'System',
      icon: 'navigate',
      iconBg: COLORS.info,
    },
    {
      id: 5,
      type: 'case_status',
      title: 'Verification Approved',
      message: 'LOC-2025-8765 has been approved by supervisor',
      timestamp: '3 hours ago',
      read: true,
      category: 'Cases',
      icon: 'checkmark-circle',
      iconBg: COLORS.success,
    },
    {
      id: 6,
      type: 'reminder',
      title: 'Pending Verifications',
      message: 'You have 7 pending verifications for today',
      timestamp: '5 hours ago',
      read: true,
      category: 'Cases',
      icon: 'time',
      iconBg: COLORS.warning,
    },
    {
      id: 7,
      type: 'app_update',
      title: 'App Update Available',
      message: 'Version 1.3.0 is now available with new features',
      timestamp: '1 day ago',
      read: true,
      category: 'System',
      icon: 'download',
      iconBg: COLORS.primary,
    },
  ]);

  const tabs = ['All', 'Cases', 'System'];

  const getFilteredNotifications = () => {
    if (selectedTab === 'All') {
      return notifications;
    }
    return notifications.filter(n => n.category === selectedTab);
  };

  const unreadCount = notifications.filter(n => !n.read).length;

  const renderNotificationItem = ({ item }) => (
    <TouchableOpacity 
      style={[styles.notificationCard, !item.read && styles.notificationCardUnread]}
      activeOpacity={0.7}
    >
      <View style={[styles.iconContainer, { backgroundColor: `${item.iconBg}20` }]}>
        <Icon name={item.icon} size={24} color={item.iconBg} />
      </View>

      <View style={styles.notificationContent}>
        <View style={styles.notificationHeader}>
          <Text style={styles.notificationTitle}>{item.title}</Text>
          {!item.read && <View style={styles.unreadDot} />}
        </View>
        <Text style={styles.notificationMessage}>{item.message}</Text>
        <Text style={styles.notificationTime}>{item.timestamp}</Text>
      </View>

      <TouchableOpacity style={styles.moreBtn}>
        <Icon name="ellipsis-vertical" size={20} color={COLORS.gray400} />
      </TouchableOpacity>
    </TouchableOpacity>
  );

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <View>
          <Text style={styles.headerTitle}>Notifications</Text>
          {unreadCount > 0 && (
            <Text style={styles.unreadCount}>{unreadCount} unread</Text>
          )}
        </View>
        <TouchableOpacity style={styles.markAllBtn}>
          <Text style={styles.markAllText}>Mark all read</Text>
        </TouchableOpacity>
      </View>

      {/* Tabs */}
      <View style={styles.tabsContainer}>
        <ScrollView 
          horizontal 
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.tabsContent}
        >
          {tabs.map((tab) => {
            const tabCount = tab === 'All' 
              ? notifications.length 
              : notifications.filter(n => n.category === tab).length;
            
            return (
              <TouchableOpacity
                key={tab}
                style={[
                  styles.tab,
                  selectedTab === tab && styles.tabActive,
                ]}
                onPress={() => setSelectedTab(tab)}
              >
                <Text
                  style={[
                    styles.tabText,
                    selectedTab === tab && styles.tabTextActive,
                  ]}
                >
                  {tab}
                </Text>
                <View style={[
                  styles.tabBadge,
                  selectedTab === tab && styles.tabBadgeActive,
                ]}>
                  <Text style={[
                    styles.tabBadgeText,
                    selectedTab === tab && styles.tabBadgeTextActive,
                  ]}>
                    {tabCount}
                  </Text>
                </View>
              </TouchableOpacity>
            );
          })}
        </ScrollView>
      </View>

      {/* Notifications List */}
      {getFilteredNotifications().length > 0 ? (
        <FlatList
          data={getFilteredNotifications()}
          renderItem={renderNotificationItem}
          keyExtractor={(item) => item.id.toString()}
          contentContainerStyle={styles.listContent}
          showsVerticalScrollIndicator={false}
        />
      ) : (
        <View style={styles.emptyState}>
          <View style={styles.emptyIcon}>
            <Icon name="notifications-off" size={64} color={COLORS.gray400} />
          </View>
          <Text style={styles.emptyTitle}>No Notifications</Text>
          <Text style={styles.emptyText}>
            You're all caught up! No {selectedTab.toLowerCase()} notifications at the moment.
          </Text>
        </View>
      )}
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.background,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingVertical: 4,
    backgroundColor: COLORS.white,
    borderBottomWidth: 1,
    borderBottomColor: COLORS.gray200,
    paddingTop: 38,
  },
  headerTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: COLORS.text.primary,
  },
  unreadCount: {
    fontSize: 14,
    color: COLORS.text.secondary,
    marginTop: 4,
  },
  markAllBtn: {
    paddingHorizontal: 12,
    paddingVertical: 8,
  },
  markAllText: {
    fontSize: 14,
    fontWeight: '600',
    color: COLORS.primary,
  },
  tabsContainer: {
    backgroundColor: COLORS.white,
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: COLORS.gray200,
  },
  tabsContent: {
    paddingHorizontal: 20,
  },
  tab: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
    backgroundColor: COLORS.gray50,
    marginRight: 8,
  },
  tabActive: {
    backgroundColor: COLORS.primary,
  },
  tabText: {
    fontSize: 14,
    fontWeight: '600',
    color: COLORS.text.secondary,
    marginRight: 8,
  },
  tabTextActive: {
    color: COLORS.white,
  },
  tabBadge: {
    backgroundColor: COLORS.white,
    paddingHorizontal: 8,
    paddingVertical: 2,
    borderRadius: 10,
    minWidth: 24,
    alignItems: 'center',
  },
  tabBadgeActive: {
    backgroundColor: 'rgba(255,255,255,0.3)',
  },
  tabBadgeText: {
    fontSize: 12,
    fontWeight: 'bold',
    color: COLORS.text.primary,
  },
  tabBadgeTextActive: {
    color: COLORS.white,
  },
  listContent: {
    padding: 20,
  },
  notificationCard: {
    flexDirection: 'row',
    backgroundColor: COLORS.white,
    borderRadius: 16,
    padding: 16,
    marginBottom: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 8,
    elevation: 2,
  },
  notificationCardUnread: {
    borderLeftWidth: 4,
    borderLeftColor: COLORS.primary,
  },
  iconContainer: {
    width: 48,
    height: 48,
    borderRadius: 24,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  notificationContent: {
    flex: 1,
  },
  notificationHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 4,
  },
  notificationTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: COLORS.text.primary,
    flex: 1,
  },
  unreadDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: COLORS.primary,
    marginLeft: 8,
  },
  notificationMessage: {
    fontSize: 14,
    color: COLORS.text.secondary,
    marginBottom: 8,
    lineHeight: 20,
  },
  notificationTime: {
    fontSize: 12,
    color: COLORS.gray400,
  },
  moreBtn: {
    padding: 4,
  },
  emptyState: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 40,
  },
  emptyIcon: {
    width: 120,
    height: 120,
    borderRadius: 60,
    backgroundColor: COLORS.gray50,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 24,
  },
  emptyTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: COLORS.text.primary,
    marginBottom: 8,
  },
  emptyText: {
    fontSize: 14,
    color: COLORS.text.secondary,
    textAlign: 'center',
    lineHeight: 20,
  },
});

export default Notifications;