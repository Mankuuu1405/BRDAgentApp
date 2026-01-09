// src/screens/collection/CollectionProfile.jsx
import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  ScrollView,
  TouchableOpacity,
  Switch,
  Alert,
  Image,
} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import { COLORS } from '../../utils/constants';

const CollectionProfile = ({ navigation }) => {
  const [darkMode, setDarkMode] = useState(false);
  const [notifications, setNotifications] = useState(true);
  const [autoSync, setAutoSync] = useState(true);

  const [profileData] = useState({
    agentId: 'AG-COL-001',
    name: 'Collection Agent',
    email: 'collection@company.com',
    mobile: '+91 9876543210',
    branch: 'Delhi - Dwarka Branch',
    joinDate: 'Jan 2024',
    profileImage: 'https://via.placeholder.com/100',
  });

  const [performanceStats] = useState({
    thisMonth: {
      collected: 1250000,
      target: 2000000,
      accounts: 45,
      calls: 320,
      fieldVisits: 28,
      ptps: 18,
    },
    lastMonth: {
      collected: 1100000,
      target: 2000000,
      accounts: 42,
    },
    overall: {
      totalCollected: 8500000,
      successRate: 68,
      avgTicketSize: 18900,
    },
  });

  const [recentCollections] = useState([
    { date: 'Jan 07, 2026', amount: '₹45,000', accounts: 3 },
    { date: 'Jan 06, 2026', amount: '₹38,500', accounts: 2 },
    { date: 'Jan 05, 2026', amount: '₹52,000', accounts: 4 },
  ]);

  const handleLogout = () => {
    Alert.alert('Logout', 'Are you sure you want to logout?', [
      { text: 'Cancel', style: 'cancel' },
      {
        text: 'Logout',
        style: 'destructive',
        onPress: () => navigation.navigate('Auth'),
      },
    ]);
  };

  const renderProfileHeader = () => (
    <View style={styles.profileHeader}>
      <View style={styles.profileImageContainer}>
        <Image source={{ uri: profileData.profileImage }} style={styles.profileImage} />
        <TouchableOpacity style={styles.editImageBtn}>
          <Icon name="camera" size={16} color={COLORS.white} />
        </TouchableOpacity>
      </View>

      <Text style={styles.profileName}>{profileData.name}</Text>
      <Text style={styles.profileId}>{profileData.agentId}</Text>

      <View style={styles.profileStats}>
        <View style={styles.statItem}>
          <Text style={styles.statValue}>
            {performanceStats.overall.successRate}%
          </Text>
          <Text style={styles.statLabel}>Success Rate</Text>
        </View>
        <View style={styles.statDivider} />
        <View style={styles.statItem}>
          <Text style={styles.statValue}>{performanceStats.thisMonth.accounts}</Text>
          <Text style={styles.statLabel}>This Month</Text>
        </View>
        <View style={styles.statDivider} />
        <View style={styles.statItem}>
          <Text style={styles.statValue}>₹{(performanceStats.overall.avgTicketSize / 1000).toFixed(1)}K</Text>
          <Text style={styles.statLabel}>Avg Collection</Text>
        </View>
      </View>
    </View>
  );

  const renderMonthlyPerformance = () => {
    const percentage = (performanceStats.thisMonth.collected / performanceStats.thisMonth.target) * 100;
    
    return (
      <View style={styles.card}>
        <Text style={styles.cardTitle}>Monthly Performance</Text>

        <View style={styles.performanceAmount}>
          <Text style={styles.collectedAmount}>
            ₹{(performanceStats.thisMonth.collected / 1000).toFixed(0)}K
          </Text>
          <Text style={styles.targetAmount}>
            of ₹{(performanceStats.thisMonth.target / 1000).toFixed(0)}K
          </Text>
        </View>

        <View style={styles.progressContainer}>
          <View style={styles.progressBar}>
            <View
              style={[styles.progressFill, { width: `${Math.min(percentage, 100)}%` }]}
            />
          </View>
          <Text style={styles.progressText}>{percentage.toFixed(1)}%</Text>
        </View>

        <View style={styles.performanceGrid}>
          <View style={styles.performanceItem}>
            <Icon name="call" size={20} color={COLORS.info} />
            <Text style={styles.performanceValue}>{performanceStats.thisMonth.calls}</Text>
            <Text style={styles.performanceLabel}>Calls</Text>
          </View>
          <View style={styles.performanceItem}>
            <Icon name="walk" size={20} color={COLORS.warning} />
            <Text style={styles.performanceValue}>
              {performanceStats.thisMonth.fieldVisits}
            </Text>
            <Text style={styles.performanceLabel}>Field Visits</Text>
          </View>
          <View style={styles.performanceItem}>
            <Icon name="calendar" size={20} color={COLORS.success} />
            <Text style={styles.performanceValue}>{performanceStats.thisMonth.ptps}</Text>
            <Text style={styles.performanceLabel}>PTPs</Text>
          </View>
        </View>
      </View>
    );
  };

  const renderIdentityCard = () => (
    <View style={styles.card}>
      <View style={styles.cardHeader}>
        <Text style={styles.cardTitle}>Agent Identity</Text>
        <View style={styles.verifiedBadge}>
          <Icon name="shield-checkmark" size={16} color={COLORS.success} />
          <Text style={styles.verifiedText}>Verified</Text>
        </View>
      </View>

      <View style={styles.infoRow}>
        <Icon name="person" size={18} color={COLORS.text.secondary} />
        <View style={styles.infoContent}>
          <Text style={styles.infoLabel}>Agent ID</Text>
          <Text style={styles.infoValue}>{profileData.agentId}</Text>
        </View>
      </View>

      <View style={styles.infoRow}>
        <Icon name="mail" size={18} color={COLORS.text.secondary} />
        <View style={styles.infoContent}>
          <Text style={styles.infoLabel}>Email</Text>
          <Text style={styles.infoValue}>{profileData.email}</Text>
        </View>
      </View>

      <View style={styles.infoRow}>
        <Icon name="call" size={18} color={COLORS.text.secondary} />
        <View style={styles.infoContent}>
          <Text style={styles.infoLabel}>Mobile</Text>
          <Text style={styles.infoValue}>{profileData.mobile}</Text>
        </View>
      </View>

      <View style={styles.infoRow}>
        <Icon name="business" size={18} color={COLORS.text.secondary} />
        <View style={styles.infoContent}>
          <Text style={styles.infoLabel}>Branch</Text>
          <Text style={styles.infoValue}>{profileData.branch}</Text>
        </View>
      </View>

      <View style={styles.infoRow}>
        <Icon name="calendar" size={18} color={COLORS.text.secondary} />
        <View style={styles.infoContent}>
          <Text style={styles.infoLabel}>Joined</Text>
          <Text style={styles.infoValue}>{profileData.joinDate}</Text>
        </View>
      </View>
    </View>
  );

  const renderOverallStats = () => (
    <View style={styles.card}>
      <Text style={styles.cardTitle}>Overall Statistics</Text>

      <View style={styles.overallStatsGrid}>
        <View style={styles.overallStatItem}>
          <View style={[styles.statIcon, { backgroundColor: COLORS.successLight }]}>
            <Icon name="cash" size={24} color={COLORS.success} />
          </View>
          <Text style={styles.overallStatLabel}>Total Collected</Text>
          <Text style={styles.overallStatValue}>
            ₹{(performanceStats.overall.totalCollected / 100000).toFixed(1)}L
          </Text>
        </View>

        <View style={styles.overallStatItem}>
          <View style={[styles.statIcon, { backgroundColor: COLORS.infoLight }]}>
            <Icon name="trending-up" size={24} color={COLORS.info} />
          </View>
          <Text style={styles.overallStatLabel}>Success Rate</Text>
          <Text style={styles.overallStatValue}>
            {performanceStats.overall.successRate}%
          </Text>
        </View>
      </View>

      <View style={styles.comparisonCard}>
        <View style={styles.comparisonItem}>
          <Text style={styles.comparisonLabel}>This Month</Text>
          <Text style={styles.comparisonValue}>
            ₹{(performanceStats.thisMonth.collected / 1000).toFixed(0)}K
          </Text>
        </View>
        <Icon name="arrow-forward" size={20} color={COLORS.text.secondary} />
        <View style={styles.comparisonItem}>
          <Text style={styles.comparisonLabel}>Last Month</Text>
          <Text style={styles.comparisonValue}>
            ₹{(performanceStats.lastMonth.collected / 1000).toFixed(0)}K
          </Text>
        </View>
      </View>
    </View>
  );

  const renderRecentCollections = () => (
    <View style={styles.card}>
      <View style={styles.cardHeader}>
        <Text style={styles.cardTitle}>Recent Collections</Text>
        <TouchableOpacity>
          <Text style={styles.viewAllText}>View All</Text>
        </TouchableOpacity>
      </View>

      {recentCollections.map((collection, index) => (
        <View key={index} style={styles.collectionRow}>
          <View style={styles.collectionDate}>
            <Text style={styles.collectionDateText}>{collection.date}</Text>
            <Text style={styles.collectionAccounts}>
              {collection.accounts} accounts
            </Text>
          </View>
          <Text style={styles.collectionAmount}>{collection.amount}</Text>
        </View>
      ))}
    </View>
  );

  const renderAppSettings = () => (
    <View style={styles.card}>
      <Text style={styles.cardTitle}>App Settings</Text>

      {/* <View style={styles.settingRow}>
        <View style={styles.settingInfo}>
          <Icon name="moon" size={20} color={COLORS.text.secondary} />
          <Text style={styles.settingLabel}>Dark Mode</Text>
        </View>
        <Switch
          value={darkMode}
          onValueChange={setDarkMode}
          trackColor={{ false: COLORS.gray200, true: COLORS.primary }}
          thumbColor={COLORS.white}
        />
      </View> */}

      <View style={styles.settingRow}>
        <View style={styles.settingInfo}>
          <Icon name="notifications" size={20} color={COLORS.text.secondary} />
          <Text style={styles.settingLabel}>Notifications</Text>
        </View>
        <Switch
          value={notifications}
          onValueChange={setNotifications}
          trackColor={{ false: COLORS.gray200, true: COLORS.primary }}
          thumbColor={COLORS.white}
        />
      </View>

      <View style={styles.settingRow}>
        <View style={styles.settingInfo}>
          <Icon name="sync" size={20} color={COLORS.text.secondary} />
          <Text style={styles.settingLabel}>Auto-Sync</Text>
        </View>
        <Switch
          value={autoSync}
          onValueChange={setAutoSync}
          trackColor={{ false: COLORS.gray200, true: COLORS.primary }}
          thumbColor={COLORS.white}
        />
      </View>
    </View>
  );

  const renderQuickActions = () => (
    <View style={styles.quickActions}>
      {/* <TouchableOpacity style={styles.actionCard}>
        <Icon name="stats-chart" size={24} color={COLORS.primary} />
        <Text style={styles.actionText}>Reports</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.actionCard}>
        <Icon name="help-circle" size={24} color={COLORS.primary} />
        <Text style={styles.actionText}>Help & Support</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.actionCard}>
        <Icon name="document-text" size={24} color={COLORS.primary} />
        <Text style={styles.actionText}>Guidelines</Text>
      </TouchableOpacity> */}

      <TouchableOpacity style={styles.actionCard} onPress={() => navigation.navigate('PrivacyPolicy')}>
        <Icon name="shield-checkmark" size={24} color={COLORS.primary} />
        <Text style={styles.actionText}>Privacy & Policy</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={[styles.actionCard, styles.logoutCard]}
        onPress={handleLogout}
      >
        <Icon name="log-out" size={24} color={COLORS.danger} />
        <Text style={[styles.actionText, styles.logoutText]}>Logout</Text>
      </TouchableOpacity>
    </View>
  );

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Profile</Text>
        <TouchableOpacity>
          <Icon name="create-outline" size={24} color={COLORS.text.primary} />
        </TouchableOpacity>
      </View>

      <ScrollView
        style={styles.scrollView}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}
      >
        {renderProfileHeader()}
        {renderMonthlyPerformance()}
        {renderOverallStats()}
        {renderIdentityCard()}
        {renderRecentCollections()}
        {renderAppSettings()}
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
    paddingVertical: 16,
    backgroundColor: COLORS.white,
    borderBottomWidth: 1,
    borderBottomColor: COLORS.gray200,
    paddingTop: 38,
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: COLORS.text.primary,
  },
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    paddingBottom: 20,
  },
  profileHeader: {
    backgroundColor: COLORS.white,
    alignItems: 'center',
    paddingVertical: 32,
    paddingHorizontal: 20,
  },
  profileImageContainer: {
    position: 'relative',
    marginBottom: 16,
  },
  profileImage: {
    width: 100,
    height: 100,
    borderRadius: 50,
    borderWidth: 4,
    borderColor: COLORS.primary,
  },
  editImageBtn: {
    position: 'absolute',
    bottom: 0,
    right: 0,
    backgroundColor: COLORS.primary,
    width: 32,
    height: 32,
    borderRadius: 16,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 3,
    borderColor: COLORS.white,
  },
  profileName: {
    fontSize: 22,
    fontWeight: 'bold',
    color: COLORS.text.primary,
    marginBottom: 4,
  },
  profileId: {
    fontSize: 14,
    color: COLORS.text.secondary,
    marginBottom: 24,
  },
  profileStats: {
    flexDirection: 'row',
    width: '100%',
    justifyContent: 'space-around',
    paddingTop: 20,
    borderTopWidth: 1,
    borderTopColor: COLORS.gray200,
  },
  statItem: {
    alignItems: 'center',
  },
  statValue: {
    fontSize: 20,
    fontWeight: 'bold',
    color: COLORS.text.primary,
    marginBottom: 4,
  },
  statLabel: {
    fontSize: 12,
    color: COLORS.text.secondary,
  },
  statDivider: {
    width: 1,
    height: 40,
    backgroundColor: COLORS.gray200,
  },
  card: {
    backgroundColor: COLORS.white,
    marginTop: 12,
    padding: 20,
    marginHorizontal: 20,
    borderRadius: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 8,
    elevation: 2,
  },
  cardHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  cardTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: COLORS.text.primary,
    marginBottom: 16,
  },
  verifiedBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: COLORS.successLight,
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 12,
  },
  verifiedText: {
    fontSize: 12,
    fontWeight: '600',
    color: COLORS.success,
    marginLeft: 4,
  },
  performanceAmount: {
    marginBottom: 16,
  },
  collectedAmount: {
    fontSize: 32,
    fontWeight: 'bold',
    color: COLORS.primary,
  },
  targetAmount: {
    fontSize: 14,
    color: COLORS.text.secondary,
    marginTop: 4,
  },
  progressContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
  },
  progressBar: {
    flex: 1,
    height: 8,
    backgroundColor: COLORS.gray200,
    borderRadius: 4,
    overflow: 'hidden',
    marginRight: 12,
  },
  progressFill: {
    height: '100%',
    backgroundColor: COLORS.primary,
    borderRadius: 4,
  },
  progressText: {
    fontSize: 14,
    fontWeight: '600',
    color: COLORS.text.primary,
  },
  performanceGrid: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    paddingTop: 16,
    borderTopWidth: 1,
    borderTopColor: COLORS.gray200,
  },
  performanceItem: {
    alignItems: 'center',
  },
  performanceValue: {
    fontSize: 18,
    fontWeight: 'bold',
    color: COLORS.text.primary,
    marginTop: 8,
    marginBottom: 4,
  },
  performanceLabel: {
    fontSize: 12,
    color: COLORS.text.secondary,
  },
  infoRow: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: COLORS.gray200,
  },
  infoContent: {
    flex: 1,
    marginLeft: 12,
  },
  infoLabel: {
    fontSize: 12,
    color: COLORS.text.secondary,
    marginBottom: 2,
  },
  infoValue: {
    fontSize: 15,
    fontWeight: '600',
    color: COLORS.text.primary,
  },
  overallStatsGrid: {
    flexDirection: 'row',
    gap: 12,
    marginBottom: 16,
  },
  overallStatItem: {
    flex: 1,
    backgroundColor: COLORS.gray50,
    borderRadius: 12,
    padding: 16,
    alignItems: 'center',
  },
  statIcon: {
    width: 48,
    height: 48,
    borderRadius: 24,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 12,
  },
  overallStatLabel: {
    fontSize: 12,
    color: COLORS.text.secondary,
    marginBottom: 8,
    textAlign: 'center',
  },
  overallStatValue: {
    fontSize: 22,
    fontWeight: 'bold',
    color: COLORS.text.primary,
  },
  comparisonCard: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: '#F0F1FF',
    borderRadius: 12,
    padding: 16,
  },
  comparisonItem: {
    flex: 1,
    alignItems: 'center',
  },
  comparisonLabel: {
    fontSize: 12,
    color: COLORS.text.secondary,
    marginBottom: 6,
  },
  comparisonValue: {
    fontSize: 18,
    fontWeight: 'bold',
    color: COLORS.primary,
  },
  collectionRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: COLORS.gray200,
  },
  collectionDate: {
    flex: 1,
  },
  collectionDateText: {
    fontSize: 14,
    fontWeight: '600',
    color: COLORS.text.primary,
    marginBottom: 4,
  },
  collectionAccounts: {
    fontSize: 12,
    color: COLORS.text.secondary,
  },
  collectionAmount: {
    fontSize: 16,
    fontWeight: 'bold',
    color: COLORS.success,
  },
  viewAllText: {
    fontSize: 14,
    color: COLORS.primary,
    fontWeight: '600',
  },
  settingRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 16,
    borderBottomWidth: 1,
    borderBottomColor: COLORS.gray200,
  },
  settingInfo: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  settingLabel: {
    fontSize: 15,
    fontWeight: '500',
    color: COLORS.text.primary,
    marginLeft: 12,
  },
  quickActions: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    paddingHorizontal: 20,
    marginTop: 12,
    gap: 12,
  },
  actionCard: {
    flex: 1,
    minWidth: '45%',
    backgroundColor: COLORS.white,
    padding: 20,
    borderRadius: 16,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 8,
    elevation: 2,
  },
  logoutCard: {
    minWidth: '85%',
    borderWidth: 1,
    borderColor: COLORS.danger,
    backgroundColor: COLORS.dangerLight,
  },
  actionText: {
    fontSize: 14,
    fontWeight: '600',
    color: COLORS.text.primary,
    marginTop: 8,
    textAlign: 'center',
  },
  logoutText: {
    color: COLORS.danger,
  },
});

export default CollectionProfile;