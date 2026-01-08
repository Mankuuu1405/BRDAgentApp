// src/components/fieldInvestigation/VerificationComponents.js
import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
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
};

// Case Header Component
export const CaseHeader = ({ caseId, applicantName, address, verificationType, distance }) => (
  <View style={styles.caseHeaderContainer}>
    <View style={styles.caseIdRow}>
      <Text style={styles.caseId}>{caseId}</Text>
      {verificationType && (
        <View style={styles.verificationTypeBadge}>
          <Text style={styles.verificationTypeText}>{verificationType}</Text>
        </View>
      )}
      {distance && (
        <View style={styles.distanceBadge}>
          <Icon name="navigate" size={12} color={COLORS.primary} />
          <Text style={styles.distanceText}>{distance}</Text>
        </View>
      )}
    </View>
    <Text style={styles.applicantName}>{applicantName}</Text>
    <View style={styles.addressRow}>
      <Icon name="location" size={14} color={COLORS.text.secondary} />
      <Text style={styles.address}>{address}</Text>
    </View>
  </View>
);

// Geo-fence Status Component
export const GeoFenceStatus = ({ isWithinRange, distance, onRefresh }) => (
  <View style={[
    styles.geoFenceCard, 
    isWithinRange ? styles.geoFenceSuccess : styles.geoFenceWarning
  ]}>
    <Icon 
      name={isWithinRange ? "checkmark-circle" : "alert-circle"} 
      size={24} 
      color={isWithinRange ? COLORS.success : COLORS.warning} 
    />
    <View style={styles.geoFenceInfo}>
      <Text style={styles.geoFenceTitle}>
        {isWithinRange ? 'Within verification range' : `${distance}m from location`}
      </Text>
      <Text style={styles.geoFenceSubtext}>
        {isWithinRange ? 'Ready to submit' : 'Move within 50m to enable submission'}
      </Text>
    </View>
    {onRefresh && (
      <TouchableOpacity style={styles.refreshBtn} onPress={onRefresh}>
        <Icon name="refresh" size={20} color={COLORS.primary} />
      </TouchableOpacity>
    )}
  </View>
);

// Priority Badge Component
export const PriorityBadge = ({ priority }) => {
  const getColors = () => {
    switch (priority) {
      case 'Urgent':
        return { bg: '#FEE2E2', text: COLORS.danger };
      case 'High':
        return { bg: '#FEF3C7', text: COLORS.warning };
      case 'Medium':
        return { bg: '#DBEAFE', text: COLORS.primary };
      default:
        return { bg: COLORS.gray200, text: COLORS.gray500 };
    }
  };

  const colors = getColors();
  return (
    <View style={[styles.priorityBadge, { backgroundColor: colors.bg }]}>
      <Text style={[styles.priorityText, { color: colors.text }]}>{priority}</Text>
    </View>
  );
};

// Status Badge Component
export const StatusBadge = ({ status }) => {
  const getColors = () => {
    switch (status) {
      case 'Completed':
        return { bg: '#D1FAE5', text: COLORS.success };
      case 'In Progress':
        return { bg: '#DBEAFE', text: COLORS.primary };
      case 'Pending':
        return { bg: '#FEF3C7', text: COLORS.warning };
      default:
        return { bg: COLORS.gray200, text: COLORS.gray500 };
    }
  };

  const colors = getColors();
  return (
    <View style={[styles.statusBadge, { backgroundColor: colors.bg }]}>
      <Text style={[styles.statusText, { color: colors.text }]}>{status}</Text>
    </View>
  );
};

// Action Button Row Component
export const ActionButtonRow = ({ onCall, onWhatsApp, onNavigate, onStart }) => (
  <View style={styles.actionButtonRow}>
    {onCall && (
      <TouchableOpacity style={styles.actionButton} onPress={onCall}>
        <Icon name="call" size={18} color={COLORS.primary} />
      </TouchableOpacity>
    )}
    {onWhatsApp && (
      <TouchableOpacity style={styles.actionButton} onPress={onWhatsApp}>
        <Icon name="logo-whatsapp" size={18} color="#25D366" />
      </TouchableOpacity>
    )}
    {onNavigate && (
      <TouchableOpacity style={styles.actionButton} onPress={onNavigate}>
        <Icon name="navigate" size={18} color={COLORS.primary} />
      </TouchableOpacity>
    )}
    {onStart && (
      <TouchableOpacity style={styles.startButton} onPress={onStart}>
        <Text style={styles.startButtonText}>Start</Text>
      </TouchableOpacity>
    )}
  </View>
);

// Section Header Component
export const SectionHeader = ({ title, required, rightComponent }) => (
  <View style={styles.sectionHeader}>
    <Text style={styles.sectionTitle}>{title}</Text>
    <View style={styles.sectionRight}>
      {required && <Text style={styles.requiredBadge}>Required</Text>}
      {rightComponent}
    </View>
  </View>
);

// Info Card Component
export const InfoCard = ({ icon, label, value, iconBg }) => (
  <View style={styles.infoCard}>
    <View style={[styles.infoIcon, { backgroundColor: iconBg || `${COLORS.primary}20` }]}>
      <Icon name={icon} size={20} color={COLORS.primary} />
    </View>
    <View style={styles.infoContent}>
      <Text style={styles.infoLabel}>{label}</Text>
      <Text style={styles.infoValue}>{value}</Text>
    </View>
  </View>
);

// Empty State Component
export const EmptyState = ({ icon, title, message }) => (
  <View style={styles.emptyState}>
    <View style={styles.emptyIcon}>
      <Icon name={icon} size={64} color={COLORS.gray400} />
    </View>
    <Text style={styles.emptyTitle}>{title}</Text>
    <Text style={styles.emptyMessage}>{message}</Text>
  </View>
);

const styles = StyleSheet.create({
  caseHeaderContainer: {
    backgroundColor: COLORS.white,
    padding: 16,
    borderRadius: 12,
    marginBottom: 12,
  },
  caseIdRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
    flexWrap: 'wrap',
  },
  caseId: {
    fontSize: 12,
    fontWeight: '600',
    color: COLORS.text.secondary,
    marginRight: 8,
  },
  verificationTypeBadge: {
    backgroundColor: '#F0F1FF',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
    marginRight: 8,
  },
  verificationTypeText: {
    fontSize: 10,
    fontWeight: '600',
    color: COLORS.primary,
  },
  distanceBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#F0F1FF',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
  },
  distanceText: {
    fontSize: 10,
    fontWeight: '600',
    color: COLORS.primary,
    marginLeft: 4,
  },
  applicantName: {
    fontSize: 18,
    fontWeight: 'bold',
    color: COLORS.text.primary,
    marginBottom: 8,
  },
  addressRow: {
    flexDirection: 'row',
    alignItems: 'flex-start',
  },
  address: {
    fontSize: 14,
    color: COLORS.text.secondary,
    marginLeft: 4,
    flex: 1,
  },
  geoFenceCard: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
    borderRadius: 12,
    marginBottom: 16,
  },
  geoFenceSuccess: {
    backgroundColor: '#D1FAE5',
  },
  geoFenceWarning: {
    backgroundColor: '#FEF3C7',
  },
  geoFenceInfo: {
    flex: 1,
    marginLeft: 12,
  },
  geoFenceTitle: {
    fontSize: 14,
    fontWeight: '600',
    color: COLORS.text.primary,
  },
  geoFenceSubtext: {
    fontSize: 12,
    color: COLORS.text.secondary,
    marginTop: 2,
  },
  refreshBtn: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: COLORS.white,
    justifyContent: 'center',
    alignItems: 'center',
  },
  priorityBadge: {
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
    marginRight: 6,
  },
  priorityText: {
    fontSize: 10,
    fontWeight: '600',
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
  actionButtonRow: {
    flexDirection: 'row',
    gap: 8,
  },
  actionButton: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: COLORS.gray50,
    justifyContent: 'center',
    alignItems: 'center',
  },
  startButton: {
    backgroundColor: COLORS.primary,
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 18,
    justifyContent: 'center',
    alignItems: 'center',
  },
  startButtonText: {
    color: COLORS.white,
    fontSize: 12,
    fontWeight: 'bold',
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: COLORS.text.primary,
  },
  sectionRight: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  requiredBadge: {
    fontSize: 11,
    fontWeight: '600',
    color: COLORS.danger,
    backgroundColor: '#FEE2E2',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 8,
  },
  infoCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: COLORS.white,
    padding: 16,
    borderRadius: 12,
    marginBottom: 12,
  },
  infoIcon: {
    width: 40,
    height: 40,
    borderRadius: 20,
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
    fontWeight: 'bold',
    color: COLORS.text.primary,
  },
  emptyState: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 40,
    paddingVertical: 60,
  },
  emptyIcon: {
    width: 120,
    height: 120,
    borderRadius: 60,
    backgroundColor: COLORS.gray50,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 24,
  },
  emptyTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: COLORS.text.primary,
    marginBottom: 8,
  },
  emptyMessage: {
    fontSize: 14,
    color: COLORS.text.secondary,
    textAlign: 'center',
    lineHeight: 20,
  },
});

export default {
  CaseHeader,
  GeoFenceStatus,
  PriorityBadge,
  StatusBadge,
  ActionButtonRow,
  SectionHeader,
  InfoCard,
  EmptyState,
};