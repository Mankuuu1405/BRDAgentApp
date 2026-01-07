// src/screens/fieldInvestigation/TaskBucket.js
import React, { useState } from 'react';
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

  const [cases] = useState([
    {
      id: 'LOC-2025-8832',
      name: 'Rajesh Kumar',
      address: 'H-102, Dwarka Sector 10, Delhi',
      distance: '2.3 km',
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
      distance: '3.8 km',
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
      distance: '5.2 km',
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
      distance: '6.1 km',
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
      distance: '7.5 km',
      priority: 'Medium',
      status: 'Pending',
      loanAmount: '₹4,00,000',
      pincode: '110018',
      type: 'Business',
    },
  ]);

  const filters = ['All', 'Pending', 'In Progress', 'Urgent'];
  const sortOptions = ['Distance', 'Priority', 'Pincode'];

  const getPriorityColor = (priority) => {
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

  const getStatusColor = (status) => {
    switch (status) {
      case 'In Progress':
        return { bg: '#DBEAFE', text: COLORS.primary };
      case 'Pending':
        return { bg: '#FEF3C7', text: COLORS.warning };
      default:
        return { bg: COLORS.gray200, text: COLORS.gray500 };
    }
  };

  const renderCaseCard = ({ item }) => {
    const priorityColors = getPriorityColor(item.priority);
    const statusColors = getStatusColor(item.status);

    return (
      <TouchableOpacity 
        style={styles.caseCard}
        activeOpacity={0.7}
        onPress={() => {/* Navigate to verification form */}}
      >
        <View style={styles.caseHeader}>
          <View style={styles.caseIdRow}>
            <Text style={styles.caseId}>{item.id}</Text>
            <View style={[styles.badge, { backgroundColor: priorityColors.bg }]}>
              <Text style={[styles.badgeText, { color: priorityColors.text }]}>
                {item.priority}
              </Text>
            </View>
            <View style={[styles.badge, { backgroundColor: statusColors.bg }]}>
              <Text style={[styles.badgeText, { color: statusColors.text }]}>
                {item.status}
              </Text>
            </View>
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
            <Text style={styles.distanceText}>{item.distance}</Text>
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
            <TouchableOpacity style={[styles.actionBtn, styles.startBtn]}>
              <Text style={styles.startBtnText}>Start</Text>
            </TouchableOpacity>
          </View>
        </View>
      </TouchableOpacity>
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>My Cases</Text>
        <TouchableOpacity style={styles.headerIcon}>
          <Icon name="options-outline" size={24} color={COLORS.text.primary} />
        </TouchableOpacity>
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
        </View>
      </View>

      {/* Filter Chips */}
      <ScrollView 
        horizontal 
        showsHorizontalScrollIndicator={false}
        style={styles.filtersContainer}
        contentContainerStyle={styles.filtersContent}
      >
        {filters.map((filter) => (
          <TouchableOpacity
            key={filter}
            style={[
              styles.filterChip,
              selectedFilter === filter && styles.filterChipActive,
            ]}
            onPress={() => setSelectedFilter(filter)}
          >
            <Text
              style={[
                styles.filterChipText,
                selectedFilter === filter && styles.filterChipTextActive,
              ]}
            >
              {filter}
            </Text>
          </TouchableOpacity>
        ))}
      </ScrollView>

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
        data={cases}
        renderItem={renderCaseCard}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.listContent}
        showsVerticalScrollIndicator={false}
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
    paddingVertical: 16,
    backgroundColor: COLORS.white,
    borderBottomWidth: 1,
    borderBottomColor: COLORS.gray200,
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: COLORS.text.primary,
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
  filtersContainer: {
    backgroundColor: COLORS.white,
    paddingBottom: 12,
    borderBottomWidth: 1,
    borderBottomColor: COLORS.gray200,
  },
  filtersContent: {
    paddingHorizontal: 20,
  },
  filterChip: {
    paddingHorizontal: 16,
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
  },
  filterChipTextActive: {
    color: COLORS.white,
  },
  sortContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingVertical: 12,
    backgroundColor: COLORS.white,
  },
  sortLabel: {
    fontSize: 14,
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
  badge: {
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
    marginRight: 6,
  },
  badgeText: {
    fontSize: 10,
    fontWeight: '600',
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
  startBtn: {
    backgroundColor: COLORS.primary,
    paddingHorizontal: 16,
    width: 'auto',
  },
  startBtnText: {
    color: COLORS.white,
    fontSize: 12,
    fontWeight: 'bold',
  },
});

export default TaskBucket;