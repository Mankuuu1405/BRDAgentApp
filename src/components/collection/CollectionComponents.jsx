// src/components/collection/CollectionComponents.jsx
import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import { COLORS } from '../../utils/constants';

// Account Card Component
export const AccountCard = ({ accountId, customerName, phoneNumber, emiAmount, dueDate, dpd, bucket, onCall, onWhatsApp, onNavigate, onPress, followUp, collectPayment }) => (
  <TouchableOpacity style={styles.accountCard} activeOpacity={0.7} onPress={onPress}>
    <View style={styles.accountHeader}>
      <View style={styles.accountIdRow}>
        <Text style={styles.accountId}>{accountId}</Text>
        <View style={[styles.bucketBadge, { backgroundColor: getBucketColor(bucket) }]}>
          <Text style={styles.bucketText}>{bucket}</Text>
        </View>
        <View style={styles.dpdBadge}>
          <Text style={styles.dpdText}>{dpd} DPD</Text>
        </View>
      </View>
      <Text style={styles.customerName}>{customerName}</Text>
      <View style={styles.accountInfo}>
        <Icon name="call-outline" size={14} color={COLORS.text.secondary} />
        <Text style={styles.phoneNumber}>{phoneNumber}</Text>
      </View>
    </View>

    <View style={styles.accountDetails}>
      <View style={styles.detailItem}>
        <Text style={styles.detailLabel}>EMI Amount</Text>
        <Text style={styles.detailValue}>{emiAmount}</Text>
      </View>
      <View style={styles.detailItem}>
        <Text style={styles.detailLabel}>Due Date</Text>
        <Text style={styles.detailValue}>{dueDate}</Text>
      </View>
    </View>

    <View style={styles.accountFooter}>
      <View style={styles.actionButtons}>
        <TouchableOpacity style={styles.actionBtn} onPress={onCall}>
          <Icon name="call" size={22} color={COLORS.primary} />
        </TouchableOpacity>
        <TouchableOpacity style={styles.actionBtn} onPress={onWhatsApp}>
          <Icon name="logo-whatsapp" size={22} color="#25D366" />
        </TouchableOpacity>
        <TouchableOpacity style={styles.actionBtn} onPress={onNavigate}>
          <Icon name="navigate" size={22} color={COLORS.primary} />
        </TouchableOpacity>
      </View>
      <View>
        <TouchableOpacity style={styles.followUpBtn} onPress={collectPayment}>
          <Text style={styles.followUpBtnText}>Collect Payment</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.followUpBtn} onPress={followUp}>
          <Text style={styles.followUpBtnText}>Follow Up</Text>
        </TouchableOpacity>
      </View>
      
    </View>
  </TouchableOpacity>
);

// Bucket Badge Component
export const BucketBadge = ({ bucket }) => {
  const getBucketStyle = () => {
    switch (bucket) {
      case 'SMA-0':
        return { bg: COLORS.warningLight, text: COLORS.warning };
      case 'SMA-1':
        return { bg: '#FED7AA', text: '#EA580C' };
      case 'SMA-2':
        return { bg: '#FECACA', text: '#DC2626' };
      case 'NPA':
        return { bg: COLORS.dangerLight, text: COLORS.danger };
      default:
        return { bg: COLORS.gray200, text: COLORS.gray500 };
    }
  };

  const style = getBucketStyle();
  return (
    <View style={[styles.bucketBadge, { backgroundColor: style.bg }]}>
      <Text style={[styles.bucketText, { color: style.text }]}>{bucket}</Text>
    </View>
  );
};

// Payment Mode Badge Component
export const PaymentModeBadge = ({ mode }) => {
  const getIcon = () => {
    switch (mode) {
      case 'CASH': return 'cash';
      case 'UPI': return 'phone-portrait';
      case 'CHEQUE': return 'document-text';
      case 'NEFT': return 'swap-horizontal';
      case 'RTGS': return 'swap-horizontal';
      default: return 'card';
    }
  };

  return (
    <View style={styles.paymentModeBadge}>
      <Icon name={getIcon()} size={14} color={COLORS.primary} />
      <Text style={styles.paymentModeText}>{mode}</Text>
    </View>
  );
};

// Disposition Badge Component
export const DispositionBadge = ({ disposition }) => {
  const getDispositionStyle = () => {
    switch (disposition) {
      case 'RTP':
        return { bg: COLORS.successLight, text: COLORS.success, label: 'Right Party' };
      case 'PTP':
        return { bg: COLORS.infoLight, text: COLORS.info, label: 'Promise to Pay' };
      case 'WPC':
        return { bg: COLORS.warningLight, text: COLORS.warning, label: 'Wrong Party' };
      case 'NC':
        return { bg: COLORS.gray200, text: COLORS.gray500, label: 'No Contact' };
      case 'SWO':
        return { bg: '#FCE7F3', text: '#DB2777', label: 'Switched Off' };
      case 'CBL':
        return { bg: COLORS.dangerLight, text: COLORS.danger, label: 'Call Back Later' };
      default:
        return { bg: COLORS.gray200, text: COLORS.gray500, label: disposition };
    }
  };

  const style = getDispositionStyle();
  return (
    <View style={[styles.dispositionBadge, { backgroundColor: style.bg }]}>
      <Text style={[styles.dispositionText, { color: style.text }]}>{style.label}</Text>
    </View>
  );
};

// Stats Card Component
export const StatsCard = ({ icon, label, value, bgColor, iconColor, trend }) => (
  <View style={styles.statsCard}>
    <View style={[styles.statsIcon, { backgroundColor: bgColor || `${COLORS.primary}20` }]}>
      <Icon name={icon} size={24} color={iconColor || COLORS.primary} />
    </View>
    <View style={styles.statsContent}>
      <Text style={styles.statsLabel}>{label}</Text>
      <View style={styles.valueRow}>
        <Text style={styles.statsValue}>{value}</Text>
        {trend && (
            <View style={styles.trendContainer}>
            <Icon 
                name={trend.direction === 'up' ? 'trending-up' : 'trending-down'} 
                size={12} 
                color={trend.direction === 'up' ? COLORS.success : COLORS.danger} 
            />
            <Text style={[
                styles.trendText,
                { color: trend.direction === 'up' ? COLORS.success : COLORS.danger }
            ]}>
                {trend.value}
            </Text>
            </View>
        )}
      </View>
      
    </View>
  </View>
);

// Collection Summary Card
export const CollectionSummary = ({ collected, target, accounts }) => {
  const percentage = (collected / target) * 100;
  
  return (
    <View style={styles.summaryCard}>
      <Text style={styles.summaryTitle}>Today's Collection</Text>
      <View style={styles.summaryAmount}>
        <Text style={styles.collectedAmount}>₹{collected.toLocaleString()}</Text>
        <Text style={styles.targetAmount}>of ₹{target.toLocaleString()}</Text>
      </View>
      
      <View style={styles.progressContainer}>
        <View style={styles.progressBar}>
          <View style={[styles.progressFill, { width: `${Math.min(percentage, 100)}%` }]} />
        </View>
        <Text style={styles.progressText}>{percentage.toFixed(1)}%</Text>
      </View>

      <View style={styles.summaryFooter}>
        <View style={styles.summaryItem}>
          <Icon name="checkbox-outline" size={16} color={COLORS.success} />
          <Text style={styles.summaryItemText}>{accounts} accounts</Text>
        </View>
      </View>
    </View>
  );
};

// PTP Card Component
// PTP Card Component
export const PTPCard = ({ accountId, customerName, amount, date, status, onPress }) => (
  <TouchableOpacity 
    style={styles.ptpCard} 
    activeOpacity={0.7} 
    onPress={onPress}
    disabled={!onPress}
  >
    <View style={styles.ptpHeader}>
      <View>
        <Text style={styles.ptpAccountId}>{accountId}</Text>
        <Text style={styles.ptpCustomerName}>{customerName}</Text>
      </View>
      <View style={[
        styles.ptpStatusBadge,
        { backgroundColor: status === 'Pending' ? COLORS.warningLight : COLORS.successLight }
      ]}>
        <Text style={[
          styles.ptpStatusText,
          { color: status === 'Pending' ? COLORS.warning : COLORS.success }
        ]}>
          {status}
        </Text>
      </View>
    </View>
    
    <View style={styles.ptpDetails}>
      <View style={styles.ptpDetailItem}>
        <Icon name="calendar" size={16} color={COLORS.text.secondary} />
        <Text style={styles.ptpDetailText}>{date}</Text>
      </View>
      <View style={styles.ptpDetailItem}>
        <Icon name="cash" size={16} color={COLORS.text.secondary} />
        <Text style={styles.ptpDetailText}>₹{amount}</Text>
      </View>
    </View>
  </TouchableOpacity>
);

// Call Log Entry Component
export const CallLogEntry = ({ disposition, datetime, duration, notes }) => (
  <View style={styles.callLogEntry}>
    <View style={styles.callLogHeader}>
      <DispositionBadge disposition={disposition} />
      <Text style={styles.callLogTime}>{datetime}</Text>
    </View>
    {duration && (
      <View style={styles.callLogDuration}>
        <Icon name="time-outline" size={14} color={COLORS.text.secondary} />
        <Text style={styles.callLogDurationText}>{duration}</Text>
      </View>
    )}
    {notes && <Text style={styles.callLogNotes}>{notes}</Text>}
  </View>
);

// Audio Recording Component
export const AudioRecordingCard = ({ duration, timestamp, isUploaded, onPlay, onDelete }) => (
  <View style={styles.audioCard}>
    <TouchableOpacity style={styles.playButton} onPress={onPlay}>
      <Icon name="play-circle" size={40} color={COLORS.primary} />
    </TouchableOpacity>
    
    <View style={styles.audioInfo}>
      <Text style={styles.audioDuration}>{duration}</Text>
      <Text style={styles.audioTimestamp}>{timestamp}</Text>
      
      <View style={styles.audioStatus}>
        <Icon 
          name={isUploaded ? "cloud-done" : "cloud-upload"} 
          size={14} 
          color={isUploaded ? COLORS.success : COLORS.warning} 
        />
        <Text style={[
          styles.audioStatusText,
          { color: isUploaded ? COLORS.success : COLORS.warning }
        ]}>
          {isUploaded ? 'Uploaded' : 'Uploading...'}
        </Text>
      </View>
    </View>

    <TouchableOpacity style={styles.deleteButton} onPress={onDelete}>
      <Icon name="trash-outline" size={20} color={COLORS.danger} />
    </TouchableOpacity>
  </View>
);

// Receipt Preview Component
export const ReceiptPreview = ({ receiptNumber, amount, mode, date, customerName }) => (
  <View style={styles.receiptCard}>
    <View style={styles.receiptHeader}>
      <Icon name="receipt" size={24} color={COLORS.success} />
      <Text style={styles.receiptTitle}>Payment Receipt</Text>
    </View>
    
    <View style={styles.receiptDivider} />
    
    <View style={styles.receiptDetails}>
      <View style={styles.receiptRow}>
        <Text style={styles.receiptLabel}>Receipt No.</Text>
        <Text style={styles.receiptValue}>{receiptNumber}</Text>
      </View>
      <View style={styles.receiptRow}>
        <Text style={styles.receiptLabel}>Customer</Text>
        <Text style={styles.receiptValue}>{customerName}</Text>
      </View>
      <View style={styles.receiptRow}>
        <Text style={styles.receiptLabel}>Date</Text>
        <Text style={styles.receiptValue}>{date}</Text>
      </View>
      <View style={styles.receiptRow}>
        <Text style={styles.receiptLabel}>Mode</Text>
        <PaymentModeBadge mode={mode} />
      </View>
      <View style={styles.receiptRow}>
        <Text style={styles.receiptLabel}>Amount</Text>
        <Text style={[styles.receiptValue, styles.receiptAmount]}>₹{amount}</Text>
      </View>
    </View>
  </View>
);

const getBucketColor = (bucket) => {
  switch (bucket) {
    case 'SMA-0': return COLORS.warningLight;
    case 'SMA-1': return '#FED7AA';
    case 'SMA-2': return '#FECACA';
    case 'NPA': return COLORS.dangerLight;
    default: return COLORS.gray200;
  }
};

const styles = StyleSheet.create({
  // Account Card Styles
  accountCard: {
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
  accountHeader: {
    marginBottom: 12,
  },
  accountIdRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
    flexWrap: 'wrap',
  },
  accountId: {
    fontSize: 12,
    fontWeight: '600',
    color: COLORS.text.secondary,
    marginRight: 8,
  },
  bucketBadge: {
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
    marginRight: 8,
  },
  bucketText: {
    fontSize: 10,
    fontWeight: '600',
  },
  dpdBadge: {
    backgroundColor: COLORS.dangerLight,
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
  },
  dpdText: {
    fontSize: 10,
    fontWeight: '600',
    color: COLORS.danger,
  },
  customerName: {
    fontSize: 18,
    fontWeight: 'bold',
    color: COLORS.text.primary,
    marginBottom: 6,
  },
  accountInfo: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  phoneNumber: {
    fontSize: 14,
    color: COLORS.text.secondary,
    marginLeft: 4,
  },
  accountDetails: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 12,
    paddingTop: 12,
    borderTopWidth: 1,
    borderTopColor: COLORS.gray200,
  },
  detailItem: {
    flex: 1,
  },
  detailLabel: {
    fontSize: 12,
    color: COLORS.text.secondary,
    marginBottom: 4,
  },
  detailValue: {
    fontSize: 16,
    fontWeight: '600',
    color: COLORS.text.primary,
  },
  accountFooter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  actionButtons: {
    flexDirection: 'row',
    gap: 8,
  },
  actionBtn: {
    width: 48,
    height: 48,
    borderRadius: 18,
    backgroundColor: COLORS.gray100,
    justifyContent: 'center',
    alignItems: 'center',
  },
  followUpBtn: {
    backgroundColor: COLORS.primary,
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderRadius: 18,
    // marginHorizontal: 2,
    marginVertical: 6,
    justifyContent: 'center',
    alignItems: 'center',
  },
  followUpBtnText: {
    color: COLORS.white,
    fontSize: 14,
    fontWeight: 'bold',
    justifyContent: 'center',
    alignItems: 'center',
  },

  // Payment Mode Badge
  paymentModeBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#F0F1FF',
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 12,
  },
  paymentModeText: {
    fontSize: 12,
    fontWeight: '600',
    color: COLORS.primary,
    marginLeft: 4,
  },

  // Disposition Badge
  dispositionBadge: {
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 12,
  },
  dispositionText: {
    fontSize: 11,
    fontWeight: '600',
  },

  // Stats Card
  statsCard: {
    backgroundColor: COLORS.white,
    borderRadius: 16,
    padding: 16,
    flexDirection: 'row',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 8,
    elevation: 2,
  },
  statsIcon: {
    width: 48,
    height: 48,
    borderRadius: 24,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  statsContent: {
    flex: 1,
  },
  statsLabel: {
    fontSize: 12,
    color: COLORS.text.secondary,
    marginBottom: 4,
  },
  valueRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 4,
    justifyContent: 'space-between',
  },
  statsValue: {
    fontSize: 20,
    fontWeight: 'bold',
    color: COLORS.text.primary,
  },
  trendContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 4,
    marginLeft: 8,
  },
  trendText: {
    fontSize: 12,
    fontWeight: '600',
    marginLeft: 4,
  },

  // Collection Summary
  summaryCard: {
    backgroundColor: COLORS.white,
    borderRadius: 16,
    padding: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 8,
    elevation: 2,
  },
  summaryTitle: {
    fontSize: 14,
    color: COLORS.text.secondary,
    marginBottom: 8,
  },
  summaryAmount: {
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
    marginBottom: 16,
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
  summaryFooter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  summaryItem: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  summaryItemText: {
    fontSize: 14,
    color: COLORS.text.secondary,
    marginLeft: 6,
  },

  // PTP Card
  ptpCard: {
    backgroundColor: COLORS.white,
    borderRadius: 12,
    padding: 16,
    marginBottom: 12,
    borderLeftWidth: 4,
    borderLeftColor: COLORS.info,
  },
  ptpHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 12,
  },
  ptpAccountId: {
    fontSize: 12,
    color: COLORS.text.secondary,
    marginBottom: 4,
  },
  ptpCustomerName: {
    fontSize: 16,
    fontWeight: 'bold',
    color: COLORS.text.primary,
  },
  ptpStatusBadge: {
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 12,
  },
  ptpStatusText: {
    fontSize: 11,
    fontWeight: '600',
  },
  ptpDetails: {
    flexDirection: 'row',
    gap: 16,
  },
  ptpDetailItem: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  ptpDetailText: {
    fontSize: 14,
    color: COLORS.text.primary,
    marginLeft: 6,
  },

  // Call Log Entry
  callLogEntry: {
    backgroundColor: COLORS.white,
    borderRadius: 12,
    padding: 16,
    marginBottom: 12,
  },
  callLogHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  callLogTime: {
    fontSize: 12,
    color: COLORS.text.secondary,
  },
  callLogDuration: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  callLogDurationText: {
    fontSize: 12,
    color: COLORS.text.secondary,
    marginLeft: 4,
  },
  callLogNotes: {
    fontSize: 14,
    color: COLORS.text.primary,
    lineHeight: 20,
  },

  // Audio Recording Card
  audioCard: {
    backgroundColor: COLORS.white,
    borderRadius: 12,
    padding: 16,
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
    borderWidth: 1,
    borderColor: COLORS.gray200,
  },
  playButton: {
    marginRight: 12,
  },
  audioInfo: {
    flex: 1,
  },
  audioDuration: {
    fontSize: 16,
    fontWeight: 'bold',
    color: COLORS.text.primary,
    marginBottom: 4,
  },
  audioTimestamp: {
    fontSize: 12,
    color: COLORS.text.secondary,
    marginBottom: 6,
  },
  audioStatus: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  audioStatusText: {
    fontSize: 12,
    fontWeight: '600',
    marginLeft: 4,
  },
  deleteButton: {
    padding: 8,
  },

  // Receipt Preview
  receiptCard: {
    backgroundColor: COLORS.white,
    borderRadius: 16,
    padding: 20,
    borderWidth: 2,
    borderColor: COLORS.success,
  },
  receiptHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 16,
  },
  receiptTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: COLORS.text.primary,
    marginLeft: 8,
  },
  receiptDivider: {
    height: 1,
    backgroundColor: COLORS.gray200,
    marginBottom: 16,
  },
  receiptDetails: {
    gap: 12,
  },
  receiptRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  receiptLabel: {
    fontSize: 14,
    color: COLORS.text.secondary,
  },
  receiptValue: {
    fontSize: 14,
    fontWeight: '600',
    color: COLORS.text.primary,
  },
  receiptAmount: {
    fontSize: 20,
    color: COLORS.success,
  },
});

export default {
  AccountCard,
  BucketBadge,
  PaymentModeBadge,
  DispositionBadge,
  StatsCard,
  CollectionSummary,
  PTPCard,
  CallLogEntry,
  AudioRecordingCard,
  ReceiptPreview,
};