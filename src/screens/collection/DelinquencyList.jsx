// src/screens/collection/DelinquencyList.jsx
import React, { useState, useMemo } from 'react';
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  ScrollView,
  TouchableOpacity,
  TextInput,
  FlatList,
  Alert,
  Linking,
} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import { COLORS } from '../../utils/constants';
import { AccountCard, BucketBadge } from '../../components/collection/CollectionComponents';

const DelinquencyList = ({ navigation }) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedBucket, setSelectedBucket] = useState('All');
  const [sortBy, setSortBy] = useState('DPD');

  const [accounts] = useState([
    {
      id: 'LA-2025-1234',
      customerName: 'Rajesh Kumar',
      phoneNumber: '+91 9876543210',
      emiAmount: '₹12,000',
      overdueAmount: '₹36,000',
      dueDate: '05 Jan 2026',
      dpd: 15,
      bucket: 'SMA-0',
      address: 'Dwarka Sector 10, Delhi',
      loanAmount: '₹5,00,000',
      lastPayment: '20 Dec 2025',
      lastContact: '2 days ago',
    },
    {
      id: 'LA-2025-5678',
      customerName: 'Priya Sharma',
      phoneNumber: '+91 9876543211',
      emiAmount: '₹18,000',
      overdueAmount: '₹90,000',
      dueDate: '28 Dec 2025',
      dpd: 42,
      bucket: 'SMA-1',
      address: 'Rohini Sector 15, Delhi',
      loanAmount: '₹7,50,000',
      lastPayment: '01 Dec 2025',
      lastContact: '1 week ago',
    },
    {
      id: 'LA-2025-9012',
      customerName: 'Amit Verma',
      phoneNumber: '+91 9876543212',
      emiAmount: '₹15,000',
      overdueAmount: '₹1,20,000',
      dueDate: '10 Nov 2025',
      dpd: 68,
      bucket: 'SMA-2',
      address: 'Janakpuri, Delhi',
      loanAmount: '₹6,00,000',
      lastPayment: '05 Nov 2025',
      lastContact: '3 days ago',
    },
    {
      id: 'LA-2025-3456',
      customerName: 'Neha Singh',
      phoneNumber: '+91 9876543213',
      emiAmount: '₹10,000',
      overdueAmount: '₹1,50,000',
      dueDate: '15 Oct 2025',
      dpd: 95,
      bucket: 'NPA',
      address: 'Vikaspuri, Delhi',
      loanAmount: '₹4,00,000',
      lastPayment: '10 Oct 2025',
      lastContact: '5 days ago',
    },
    {
      id: 'LA-2025-7890',
      customerName: 'Suresh Patel',
      phoneNumber: '+91 9876543214',
      emiAmount: '₹20,000',
      overdueAmount: '₹60,000',
      dueDate: '01 Jan 2026',
      dpd: 25,
      bucket: 'SMA-1',
      address: 'Tilak Nagar, Delhi',
      loanAmount: '₹8,00,000',
      lastPayment: '15 Dec 2025',
      lastContact: 'Today',
    },
  ]);

  const buckets = ['All', 'SMA-0', 'SMA-1', 'SMA-2', 'NPA'];
  const sortOptions = ['DPD', 'Amount', 'Last Contact'];

  // Filter and Sort Accounts
  const filteredAndSortedAccounts = useMemo(() => {
    let filtered = accounts;

    // Apply search filter
    if (searchQuery.trim()) {
      filtered = filtered.filter(
        (acc) =>
          acc.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
          acc.customerName.toLowerCase().includes(searchQuery.toLowerCase()) ||
          acc.phoneNumber.includes(searchQuery)
      );
    }

    // Apply bucket filter
    if (selectedBucket !== 'All') {
      filtered = filtered.filter((acc) => acc.bucket === selectedBucket);
    }

    // Apply sorting
    const sorted = [...filtered].sort((a, b) => {
      switch (sortBy) {
        case 'DPD':
          return b.dpd - a.dpd;
        case 'Amount':
          return parseInt(b.overdueAmount.replace(/[^0-9]/g, '')) - parseInt(a.overdueAmount.replace(/[^0-9]/g, ''));
        case 'Last Contact':
          // Simple string comparison for demo
          return a.lastContact.localeCompare(b.lastContact);
        default:
          return 0;
      }
    });

    return sorted;
  }, [accounts, searchQuery, selectedBucket, sortBy]);

  // Get bucket counts
  const getBucketCount = (bucket) => {
    if (bucket === 'All') return accounts.length;
    return accounts.filter((acc) => acc.bucket === bucket).length;
  };

  const handleCall = (phoneNumber) => {
    Linking.openURL(`tel:${phoneNumber}`);
  };

  const handleWhatsApp = (phoneNumber) => {
    const cleanNumber = phoneNumber.replace(/[^0-9]/g, '');
    Linking.openURL(`whatsapp://send?phone=${cleanNumber}`);
  };

  const handleNavigate = (address) => {
    Alert.alert('Navigate', `Opening maps to: ${address}`);
  };

  const handleAccountPress = (account) => {
    Alert.alert(
      'Account Actions',
      `What would you like to do for ${account.customerName}?`,
      [
        { text: 'Collect Payment', onPress: () => navigation.navigate('Payment', { account }) },
        { text: 'Log Follow Up', onPress: () => navigation.navigate('FollowUp', { account }) },
        { text: 'View Details', onPress: () => Alert.alert('View Details', 'Details screen coming soon') },
        { text: 'Cancel', style: 'cancel' },
      ]
    );
  };

  const renderAccountCard = ({ item }) => (
    <AccountCard
      accountId={item.id}
      customerName={item.customerName}
      phoneNumber={item.phoneNumber}
      emiAmount={item.emiAmount}
      dueDate={item.dueDate}
      dpd={item.dpd}
      bucket={item.bucket}
      onCall={() => handleCall(item.phoneNumber)}
      onWhatsApp={() => handleWhatsApp(item.phoneNumber)}
      onNavigate={() => handleNavigate(item.address)}
      onPress={() => handleAccountPress(item)}
    />
  );

  const renderEmptyState = () => (
    <View style={styles.emptyState}>
      <View style={styles.emptyIcon}>
        <Icon name="search" size={64} color={COLORS.gray400} />
      </View>
      <Text style={styles.emptyTitle}>No Accounts Found</Text>
      <Text style={styles.emptyText}>
        {searchQuery
          ? `No results for "${searchQuery}"`
          : `No accounts in ${selectedBucket} bucket`}
      </Text>
    </View>
  );

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Delinquent Accounts</Text>
        <View style={styles.headerRight}>
          <View style={styles.totalBadge}>
            <Text style={styles.totalBadgeText}>{filteredAndSortedAccounts.length}</Text>
          </View>
          <TouchableOpacity style={styles.headerIcon}>
            <Icon name="filter" size={24} color={COLORS.text.primary} />
          </TouchableOpacity>
        </View>
      </View>

      {/* Search Bar */}
      <View style={styles.searchContainer}>
        <View style={styles.searchBar}>
          <Icon name="search" size={20} color={COLORS.gray400} />
          <TextInput
            style={styles.searchInput}
            placeholder="Search by Account ID, Name or Phone"
            placeholderTextColor={COLORS.gray400}
            value={searchQuery}
            onChangeText={setSearchQuery}
          />
          {searchQuery.length > 0 && (
            <TouchableOpacity onPress={() => setSearchQuery('')}>
              <Icon name="close-circle" size={20} color={COLORS.gray400} />
            </TouchableOpacity>
          )}
        </View>
      </View>

      {/* Bucket Filter */}
      <View style={styles.filtersWrapper}>
        <Text style={styles.filterLabel}>Buckets:</Text>
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          style={styles.filtersContainer}
          contentContainerStyle={styles.filtersContent}
        >
          {buckets.map((bucket) => {
            const count = getBucketCount(bucket);
            return (
              <TouchableOpacity
                key={bucket}
                style={[
                  styles.filterChip,
                  selectedBucket === bucket && styles.filterChipActive,
                ]}
                onPress={() => setSelectedBucket(bucket)}
              >
                <Text
                  style={[
                    styles.filterChipText,
                    selectedBucket === bucket && styles.filterChipTextActive,
                  ]}
                >
                  {bucket}
                </Text>
                <View
                  style={[
                    styles.filterCount,
                    selectedBucket === bucket && styles.filterCountActive,
                  ]}
                >
                  <Text
                    style={[
                      styles.filterCountText,
                      selectedBucket === bucket && styles.filterCountTextActive,
                    ]}
                  >
                    {count}
                  </Text>
                </View>
              </TouchableOpacity>
            );
          })}
        </ScrollView>
      </View>

      {/* Sort Options */}
      <View style={styles.sortContainer}>
        <Text style={styles.sortLabel}>Sort by:</Text>
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.sortOptions}
        >
          {sortOptions.map((option) => (
            <TouchableOpacity
              key={option}
              style={[styles.sortChip, sortBy === option && styles.sortChipActive]}
              onPress={() => setSortBy(option)}
            >
              <Text
                style={[
                  styles.sortChipText,
                  sortBy === option && styles.sortChipTextActive,
                ]}
              >
                {option}
              </Text>
              {sortBy === option && (
                <Icon name="checkmark" size={14} color={COLORS.primary} />
              )}
            </TouchableOpacity>
          ))}
        </ScrollView>
      </View>

      {/* Accounts List */}
      <FlatList
        data={filteredAndSortedAccounts}
        renderItem={renderAccountCard}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.listContent}
        showsVerticalScrollIndicator={false}
        ListEmptyComponent={renderEmptyState}
      />
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
    paddingVertical: 10,
    backgroundColor: COLORS.white,
    borderBottomWidth: 1,
    borderBottomColor: COLORS.gray200,
    paddingTop: 38,
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: COLORS.text.primary,
  },
  headerRight: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  totalBadge: {
    backgroundColor: COLORS.primary,
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 12,
  },
  totalBadgeText: {
    color: COLORS.white,
    fontSize: 14,
    fontWeight: 'bold',
  },
  headerIcon: {
    padding: 4,
  },
  searchContainer: {
    paddingHorizontal: 20,
    paddingTop: 16,
    paddingBottom: 12,
    backgroundColor: COLORS.white,
  },
  searchBar: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: COLORS.gray50,
    borderRadius: 12,
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderWidth: 1,
    borderColor: COLORS.gray200,
  },
  searchInput: {
    flex: 1,
    marginLeft: 8,
    fontSize: 16,
    color: COLORS.text.primary,
  },
  filtersWrapper: {
    backgroundColor: COLORS.white,
    borderBottomWidth: 1,
    borderBottomColor: COLORS.gray200,
    paddingTop: 8,
  },
  filterLabel: {
    fontSize: 13,
    fontWeight: '600',
    color: COLORS.text.primary,
    paddingHorizontal: 20,
    marginBottom: 8,
  },
  filtersContainer: {
    paddingBottom: 12,
  },
  filtersContent: {
    paddingHorizontal: 20,
  },
  filterChip: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 14,
    paddingVertical: 8,
    borderRadius: 20,
    backgroundColor: COLORS.gray50,
    marginRight: 8,
    borderWidth: 1,
    borderColor: COLORS.gray200,
  },
  filterChipActive: {
    backgroundColor: COLORS.primary,
    borderColor: COLORS.primary,
  },
  filterChipText: {
    fontSize: 14,
    fontWeight: '600',
    color: COLORS.text.secondary,
    marginRight: 6,
  },
  filterChipTextActive: {
    color: COLORS.white,
  },
  filterCount: {
    backgroundColor: COLORS.white,
    paddingHorizontal: 6,
    paddingVertical: 2,
    borderRadius: 10,
    minWidth: 22,
    alignItems: 'center',
  },
  filterCountActive: {
    backgroundColor: 'rgba(255,255,255,0.3)',
  },
  filterCountText: {
    fontSize: 11,
    fontWeight: 'bold',
    color: COLORS.text.primary,
  },
  filterCountTextActive: {
    color: COLORS.white,
  },
  sortContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingVertical: 12,
    backgroundColor: COLORS.white,
    borderBottomWidth: 1,
    borderBottomColor: COLORS.gray200,
  },
  sortLabel: {
    fontSize: 13,
    fontWeight: '600',
    color: COLORS.text.primary,
    marginRight: 12,
  },
  sortOptions: {
    flexDirection: 'row',
  },
  sortChip: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 16,
    backgroundColor: COLORS.gray50,
    marginRight: 8,
    borderWidth: 1,
    borderColor: COLORS.gray200,
  },
  sortChipActive: {
    backgroundColor: '#F0F1FF',
    borderColor: COLORS.primary,
  },
  sortChipText: {
    fontSize: 13,
    color: COLORS.text.secondary,
    marginRight: 4,
  },
  sortChipTextActive: {
    color: COLORS.primary,
    fontWeight: '600',
  },
  listContent: {
    paddingHorizontal: 20,
    paddingTop: 16,
    paddingBottom: 20,
  },
  emptyState: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
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
  emptyText: {
    fontSize: 14,
    color: COLORS.text.secondary,
    textAlign: 'center',
  },
});

export default DelinquencyList;