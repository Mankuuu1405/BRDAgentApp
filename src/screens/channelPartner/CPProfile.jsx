// src/screens/channelPartner/CPProfile.js
import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  ScrollView,
  TouchableOpacity,
  Image,
  Switch,
  Alert,
} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';

const COLORS = {
  primary: '#5D6AFF',
  success: '#10B981',
  danger: '#EF4444',
  white: '#FFFFFF',
  gray50: '#F9FAFB',
  gray200: '#E5E7EB',
  gray400: '#9CA3AF',
  gray500: '#6B7280',
  text: { primary: '#1F2937', secondary: '#6B7280' },
  background: '#F5F7FA',
};

const CPProfile = ({ navigation }) => {
  const [notificationsEnabled, setNotificationsEnabled] = useState(true);
  const [emailAlerts, setEmailAlerts] = useState(true);
  const [darkModeEnabled, setDarkModeEnabled] = useState(false);

  const [profileData] = useState({
    name: 'Channel Partner',
    email: 'partner@example.com',
    phone: '+91 98765 43210',
    partnerId: 'CP-2025-001',
    joinDate: 'Jan 2024',
    kycStatus: 'Verified',
    profileImage: 'https://via.placeholder.com/120',
  });

  const [stats] = useState({
    totalLeads: 47,
    converted: 8,
    totalEarnings: '₹1,24,500',
  });

  const handleLogout = () => {
    Alert.alert(
      'Logout',
      'Are you sure you want to logout?',
      [
        { text: 'Cancel', style: 'cancel' },
        { 
          text: 'Logout', 
          style: 'destructive',
          onPress: () => {
            // Navigate to auth screen
            navigation.reset({
              index: 0,
              routes: [{ name: 'Auth' }],
            });
          }
        }
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
      <Text style={styles.partnerId}>{profileData.partnerId}</Text>
      
      <View style={styles.verifiedBadge}>
        <Icon name="checkmark-circle" size={16} color={COLORS.success} />
        <Text style={styles.verifiedText}>KYC {profileData.kycStatus}</Text>
      </View>
    </View>
  );

  const renderStatsCards = () => (
    <View style={styles.statsContainer}>
      <View style={styles.statCard}>
        <Icon name="people" size={24} color={COLORS.primary} />
        <Text style={styles.statValue}>{stats.totalLeads}</Text>
        <Text style={styles.statLabel}>Total Leads</Text>
      </View>

      <View style={styles.statCard}>
        <Icon name="checkmark-done" size={24} color={COLORS.success} />
        <Text style={styles.statValue}>{stats.converted}</Text>
        <Text style={styles.statLabel}>Converted</Text>
      </View>

      <View style={styles.statCard}>
        <Icon name="wallet" size={24} color={COLORS.primary} />
        <Text style={styles.statValue}>{stats.totalEarnings}</Text>
        <Text style={styles.statLabel}>Earnings</Text>
      </View>
    </View>
  );

  const renderInfoSection = () => (
    <View style={styles.section}>
      <Text style={styles.sectionTitle}>Personal Information</Text>
      
      <View style={styles.infoCard}>
        <View style={styles.infoRow}>
          <View style={styles.infoIcon}>
            <Icon name="mail" size={20} color={COLORS.primary} />
          </View>
          <View style={styles.infoContent}>
            <Text style={styles.infoLabel}>Email</Text>
            <Text style={styles.infoValue}>{profileData.email}</Text>
          </View>
          <TouchableOpacity>
            <Icon name="create-outline" size={20} color={COLORS.gray500} />
          </TouchableOpacity>
        </View>

        <View style={styles.infoDivider} />

        <View style={styles.infoRow}>
          <View style={styles.infoIcon}>
            <Icon name="call" size={20} color={COLORS.primary} />
          </View>
          <View style={styles.infoContent}>
            <Text style={styles.infoLabel}>Phone</Text>
            <Text style={styles.infoValue}>{profileData.phone}</Text>
          </View>
          <TouchableOpacity>
            <Icon name="create-outline" size={20} color={COLORS.gray500} />
          </TouchableOpacity>
        </View>

        <View style={styles.infoDivider} />

        <View style={styles.infoRow}>
          <View style={styles.infoIcon}>
            <Icon name="calendar" size={20} color={COLORS.primary} />
          </View>
          <View style={styles.infoContent}>
            <Text style={styles.infoLabel}>Member Since</Text>
            <Text style={styles.infoValue}>{profileData.joinDate}</Text>
          </View>
        </View>
      </View>
    </View>
  );

  const renderSettingsSection = () => (
    <View style={styles.section}>
      <Text style={styles.sectionTitle}>Settings</Text>
      
      <View style={styles.settingsCard}>
        <View style={styles.settingRow}>
          <View style={styles.settingLeft}>
            <View style={styles.settingIcon}>
              <Icon name="notifications" size={20} color={COLORS.primary} />
            </View>
            <View>
              <Text style={styles.settingLabel}>Push Notifications</Text>
              <Text style={styles.settingSubtext}>Get updates on leads</Text>
            </View>
          </View>
          <Switch
            value={notificationsEnabled}
            onValueChange={setNotificationsEnabled}
            trackColor={{ false: COLORS.gray200, true: COLORS.primary + '50' }}
            thumbColor={notificationsEnabled ? COLORS.primary : COLORS.gray400}
          />
        </View>

        <View style={styles.settingDivider} />

        <View style={styles.settingRow}>
          <View style={styles.settingLeft}>
            <View style={styles.settingIcon}>
              <Icon name="mail" size={20} color={COLORS.primary} />
            </View>
            <View>
              <Text style={styles.settingLabel}>Email Alerts</Text>
              <Text style={styles.settingSubtext}>Receive email notifications</Text>
            </View>
          </View>
          <Switch
            value={emailAlerts}
            onValueChange={setEmailAlerts}
            trackColor={{ false: COLORS.gray200, true: COLORS.primary + '50' }}
            thumbColor={emailAlerts ? COLORS.primary : COLORS.gray400}
          />
        </View>

        <View style={styles.settingDivider} />

        <View style={styles.settingRow}>
          <View style={styles.settingLeft}>
            <View style={styles.settingIcon}>
              <Icon name="moon" size={20} color={COLORS.primary} />
            </View>
            <View>
              <Text style={styles.settingLabel}>Dark Mode</Text>
              <Text style={styles.settingSubtext}>Coming soon</Text>
            </View>
          </View>
          <Switch
            value={darkModeEnabled}
            onValueChange={setDarkModeEnabled}
            disabled
            trackColor={{ false: COLORS.gray200, true: COLORS.primary + '50' }}
            thumbColor={COLORS.gray400}
          />
        </View>
      </View>
    </View>
  );

  const renderMenuSection = () => (
    <View style={styles.section}>
      <Text style={styles.sectionTitle}>More</Text>
      
      <View style={styles.menuCard}>
        <TouchableOpacity style={styles.menuItem}>
          <View style={styles.menuLeft}>
            <View style={[styles.menuIcon, { backgroundColor: '#DBEAFE' }]}>
              <Icon name="document-text" size={20} color={COLORS.primary} />
            </View>
            <Text style={styles.menuLabel}>Documents</Text>
          </View>
          <Icon name="chevron-forward" size={20} color={COLORS.gray500} />
        </TouchableOpacity>

        <View style={styles.menuDivider} />

        <TouchableOpacity 
        style={styles.menuItem}
        onPress={() => navigation.navigate('PrivacyPolicy')}
        >
          <View style={styles.menuLeft}>
            <View style={[styles.menuIcon, { backgroundColor: '#FEF3C7' }]}>
              <Icon name="shield-checkmark" size={20} color={COLORS.primary} />
            </View>
            <Text style={styles.menuLabel}>Privacy & Security</Text>
          </View>
          <Icon name="chevron-forward" size={20} color={COLORS.gray500} />
        </TouchableOpacity>

        <View style={styles.menuDivider} />

        <TouchableOpacity 
        style={styles.menuItem}
        onPress={() => navigation.navigate('HelpSupport')}
        >
          <View style={styles.menuLeft}>
            <View style={[styles.menuIcon, { backgroundColor: '#D1FAE5' }]}>
              <Icon name="help-circle" size={20} color={COLORS.success} />
            </View>
            <Text style={styles.menuLabel}>Help & Support</Text>
          </View>
          <Icon name="chevron-forward" size={20} color={COLORS.gray500} />
        </TouchableOpacity>

        <View style={styles.menuDivider} />

        <TouchableOpacity 
        style={styles.menuItem}
        onPress={() => navigation.navigate('AboutApp')}
        >
          <View style={styles.menuLeft}>
            <View style={[styles.menuIcon, { backgroundColor: '#E0E7FF' }]}>
              <Icon name="information-circle" size={20} color={COLORS.primary} />
            </View>
            <Text style={styles.menuLabel}>About</Text>
          </View>
          <Icon name="chevron-forward" size={20} color={COLORS.gray500} />
        </TouchableOpacity>
      </View>
    </View>
  );

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Profile</Text>
        <TouchableOpacity>
          <Icon name="settings-outline" size={24} color={COLORS.text.primary} />
        </TouchableOpacity>
      </View>

      <ScrollView
        style={styles.scrollView}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}
      >
        {renderProfileHeader()}
        {renderStatsCards()}
        {renderInfoSection()}
        {renderSettingsSection()}
        {renderMenuSection()}

        <TouchableOpacity 
          style={styles.logoutButton}
          onPress={handleLogout}
        >
          <Icon name="log-out-outline" size={20} color={COLORS.danger} />
          <Text style={styles.logoutText}>Logout</Text>
        </TouchableOpacity>

        <Text style={styles.versionText}>Version 1.0.0</Text>
        <View style={{ height: 20 }} />
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
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    paddingTop: 20,
  },
  profileHeader: {
    alignItems: 'center',
    backgroundColor: COLORS.white,
    paddingVertical: 30,
    marginBottom: 20,
  },
  profileImageContainer: {
    position: 'relative',
    marginBottom: 16,
  },
  profileImage: {
    width: 120,
    height: 120,
    borderRadius: 60,
    borderWidth: 4,
    borderColor: COLORS.white,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 5,
  },
  editImageBtn: {
    position: 'absolute',
    bottom: 0,
    right: 0,
    backgroundColor: COLORS.primary,
    width: 36,
    height: 36,
    borderRadius: 18,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 3,
    borderColor: COLORS.white,
  },
  profileName: {
    fontSize: 24,
    fontWeight: 'bold',
    color: COLORS.text.primary,
    marginBottom: 4,
  },
  partnerId: {
    fontSize: 14,
    color: COLORS.text.secondary,
    marginBottom: 12,
  },
  verifiedBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#D1FAE5',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 16,
    gap: 4,
  },
  verifiedText: {
    fontSize: 12,
    fontWeight: '600',
    color: COLORS.success,
  },
  statsContainer: {
    flexDirection: 'row',
    paddingHorizontal: 20,
    marginBottom: 20,
    gap: 12,
  },
  statCard: {
    flex: 1,
    backgroundColor: COLORS.white,
    borderRadius: 16,
    padding: 16,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 8,
    elevation: 2,
  },
  statValue: {
    fontSize: 20,
    fontWeight: 'bold',
    color: COLORS.text.primary,
    marginTop: 8,
    marginBottom: 4,
  },
  statLabel: {
    fontSize: 12,
    color: COLORS.text.secondary,
    textAlign: 'center',
  },
  section: {
    paddingHorizontal: 20,
    marginBottom: 20,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: COLORS.text.primary,
    marginBottom: 12,
  },
  infoCard: {
    backgroundColor: COLORS.white,
    borderRadius: 16,
    padding: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 8,
    elevation: 2,
  },
  infoRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  infoIcon: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#F0F1FF',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  infoContent: {
    flex: 1,
  },
  infoLabel: {
    fontSize: 12,
    color: COLORS.text.secondary,
    marginBottom: 4,
  },
  infoValue: {
    fontSize: 16,
    fontWeight: '600',
    color: COLORS.text.primary,
  },
  infoDivider: {
    height: 1,
    backgroundColor: COLORS.gray200,
    marginVertical: 16,
  },
  settingsCard: {
    backgroundColor: COLORS.white,
    borderRadius: 16,
    padding: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 8,
    elevation: 2,
  },
  settingRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  settingLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  settingIcon: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#F0F1FF',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  settingLabel: {
    fontSize: 16,
    fontWeight: '600',
    color: COLORS.text.primary,
    marginBottom: 2,
  },
  settingSubtext: {
    fontSize: 12,
    color: COLORS.text.secondary,
  },
  settingDivider: {
    height: 1,
    backgroundColor: COLORS.gray200,
    marginVertical: 16,
  },
  menuCard: {
    backgroundColor: COLORS.white,
    borderRadius: 16,
    padding: 4,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 8,
    elevation: 2,
  },
  menuItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 12,
  },
  menuLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  menuIcon: {
    width: 40,
    height: 40,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  menuLabel: {
    fontSize: 16,
    fontWeight: '600',
    color: COLORS.text.primary,
  },
  menuDivider: {
    height: 1,
    backgroundColor: COLORS.gray200,
    marginHorizontal: 12,
  },
  logoutButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: COLORS.white,
    marginHorizontal: 20,
    paddingVertical: 16,
    borderRadius: 12,
    gap: 8,
    borderWidth: 1,
    borderColor: COLORS.danger,
  },
  logoutText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: COLORS.danger,
  },
  versionText: {
    textAlign: 'center',
    fontSize: 12,
    color: COLORS.text.secondary,
    marginTop: 20,
  },
});

export default CPProfile;