// src/screens/channelPartner/PayoutLedger.js
import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  ScrollView,
  TouchableOpacity,
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

const PayoutLedger = () => {
  const [selectedPeriod, setSelectedPeriod] = useState('all');

  const [payoutSummary] = useState({
    totalEarned: '₹1,24,500',
    pending: '₹32,000',
    paid: '₹92,500',
    thisMonth: '₹18,500',
  });

  const [transactions] = useState([
    {
      id: 'PAY-2025-001',
      leadId: 'LD-2025-002',
      customerName: 'Sneha Patel',
      product: 'Business Loan',
      amount: '₹12,000',
      status: 'Paid',
      statusColor: COLORS.success,
      date: '28 Dec 2025',
      disbursedAmount: '₹15,00,000',
    },
    {
      id: 'PAY-2025-002',
      leadId: 'LD-2025-004',
      customerName: 'Priya Sharma',
      product: 'Home Loan',
      amount: '₹25,000',
      status: 'Paid',
      statusColor: COLORS.success,
      date: '20 Dec 2025',
      disbursedAmount: '₹25,00,000',
    },
    {
      id: 'PAY-2025-003',
      leadId: 'LD-2025-001',
      customerName: 'Amit Verma',
      product: 'Personal Loan',
      amount: '₹8,000',
      status: 'Pending',
      statusColor: COLORS.warning,
      date: '05 Jan 2026',
      disbursedAmount: '₹5,00,000',
    },
    {
      id: 'PAY-2025-004',
      leadId: 'LD-2025-006',
      customerName: 'Rajesh Kumar',
      product: 'Vehicle Loan',
      amount: '₹15,000',
      status: 'Processing',
      statusColor: COLORS.primary,
      date: '03 Jan 2026',
      disbursedAmount: '₹8,00,000',
    },
  ]);

  const periods = [
    { label: 'All Time', value: 'all' },
    { label: 'This Month', value: 'month' },
    { label: 'Last 3 Months', value: '3months' },
    { label: 'This Year', value: 'year' },
  ];

  const renderSummaryCard = () => (
    <View style={styles.summaryCard}>
      <View style={styles.summaryHeader}>
        <Text style={styles.summaryTitle}>Earnings Overview</Text>
        <TouchableOpacity style={styles.downloadBtn}>
          <Icon name="download-outline" size={20} color={COLORS.primary} />
        </TouchableOpacity>
      </View>

      <View style={styles.totalEarnings}>
        <Text style={styles.totalLabel}>Total Earned</Text>
        <Text style={styles.totalAmount}>{payoutSummary.totalEarned}</Text>
      </View>

      <View style={styles.summaryGrid}>
        <View style={styles.summaryItem}>
          <View style={[styles.summaryIcon, { backgroundColor: '#FEF3C7' }]}>
            <Icon name="time" size={20} color={COLORS.warning} />
          </View>
          <Text style={styles.summaryValue}>{payoutSummary.pending}</Text>
          <Text style={styles.summaryLabel}>Pending</Text>
        </View>

        <View style={styles.summaryItem}>
          <View style={[styles.summaryIcon, { backgroundColor: '#D1FAE5' }]}>
            <Icon name="checkmark-circle" size={20} color={COLORS.success} />
          </View>
          <Text style={styles.summaryValue}>{payoutSummary.paid}</Text>
          <Text style={styles.summaryLabel}>Paid</Text>
        </View>

        <View style={styles.summaryItem}>
          <View style={[styles.summaryIcon, { backgroundColor: '#DBEAFE' }]}>
            <Icon name="trending-up" size={20} color={COLORS.primary} />
          </View>
          <Text style={styles.summaryValue}>{payoutSummary.thisMonth}</Text>
          <Text style={styles.summaryLabel}>This Month</Text>
        </View>
      </View>
    </View>
  );

  const renderPeriodFilters = () => (
    <ScrollView
      horizontal
      showsHorizontalScrollIndicator={false}
      contentContainerStyle={styles.periodFilters}
    >
      {periods.map((period) => (
        <TouchableOpacity
          key={period.value}
          style={[
            styles.periodChip,
            selectedPeriod === period.value && styles.periodChipActive
          ]}
          onPress={() => setSelectedPeriod(period.value)}
        >
          <Text style={[
            styles.periodText,
            selectedPeriod === period.value && styles.periodTextActive
          ]}>
            {period.label}
          </Text>
        </TouchableOpacity>
      ))}
    </ScrollView>
  );

  const renderTransactionCard = (transaction) => (
    <View key={transaction.id} style={styles.transactionCard}>
      <View style={styles.transactionHeader}>
        <View style={styles.transactionLeft}>
          <Text style={styles.transactionId}>{transaction.id}</Text>
          <Text style={styles.customerName}>{transaction.customerName}</Text>
          <Text style={styles.leadId}>Lead: {transaction.leadId}</Text>
        </View>
        <View style={styles.transactionRight}>
          <Text style={styles.transactionAmount}>{transaction.amount}</Text>
          <View style={[
            styles.statusBadge,
            { backgroundColor: transaction.statusColor + '20' }
          ]}>
            <View style={[styles.statusDot, { backgroundColor: transaction.statusColor }]} />
            <Text style={[styles.statusText, { color: transaction.statusColor }]}>
              {transaction.status}
            </Text>
          </View>
        </View>
      </View>

      <View style={styles.transactionDivider} />

      <View style={styles.transactionDetails}>
        <View style={styles.detailRow}>
          <Icon name="briefcase-outline" size={16} color={COLORS.text.secondary} />
          <Text style={styles.detailText}>{transaction.product}</Text>
        </View>
        <View style={styles.detailRow}>
          <Icon name="cash-outline" size={16} color={COLORS.text.secondary} />
          <Text style={styles.detailText}>Disbursed: {transaction.disbursedAmount}</Text>
        </View>
        <View style={styles.detailRow}>
          <Icon name="calendar-outline" size={16} color={COLORS.text.secondary} />
          <Text style={styles.detailText}>{transaction.date}</Text>
        </View>
      </View>

      {transaction.status === 'Paid' && (
        <TouchableOpacity style={styles.downloadInvoiceBtn}>
          <Icon name="document-text-outline" size={18} color={COLORS.primary} />
          <Text style={styles.downloadInvoiceText}>Download Invoice</Text>
        </TouchableOpacity>
      )}
    </View>
  );

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Payout Ledger</Text>
        <TouchableOpacity style={styles.filterBtn}>
          <Icon name="filter" size={20} color={COLORS.text.primary} />
        </TouchableOpacity>
      </View>

      <ScrollView
        style={styles.scrollView}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}
      >
        {renderSummaryCard()}
        
        <View style={styles.transactionsSection}>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>Transaction History</Text>
          </View>

          {renderPeriodFilters()}

          {transactions.map(renderTransactionCard)}
        </View>
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
  filterBtn: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: COLORS.gray50,
    justifyContent: 'center',
    alignItems: 'center',
  },
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    paddingHorizontal: 20,
    paddingTop: 20,
    paddingBottom: 20,
  },
  summaryCard: {
    backgroundColor: COLORS.white,
    borderRadius: 16,
    padding: 20,
    marginBottom: 24,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 8,
    elevation: 2,
  },
  summaryHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  summaryTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: COLORS.text.primary,
  },
  downloadBtn: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: COLORS.gray50,
    justifyContent: 'center',
    alignItems: 'center',
  },
  totalEarnings: {
    alignItems: 'center',
    paddingVertical: 20,
    borderBottomWidth: 1,
    borderBottomColor: COLORS.gray200,
    marginBottom: 20,
  },
  totalLabel: {
    fontSize: 14,
    color: COLORS.text.secondary,
    marginBottom: 8,
  },
  totalAmount: {
    fontSize: 36,
    fontWeight: 'bold',
    color: COLORS.primary,
  },
  summaryGrid: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  summaryItem: {
    flex: 1,
    alignItems: 'center',
  },
  summaryIcon: {
    width: 48,
    height: 48,
    borderRadius: 24,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 8,
  },
  summaryValue: {
    fontSize: 16,
    fontWeight: 'bold',
    color: COLORS.text.primary,
    marginBottom: 4,
  },
  summaryLabel: {
    fontSize: 12,
    color: COLORS.text.secondary,
  },
  transactionsSection: {
    marginBottom: 20,
  },
  sectionHeader: {
    marginBottom: 16,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: COLORS.text.primary,
  },
  periodFilters: {
    paddingBottom: 16,
    gap: 8,
  },
  periodChip: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
    backgroundColor: COLORS.white,
    marginRight: 8,
    borderWidth: 1,
    borderColor: COLORS.gray200,
  },
  periodChipActive: {
    backgroundColor: COLORS.primary,
    borderColor: COLORS.primary,
  },
  periodText: {
    fontSize: 14,
    fontWeight: '600',
    color: COLORS.text.primary,
  },
  periodTextActive: {
    color: COLORS.white,
  },
  transactionCard: {
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
  transactionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 12,
  },
  transactionLeft: {
    flex: 1,
  },
  transactionId: {
    fontSize: 12,
    color: COLORS.text.secondary,
    marginBottom: 4,
  },
  customerName: {
    fontSize: 16,
    fontWeight: 'bold',
    color: COLORS.text.primary,
    marginBottom: 4,
  },
  leadId: {
    fontSize: 12,
    color: COLORS.text.secondary,
  },
  transactionRight: {
    alignItems: 'flex-end',
  },
  transactionAmount: {
    fontSize: 20,
    fontWeight: 'bold',
    color: COLORS.success,
    marginBottom: 8,
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
  transactionDivider: {
    height: 1,
    backgroundColor: COLORS.gray200,
    marginBottom: 12,
  },
  transactionDetails: {
    gap: 8,
  },
  detailRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  detailText: {
    fontSize: 14,
    color: COLORS.text.secondary,
  },
  downloadInvoiceBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#F0F1FF',
    paddingVertical: 10,
    borderRadius: 8,
    marginTop: 12,
    gap: 6,
  },
  downloadInvoiceText: {
    fontSize: 14,
    fontWeight: '600',
    color: COLORS.primary,
  },
});

export default PayoutLedger;