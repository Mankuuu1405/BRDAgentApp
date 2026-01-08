// src/screens/channelPartner/CPNotifications.js
import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  ScrollView,
  TouchableOpacity,
  RefreshControl,
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

const CPNotifications = ({ navigation }) => {
  const [refreshing, setRefreshing] = useState(false);
  const [activeFilter, setActiveFilter] = useState('all');

  const [notifications] = useState([
    {
      id: 'NOT-001',
      type: 'lead_update',
      icon: 'checkmark-circle',
      iconColor: COLORS.success,
      iconBg: '#D1FAE5',
      title: 'Lead Sanctioned',
      message: 'Sneha Patel\'s Business Loan application has been sanctioned for ₹15,00,000',
      leadId: 'LD-2025-002',
      time: '2 hours ago',
      isRead: false,
    },
    {
      id: 'NOT-002',
      type: 'payout',
      icon: 'wallet',
      iconColor: COLORS.primary,
      iconBg: '#DBEAFE',
      title: 'Payout Processed',
      message: 'Your commission of ₹12,000 has been credited to your account',
      time: '5 hours ago',
      isRead: false,
    },
    {
      id: 'NOT-003',
      type: 'query',
      icon: 'alert-circle',
      iconColor: COLORS.warning,
      iconBg: '#FEF3C7',
      title: 'Query Raised',
      message: 'Please upload clearer Bank Statement for Amit Verma - LD-2025-001',
      leadId: 'LD-2025-001',
      time: '1 day ago',
      isRead: true,
    },
    {
      id: 'NOT-004',
      type: 'lead_update',
      icon: 'time',
      iconColor: COLORS.info,
      iconBg: '#DBEAFE',
      title: 'Lead in Credit Ops',
      message: 'Rajesh Kumar\'s application is now under credit review',
      leadId: 'LD-2025-006',
      time: '1 day ago',
      isRead: true,
    },
    {
      id: 'NOT-005',
      type: 'system',
      icon: 'megaphone',
      iconColor: COLORS.primary,
      iconBg: '#E0E7FF',
      title: 'New Product Launch',
      message: 'We\'ve launched a new Home Loan product with attractive interest rates. Check it out!',
      time: '2 days ago',
      isRead: true,
    },
    {
      id: 'NOT-006',
      type: 'lead_update',
      icon: 'close-circle',
      iconColor: COLORS.danger,
      iconBg: '#FEE2E2',
      title: 'Application Rejected',
      message: 'Unfortunately, Mohit Sharma\'s loan application has been rejected due to insufficient documentation',
      leadId: 'LD-2025-003',
      time: '3 days ago',
      isRead: true,
    },
    {
      id: 'NOT-007',
      type: 'payout',
      icon: 'cash',
      iconColor: COLORS.success,
      iconBg: '#D1FAE5',
      title: 'Commission Earned',
      message: 'You earned ₹25,000 commission from Priya Sharma\'s Home Loan disbursement',
      time: '4 days ago',
      isRead: true,
    },
    {
      id: 'NOT-008',
      type: 'system',
      icon: 'newspaper',
      iconColor: COLORS.info,
      iconBg: '#DBEAFE',
      title: 'Monthly Newsletter',
      message: 'Check out this month\'s performance insights and new updates in the portal',
      time: '5 days ago',
      isRead: true,
    },
  ]);

  const filters = [
    { label: 'All', value: 'all', icon: 'list' },
    { label: 'Lead Updates', value: 'lead_update', icon: 'people' },
    { label: 'Payouts', value: 'payout', icon: 'wallet' },
    { label: 'Queries', value: 'query', icon: 'help-circle' },
  ];

  const onRefresh = () => {
    setRefreshing(true);
    setTimeout(() => {
      setRefreshing(false);
    }, 1500);
  };

  const handleMarkAllRead = () => {
    // Mark all notifications as read
    console.log('Mark all as read');
  };

  const handleNotificationPress = (notification) => {
    if (notification.leadId) {
      navigation.navigate('LeadDetails', { leadId: notification.leadId });
    }
  };

  const renderFilters = () => (
    <View style={styles.filtersWrapper}>
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        style={styles.filtersScroll}
        contentContainerStyle={styles.filtersContent}
      >
        {filters.map((filter) => (
          <TouchableOpacity
            key={filter.value}
            style={[
              styles.filterChip,
              activeFilter === filter.value && styles.filterChipActive
            ]}
            onPress={() => setActiveFilter(filter.value)}
          >
            <Icon
              name={filter.icon}
              size={16}
              color={activeFilter === filter.value ? COLORS.white : COLORS.text.primary}
              style={styles.filterIcon}
            />
            <Text style={[
              styles.filterText,
              activeFilter === filter.value && styles.filterTextActive
            ]}>
              {filter.label}
            </Text>
          </TouchableOpacity>
        ))}
      </ScrollView>
    </View>
  );

  const getFilteredNotifications = () => {
    if (activeFilter === 'all') return notifications;
    return notifications.filter(n => n.type === activeFilter);
  };

  const renderNotificationCard = (notification) => (
    <TouchableOpacity
      key={notification.id}
      style={[
        styles.notificationCard,
        !notification.isRead && styles.notificationCardUnread
      ]}
      activeOpacity={0.7}
      onPress={() => handleNotificationPress(notification)}
    >
      <View style={styles.notificationContent}>
        <View style={[styles.notificationIcon, { backgroundColor: notification.iconBg }]}>
          <Icon name={notification.icon} size={24} color={notification.iconColor} />
        </View>

        <View style={styles.notificationTextContainer}>
          <View style={styles.notificationHeader}>
            <Text style={styles.notificationTitle}>{notification.title}</Text>
            {!notification.isRead && <View style={styles.unreadDot} />}
          </View>
          <Text style={styles.notificationMessage} numberOfLines={2}>
            {notification.message}
          </Text>
          <View style={styles.notificationFooter}>
            <Icon name="time-outline" size={12} color={COLORS.text.secondary} />
            <Text style={styles.notificationTime}>{notification.time}</Text>
            {notification.leadId && (
              <>
                <View style={styles.footerDivider} />
                <Icon name="document-text-outline" size={12} color={COLORS.primary} />
                <Text style={styles.leadIdText}>{notification.leadId}</Text>
              </>
            )}
          </View>
        </View>
      </View>

      {notification.leadId && (
        <View style={styles.actionButton}>
          <Icon name="chevron-forward" size={20} color={COLORS.gray500} />
        </View>
      )}
    </TouchableOpacity>
  );

  const unreadCount = notifications.filter(n => !n.isRead).length;
  const filteredNotifications = getFilteredNotifications();

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <View style={styles.headerLeft}>
          <TouchableOpacity onPress={() => navigation.goBack()}>
            <Icon name="arrow-back" size={24} color={COLORS.text.primary} />
          </TouchableOpacity>
          <View style={styles.headerTitleContainer}>
            <Text style={styles.headerTitle}>Notifications</Text>
            {unreadCount > 0 && (
              <View style={styles.unreadBadge}>
                <Text style={styles.unreadBadgeText}>{unreadCount}</Text>
              </View>
            )}
          </View>
        </View>
        <TouchableOpacity 
          style={styles.markAllBtn}
          onPress={handleMarkAllRead}
        >
          <Icon name="checkmark-done" size={20} color={COLORS.primary} />
        </TouchableOpacity>
      </View>

      {renderFilters()}

      <ScrollView
        style={styles.scrollView}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}
        refreshControl={
          <RefreshControl
            refreshing={refreshing}
            onRefresh={onRefresh}
            tintColor={COLORS.primary}
            colors={[COLORS.primary]}
          />
        }
      >
        {filteredNotifications.length > 0 ? (
          <>
            {unreadCount > 0 && activeFilter === 'all' && (
              <View style={styles.sectionHeader}>
                <Text style={styles.sectionTitle}>New ({unreadCount})</Text>
              </View>
            )}

            {filteredNotifications.map(renderNotificationCard)}

            {filteredNotifications.length === 0 && (
              <View style={styles.emptyState}>
                <Icon name="notifications-off-outline" size={64} color={COLORS.gray400} />
                <Text style={styles.emptyStateTitle}>No Notifications</Text>
                <Text style={styles.emptyStateText}>
                  You're all caught up! Check back later for updates.
                </Text>
              </View>
            )}
          </>
        ) : (
          <View style={styles.emptyState}>
            <Icon name="filter-outline" size={64} color={COLORS.gray400} />
            <Text style={styles.emptyStateTitle}>No Results</Text>
            <Text style={styles.emptyStateText}>
              No notifications found for this filter.
            </Text>
          </View>
        )}
      </ScrollView>
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
    paddingTop: 40,
    paddingBottom: 16,
    backgroundColor: COLORS.white,
  },
  headerLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 16,
    flex: 1,
  },
  headerTitleContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  headerTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: COLORS.text.primary,
  },
  unreadBadge: {
    backgroundColor: COLORS.danger,
    borderRadius: 12,
    paddingHorizontal: 8,
    paddingVertical: 2,
    minWidth: 24,
    alignItems: 'center',
  },
  unreadBadgeText: {
    color: COLORS.white,
    fontSize: 12,
    fontWeight: 'bold',
  },
  markAllBtn: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: COLORS.gray50,
    justifyContent: 'center',
    alignItems: 'center',
  },
  filtersWrapper: {
    backgroundColor: COLORS.white,
    borderBottomWidth: 1,
    borderBottomColor: COLORS.gray200,
    paddingVertical: 8,
  },
  filtersScroll: {
    // horizontal scroll container
  },
  filtersContent: {
    paddingHorizontal: 20,
    alignItems: 'center',
  },
  filterChip: {
    flexDirection: 'row',
    alignItems: 'center',
    height: 48,
    paddingHorizontal: 16,
    borderRadius: 12,
    backgroundColor: COLORS.gray50,
    marginRight: 8,
    justifyContent: 'center',
  },
  filterChipActive: {
    backgroundColor: COLORS.primary,
  },
  filterIcon: {
    marginRight: 8,
  },
  filterText: {
    fontSize: 14,
    fontWeight: '600',
    color: COLORS.text.primary,
  },
  filterTextActive: {
    color: COLORS.white,
  },
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    paddingHorizontal: 20,
    paddingTop: 20,
    paddingBottom: 20,
  },
  sectionHeader: {
    marginBottom: 12,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: COLORS.text.primary,
  },
  notificationCard: {
    backgroundColor: COLORS.white,
    borderRadius: 16,
    padding: 16,
    marginBottom: 12,
    flexDirection: 'row',
    alignItems: 'center',
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
  notificationContent: {
    flexDirection: 'row',
    flex: 1,
    gap: 12,
  },
  notificationIcon: {
    width: 48,
    height: 48,
    borderRadius: 24,
    justifyContent: 'center',
    alignItems: 'center',
  },
  notificationTextContainer: {
    flex: 1,
  },
  notificationHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 4,
    gap: 8,
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
  },
  notificationMessage: {
    fontSize: 14,
    color: COLORS.text.secondary,
    lineHeight: 20,
    marginBottom: 8,
  },
  notificationFooter: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  notificationTime: {
    fontSize: 12,
    color: COLORS.text.secondary,
  },
  footerDivider: {
    width: 1,
    height: 12,
    backgroundColor: COLORS.gray200,
    marginHorizontal: 8,
  },
  leadIdText: {
    fontSize: 12,
    fontWeight: '600',
    color: COLORS.primary,
  },
  actionButton: {
    marginLeft: 8,
  },
  emptyState: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 80,
  },
  emptyStateTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: COLORS.text.primary,
    marginTop: 16,
    marginBottom: 8,
  },
  emptyStateText: {
    fontSize: 14,
    color: COLORS.text.secondary,
    textAlign: 'center',
    paddingHorizontal: 40,
  },
});

export default CPNotifications;