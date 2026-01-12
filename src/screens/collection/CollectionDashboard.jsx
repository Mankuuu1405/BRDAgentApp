// src/screens/collection/CollectionDashboard.jsx
import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  ScrollView,
  TouchableOpacity,
  Dimensions,
} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import { COLORS } from '../../utils/constants';
import { CollectionSummary, StatsCard, PTPCard } from '../../components/collection/CollectionComponents';

const { width } = Dimensions.get('window');

const CollectionDashboard = ({ navigation }) => {
  const [todayStats] = useState({
    collected: 145000,
    target: 250000,
    accounts: 8,
    calls: 25,
    fieldVisits: 3,
    ptpCount: 5,
  });

  const [bucketStats] = useState({
    'SMA-0': { count: 15, amount: 180000 },
    'SMA-1': { count: 8, amount: 120000 },
    'SMA-2': { count: 5, amount: 85000 },
    'NPA': { count: 3, amount: 150000 },
  });

  const [urgentPTPs] = useState([
    {
      id: 'LA-2025-1234',
      customerName: 'Amit Kumar',
      amount: '15,000',
      date: 'Today',
      status: 'Pending',
    },
    {
      id: 'LA-2025-5678',
      customerName: 'Priya Sharma',
      amount: '22,000',
      date: 'Tomorrow',
      status: 'Pending',
    },
  ]);

  const [recentActivity] = useState([
    {
      id: 1,
      type: 'payment',
      message: 'Payment of ₹12,000 collected from Rajesh Kumar',
      time: '15 mins ago',
      icon: 'checkmark-circle',
      color: COLORS.success,
    },
    {
      id: 2,
      type: 'ptp',
      message: 'PTP logged for Neha Singh - ₹18,000 by tomorrow',
      time: '1 hour ago',
      icon: 'calendar',
      color: COLORS.info,
    },
    {
      id: 3,
      type: 'call',
      message: 'Call made to Suresh Patel - No Contact',
      time: '2 hours ago',
      icon: 'call',
      color: COLORS.warning,
    },
  ]);

  const renderCollectionSummary = () => (
    <View style={styles.summaryContainer}>
      <CollectionSummary
        collected={todayStats.collected}
        target={todayStats.target}
        accounts={todayStats.accounts}
      />
    </View>
  );

  const renderQuickStats = () => (
    <View style={styles.quickStatsContainer}>
      <Text style={styles.sectionTitle}>Quick Stats</Text>
      <View style={styles.statsGrid}>
        <View style={styles.statsRow}>
          <View style={styles.statCard}>
            <StatsCard
              icon="call"
              label="Calls Made"
              value={todayStats.calls}
              bgColor={COLORS.infoLight}
              iconColor={COLORS.info}
            />
          </View>
          <View style={styles.statCard}>
            <StatsCard
              icon="walk"
              label="Field Visits"
              value={todayStats.fieldVisits}
              bgColor={COLORS.warningLight}
              iconColor={COLORS.warning}
            />
          </View>
        </View>
        <View style={styles.statsRow}>
          <View style={styles.statCard}>
            <StatsCard
              icon="calendar"
              label="Active PTPs"
              value={todayStats.ptpCount}
              bgColor={COLORS.successLight}
              iconColor={COLORS.success}
            />
          </View>
          <View style={styles.statCard}>
            <StatsCard
              icon="trending-up"
              label="Success Rate"
              value="68%"
              bgColor="#F0F1FF"
              iconColor={COLORS.primary}
              trend={{ direction: 'up', value: '+5%' }}
            />
          </View>
        </View>
      </View>
    </View>
  );

  const renderBucketOverview = () => (
    <View style={styles.section}>
      <View style={styles.sectionHeader}>
        <Text style={styles.sectionTitle}>Bucket Overview</Text>
        <TouchableOpacity onPress={() => navigation.navigate('Accounts')}>
          <Text style={styles.viewAllText}>View All</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.bucketGrid}>
        {Object.entries(bucketStats).map(([bucket, stats]) => (
          <TouchableOpacity
            key={bucket}
            style={styles.bucketCard}
            activeOpacity={0.7}
            onPress={() => navigation.navigate('Accounts', { bucket })}
          >
            <View style={styles.bucketHeader}>
              <Text style={styles.bucketName}>{bucket}</Text>
              <Icon name="chevron-forward" size={16} color={COLORS.text.secondary} />
            </View>
            <Text style={styles.bucketCount}>{stats.count}</Text>
            <Text style={styles.bucketLabel}>Accounts</Text>
            <Text style={styles.bucketAmount}>₹{(stats.amount / 1000).toFixed(0)}K</Text>
          </TouchableOpacity>
        ))}
      </View>
    </View>
  );

  const renderUrgentPTPs = () => (
    <View style={styles.section}>
      <View style={styles.sectionHeader}>
        <Text style={styles.sectionTitle}>Urgent PTPs</Text>
        <TouchableOpacity onPress={() => navigation.navigate('Accounts', { screen: 'UrgentPTPListScreen' })}>
          <Text style={styles.viewAllText}>View All</Text>
        </TouchableOpacity>
      </View>

      {urgentPTPs.map((ptp) => (
        <PTPCard
          key={ptp.id}
          accountId={ptp.id}
          customerName={ptp.customerName}
          amount={ptp.amount}
          date={ptp.date}
          status={ptp.status}
          onPress={() => navigation.navigate('Accounts', { 
            screen: 'FollowUpLogger', 
            params: { 
              account: {
                id: ptp.id,
                customerName: ptp.customerName,
                phoneNumber: ptp.phoneNumber || '+91 0000000000',
                overdueAmount: ptp.amount
              }
            } 
          })}
        />
      ))}
    </View>
  );

  const renderRecentActivity = () => (
    <View style={styles.section}>
      <Text style={styles.sectionTitle}>Recent Activity</Text>

      {recentActivity.map((activity) => (
        <View key={activity.id} style={styles.activityCard}>
          <View style={[styles.activityIcon, { backgroundColor: `${activity.color}20` }]}>
            <Icon name={activity.icon} size={20} color={activity.color} />
          </View>
          <View style={styles.activityContent}>
            <Text style={styles.activityMessage}>{activity.message}</Text>
            <Text style={styles.activityTime}>{activity.time}</Text>
          </View>
        </View>
      ))}
    </View>
  );

  const renderQuickActions = () => (
    <View style={styles.quickActionsContainer}>
      <Text style={styles.sectionTitle}>Quick Actions</Text>
      <View style={styles.quickActionsGrid}>
        {/* <TouchableOpacity 
          style={styles.quickActionCard}
          onPress={() => navigation.navigate('Payment')}
        >
          <Icon name="cash" size={28} color={COLORS.success} />
          <Text style={styles.quickActionText}>Collect Payment</Text>
        </TouchableOpacity>

        <TouchableOpacity 
          style={styles.quickActionCard}
          onPress={() => navigation.navigate('FollowUp')}
        >
          <Icon name="call" size={28} color={COLORS.primary} />
          <Text style={styles.quickActionText}>Log Follow Up</Text>
        </TouchableOpacity> */}

        <TouchableOpacity 
          style={styles.quickActionCard}
          onPress={() => navigation.navigate('Accounts')}
        >
          <Icon name="list" size={28} color={COLORS.warning} />
          <Text style={styles.quickActionText}>View Accounts</Text>
        </TouchableOpacity>

        <TouchableOpacity 
          style={styles.quickActionCard}
          onPress={() => navigation.navigate('Recovery', { screen: 'RepossessionHistory' })}
        >
          <Icon name="time" size={28} color={COLORS.primary} />
          <Text style={styles.quickActionText}>Recovery History</Text>
        </TouchableOpacity>

        {/* <TouchableOpacity style={styles.quickActionCard}>
          <Icon name="document-text" size={28} color={COLORS.info} />
          <Text style={styles.quickActionText}>Reports</Text>
        </TouchableOpacity> */}
      </View>
    </View>
  );

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <View>
          <Text style={styles.greeting}>Good Morning</Text>
          <Text style={styles.userName}>Collection Agent</Text>
        </View>
        <TouchableOpacity 
          style={styles.notificationBtn}
          onPress={() => navigation.navigate('Notifications')}
        >
          <Icon name="notifications" size={24} color={COLORS.text.primary} />
          <View style={styles.notificationBadge}>
            <Text style={styles.notificationBadgeText}>5</Text>
          </View>
        </TouchableOpacity>
      </View>

      <ScrollView
        style={styles.scrollView}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}
      >
        {renderCollectionSummary()}
        {renderQuickStats()}
        {renderBucketOverview()}
        {renderUrgentPTPs()}
        {renderRecentActivity()}
        {renderQuickActions()}
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
    paddingBottom: 20,
    backgroundColor: COLORS.white,
  },
  greeting: {
    fontSize: 14,
    color: COLORS.text.secondary,
  },
  userName: {
    fontSize: 20,
    fontWeight: 'bold',
    color: COLORS.text.primary,
    marginTop: 4,
  },
  notificationBtn: {
    position: 'relative',
  },
  notificationBadge: {
    position: 'absolute',
    top: -5,
    right: -5,
    backgroundColor: COLORS.danger,
    borderRadius: 10,
    width: 20,
    height: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  notificationBadgeText: {
    color: COLORS.white,
    fontSize: 10,
    fontWeight: 'bold',
  },
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    paddingBottom: 20,
  },
  summaryContainer: {
    paddingHorizontal: 20,
    marginTop: 20,
  },
  quickStatsContainer: {
    paddingHorizontal: 20,
    marginTop: 20,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: COLORS.text.primary,
    marginBottom: 16,
  },
  statsGrid: {
    gap: 12,
  },
  statsRow: {
    flexDirection: 'row',
    gap: 12,
  },
  statCard: {
    flex: 1,
  },
  section: {
    paddingHorizontal: 20,
    marginTop: 24,
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  viewAllText: {
    fontSize: 14,
    color: COLORS.primary,
    fontWeight: '600',
  },
  bucketGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 12,
  },
  bucketCard: {
    width: (width - 52) / 2,
    backgroundColor: COLORS.white,
    borderRadius: 16,
    padding: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 8,
    elevation: 2,
  },
  bucketHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  bucketName: {
    fontSize: 14,
    fontWeight: 'bold',
    color: COLORS.text.primary,
  },
  bucketCount: {
    fontSize: 28,
    fontWeight: 'bold',
    color: COLORS.primary,
    marginBottom: 4,
  },
  bucketLabel: {
    fontSize: 12,
    color: COLORS.text.secondary,
    marginBottom: 8,
  },
  bucketAmount: {
    fontSize: 16,
    fontWeight: '600',
    color: COLORS.success,
  },
  activityCard: {
    flexDirection: 'row',
    backgroundColor: COLORS.white,
    borderRadius: 12,
    padding: 16,
    marginBottom: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 8,
    elevation: 2,
  },
  activityIcon: {
    width: 40,
    height: 40,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  activityContent: {
    flex: 1,
  },
  activityMessage: {
    fontSize: 14,
    color: COLORS.text.primary,
    marginBottom: 4,
    lineHeight: 20,
  },
  activityTime: {
    fontSize: 12,
    color: COLORS.text.secondary,
  },
  quickActionsContainer: {
    paddingHorizontal: 20,
    marginTop: 24,
  },
  quickActionsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 12,
  },
  quickActionCard: {
    width: (width - 52) / 2,
    backgroundColor: COLORS.white,
    borderRadius: 16,
    padding: 20,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 8,
    elevation: 2,
  },
  quickActionText: {
    fontSize: 14,
    fontWeight: '600',
    color: COLORS.text.primary,
    marginTop: 8,
    textAlign: 'center',
  },
});

export default CollectionDashboard;