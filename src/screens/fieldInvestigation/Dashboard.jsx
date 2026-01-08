// src/screens/fieldInvestigation/Dashboard.js
import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  ScrollView,
  TouchableOpacity,
  Image,
  Dimensions,
} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';

const { width } = Dimensions.get('window');

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

const Dashboard = ({ navigation }) => {
  const [todayStats] = useState({
    completed: 5,
    pending: 7,
    target: 12,
    syncStatus: 'synced',
  });

  const [attendanceData] = useState({
    punchInTime: '09:15 AM',
    location: 'Headquarters, Delhi',
    selfieUrl: 'https://via.placeholder.com/80',
  });

  const [urgentCases] = useState([
    { id: 'LOC-2025-8832', name: 'Rajesh Kumar', priority: 'High', distance: '2.3 km', address: 'Dwarka Sector 10' },
    { id: 'LOC-2025-8901', name: 'Priya Sharma', priority: 'Urgent', distance: '3.8 km', address: 'Rohini Sector 15' },
  ]);

  const renderAttendanceCard = () => (
    <View style={styles.attendanceCard}>
      <View style={styles.attendanceHeader}>
        <View style={styles.attendanceInfo}>
          <Text style={styles.cardTitle}>Today's Attendance</Text>
          <Text style={styles.attendanceTime}>{attendanceData.punchInTime}</Text>
          <Text style={styles.attendanceLocation}>{attendanceData.location}</Text>
        </View>
        <View style={styles.selfieContainer}>
          <Image
            source={{ uri: attendanceData.selfieUrl }}
            style={styles.selfieImage}
          />
          <View style={styles.verifiedBadge}>
            <Icon name="checkmark-circle" size={20} color={COLORS.success} />
          </View>
        </View>
      </View>
    </View>
  );

  const renderPerformanceCard = () => (
    <View style={styles.performanceCard}>
      <Text style={styles.cardTitle}>Daily Performance</Text>
      
      <View style={styles.progressContainer}>
        <View style={styles.progressHeader}>
          <Text style={styles.progressLabel}>Cases Verified</Text>
          <Text style={styles.progressValue}>{todayStats.completed}/{todayStats.target}</Text>
        </View>
        <View style={styles.progressBarContainer}>
          <View 
            style={[
              styles.progressBar, 
              { width: `${(todayStats.completed / todayStats.target) * 100}%` }
            ]} 
          />
        </View>
      </View>

      <View style={styles.statsGrid}>
        <View style={styles.statItem}>
          <View style={[styles.statIcon, { backgroundColor: '#D1FAE5' }]}>
            <Icon name="checkmark-done" size={20} color={COLORS.success} />
          </View>
          <Text style={styles.statValue}>{todayStats.completed}</Text>
          <Text style={styles.statLabel}>Completed</Text>
        </View>
        
        <View style={styles.statItem}>
          <View style={[styles.statIcon, { backgroundColor: '#FEF3C7' }]}>
            <Icon name="time" size={20} color={COLORS.warning} />
          </View>
          <Text style={styles.statValue}>{todayStats.pending}</Text>
          <Text style={styles.statLabel}>Pending</Text>
        </View>
        
        <View style={styles.statItem}>
          <View style={[styles.statIcon, { backgroundColor: '#DBEAFE' }]}>
            <Icon name="sync" size={20} color={COLORS.primary} />
          </View>
          <Text style={styles.statValue}>
            <Icon name="checkmark-circle" size={16} color={COLORS.success} />
          </Text>
          <Text style={styles.statLabel}>Synced</Text>
        </View>
      </View>
    </View>
  );

  const renderSmartRoutingMap = () => (
    <TouchableOpacity style={styles.mapCard} activeOpacity={0.8}>
      <View style={styles.mapPlaceholder}>
        <Icon name="map" size={40} color={COLORS.primary} />
        <Text style={styles.mapText}>Smart Route Planning</Text>
        <Text style={styles.mapSubtext}>Tap to view optimized route</Text>
      </View>
      <View style={styles.mapOverlay}>
        <View style={styles.mapBadge}>
          <Icon name="location" size={16} color={COLORS.white} />
          <Text style={styles.mapBadgeText}>{todayStats.pending} locations</Text>
        </View>
      </View>
    </TouchableOpacity>
  );

  const renderUrgentCases = () => (
    <View style={styles.urgentSection}>
      <View style={styles.sectionHeader}>
        <Text style={styles.sectionTitle}>Priority Cases</Text>
        <TouchableOpacity onPress={() => navigation.navigate('Cases')}>
          <Text style={styles.viewAllText}>View All</Text>
        </TouchableOpacity>
      </View>
      
      {urgentCases.map((caseItem) => (
        <TouchableOpacity 
          key={caseItem.id} 
          style={styles.caseCard}
          activeOpacity={0.7}
          onPress={() => navigation.navigate('Cases')}
        >
          <View style={styles.caseHeader}>
            <View>
              <View style={styles.caseIdRow}>
                <Text style={styles.caseId}>{caseItem.id}</Text>
                <View style={[
                  styles.priorityBadge,
                  { backgroundColor: caseItem.priority === 'Urgent' ? '#FEE2E2' : '#FEF3C7' }
                ]}>
                  <Text style={[
                    styles.priorityText,
                    { color: caseItem.priority === 'Urgent' ? COLORS.danger : COLORS.warning }
                  ]}>
                    {caseItem.priority}
                  </Text>
                </View>
              </View>
              <Text style={styles.caseName}>{caseItem.name}</Text>
              <Text style={styles.caseAddress}>{caseItem.address}</Text>
            </View>
          </View>
          
          <View style={styles.caseActions}>
            <View style={styles.distanceBadge}>
              <Icon name="navigate" size={14} color={COLORS.primary} />
              <Text style={styles.distanceText}>{caseItem.distance}</Text>
            </View>
            <View style={styles.actionButtons}>
              <TouchableOpacity style={styles.actionBtn}>
                <Icon name="call" size={18} color={COLORS.primary} />
              </TouchableOpacity>
              <TouchableOpacity style={styles.actionBtn}>
                <Icon name="logo-whatsapp" size={18} color="#25D366" />
              </TouchableOpacity>
              <TouchableOpacity style={styles.actionBtn}>
                <Icon name="navigate" size={18} color={COLORS.primary} />
              </TouchableOpacity>
            </View>
          </View>
        </TouchableOpacity>
      ))}
    </View>
  );

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <View>
          <Text style={styles.greeting}>Good Morning</Text>
          <Text style={styles.userName}>Field Agent</Text>
        </View>
        <TouchableOpacity 
          style={styles.notificationBtn}
          onPress={() => navigation.navigate('Notifications')}
        >
          <Icon name="notifications" size={24} color={COLORS.text.primary} />
          <View style={styles.notificationBadge}>
            <Text style={styles.notificationBadgeText}>3</Text>
          </View>
        </TouchableOpacity>
      </View>

      <ScrollView 
        style={styles.scrollView}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}
      >
        {renderAttendanceCard()}
        {renderPerformanceCard()}
        {renderSmartRoutingMap()}
        {renderUrgentCases()}
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
    paddingHorizontal: 20,
    paddingBottom: 20,
  },
  attendanceCard: {
    backgroundColor: COLORS.white,
    borderRadius: 16,
    padding: 20,
    marginTop: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 8,
    elevation: 2,
  },
  attendanceHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  attendanceInfo: {
    flex: 1,
  },
  cardTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: COLORS.text.primary,
    marginBottom: 8,
  },
  attendanceTime: {
    fontSize: 24,
    fontWeight: 'bold',
    color: COLORS.primary,
    marginBottom: 4,
  },
  attendanceLocation: {
    fontSize: 14,
    color: COLORS.text.secondary,
  },
  selfieContainer: {
    position: 'relative',
  },
  selfieImage: {
    width: 80,
    height: 80,
    borderRadius: 40,
    borderWidth: 3,
    borderColor: COLORS.success,
  },
  verifiedBadge: {
    position: 'absolute',
    bottom: 0,
    right: 0,
    backgroundColor: COLORS.white,
    borderRadius: 12,
  },
  performanceCard: {
    backgroundColor: COLORS.white,
    borderRadius: 16,
    padding: 20,
    marginTop: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 8,
    elevation: 2,
  },
  progressContainer: {
    marginTop: 16,
    marginBottom: 20,
  },
  progressHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 8,
  },
  progressLabel: {
    fontSize: 14,
    color: COLORS.text.secondary,
  },
  progressValue: {
    fontSize: 14,
    fontWeight: '600',
    color: COLORS.text.primary,
  },
  progressBarContainer: {
    height: 8,
    backgroundColor: COLORS.gray200,
    borderRadius: 4,
    overflow: 'hidden',
  },
  progressBar: {
    height: '100%',
    backgroundColor: COLORS.success,
    borderRadius: 4,
  },
  statsGrid: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  statItem: {
    flex: 1,
    alignItems: 'center',
  },
  statIcon: {
    width: 48,
    height: 48,
    borderRadius: 24,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 8,
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
  mapCard: {
    backgroundColor: COLORS.white,
    borderRadius: 16,
    marginTop: 16,
    height: 180,
    overflow: 'hidden',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 8,
    elevation: 2,
  },
  mapPlaceholder: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F0F1FF',
  },
  mapText: {
    fontSize: 16,
    fontWeight: '600',
    color: COLORS.primary,
    marginTop: 12,
  },
  mapSubtext: {
    fontSize: 12,
    color: COLORS.text.secondary,
    marginTop: 4,
  },
  mapOverlay: {
    position: 'absolute',
    top: 16,
    left: 16,
  },
  mapBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: COLORS.primary,
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 20,
  },
  mapBadgeText: {
    color: COLORS.white,
    fontSize: 12,
    fontWeight: '600',
    marginLeft: 4,
  },
  urgentSection: {
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
  },
  viewAllText: {
    fontSize: 14,
    color: COLORS.primary,
    fontWeight: '600',
  },
  caseCard: {
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
  caseHeader: {
    marginBottom: 12,
  },
  caseIdRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  caseId: {
    fontSize: 12,
    color: COLORS.text.secondary,
    fontWeight: '600',
    marginRight: 8,
  },
  priorityBadge: {
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
  },
  priorityText: {
    fontSize: 10,
    fontWeight: '600',
  },
  caseName: {
    fontSize: 16,
    fontWeight: 'bold',
    color: COLORS.text.primary,
    marginBottom: 4,
  },
  caseAddress: {
    fontSize: 14,
    color: COLORS.text.secondary,
  },
  caseActions: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderTopWidth: 1,
    borderTopColor: COLORS.gray200,
    paddingTop: 12,
  },
  distanceBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#F0F1FF',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 16,
  },
  distanceText: {
    fontSize: 12,
    fontWeight: '600',
    color: COLORS.primary,
    marginLeft: 4,
  },
  actionButtons: {
    flexDirection: 'row',
    gap: 8,
  },
  actionBtn: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: COLORS.gray50,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default Dashboard;
