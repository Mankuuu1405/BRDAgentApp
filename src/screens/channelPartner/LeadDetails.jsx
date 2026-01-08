// src/screens/channelPartner/LeadDetails.js
import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  ScrollView,
  TouchableOpacity,
  Alert,
  Linking,
} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';

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

const LeadDetails = ({ navigation, route }) => {
  // In real app, fetch lead data based on route.params.leadId
  const [leadData] = useState({
    id: 'LD-2025-001',
    name: 'Amit Verma',
    email: 'amit.verma@email.com',
    phone: '+91 98765 43210',
    panNumber: 'ABCDE1234F',
    aadhaarNumber: '1234 5678 9012',
    address: 'Flat 204, Green Valley Apartments, Dwarka Sector 10, New Delhi - 110075',
    product: 'Personal Loan',
    loanAmount: '₹5,00,000',
    status: 'Credit Ops',
    statusColor: COLORS.info,
    applicationDate: '05 Jan 2026',
    lastUpdated: '07 Jan 2026',
    expectedDisbursement: '15 Jan 2026',
    commission: '₹8,000',
    commissionStatus: 'Pending',
  });

  const [timeline] = useState([
    {
      id: 1,
      title: 'Application Submitted',
      description: 'Lead created and submitted for review',
      date: '05 Jan 2026, 10:30 AM',
      status: 'completed',
      icon: 'checkmark-circle',
      color: COLORS.success,
    },
    {
      id: 2,
      title: 'Login Stage',
      description: 'Initial documents verified successfully',
      date: '05 Jan 2026, 02:15 PM',
      status: 'completed',
      icon: 'checkmark-circle',
      color: COLORS.success,
    },
    {
      id: 3,
      title: 'Credit Ops Review',
      description: 'Application under credit assessment',
      date: '06 Jan 2026, 11:00 AM',
      status: 'active',
      icon: 'time',
      color: COLORS.info,
    },
    {
      id: 4,
      title: 'Sanction',
      description: 'Awaiting sanction approval',
      date: 'Pending',
      status: 'pending',
      icon: 'ellipse-outline',
      color: COLORS.gray400,
    },
    {
      id: 5,
      title: 'Disbursal',
      description: 'Final loan disbursal',
      date: 'Pending',
      status: 'pending',
      icon: 'ellipse-outline',
      color: COLORS.gray400,
    },
  ]);

  const [documents] = useState([
    { id: 1, name: 'PAN Card', status: 'Verified', icon: 'checkmark-circle', color: COLORS.success },
    { id: 2, name: 'Aadhaar Card', status: 'Verified', icon: 'checkmark-circle', color: COLORS.success },
    { id: 3, name: 'Bank Statement', status: 'Query Raised', icon: 'alert-circle', color: COLORS.warning },
    { id: 4, name: 'Salary Slips', status: 'Pending Review', icon: 'time', color: COLORS.info },
  ]);

  const [queries] = useState([
    {
      id: 1,
      title: 'Bank Statement Clarity',
      description: 'Please upload a clearer copy of the last 3 months bank statement. Current document is not readable.',
      raisedBy: 'Credit Officer',
      date: '07 Jan 2026, 09:30 AM',
      status: 'Open',
    },
  ]);

  const handleCall = () => {
    Linking.openURL(`tel:${leadData.phone}`);
  };

  const handleWhatsApp = () => {
    const phone = leadData.phone.replace(/[^0-9]/g, '');
    Linking.openURL(`whatsapp://send?phone=${phone}`);
  };

  const handleEmail = () => {
    Linking.openURL(`mailto:${leadData.email}`);
  };

  const handleUploadDocument = () => {
    Alert.alert('Upload Document', 'Document upload feature will be implemented');
  };

  const renderStatusCard = () => (
    <View style={styles.statusCard}>
      <View style={styles.statusHeader}>
        <View>
          <Text style={styles.leadId}>{leadData.id}</Text>
          <Text style={styles.leadName}>{leadData.name}</Text>
        </View>
        <View style={[styles.statusBadge, { backgroundColor: leadData.statusColor + '20' }]}>
          <View style={[styles.statusDot, { backgroundColor: leadData.statusColor }]} />
          <Text style={[styles.statusText, { color: leadData.statusColor }]}>
            {leadData.status}
          </Text>
        </View>
      </View>

      <View style={styles.statusDivider} />

      <View style={styles.statusDetails}>
        <View style={styles.statusDetailItem}>
          <Text style={styles.statusDetailLabel}>Product</Text>
          <Text style={styles.statusDetailValue}>{leadData.product}</Text>
        </View>
        <View style={styles.statusDetailItem}>
          <Text style={styles.statusDetailLabel}>Loan Amount</Text>
          <Text style={[styles.statusDetailValue, { color: COLORS.primary, fontWeight: 'bold' }]}>
            {leadData.loanAmount}
          </Text>
        </View>
        <View style={styles.statusDetailItem}>
          <Text style={styles.statusDetailLabel}>Expected Commission</Text>
          <Text style={[styles.statusDetailValue, { color: COLORS.success, fontWeight: 'bold' }]}>
            {leadData.commission}
          </Text>
        </View>
      </View>
    </View>
  );

  const renderQuickActions = () => (
    <View style={styles.quickActionsCard}>
      <Text style={styles.cardTitle}>Quick Actions</Text>
      <View style={styles.quickActionsGrid}>
        <TouchableOpacity style={styles.quickActionBtn} onPress={handleCall}>
          <View style={[styles.quickActionIcon, { backgroundColor: '#DBEAFE' }]}>
            <Icon name="call" size={20} color={COLORS.info} />
          </View>
          <Text style={styles.quickActionLabel}>Call</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.quickActionBtn} onPress={handleWhatsApp}>
          <View style={[styles.quickActionIcon, { backgroundColor: '#D1FAE5' }]}>
            <Icon name="logo-whatsapp" size={20} color="#25D366" />
          </View>
          <Text style={styles.quickActionLabel}>WhatsApp</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.quickActionBtn} onPress={handleEmail}>
          <View style={[styles.quickActionIcon, { backgroundColor: '#FEF3C7' }]}>
            <Icon name="mail" size={20} color={COLORS.warning} />
          </View>
          <Text style={styles.quickActionLabel}>Email</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.quickActionBtn} onPress={handleUploadDocument}>
          <View style={[styles.quickActionIcon, { backgroundColor: '#E0E7FF' }]}>
            <Icon name="cloud-upload" size={20} color={COLORS.primary} />
          </View>
          <Text style={styles.quickActionLabel}>Upload</Text>
        </TouchableOpacity>
      </View>
    </View>
  );

  const renderCustomerInfo = () => (
    <View style={styles.infoCard}>
      <Text style={styles.cardTitle}>Customer Information</Text>

      <View style={styles.infoRow}>
        <Icon name="mail-outline" size={18} color={COLORS.text.secondary} />
        <View style={styles.infoContent}>
          <Text style={styles.infoLabel}>Email</Text>
          <Text style={styles.infoValue}>{leadData.email}</Text>
        </View>
      </View>

      <View style={styles.infoRow}>
        <Icon name="call-outline" size={18} color={COLORS.text.secondary} />
        <View style={styles.infoContent}>
          <Text style={styles.infoLabel}>Phone</Text>
          <Text style={styles.infoValue}>{leadData.phone}</Text>
        </View>
      </View>

      <View style={styles.infoRow}>
        <Icon name="card-outline" size={18} color={COLORS.text.secondary} />
        <View style={styles.infoContent}>
          <Text style={styles.infoLabel}>PAN Number</Text>
          <Text style={styles.infoValue}>{leadData.panNumber}</Text>
        </View>
      </View>

      <View style={styles.infoRow}>
        <Icon name="finger-print-outline" size={18} color={COLORS.text.secondary} />
        <View style={styles.infoContent}>
          <Text style={styles.infoLabel}>Aadhaar Number</Text>
          <Text style={styles.infoValue}>{leadData.aadhaarNumber}</Text>
        </View>
      </View>

      <View style={styles.infoRow}>
        <Icon name="location-outline" size={18} color={COLORS.text.secondary} />
        <View style={styles.infoContent}>
          <Text style={styles.infoLabel}>Address</Text>
          <Text style={styles.infoValue}>{leadData.address}</Text>
        </View>
      </View>
    </View>
  );

  const renderTimeline = () => (
    <View style={styles.timelineCard}>
      <Text style={styles.cardTitle}>Application Timeline</Text>

      {timeline.map((item, index) => (
        <View key={item.id} style={styles.timelineItem}>
          <View style={styles.timelineIconContainer}>
            <View style={[
              styles.timelineIcon,
              { 
                backgroundColor: item.status === 'completed' ? item.color + '20' : 
                                item.status === 'active' ? item.color + '20' : COLORS.gray50 
              }
            ]}>
              <Icon 
                name={item.icon} 
                size={20} 
                color={item.color}
              />
            </View>
            {index < timeline.length - 1 && (
              <View style={[
                styles.timelineLine,
                { backgroundColor: item.status === 'completed' ? COLORS.success : COLORS.gray200 }
              ]} />
            )}
          </View>

          <View style={styles.timelineContent}>
            <Text style={styles.timelineTitle}>{item.title}</Text>
            <Text style={styles.timelineDescription}>{item.description}</Text>
            <Text style={styles.timelineDate}>{item.date}</Text>
          </View>
        </View>
      ))}
    </View>
  );

  const renderDocuments = () => (
    <View style={styles.documentsCard}>
      <View style={styles.cardHeader}>
        <Text style={styles.cardTitle}>Documents</Text>
        <TouchableOpacity onPress={handleUploadDocument}>
          <Text style={styles.uploadLink}>Upload</Text>
        </TouchableOpacity>
      </View>

      {documents.map((doc) => (
        <View key={doc.id} style={styles.documentItem}>
          <View style={styles.documentLeft}>
            <Icon name="document-text" size={20} color={COLORS.primary} />
            <Text style={styles.documentName}>{doc.name}</Text>
          </View>
          <View style={styles.documentRight}>
            <Icon name={doc.icon} size={16} color={doc.color} />
            <Text style={[styles.documentStatus, { color: doc.color }]}>
              {doc.status}
            </Text>
          </View>
        </View>
      ))}
    </View>
  );

  const renderQueries = () => {
    if (queries.length === 0) return null;

    return (
      <View style={styles.queriesCard}>
        <View style={styles.cardHeader}>
          <Text style={styles.cardTitle}>Active Queries</Text>
          <View style={styles.queryBadge}>
            <Text style={styles.queryBadgeText}>{queries.length}</Text>
          </View>
        </View>

        {queries.map((query) => (
          <View key={query.id} style={styles.queryItem}>
            <View style={styles.queryHeader}>
              <Icon name="alert-circle" size={20} color={COLORS.warning} />
              <Text style={styles.queryTitle}>{query.title}</Text>
            </View>
            <Text style={styles.queryDescription}>{query.description}</Text>
            <View style={styles.queryFooter}>
              <Text style={styles.queryMeta}>By {query.raisedBy}</Text>
              <Text style={styles.queryDate}>{query.date}</Text>
            </View>
            <TouchableOpacity 
              style={styles.resolveBtn}
              onPress={handleUploadDocument}
            >
              <Icon name="cloud-upload-outline" size={16} color={COLORS.white} />
              <Text style={styles.resolveBtnText}>Upload Document</Text>
            </TouchableOpacity>
          </View>
        ))}
      </View>
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Icon name="arrow-back" size={24} color={COLORS.text.primary} />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Lead Details</Text>
        <TouchableOpacity>
          <Icon name="ellipsis-vertical" size={24} color={COLORS.text.primary} />
        </TouchableOpacity>
      </View>

      <ScrollView
        style={styles.scrollView}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}
      >
        {renderStatusCard()}
        {renderQuickActions()}
        {renderQueries()}
        {renderCustomerInfo()}
        {renderTimeline()}
        {renderDocuments()}
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
    fontSize: 20,
    fontWeight: 'bold',
    color: COLORS.text.primary,
  },
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    paddingHorizontal: 20,
    paddingTop: 20,
    paddingBottom: 20,
  },
  statusCard: {
    backgroundColor: COLORS.white,
    borderRadius: 16,
    padding: 20,
    marginBottom: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 8,
    elevation: 2,
  },
  statusHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 16,
  },
  leadId: {
    fontSize: 12,
    color: COLORS.text.secondary,
    marginBottom: 4,
  },
  leadName: {
    fontSize: 24,
    fontWeight: 'bold',
    color: COLORS.text.primary,
  },
  statusBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 16,
    gap: 6,
  },
  statusDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
  },
  statusText: {
    fontSize: 12,
    fontWeight: '600',
  },
  statusDivider: {
    height: 1,
    backgroundColor: COLORS.gray200,
    marginBottom: 16,
  },
  statusDetails: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  statusDetailItem: {
    flex: 1,
  },
  statusDetailLabel: {
    fontSize: 12,
    color: COLORS.text.secondary,
    marginBottom: 4,
  },
  statusDetailValue: {
    fontSize: 16,
    fontWeight: '600',
    color: COLORS.text.primary,
  },
  quickActionsCard: {
    backgroundColor: COLORS.white,
    borderRadius: 16,
    padding: 20,
    marginBottom: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 8,
    elevation: 2,
  },
  cardTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: COLORS.text.primary,
    marginBottom: 16,
  },
  quickActionsGrid: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  quickActionBtn: {
    alignItems: 'center',
    flex: 1,
  },
  quickActionIcon: {
    width: 56,
    height: 56,
    borderRadius: 28,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 8,
  },
  quickActionLabel: {
    fontSize: 12,
    fontWeight: '600',
    color: COLORS.text.primary,
  },
  infoCard: {
    backgroundColor: COLORS.white,
    borderRadius: 16,
    padding: 20,
    marginBottom: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 8,
    elevation: 2,
  },
  infoRow: {
    flexDirection: 'row',
    marginBottom: 16,
    gap: 12,
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
    fontSize: 14,
    color: COLORS.text.primary,
    fontWeight: '500',
  },
  timelineCard: {
    backgroundColor: COLORS.white,
    borderRadius: 16,
    padding: 20,
    marginBottom: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 8,
    elevation: 2,
  },
  timelineItem: {
    flexDirection: 'row',
    marginBottom: 8,
  },
  timelineIconContainer: {
    alignItems: 'center',
    marginRight: 16,
  },
  timelineIcon: {
    width: 40,
    height: 40,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  timelineLine: {
    width: 2,
    flex: 1,
    marginTop: 4,
  },
  timelineContent: {
    flex: 1,
    paddingBottom: 16,
  },
  timelineTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: COLORS.text.primary,
    marginBottom: 4,
  },
  timelineDescription: {
    fontSize: 14,
    color: COLORS.text.secondary,
    marginBottom: 4,
  },
  timelineDate: {
    fontSize: 12,
    color: COLORS.text.secondary,
  },
  documentsCard: {
    backgroundColor: COLORS.white,
    borderRadius: 16,
    padding: 20,
    marginBottom: 16,
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
  uploadLink: {
    fontSize: 14,
    fontWeight: '600',
    color: COLORS.primary,
  },
  documentItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: COLORS.gray200,
  },
  documentLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  documentName: {
    fontSize: 14,
    fontWeight: '500',
    color: COLORS.text.primary,
  },
  documentRight: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  documentStatus: {
    fontSize: 12,
    fontWeight: '600',
  },
  queriesCard: {
    backgroundColor: COLORS.white,
    borderRadius: 16,
    padding: 20,
    marginBottom: 16,
    borderWidth: 2,
    borderColor: COLORS.warning,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 8,
    elevation: 2,
  },
  queryBadge: {
    backgroundColor: COLORS.warning,
    borderRadius: 12,
    paddingHorizontal: 8,
    paddingVertical: 2,
    minWidth: 24,
    alignItems: 'center',
  },
  queryBadgeText: {
    color: COLORS.white,
    fontSize: 12,
    fontWeight: 'bold',
  },
  queryItem: {
    marginBottom: 12,
  },
  queryHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    marginBottom: 8,
  },
  queryTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: COLORS.text.primary,
    flex: 1,
  },
  queryDescription: {
    fontSize: 14,
    color: COLORS.text.secondary,
    lineHeight: 20,
    marginBottom: 8,
  },
  queryFooter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 12,
  },
  queryMeta: {
    fontSize: 12,
    color: COLORS.text.secondary,
  },
  queryDate: {
    fontSize: 12,
    color: COLORS.text.secondary,
  },
  resolveBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: COLORS.warning,
    paddingVertical: 10,
    borderRadius: 8,
    gap: 6,
  },
  resolveBtnText: {
    color: COLORS.white,
    fontSize: 14,
    fontWeight: '600',
  },
});

export default LeadDetails;