// src/screens/collection/RecoveryHub.jsx
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

const { width } = Dimensions.get('window');

const RecoveryHub = ({ navigation }) => {
  const [repoStats] = useState({
    totalRepos: 24,
    thisMonth: 8,
    pending: 15,
    completed: 9,
    inYard: 12,
  });

  const [recentActivity] = useState([
    {
      id: 1,
      type: 'repo',
      message: 'Vehicle repossessed - DL-3CAB-1234',
      time: '2 hours ago',
      icon: 'car-sport',
      color: COLORS.success,
    },
    {
      id: 2,
      type: 'yard',
      message: 'Yard entry completed for MH-02-AB-5678',
      time: '5 hours ago',
      icon: 'checkbox-outline',
      color: COLORS.info,
    },
    {
      id: 3,
      type: 'scan',
      message: 'Vehicle scanned - KA-01-XY-9012',
      time: '1 day ago',
      icon: 'scan',
      color: COLORS.warning,
    },
  ]);

  const renderStatsCard = () => (
    <View style={styles.statsCard}>
      <Text style={styles.statsTitle}>Recovery Overview</Text>
      
      <View style={styles.mainStat}>
        <Text style={styles.mainStatValue}>{repoStats.totalRepos}</Text>
        <Text style={styles.mainStatLabel}>Total Repossessions</Text>
      </View>

      <View style={styles.statsGrid}>
        <View style={styles.statItem}>
          <View style={[styles.statIcon, { backgroundColor: COLORS.successLight }]}>
            <Icon name="checkmark-done" size={20} color={COLORS.success} />
          </View>
          <Text style={styles.statValue}>{repoStats.completed}</Text>
          <Text style={styles.statLabel}>Completed</Text>
        </View>

        <View style={styles.statItem}>
          <View style={[styles.statIcon, { backgroundColor: COLORS.warningLight }]}>
            <Icon name="time" size={20} color={COLORS.warning} />
          </View>
          <Text style={styles.statValue}>{repoStats.pending}</Text>
          <Text style={styles.statLabel}>Pending</Text>
        </View>

        <View style={styles.statItem}>
          <View style={[styles.statIcon, { backgroundColor: COLORS.infoLight }]}>
            <Icon name="business" size={20} color={COLORS.info} />
          </View>
          <Text style={styles.statValue}>{repoStats.inYard}</Text>
          <Text style={styles.statLabel}>In Yard</Text>
        </View>
      </View>
    </View>
  );

  const renderQuickActions = () => (
    <View style={styles.section}>
      <Text style={styles.sectionTitle}>Quick Actions</Text>

      <View style={styles.actionsGrid}>
        <TouchableOpacity
          style={[styles.actionCard, styles.actionCardPrimary]}
          onPress={() => navigation.navigate('RepoList')}
        >
          <Icon name="list" size={32} color={COLORS.white} />
          <Text style={styles.actionCardTitle}>Repo List</Text>
          <Text style={styles.actionCardSubtitle}>View all vehicles</Text>
          <View style={styles.actionBadge}>
            <Text style={styles.actionBadgeText}>{repoStats.pending}</Text>
          </View>
        </TouchableOpacity>

        <TouchableOpacity
          style={[styles.actionCard, styles.actionCardWarning]}
          onPress={() => navigation.navigate('VehicleScanner')}
        >
          <Icon name="scan" size={32} color={COLORS.white} />
          <Text style={styles.actionCardTitle}>Scan Vehicle</Text>
          <Text style={styles.actionCardSubtitle}>OCR Scanner</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.actionsGrid}>
        <TouchableOpacity
          style={[styles.actionCard, styles.actionCardSuccess]}
          onPress={() => navigation.navigate('YardEntry')}
        >
          <Icon name="create" size={32} color={COLORS.white} />
          <Text style={styles.actionCardTitle}>Yard Entry</Text>
          <Text style={styles.actionCardSubtitle}>Log vehicle details</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[styles.actionCard, styles.actionCardInfo]}
          onPress={() => navigation.navigate('RepossessionHistory')}
        >
          <Icon name="time" size={32} color={COLORS.white} />
          <Text style={styles.actionCardTitle}>History</Text>
          <Text style={styles.actionCardSubtitle}>View past repos</Text>
        </TouchableOpacity>
      </View>
    </View>
  );

  const renderRecentActivity = () => (
    <View style={styles.section}>
      <View style={styles.sectionHeader}>
        <Text style={styles.sectionTitle}>Recent Activity</Text>
        <TouchableOpacity>
          <Text style={styles.viewAllText}>View All</Text>
        </TouchableOpacity>
      </View>

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

  const renderInfoCard = () => (
    <View style={styles.infoCard}>
      <Icon name="information-circle" size={24} color={COLORS.info} />
      <View style={styles.infoContent}>
        <Text style={styles.infoTitle}>Vehicle Recovery Process</Text>
        <Text style={styles.infoText}>
          1. Check Repo List for target vehicles{'\n'}
          2. Use OCR Scanner to identify plates{'\n'}
          3. Repossess vehicle if matched{'\n'}
          4. Complete Yard Entry form{'\n'}
          5. Submit for verification
        </Text>
      </View>
    </View>
  );

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <View>
          <Text style={styles.headerTitle}>Recovery Hub</Text>
          <Text style={styles.headerSubtitle}>Vehicle Repossession Management</Text>
        </View>
        <TouchableOpacity style={styles.notificationBtn}>
          <Icon name="notifications" size={24} color={COLORS.text.primary} />
          <View style={styles.notificationBadge}>
            <Text style={styles.notificationBadgeText}>3</Text>
          </View>
        </TouchableOpacity>
      </View>

      <ScrollView
        style={styles.content}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}
      >
        {renderStatsCard()}
        {renderQuickActions()}
        {renderRecentActivity()}
        {renderInfoCard()}
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
  headerTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: COLORS.text.primary,
  },
  headerSubtitle: {
    fontSize: 14,
    color: COLORS.text.secondary,
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
  content: {
    flex: 1,
  },
  scrollContent: {
    paddingBottom: 24,
  },
  statsCard: {
    backgroundColor: COLORS.white,
    padding: 20,
    marginHorizontal: 20,
    marginTop: 20,
    borderRadius: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 8,
    elevation: 2,
  },
  statsTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: COLORS.text.primary,
    marginBottom: 16,
  },
  mainStat: {
    alignItems: 'center',
    paddingVertical: 20,
    borderBottomWidth: 1,
    borderBottomColor: COLORS.gray200,
    marginBottom: 20,
  },
  mainStatValue: {
    fontSize: 64,
    fontWeight: 'bold',
    color: COLORS.primary,
  },
  mainStatLabel: {
    fontSize: 14,
    color: COLORS.text.secondary,
    marginTop: 8,
  },
  statsGrid: {
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
  statItem: {
    alignItems: 'center',
  },
  statIcon: {
    width: 40,
    height: 40,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 8,
  },
  statValue: {
    fontSize: 26,
    fontWeight: 'bold',
    color: COLORS.text.primary,
    marginBottom: 4,
  },
  statLabel: {
    fontSize: 12,
    color: COLORS.text.secondary,
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
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: COLORS.text.primary,
    marginBottom: 16,
  },
  viewAllText: {
    fontSize: 14,
    color: COLORS.primary,
    fontWeight: '600',
  },
  actionsGrid: {
    flexDirection: 'row',
    gap: 12,
    marginBottom: 12,
  },
  actionCard: {
    flex: 1,
    borderRadius: 16,
    padding: 20,
    position: 'relative',
    minHeight: 140,
    justifyContent: 'center',
  },
  actionCardPrimary: {
    backgroundColor: COLORS.primary,
  },
  actionCardWarning: {
    backgroundColor: COLORS.warning,
  },
  actionCardSuccess: {
    backgroundColor: COLORS.success,
  },
  actionCardInfo: {
    backgroundColor: COLORS.info,
  },
  actionCardTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: COLORS.white,
    marginTop: 12,
  },
  actionCardSubtitle: {
    fontSize: 12,
    color: COLORS.white,
    opacity: 0.9,
    marginTop: 4,
  },
  actionBadge: {
    position: 'absolute',
    top: 12,
    right: 12,
    backgroundColor: 'rgba(255,255,255,0.3)',
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 12,
  },
  actionBadgeText: {
    color: COLORS.white,
    fontSize: 12,
    fontWeight: 'bold',
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
  infoCard: {
    flexDirection: 'row',
    backgroundColor: COLORS.infoLight,
    padding: 16,
    borderRadius: 12,
    marginHorizontal: 20,
    marginTop: 12,
  },
  infoContent: {
    flex: 1,
    marginLeft: 12,
  },
  infoTitle: {
    fontSize: 14,
    fontWeight: 'bold',
    color: COLORS.text.primary,
    marginBottom: 8,
  },
  infoText: {
    fontSize: 12,
    color: COLORS.text.secondary,
    lineHeight: 18,
  },
});

export default RecoveryHub;