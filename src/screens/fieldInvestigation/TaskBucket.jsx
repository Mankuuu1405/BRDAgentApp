// src/screens/fieldInvestigation/TaskBucket.js
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
} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import { PriorityBadge, StatusBadge, ActionButtonRow } from '../../components/fieldInvestigation/VerificationComponents';

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

const TaskBucket = ({ navigation }) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedFilter, setSelectedFilter] = useState('All');
  const [sortBy, setSortBy] = useState('Distance');

  const [allCases] = useState([
    {
      id: 'LOC-2025-8832',
      name: 'Rajesh Kumar',
      address: 'H-102, Dwarka Sector 10, Delhi',
      distance: 2.3,
      priority: 'High',
      status: 'Pending',
      loanAmount: '₹5,00,000',
      pincode: '110075',
      type: 'CPV',
    },
    {
      id: 'LOC-2025-8901',
      name: 'Priya Sharma',
      address: 'A-45, Rohini Sector 15, Delhi',
      distance: 3.8,
      priority: 'Urgent',
      status: 'Pending',
      loanAmount: '₹7,50,000',
      pincode: '110085',
      type: 'Business',
    },
    {
      id: 'LOC-2025-8765',
      name: 'Amit Verma',
      address: 'B-201, Janakpuri, Delhi',
      distance: 5.2,
      priority: 'Medium',
      status: 'In Progress',
      loanAmount: '₹3,00,000',
      pincode: '110058',
      type: 'CPV',
    },
    {
      id: 'LOC-2025-8654',
      name: 'Neha Singh',
      address: 'C-78, Vikaspuri, Delhi',
      distance: 6.1,
      priority: 'Low',
      status: 'Pending',
      loanAmount: '₹2,50,000',
      pincode: '110018',
      type: 'Document',
    },
    {
      id: 'LOC-2025-8543',
      name: 'Suresh Patel',
      address: 'D-15, Tilak Nagar, Delhi',
      distance: 7.5,
      priority: 'Medium',
      status: 'Pending',
      loanAmount: '₹4,00,000',
      pincode: '110018',
      type: 'Business',
    },
  ]);

  const filters = [
    { id: 'All', label: 'All' },
    { id: 'Pending', label: 'Pending' },
    { id: 'In Progress', label: 'In Progress' },
    { id: 'Urgent', label: 'Urgent' },
  ];

  const sortOptions = ['Distance', 'Priority', 'Pincode'];

  // Priority weight for sorting
  const getPriorityWeight = (priority) => {
    switch (priority) {
      case 'Urgent': return 4;
      case 'High': return 3;
      case 'Medium': return 2;
      case 'Low': return 1;
      default: return 0;
    }
  };

  // Filter and Sort Cases
  const filteredAndSortedCases = useMemo(() => {
    let filtered = allCases;

    // Apply search filter
    if (searchQuery.trim()) {
      filtered = filtered.filter(
        (c) =>
          c.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
          c.name.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    // Apply status/priority filter
    if (selectedFilter !== 'All') {
      if (selectedFilter === 'Urgent') {
        filtered = filtered.filter((c) => c.priority === 'Urgent');
      } else {
        filtered = filtered.filter((c) => c.status === selectedFilter);
      }
    }

    // Apply sorting
    const sorted = [...filtered].sort((a, b) => {
      switch (sortBy) {
        case 'Distance':
          return a.distance - b.distance;
        case 'Priority':
          return getPriorityWeight(b.priority) - getPriorityWeight(a.priority);
        case 'Pincode':
          return a.pincode.localeCompare(b.pincode);
        default:
          return 0;
      }
    });

    return sorted;
  }, [allCases, searchQuery, selectedFilter, sortBy]);

  // Get filter counts
  const getFilterCount = (filterId) => {
    if (filterId === 'All') return allCases.length;
    if (filterId === 'Urgent') return allCases.filter(c => c.priority === 'Urgent').length;
    return allCases.filter(c => c.status === filterId).length;
  };

  const renderCaseCard = ({ item }) => {
    return (
      <TouchableOpacity 
        style={styles.caseCard}
        activeOpacity={0.7}
        onPress={() => navigation.navigate('Add')}
      >
        <View style={styles.caseHeader}>
          <View style={styles.caseIdRow}>
            <Text style={styles.caseId}>{item.id}</Text>
            <PriorityBadge priority={item.priority} />
            <StatusBadge status={item.status} />
          </View>
          
          <View style={styles.caseInfo}>
            <Text style={styles.caseName}>{item.name}</Text>
            <View style={styles.infoRow}>
              <Icon name="location-outline" size={14} color={COLORS.text.secondary} />
              <Text style={styles.caseAddress}>{item.address}</Text>
            </View>
            
            <View style={styles.detailsRow}>
              <View style={styles.detailItem}>
                <Text style={styles.detailLabel}>Type</Text>
                <Text style={styles.detailValue}>{item.type}</Text>
              </View>
              <View style={styles.detailItem}>
                <Text style={styles.detailLabel}>Amount</Text>
                <Text style={styles.detailValue}>{item.loanAmount}</Text>
              </View>
              <View style={styles.detailItem}>
                <Text style={styles.detailLabel}>Pincode</Text>
                <Text style={styles.detailValue}>{item.pincode}</Text>
              </View>
            </View>
          </View>
        </View>

        <View style={styles.caseFooter}>
          <View style={styles.distanceBadge}>
            <Icon name="navigate" size={14} color={COLORS.primary} />
            <Text style={styles.distanceText}>{item.distance} km</Text>
          </View>

          <ActionButtonRow
            onCall={() => console.log('Call', item.id)}
            onWhatsApp={() => console.log('WhatsApp', item.id)}
            onNavigate={() => console.log('Navigate', item.id)}
            onStart={() => navigation.navigate('Add')}
          />
        </View>
      </TouchableOpacity>
    );
  };

  const renderEmptyState = () => (
    <View style={styles.emptyState}>
      <View style={styles.emptyIcon}>
        <Icon name="search" size={64} color={COLORS.gray400} />
      </View>
      <Text style={styles.emptyTitle}>No Cases Found</Text>
      <Text style={styles.emptyText}>
        {searchQuery ? 
          `No results for "${searchQuery}"` : 
          `No ${selectedFilter.toLowerCase()} cases available`
        }
      </Text>
    </View>
  );

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>My Cases</Text>
        <View style={styles.headerRight}>
          <View style={styles.totalBadge}>
            <Text style={styles.totalBadgeText}>{filteredAndSortedCases.length}</Text>
          </View>
          <TouchableOpacity style={styles.headerIcon}>
            <Icon name="options-outline" size={24} color={COLORS.text.primary} />
          </TouchableOpacity>
        </View>
      </View>

      {/* Search Bar */}
      <View style={styles.searchContainer}>
        <View style={styles.searchBar}>
          <Icon name="search" size={20} color={COLORS.gray400} />
          <TextInput
            style={styles.searchInput}
            placeholder="Search by Case ID or Name"
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

      {/* Filter Chips */}
      <View style={styles.filtersWrapper}>
        <Text style={styles.filterLabel}>Filters:</Text>
        <ScrollView 
          horizontal 
          showsHorizontalScrollIndicator={false}
          style={styles.filtersContainer}
          contentContainerStyle={styles.filtersContent}
        >
          {filters.map((filter) => {
            const count = getFilterCount(filter.id);
            return (
              <TouchableOpacity
                key={filter.id}
                style={[
                  styles.filterChip,
                  selectedFilter === filter.id && styles.filterChipActive,
                ]}
                onPress={() => setSelectedFilter(filter.id)}
              >
                <Text
                  style={[
                    styles.filterChipText,
                    selectedFilter === filter.id && styles.filterChipTextActive,
                  ]}
                >
                  {filter.label}
                </Text>
                <View style={[
                  styles.filterCount,
                  selectedFilter === filter.id && styles.filterCountActive,
                ]}>
                  <Text style={[
                    styles.filterCountText,
                    selectedFilter === filter.id && styles.filterCountTextActive,
                  ]}>
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
              style={[
                styles.sortChip,
                sortBy === option && styles.sortChipActive,
              ]}
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

      {/* Cases List */}
      <FlatList
        data={filteredAndSortedCases}
        renderItem={renderCaseCard}
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
    marginBottom: 12,
    flexWrap: 'wrap',
  },
  caseId: {
    fontSize: 12,
    fontWeight: '600',
    color: COLORS.text.secondary,
    marginRight: 8,
  },
  caseInfo: {
    marginBottom: 8,
  },
  caseName: {
    fontSize: 18,
    fontWeight: 'bold',
    color: COLORS.text.primary,
    marginBottom: 8,
  },
  infoRow: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    marginBottom: 12,
  },
  caseAddress: {
    fontSize: 14,
    color: COLORS.text.secondary,
    marginLeft: 4,
    flex: 1,
  },
  detailsRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
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
    fontSize: 14,
    fontWeight: '600',
    color: COLORS.text.primary,
  },
  caseFooter: {
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

export default TaskBucket;

