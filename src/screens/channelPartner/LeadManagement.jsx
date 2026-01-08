// src/screens/channelPartner/LeadManagement.js
import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  ScrollView,
  TouchableOpacity,
  TextInput,
} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';

const COLORS = {
  primary: '#5D6AFF',
  success: '#10B981',
  warning: '#F59E0B',
  info: '#3B82F6',
  danger: '#EF4444',
  white: '#FFFFFF',
  gray50: '#F9FAFB',
  gray200: '#E5E7EB',
  gray400: '#9CA3AF',
  gray500: '#6B7280',
  text: { primary: '#1F2937', secondary: '#6B7280' },
  background: '#F5F7FA',
};

const LeadManagement = ({ navigation }) => {
  const [activeFilter, setActiveFilter] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');

  const [leads] = useState([
    { 
      id: 'LD-2025-001', 
      name: 'Amit Verma', 
      product: 'Personal Loan',
      amount: '₹5,00,000',
      status: 'Credit Ops',
      statusColor: '#3B82F6',
      date: '05 Jan 2026',
      phone: '+91 98765 43210'
    },
    { 
      id: 'LD-2025-002', 
      name: 'Sneha Patel', 
      product: 'Business Loan',
      amount: '₹15,00,000',
      status: 'Sanctioned',
      statusColor: '#10B981',
      date: '04 Jan 2026',
      phone: '+91 98765 43211'
    },
    { 
      id: 'LD-2025-003', 
      name: 'Rahul Singh', 
      product: 'Personal Loan',
      amount: '₹3,00,000',
      status: 'Login',
      statusColor: '#F59E0B',
      date: '03 Jan 2026',
      phone: '+91 98765 43212'
    },
    { 
      id: 'LD-2025-004', 
      name: 'Priya Sharma', 
      product: 'Home Loan',
      amount: '₹25,00,000',
      status: 'Disbursal',
      statusColor: '#10B981',
      date: '02 Jan 2026',
      phone: '+91 98765 43213'
    },
    { 
      id: 'LD-2025-005', 
      name: 'Vikram Mehta', 
      product: 'Business Loan',
      amount: '₹10,00,000',
      status: 'Query Raised',
      statusColor: '#EF4444',
      date: '01 Jan 2026',
      phone: '+91 98765 43214'
    },
  ]);

  const filters = [
    { label: 'All', value: 'all', count: 47 },
    { label: 'Active', value: 'active', count: 12 },
    { label: 'Sanctioned', value: 'sanctioned', count: 8 },
    { label: 'Queries', value: 'queries', count: 3 },
  ];

  const renderFilters = () => (
    <View style={styles.filtersWrapper}>
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.filtersContent}
      >
        {filters.map((filter) => (
          <TouchableOpacity
            key={filter.value}
            style={[
              styles.filterChip,
              activeFilter === filter.value && styles.filterChipActive,
            ]}
            onPress={() => setActiveFilter(filter.value)}
          >
            <Text
              style={[
                styles.filterText,
                activeFilter === filter.value && styles.filterTextActive,
              ]}
            >
              {filter.label}
            </Text>
            <View
              style={[
                styles.filterBadge,
                activeFilter === filter.value && styles.filterBadgeActive,
              ]}
            >
              <Text
                style={[
                  styles.filterBadgeText,
                  activeFilter === filter.value && styles.filterBadgeTextActive,
                ]}
              >
                {filter.count}
              </Text>
            </View>
          </TouchableOpacity>
        ))}
      </ScrollView>
    </View>
  );

  const renderLeadCard = (lead) => (
    <TouchableOpacity 
      key={lead.id}
      style={styles.leadCard}
      activeOpacity={0.7}
    >
      <View style={styles.leadHeader}>
        <View style={styles.leadHeaderLeft}>
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
          <View style={styles.leadInfo}>
            <Icon name="call" size={12} color={COLORS.text.secondary} />
            <Text style={styles.leadPhone}>{lead.phone}</Text>
          </View>
        </View>
      </View>

      <View style={styles.leadDivider} />

      <View style={styles.leadDetails}>
        <View style={styles.leadDetailItem}>
          <Text style={styles.leadDetailLabel}>Product</Text>
          <Text style={styles.leadDetailValue}>{lead.product}</Text>
        </View>
        <View style={styles.leadDetailItem}>
          <Text style={styles.leadDetailLabel}>Amount</Text>
          <Text style={[styles.leadDetailValue, { color: COLORS.primary, fontWeight: 'bold' }]}>
            {lead.amount}
          </Text>
        </View>
        <View style={styles.leadDetailItem}>
          <Text style={styles.leadDetailLabel}>Date</Text>
          <Text style={styles.leadDetailValue}>{lead.date}</Text>
        </View>
      </View>

      <View style={styles.leadActions}>
        <TouchableOpacity 
        style={styles.primaryActionBtn}
        onPress={() => navigation.navigate('LeadDetails', { leadId: lead.id })}
        >
          <Icon name="eye" size={18} color={COLORS.white} />
          <Text style={styles.primaryActionText}>View Details</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.secondaryActionBtn}>
          <Icon name="call" size={18} color={COLORS.primary} />
        </TouchableOpacity>
        <TouchableOpacity style={styles.secondaryActionBtn}>
          <Icon name="logo-whatsapp" size={18} color="#25D366" />
        </TouchableOpacity>
      </View>
    </TouchableOpacity>
  );

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Lead Management</Text>
        <TouchableOpacity style={styles.filterBtn}>
          <Icon name="filter" size={20} color={COLORS.text.primary} />
        </TouchableOpacity>
      </View>

      <View style={styles.searchContainer}>
        <Icon name="search" size={20} color={COLORS.gray500} style={styles.searchIcon} />
        <TextInput
          style={styles.searchInput}
          placeholder="Search by name, ID, or phone..."
          placeholderTextColor={COLORS.gray400}
          value={searchQuery}
          onChangeText={setSearchQuery}
        />
        {searchQuery.length > 0 && (
          <TouchableOpacity onPress={() => setSearchQuery('')}>
            <Icon name="close-circle" size={20} color={COLORS.gray500} />
          </TouchableOpacity>
        )}
      </View>

      {renderFilters()}

      <ScrollView
        style={styles.scrollView}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}
      >
        {leads.map(renderLeadCard)}
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
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: COLORS.white,
    marginHorizontal: 20,
    marginTop: 16,
    paddingHorizontal: 16,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: COLORS.gray200,
  },
  searchIcon: {
    marginRight: 8,
  },
  searchInput: {
    flex: 1,
    paddingVertical: 12,
    fontSize: 16,
    color: COLORS.text.primary,
  },
  filtersWrapper: {
    backgroundColor: COLORS.white,
    borderBottomWidth: 1,
    borderBottomColor: COLORS.gray200,
    paddingVertical: 8,
    marginBottom: 10,
  },
  filtersContent: {
    paddingHorizontal: 20,
    alignItems: 'center',
  },
  filterChip: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
    backgroundColor: COLORS.white,
    marginRight: 8,
    borderWidth: 1,
    borderColor: COLORS.gray200,
    height: 36,
  },
  filterChipActive: {
    backgroundColor: COLORS.primary,
    borderColor: COLORS.primary,
  },
  filterText: {
    fontSize: 14,
    fontWeight: '600',
    color: COLORS.text.primary,
    marginRight: 6,
  },
  filterTextActive: {
    color: COLORS.white,
  },
  filterBadge: {
    backgroundColor: COLORS.gray200,
    paddingHorizontal: 8,
    paddingVertical: 2,
    borderRadius: 10,
  },
  filterBadgeActive: {
    backgroundColor: 'rgba(255, 255, 255, 0.3)',
  },
  filterBadgeText: {
    fontSize: 12,
    fontWeight: 'bold',
    color: COLORS.text.primary,
  },
  filterBadgeTextActive: {
    color: COLORS.white,
  },
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    paddingHorizontal: 20,
    paddingBottom: 20,
  },
  leadCard: {
    backgroundColor: COLORS.white,
    borderRadius: 16,
    padding: 16,
    marginBottom: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 8,
    elevation: 2,
  },
  leadHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 12,
  },
  leadHeaderLeft: {
    flex: 1,
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
    fontSize: 18,
    fontWeight: 'bold',
    color: COLORS.text.primary,
    marginBottom: 6,
  },
  leadInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  leadPhone: {
    fontSize: 12,
    color: COLORS.text.secondary,
  },
  leadDivider: {
    height: 1,
    backgroundColor: COLORS.gray200,
    marginVertical: 12,
  },
  leadDetails: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 16,
  },
  leadDetailItem: {
    flex: 1,
  },
  leadDetailLabel: {
    fontSize: 12,
    color: COLORS.text.secondary,
    marginBottom: 4,
  },
  leadDetailValue: {
    fontSize: 14,
    fontWeight: '600',
    color: COLORS.text.primary,
  },
  leadActions: {
    flexDirection: 'row',
    gap: 8,
  },
  primaryActionBtn: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: COLORS.primary,
    paddingVertical: 12,
    borderRadius: 10,
    gap: 6,
  },
  primaryActionText: {
    color: COLORS.white,
    fontSize: 14,
    fontWeight: '600',
  },
  secondaryActionBtn: {
    width: 44,
    height: 44,
    borderRadius: 10,
    backgroundColor: COLORS.gray50,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default LeadManagement;