// src/screens/collection/AccountDetails.jsx
import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  ScrollView,
  TouchableOpacity,
  Linking,
  Alert,
} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import { COLORS } from '../../utils/constants';
import { BucketBadge, PTPCard, CallLogEntry } from '../../components/collection/CollectionComponents';

const AccountDetails = ({ navigation, route }) => {
  const account = route?.params?.account || {
    id: 'LA-2025-1234',
    customerName: 'Rajesh Kumar',
    phoneNumber: '+91 9876543210',
    alternateNumber: '+91 9876543211',
    email: 'rajesh.kumar@email.com',
    address: 'H-102, Dwarka Sector 10, Delhi - 110075',
    emiAmount: '₹12,000',
    overdueAmount: '₹36,000',
    totalLoan: '₹5,00,000',
    outstanding: '₹3,60,000',
    dueDate: '05 Jan 2026',
    dpd: 15,
    bucket: 'SMA-0',
    loanType: 'Personal Loan',
    disbursementDate: '15 Jun 2024',
    tenure: '36 months',
    roi: '12.5%',
    lastPayment: '20 Dec 2025',
    lastPaymentAmount: '₹12,000',
  };

  const [ptpHistory] = useState([
    {
      id: 1,
      date: 'Tomorrow',
      amount: '15,000',
      status: 'Pending',
    },
    {
      id: 2,
      date: '05 Jan 2026',
      amount: '12,000',
      status: 'Completed',
    },
  ]);

  const [callHistory] = useState([
    {
      id: 1,
      disposition: 'RTP',
      datetime: 'Today, 10:30 AM',
      duration: '5 min 23 sec',
      notes: 'Customer promised to pay by tomorrow',
    },
    {
      id: 2,
      disposition: 'WPC',
      datetime: 'Yesterday, 3:45 PM',
      duration: '2 min 10 sec',
      notes: 'Wrong number, customer number changed',
    },
  ]);

  const [paymentHistory] = useState([
    {
      id: 1,
      date: '20 Dec 2025',
      amount: '₹12,000',
      mode: 'UPI',
      status: 'Success',
    },
    {
      id: 2,
      date: '20 Nov 2025',
      amount: '₹12,000',
      mode: 'NEFT',
      status: 'Success',
    },
  ]);

  const handleCall = (number) => {
    Linking.openURL(`tel:${number}`);
  };

  const handleWhatsApp = (number) => {
    const cleanNumber = number.replace(/[^0-9]/g, '');
    Linking.openURL(`whatsapp://send?phone=${cleanNumber}`);
  };

  const handleNavigate = () => {
    Alert.alert('Navigate', `Opening maps to: ${account.address}`);
  };

  const renderAccountHeader = () => (
    <View style={styles.headerCard}>
      <View style={styles.headerTop}>
        <View>
          <Text style={styles.accountId}>{account.id}</Text>
          <Text style={styles.customerName}>{account.customerName}</Text>
        </View>
        <BucketBadge bucket={account.bucket} />
      </View>

      <View style={styles.dpdCard}>
        <View style={styles.dpdInfo}>
          <Text style={styles.dpdLabel}>Days Past Due</Text>
          <Text style={styles.dpdValue}>{account.dpd} days</Text>
        </View>
        <View style={styles.dpdIcon}>
          <Icon name="alert-circle" size={32} color={COLORS.danger} />
        </View>
      </View>

      <View style={styles.amountGrid}>
        <View style={styles.amountCard}>
          <Text style={styles.amountLabel}>Overdue Amount</Text>
          <Text style={[styles.amountValue, { color: COLORS.danger }]}>
            {account.overdueAmount}
          </Text>
        </View>
        <View style={styles.amountCard}>
          <Text style={styles.amountLabel}>EMI Amount</Text>
          <Text style={styles.amountValue}>{account.emiAmount}</Text>
        </View>
      </View>
    </View>
  );

  const renderContactInfo = () => (
    <View style={styles.section}>
      <Text style={styles.sectionTitle}>Contact Information</Text>

      <View style={styles.contactCard}>
        <View style={styles.contactRow}>
          <Icon name="call" size={20} color={COLORS.primary} />
          <View style={styles.contactInfo}>
            <Text style={styles.contactLabel}>Primary Phone</Text>
            <Text style={styles.contactValue}>{account.phoneNumber}</Text>
          </View>
          <View style={styles.contactActions}>
            <TouchableOpacity
              style={styles.contactBtn}
              onPress={() => handleCall(account.phoneNumber)}
            >
              <Icon name="call" size={18} color={COLORS.primary} />
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.contactBtn}
              onPress={() => handleWhatsApp(account.phoneNumber)}
            >
              <Icon name="logo-whatsapp" size={18} color="#25D366" />
            </TouchableOpacity>
          </View>
        </View>

        {account.alternateNumber && (
          <View style={styles.contactRow}>
            <Icon name="call-outline" size={20} color={COLORS.text.secondary} />
            <View style={styles.contactInfo}>
              <Text style={styles.contactLabel}>Alternate Phone</Text>
              <Text style={styles.contactValue}>{account.alternateNumber}</Text>
            </View>
            <View style={styles.contactActions}>
              <TouchableOpacity
                style={styles.contactBtn}
                onPress={() => handleCall(account.alternateNumber)}
              >
                <Icon name="call" size={18} color={COLORS.primary} />
              </TouchableOpacity>
            </View>
          </View>
        )}

        <View style={styles.contactRow}>
          <Icon name="mail" size={20} color={COLORS.text.secondary} />
          <View style={styles.contactInfo}>
            <Text style={styles.contactLabel}>Email</Text>
            <Text style={styles.contactValue}>{account.email}</Text>
          </View>
        </View>

        <View style={styles.contactRow}>
          <Icon name="location" size={20} color={COLORS.text.secondary} />
          <View style={styles.contactInfo}>
            <Text style={styles.contactLabel}>Address</Text>
            <Text style={styles.contactValue}>{account.address}</Text>
          </View>
          <TouchableOpacity style={styles.contactBtn} onPress={handleNavigate}>
            <Icon name="navigate" size={18} color={COLORS.primary} />
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );

  const renderLoanDetails = () => (
    <View style={styles.section}>
      <Text style={styles.sectionTitle}>Loan Details</Text>

      <View style={styles.detailsCard}>
        <View style={styles.detailRow}>
          <Text style={styles.detailLabel}>Loan Type</Text>
          <Text style={styles.detailValue}>{account.loanType}</Text>
        </View>
        <View style={styles.detailRow}>
          <Text style={styles.detailLabel}>Total Loan Amount</Text>
          <Text style={styles.detailValue}>{account.totalLoan}</Text>
        </View>
        <View style={styles.detailRow}>
          <Text style={styles.detailLabel}>Outstanding</Text>
          <Text style={[styles.detailValue, { color: COLORS.warning }]}>
            {account.outstanding}
          </Text>
        </View>
        <View style={styles.detailRow}>
          <Text style={styles.detailLabel}>Tenure</Text>
          <Text style={styles.detailValue}>{account.tenure}</Text>
        </View>
        <View style={styles.detailRow}>
          <Text style={styles.detailLabel}>Rate of Interest</Text>
          <Text style={styles.detailValue}>{account.roi}</Text>
        </View>
        <View style={styles.detailRow}>
          <Text style={styles.detailLabel}>Disbursement Date</Text>
          <Text style={styles.detailValue}>{account.disbursementDate}</Text>
        </View>
        <View style={styles.detailRow}>
          <Text style={styles.detailLabel}>Due Date</Text>
          <Text style={styles.detailValue}>{account.dueDate}</Text>
        </View>
        <View style={styles.detailRow}>
          <Text style={styles.detailLabel}>Last Payment</Text>
          <Text style={styles.detailValue}>
            {account.lastPaymentAmount} on {account.lastPayment}
          </Text>
        </View>
      </View>
    </View>
  );

  const renderQuickActions = () => (
    <View style={styles.section}>
      <Text style={styles.sectionTitle}>Quick Actions</Text>

      <View style={styles.actionsGrid}>
        <TouchableOpacity
          style={styles.actionCard}
          onPress={() => navigation.navigate('PaymentCollection', { account })}
        >
          <Icon name="cash" size={28} color={COLORS.success} />
          <Text style={styles.actionText}>Collect Payment</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.actionCard}
          onPress={() => navigation.navigate('FollowUpLogger', { account })}
        >
          <Icon name="call" size={28} color={COLORS.primary} />
          <Text style={styles.actionText}>Log Follow Up</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.actionCard}
          onPress={() => navigation.navigate('VisitRecording', { account })}
        >
          <Icon name="walk" size={28} color={COLORS.warning} />
          <Text style={styles.actionText}>Record Visit</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.actionCard}>
          <Icon name="document-text" size={28} color={COLORS.info} />
          <Text style={styles.actionText}>View Documents</Text>
        </TouchableOpacity>
      </View>
    </View>
  );

  const renderPTPHistory = () => (
    <View style={styles.section}>
      <Text style={styles.sectionTitle}>Promise to Pay History</Text>
      {ptpHistory.map((ptp) => (
        <PTPCard
          key={ptp.id}
          accountId={account.id}
          customerName={account.customerName}
          amount={ptp.amount}
          date={ptp.date}
          status={ptp.status}
        />
      ))}
    </View>
  );

  const renderCallHistory = () => (
    <View style={styles.section}>
      <Text style={styles.sectionTitle}>Call History</Text>
      {callHistory.map((call) => (
        <CallLogEntry
          key={call.id}
          disposition={call.disposition}
          datetime={call.datetime}
          duration={call.duration}
          notes={call.notes}
        />
      ))}
    </View>
  );

  const renderPaymentHistory = () => (
    <View style={styles.section}>
      <Text style={styles.sectionTitle}>Payment History</Text>

      {paymentHistory.map((payment) => (
        <View key={payment.id} style={styles.paymentCard}>
          <View style={styles.paymentInfo}>
            <View style={styles.paymentHeader}>
              <Text style={styles.paymentDate}>{payment.date}</Text>
              <View
                style={[
                  styles.statusBadge,
                  {
                    backgroundColor:
                      payment.status === 'Success'
                        ? COLORS.successLight
                        : COLORS.dangerLight,
                  },
                ]}
              >
                <Text
                  style={[
                    styles.statusText,
                    {
                      color:
                        payment.status === 'Success' ? COLORS.success : COLORS.danger,
                    },
                  ]}
                >
                  {payment.status}
                </Text>
              </View>
            </View>
            <Text style={styles.paymentMode}>{payment.mode}</Text>
          </View>
          <Text style={styles.paymentAmount}>{payment.amount}</Text>
        </View>
      ))}
    </View>
  );

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Icon name="arrow-back" size={24} color={COLORS.text.primary} />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Account Details</Text>
        <TouchableOpacity>
          <Icon name="ellipsis-vertical" size={24} color={COLORS.text.primary} />
        </TouchableOpacity>
      </View>

      <ScrollView
        style={styles.content}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}
      >
        {renderAccountHeader()}
        {renderQuickActions()}
        {renderContactInfo()}
        {renderLoanDetails()}
        {renderPTPHistory()}
        {renderCallHistory()}
        {renderPaymentHistory()}
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
    fontSize: 18,
    fontWeight: 'bold',
    color: COLORS.text.primary,
  },
  content: {
    flex: 1,
  },
  scrollContent: {
    paddingBottom: 24,
  },
  headerCard: {
    backgroundColor: COLORS.white,
    padding: 20,
    marginBottom: 12,
  },
  headerTop: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 16,
  },
  accountId: {
    fontSize: 12,
    fontWeight: '600',
    color: COLORS.text.secondary,
    marginBottom: 6,
  },
  customerName: {
    fontSize: 22,
    fontWeight: 'bold',
    color: COLORS.text.primary,
  },
  dpdCard: {
    flexDirection: 'row',
    backgroundColor: COLORS.dangerLight,
    padding: 16,
    borderRadius: 12,
    marginBottom: 16,
    alignItems: 'center',
  },
  dpdInfo: {
    flex: 1,
  },
  dpdLabel: {
    fontSize: 14,
    color: COLORS.text.secondary,
    marginBottom: 4,
  },
  dpdValue: {
    fontSize: 24,
    fontWeight: 'bold',
    color: COLORS.danger,
  },
  dpdIcon: {
    marginLeft: 12,
  },
  amountGrid: {
    flexDirection: 'row',
    gap: 12,
  },
  amountCard: {
    flex: 1,
    backgroundColor: COLORS.gray50,
    padding: 16,
    borderRadius: 12,
  },
  amountLabel: {
    fontSize: 12,
    color: COLORS.text.secondary,
    marginBottom: 8,
  },
  amountValue: {
    fontSize: 18,
    fontWeight: 'bold',
    color: COLORS.text.primary,
  },
  section: {
    paddingHorizontal: 20,
    marginTop: 12,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: COLORS.text.primary,
    marginBottom: 12,
  },
  contactCard: {
    backgroundColor: COLORS.white,
    borderRadius: 16,
    padding: 16,
  },
  contactRow: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: COLORS.gray200,
  },
  contactInfo: {
    flex: 1,
    marginLeft: 12,
  },
  contactLabel: {
    fontSize: 12,
    color: COLORS.text.secondary,
    marginBottom: 4,
  },
  contactValue: {
    fontSize: 14,
    fontWeight: '600',
    color: COLORS.text.primary,
  },
  contactActions: {
    flexDirection: 'row',
    gap: 8,
  },
  contactBtn: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: COLORS.gray50,
    justifyContent: 'center',
    alignItems: 'center',
  },
  detailsCard: {
    backgroundColor: COLORS.white,
    borderRadius: 16,
    padding: 16,
  },
  detailRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: COLORS.gray200,
  },
  detailLabel: {
    fontSize: 14,
    color: COLORS.text.secondary,
  },
  detailValue: {
    fontSize: 14,
    fontWeight: '600',
    color: COLORS.text.primary,
    textAlign: 'right',
    maxWidth: '50%',
  },
  actionsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 12,
  },
  actionCard: {
    width: '47%',
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
  actionText: {
    fontSize: 13,
    fontWeight: '600',
    color: COLORS.text.primary,
    marginTop: 8,
    textAlign: 'center',
  },
  paymentCard: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: COLORS.white,
    borderRadius: 12,
    padding: 16,
    marginBottom: 12,
  },
  paymentInfo: {
    flex: 1,
  },
  paymentHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 6,
  },
  paymentDate: {
    fontSize: 14,
    fontWeight: '600',
    color: COLORS.text.primary,
    marginRight: 8,
  },
  statusBadge: {
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
  },
  statusText: {
    fontSize: 10,
    fontWeight: '600',
  },
  paymentMode: {
    fontSize: 12,
    color: COLORS.text.secondary,
  },
  paymentAmount: {
    fontSize: 18,
    fontWeight: 'bold',
    color: COLORS.success,
  },
});

export default AccountDetails;