// src/screens/channelPartner/CPDashboard.js
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

const { width } = Dimensions.get('window');

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

const CPDashboard = ({ navigation }) => {
  const [dashboardStats] = useState({
    totalLeads: 47,
    activeLeads: 12,
    converted: 8,
    totalEarnings: '₹1,24,500',
    pendingPayout: '₹32,000',
    thisMonthLeads: 15,
  });

  const [recentLeads] = useState([
    { 
      id: 'LD-2025-001', 
      name: 'Amit Verma', 
      product: 'Personal Loan', 
      amount: '₹5,00,000',
      status: 'Credit Ops',
      statusColor: '#3B82F6'
    },
    { 
      id: 'LD-2025-002', 
      name: 'Sneha Patel', 
      product: 'Business Loan', 
      amount: '₹15,00,000',
      status: 'Sanctioned',
      statusColor: '#10B981'
    },
  ]);

  const renderStatsCard = () => (
    <View style={styles.statsContainer}>
      <View style={styles.statCard}>
        <View style={[styles.statIcon, { backgroundColor: '#DBEAFE' }]}>
          <Icon name="people" size={24} color={COLORS.info} />
        </View>
        <Text style={styles.statValue}>{dashboardStats.totalLeads}</Text>
        <Text style={styles.statLabel}>Total Leads</Text>
      </View>

      <View style={styles.statCard}>
        <View style={[styles.statIcon, { backgroundColor: '#FEF3C7' }]}>
          <Icon name="timer" size={24} color={COLORS.warning} />
        </View>
        <Text style={styles.statValue}>{dashboardStats.activeLeads}</Text>
        <Text style={styles.statLabel}>Active</Text>
      </View>

      <View style={styles.statCard}>
        <View style={[styles.statIcon, { backgroundColor: '#D1FAE5' }]}>
          <Icon name="checkmark-circle" size={24} color={COLORS.success} />
        </View>
        <Text style={styles.statValue}>{dashboardStats.converted}</Text>
        <Text style={styles.statLabel}>Converted</Text>
      </View>
    </View>
  );

  const renderEarningsCard = () => (
    <View style={styles.earningsCard}>
      <View style={styles.earningsHeader}>
        <View>
          <Text style={styles.cardTitle}>Total Earnings</Text>
          <Text style={styles.earningsAmount}>{dashboardStats.totalEarnings}</Text>
        </View>
        <View style={styles.earningsBadge}>
          <Icon name="trending-up" size={20} color={COLORS.success} />
          <Text style={styles.earningsTrend}>+12.5%</Text>
        </View>
      </View>
      
      <View style={styles.earningsDivider} />
      
      <View style={styles.earningsDetails}>
        <View style={styles.earningsItem}>
          <Text style={styles.earningsItemLabel}>Pending Payout</Text>
          <Text style={styles.earningsItemValue}>{dashboardStats.pendingPayout}</Text>
        </View>
        <TouchableOpacity 
          style={styles.viewPayoutsBtn}
          onPress={() => navigation.navigate('Payouts')}
        >
          <Text style={styles.viewPayoutsText}>View Details</Text>
          <Icon name="arrow-forward" size={16} color={COLORS.primary} />
        </TouchableOpacity>
      </View>
    </View>
  );

  const renderQuickActions = () => (
    <View style={styles.quickActionsContainer}>
      <Text style={styles.sectionTitle}>Quick Actions</Text>
      <View style={styles.quickActionsGrid}>
        <TouchableOpacity 
          style={styles.quickActionCard}
          onPress={() => navigation.navigate('Create')}
        >
          <View style={[styles.quickActionIcon, { backgroundColor: '#DBEAFE' }]}>
            <Icon name="add-circle" size={28} color={COLORS.info} />
          </View>
          <Text style={styles.quickActionText}>New Lead</Text>
        </TouchableOpacity>

        <TouchableOpacity 
          style={styles.quickActionCard}
          onPress={() => navigation.navigate('Leads')}
        >
          <View style={[styles.quickActionIcon, { backgroundColor: '#FEF3C7' }]}>
            <Icon name="document-text" size={28} color={COLORS.warning} />
          </View>
          <Text style={styles.quickActionText}>Track Status</Text>
        </TouchableOpacity>

        <TouchableOpacity 
          style={styles.quickActionCard}
          onPress={() => navigation.navigate('Payouts')}
        >
          <View style={[styles.quickActionIcon, { backgroundColor: '#D1FAE5' }]}>
            <Icon name="wallet" size={28} color={COLORS.success} />
          </View>
          <Text style={styles.quickActionText}>Payouts</Text>
        </TouchableOpacity>

        <TouchableOpacity 
          style={styles.quickActionCard}
        >
          <View style={[styles.quickActionIcon, { backgroundColor: '#E0E7FF' }]}>
            <Icon name="download" size={28} color={COLORS.primary} />
          </View>
          <Text style={styles.quickActionText}>Invoices</Text>
        </TouchableOpacity>
      </View>
    </View>
  );

  const renderRecentLeads = () => (
    <View style={styles.recentSection}>
      <View style={styles.sectionHeader}>
        <Text style={styles.sectionTitle}>Recent Leads</Text>
        <TouchableOpacity onPress={() => navigation.navigate('Leads')}>
          <Text style={styles.viewAllText}>View All</Text>
        </TouchableOpacity>
      </View>

      {recentLeads.map((lead) => (
        <TouchableOpacity 
          key={lead.id} 
          style={styles.leadCard}
          activeOpacity={0.7}
          onPress={() => navigation.navigate('Leads')}
        >
          <View style={styles.leadHeader}>
            <View>
              <View style={styles.leadIdRow}>
                <Text style={styles.leadId}>{lead.id}</Text>
                <View style={[
                  styles.statusBadge,
                  { backgroundColor: lead.statusColor + '20' }
                ]}>
                  <View style={[styles.statusDot, { backgroundColor: lead.statusColor }]} />
                  <Text style={[styles.statusText, { color: lead.statusColor }]}>
                    {lead.status}
                  </Text>
                </View>
              </View>
              <Text style={styles.leadName}>{lead.name}</Text>
              <View style={styles.leadDetails}>
                <Text style={styles.leadProduct}>{lead.product}</Text>
                <Text style={styles.leadAmount}>{lead.amount}</Text>
              </View>
            </View>
          </View>

          <View style={styles.leadActions}>
            <TouchableOpacity style={styles.actionBtn}>
              <Icon name="call" size={18} color={COLORS.primary} />
            </TouchableOpacity>
            <TouchableOpacity style={styles.actionBtn}>
              <Icon name="logo-whatsapp" size={18} color="#25D366" />
            </TouchableOpacity>
            <TouchableOpacity style={styles.actionBtn}>
              <Icon name="eye" size={18} color={COLORS.primary} />
            </TouchableOpacity>
          </View>
        </TouchableOpacity>
      ))}
    </View>
  );

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <View>
          <Text style={styles.greeting}>Welcome Back</Text>
          <Text style={styles.userName}>Channel Partner</Text>
        </View>
        <TouchableOpacity 
          style={styles.notificationBtn}
          onPress={() => navigation.navigate('CPNotifications')}
        >
          <Icon name="notifications" size={24} color={COLORS.text.primary} />
          <View style={styles.notificationBadge}>
            <Text style={styles.notificationBadgeText}>2</Text>
          </View>
        </TouchableOpacity>
      </View>

      <ScrollView 
        style={styles.scrollView}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}
      >
        {renderStatsCard()}
        {renderEarningsCard()}
        {renderQuickActions()}
        {renderRecentLeads()}
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
  statsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 20,
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
  statIcon: {
    width: 48,
    height: 48,
    borderRadius: 24,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 12,
  },
  statValue: {
    fontSize: 24,
    fontWeight: 'bold',
    color: COLORS.text.primary,
    marginBottom: 4,
  },
  statLabel: {
    fontSize: 12,
    color: COLORS.text.secondary,
  },
  earningsCard: {
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
  earningsHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  cardTitle: {
    fontSize: 14,
    color: COLORS.text.secondary,
    marginBottom: 8,
  },
  earningsAmount: {
    fontSize: 32,
    fontWeight: 'bold',
    color: COLORS.text.primary,
  },
  earningsBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#D1FAE5',
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 20,
    gap: 4,
  },
  earningsTrend: {
    fontSize: 14,
    fontWeight: '600',
    color: COLORS.success,
  },
  earningsDivider: {
    height: 1,
    backgroundColor: COLORS.gray200,
    marginVertical: 16,
  },
  earningsDetails: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  earningsItem: {
    flex: 1,
  },
  earningsItemLabel: {
    fontSize: 12,
    color: COLORS.text.secondary,
    marginBottom: 4,
  },
  earningsItemValue: {
    fontSize: 18,
    fontWeight: 'bold',
    color: COLORS.warning,
  },
  viewPayoutsBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  viewPayoutsText: {
    fontSize: 14,
    fontWeight: '600',
    color: COLORS.primary,
  },
  quickActionsContainer: {
    marginTop: 24,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: COLORS.text.primary,
    marginBottom: 16,
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
  quickActionIcon: {
    width: 56,
    height: 56,
    borderRadius: 28,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 12,
  },
  quickActionText: {
    fontSize: 14,
    fontWeight: '600',
    color: COLORS.text.primary,
    textAlign: 'center',
  },
  recentSection: {
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
  leadCard: {
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
  leadHeader: {
    marginBottom: 12,
  },
  leadIdRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
    gap: 8,
  },
  leadId: {
    fontSize: 12,
    color: COLORS.text.secondary,
    fontWeight: '600',
  },
  statusBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 12,
    gap: 4,
  },
  statusDot: {
    width: 6,
    height: 6,
    borderRadius: 3,
  },
  statusText: {
    fontSize: 11,
    fontWeight: '600',
  },
  leadName: {
    fontSize: 16,
    fontWeight: 'bold',
    color: COLORS.text.primary,
    marginBottom: 8,
  },
  leadDetails: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  leadProduct: {
    fontSize: 14,
    color: COLORS.text.secondary,
  },
  leadAmount: {
    fontSize: 14,
    fontWeight: '600',
    color: COLORS.primary,
  },
  leadActions: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    gap: 8,
    borderTopWidth: 1,
    borderTopColor: COLORS.gray200,
    paddingTop: 12,
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

export default CPDashboard;