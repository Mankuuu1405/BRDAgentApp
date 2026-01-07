// src/screens/fieldInvestigation/Profile.js
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

const COLORS = {
  primary: '#5D6AFF',
  success: '#10B981',
  warning: '#F59E0B',
  danger: '#EF4444',
  white: '#FFFFFF',
  gray50: '#F9FAFB',
  gray200: '#E5E7EB',
  gray400: '#9CA3AF',
  gray500: '#6B7280',
  text: { primary: '#1F2937', secondary: '#6B7280' },
  background: '#F5F7FA',
};

const Profile = ({ navigation }) => {
  const [darkMode, setDarkMode] = useState(false);
  const [notifications, setNotifications] = useState(true);
  const [autoSync, setAutoSync] = useState(true);

  const [profileData] = useState({
    agentId: 'AG-001-DL',
    name: 'Field Agent',
    email: 'agent@company.com',
    mobile: '+91 9876543210',
    branch: 'Delhi - Dwarka Branch',
    deviceId: 'DEVICE-XXX-XXX',
    joinDate: 'Jan 2024',
    profileImage: 'https://via.placeholder.com/100',
  });

  const [earnings] = useState({
    thisMonth: '₹45,000',
    lastMonth: '₹38,500',
    total: '₹2,15,000',
  });

  const [attendance] = useState([
    { date: 'Jan 07, 2026', punchIn: '09:15 AM', punchOut: '06:30 PM', status: 'Present' },
    { date: 'Jan 06, 2026', punchIn: '09:10 AM', punchOut: '06:45 PM', status: 'Present' },
    { date: 'Jan 05, 2026', punchIn: '09:20 AM', punchOut: '06:20 PM', status: 'Present' },
  ]);

  const [syncStatus] = useState({
    lastSync: '2 minutes ago',
    pendingItems: 3,
    status: 'synced',
  });

  const handleManualSync = () => {
    Alert.alert('Syncing', 'Pushing local data to server...');
  };

  const handleLogout = () => {
    Alert.alert(
      'Logout',
      'Are you sure you want to logout?',
      [
        { text: 'Cancel', style: 'cancel' },
        { text: 'Logout', style: 'destructive', onPress: () => navigation.navigate('Auth') },
      ]
    );
  };

  const renderProfileHeader = () => (
    <View style={styles.profileHeader}>
      <View style={styles.profileImageContainer}>
        <Image
          source={{ uri: profileData.profileImage }}
          style={styles.profileImage}
        />
        <TouchableOpacity style={styles.editImageBtn}>
          <Icon name="camera" size={16} color={COLORS.white} />
        </TouchableOpacity>
      </View>
      
      <Text style={styles.profileName}>{profileData.name}</Text>
      <Text style={styles.profileId}>{profileData.agentId}</Text>
      
      <View style={styles.profileStats}>
        <View style={styles.statItem}>
          <Text style={styles.statValue}>156</Text>
          <Text style={styles.statLabel}>Cases Done</Text>
        </View>
        <View style={styles.statDivider} />
        <View style={styles.statItem}>
          <Text style={styles.statValue}>98%</Text>
          <Text style={styles.statLabel}>Success Rate</Text>
        </View>
        <View style={styles.statDivider} />
        <View style={styles.statItem}>
          <Text style={styles.statValue}>4.8</Text>
          <Text style={styles.statLabel}>Rating</Text>
        </View>
      </View>
    </View>
  );

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
        <Icon name="business" size={18} color={COLORS.text.secondary} />
        <View style={styles.infoContent}>
          <Text style={styles.infoLabel}>Branch</Text>
          <Text style={styles.infoValue}>{profileData.branch}</Text>
        </View>
      </View>
      
      <View style={styles.infoRow}>
        <Icon name="phone-portrait" size={18} color={COLORS.text.secondary} />
        <View style={styles.infoContent}>
          <Text style={styles.infoLabel}>Device ID</Text>
          <Text style={styles.infoValue}>{profileData.deviceId}</Text>
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

  const renderEarnings = () => (
    <View style={styles.card}>
      <View style={styles.cardHeader}>
        <Text style={styles.cardTitle}>Earnings & Incentives</Text>
        <TouchableOpacity>
          <Icon name="chevron-forward" size={20} color={COLORS.text.secondary} />
        </TouchableOpacity>
      </View>
      
      <View style={styles.earningsGrid}>
        <View style={styles.earningItem}>
          <Text style={styles.earningLabel}>This Month</Text>
          <Text style={styles.earningValue}>{earnings.thisMonth}</Text>
        </View>
        <View style={styles.earningItem}>
          <Text style={styles.earningLabel}>Last Month</Text>
          <Text style={styles.earningValue}>{earnings.lastMonth}</Text>
        </View>
        <View style={[styles.earningItem, styles.earningItemFull]}>
          <Text style={styles.earningLabel}>Total Earnings</Text>
          <Text style={[styles.earningValue, styles.earningValueLarge]}>{earnings.total}</Text>
        </View>
      </View>
    </View>
  );

  const renderAttendance = () => (
    <View style={styles.card}>
      <View style={styles.cardHeader}>
        <Text style={styles.cardTitle}>Attendance History</Text>
        <TouchableOpacity>
          <Text style={styles.viewAllText}>View All</Text>
        </TouchableOpacity>
      </View>
      
      {attendance.slice(0, 3).map((record, index) => (
        <View key={index} style={styles.attendanceRow}>
          <View style={styles.attendanceDate}>
            <Text style={styles.attendanceDateText}>{record.date}</Text>
            <Text style={styles.attendanceTime}>{record.punchIn} - {record.punchOut}</Text>
          </View>
          <View style={styles.attendanceStatus}>
            <Icon name="checkmark-circle" size={20} color={COLORS.success} />
          </View>
        </View>
      ))}
    </View>
  );

  const renderSyncSettings = () => (
    <View style={styles.card}>
      <View style={styles.cardHeader}>
        <Text style={styles.cardTitle}>Sync Settings</Text>
        <View style={[
          styles.syncBadge,
          { backgroundColor: syncStatus.status === 'synced' ? '#D1FAE5' : '#FEF3C7' }
        ]}>
          <Icon 
            name={syncStatus.status === 'synced' ? "checkmark-circle" : "sync"} 
            size={14} 
            color={syncStatus.status === 'synced' ? COLORS.success : COLORS.warning} 
          />
          <Text style={[
            styles.syncBadgeText,
            { color: syncStatus.status === 'synced' ? COLORS.success : COLORS.warning }
          ]}>
            {syncStatus.status === 'synced' ? 'Up to date' : 'Syncing...'}
          </Text>
        </View>
      </View>
      
      <Text style={styles.syncInfo}>Last synced: {syncStatus.lastSync}</Text>
      {syncStatus.pendingItems > 0 && (
        <Text style={styles.syncInfo}>Pending items: {syncStatus.pendingItems}</Text>
      )}
      
      <TouchableOpacity style={styles.syncButton} onPress={handleManualSync}>
        <Icon name="sync" size={18} color={COLORS.primary} />
        <Text style={styles.syncButtonText}>Force Sync Now</Text>
      </TouchableOpacity>
    </View>
  );

  const renderSystemSettings = () => (
    <View style={styles.card}>
      <Text style={styles.cardTitle}>App Settings</Text>
      
      <View style={styles.settingRow}>
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
      </View>
      
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

  const renderSecurityInfo = () => (
    <View style={styles.card}>
      <Text style={styles.cardTitle}>Security Status</Text>
      
      <View style={styles.securityItem}>
        <Icon name="shield-checkmark" size={20} color={COLORS.success} />
        <Text style={styles.securityText}>Device Secure</Text>
        <Icon name="checkmark-circle" size={18} color={COLORS.success} />
      </View>
      
      <View style={styles.securityItem}>
        <Icon name="lock-closed" size={20} color={COLORS.success} />
        <Text style={styles.securityText}>SSL Pinning Active</Text>
        <Icon name="checkmark-circle" size={18} color={COLORS.success} />
      </View>
      
      <View style={styles.securityItem}>
        <Icon name="key" size={20} color={COLORS.success} />
        <Text style={styles.securityText}>AES-256 Encryption</Text>
        <Icon name="checkmark-circle" size={18} color={COLORS.success} />
      </View>
      
      <Text style={styles.versionText}>App Version: 1.2.5</Text>
    </View>
  );

  const renderQuickActions = () => (
    <View style={styles.quickActions}>
      <TouchableOpacity style={styles.actionCard}>
        <Icon name="help-circle" size={24} color={COLORS.primary} />
        <Text style={styles.actionText}>Help & Support</Text>
      </TouchableOpacity>
      
      <TouchableOpacity style={styles.actionCard}>
        <Icon name="document-text" size={24} color={COLORS.primary} />
        <Text style={styles.actionText}>Guidelines</Text>
      </TouchableOpacity>
      
      <TouchableOpacity style={styles.actionCard}>
        <Icon name="settings" size={24} color={COLORS.primary} />
        <Text style={styles.actionText}>Settings</Text>
      </TouchableOpacity>
      
      <TouchableOpacity style={[styles.actionCard, styles.logoutCard]} onPress={handleLogout}>
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
        {renderIdentityCard()}
        {renderEarnings()}
        {renderAttendance()}
        {renderSyncSettings()}
        {renderSystemSettings()}
        {renderSecurityInfo()}
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
  },
  verifiedBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#D1FAE5',
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
  earningsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 12,
  },
  earningItem: {
    flex: 1,
    minWidth: '45%',
    backgroundColor: COLORS.gray50,
    padding: 16,
    borderRadius: 12,
  },
  earningItemFull: {
    minWidth: '100%',
    backgroundColor: '#F0F1FF',
  },
  earningLabel: {
    fontSize: 12,
    color: COLORS.text.secondary,
    marginBottom: 8,
  },
  earningValue: {
    fontSize: 20,
    fontWeight: 'bold',
    color: COLORS.text.primary,
  },
  earningValueLarge: {
    fontSize: 24,
    color: COLORS.primary,
  },
  viewAllText: {
    fontSize: 14,
    color: COLORS.primary,
    fontWeight: '600',
  },
  attendanceRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: COLORS.gray200,
  },
  attendanceDate: {
    flex: 1,
  },
  attendanceDateText: {
    fontSize: 14,
    fontWeight: '600',
    color: COLORS.text.primary,
    marginBottom: 4,
  },
  attendanceTime: {
    fontSize: 12,
    color: COLORS.text.secondary,
  },
  attendanceStatus: {
    marginLeft: 12,
  },
  syncBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 12,
  },
  syncBadgeText: {
    fontSize: 11,
    fontWeight: '600',
    marginLeft: 4,
  },
  syncInfo: {
    fontSize: 13,
    color: COLORS.text.secondary,
    marginBottom: 8,
  },
  syncButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#F0F1FF',
    padding: 12,
    borderRadius: 10,
    marginTop: 12,
  },
  syncButtonText: {
    fontSize: 14,
    fontWeight: '600',
    color: COLORS.primary,
    marginLeft: 8,
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
  securityItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: COLORS.gray200,
  },
  securityText: {
    flex: 1,
    fontSize: 14,
    color: COLORS.text.primary,
    marginLeft: 12,
  },
  versionText: {
    fontSize: 12,
    color: COLORS.text.secondary,
    textAlign: 'center',
    marginTop: 16,
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
    minWidth: '100%',
    borderWidth: 1,
    borderColor: COLORS.danger,
    backgroundColor: '#FEE2E2',
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

export default Profile;