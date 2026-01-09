// src/screens/collection/RepossessionHistory.jsx
import React, { useState, useMemo } from 'react';
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  FlatList,
  TouchableOpacity,
  TextInput,
  Modal,
  ScrollView,
} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import { COLORS } from '../../utils/constants';

const RepossessionHistory = ({ navigation }) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedMonth, setSelectedMonth] = useState('All');
  const [selectedRepo, setSelectedRepo] = useState(null);
  const [showDetailsModal, setShowDetailsModal] = useState(false);

  const [repoHistory] = useState([
    {
      id: 1,
      vehicleNumber: 'MH-02-AB-5678',
      customerName: 'Amit Verma',
      loanId: 'LA-2025-9012',
      vehicleModel: 'Hyundai i20 Sportz',
      repoDate: '02 Jan 2026',
      repoTime: '10:30 AM',
      location: 'Janakpuri, Delhi',
      odometerReading: '45,230 KM',
      fuelLevel: 'Half',
      condition: 'Good',
      yardLocation: 'Delhi Yard - A',
      agentName: 'Collection Agent',
      status: 'In Yard',
      emiOverdue: '₹48,000',
    },
    {
      id: 2,
      vehicleNumber: 'DL-8CAB-9876',
      customerName: 'Suresh Patel',
      loanId: 'LA-2024-8765',
      vehicleModel: 'Honda City VX',
      repoDate: '28 Dec 2025',
      repoTime: '02:15 PM',
      location: 'Dwarka, Delhi',
      odometerReading: '62,450 KM',
      fuelLevel: 'Quarter',
      condition: 'Fair',
      yardLocation: 'Delhi Yard - B',
      agentName: 'Collection Agent',
      status: 'Auctioned',
      emiOverdue: '₹96,000',
    },
    {
      id: 3,
      vehicleNumber: 'KA-01-XY-1234',
      customerName: 'Ramesh Kumar',
      loanId: 'LA-2024-7654',
      vehicleModel: 'Maruti Baleno Delta',
      repoDate: '15 Dec 2025',
      repoTime: '11:45 AM',
      location: 'Bangalore',
      odometerReading: '38,900 KM',
      fuelLevel: 'Three Quarter',
      condition: 'Excellent',
      yardLocation: 'Bangalore Yard',
      agentName: 'Collection Agent',
      status: 'Auctioned',
      emiOverdue: '₹54,000',
    },
  ]);

  const months = ['All', 'January', 'December', 'November'];

  const filteredHistory = useMemo(() => {
    let filtered = repoHistory;

    if (searchQuery.trim()) {
      filtered = filtered.filter(
        (repo) =>
          repo.vehicleNumber.toLowerCase().includes(searchQuery.toLowerCase()) ||
          repo.customerName.toLowerCase().includes(searchQuery.toLowerCase()) ||
          repo.loanId.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    if (selectedMonth !== 'All') {
      filtered = filtered.filter((repo) => repo.repoDate.includes(selectedMonth));
    }

    return filtered;
  }, [repoHistory, searchQuery, selectedMonth]);

  const handleRepoPress = (repo) => {
    setSelectedRepo(repo);
    setShowDetailsModal(true);
  };

  const renderRepoCard = ({ item }) => {
    const getStatusColor = () => {
      switch (item.status) {
        case 'In Yard':
          return { bg: COLORS.warningLight, text: COLORS.warning };
        case 'Auctioned':
          return { bg: COLORS.successLight, text: COLORS.success };
        case 'Released':
          return { bg: COLORS.infoLight, text: COLORS.info };
        default:
          return { bg: COLORS.gray200, text: COLORS.gray500 };
      }
    };

    const statusColors = getStatusColor();

    return (
      <TouchableOpacity
        style={styles.repoCard}
        onPress={() => handleRepoPress(item)}
        activeOpacity={0.7}
      >
        <View style={styles.repoHeader}>
          <View style={styles.repoIdSection}>
            <Icon name="car-sport" size={20} color={COLORS.primary} />
            <Text style={styles.vehicleNumber}>{item.vehicleNumber}</Text>
          </View>
          <View
            style={[styles.statusBadge, { backgroundColor: statusColors.bg }]}
          >
            <Text style={[styles.statusText, { color: statusColors.text }]}>
              {item.status}
            </Text>
          </View>
        </View>

        <Text style={styles.vehicleModel}>{item.vehicleModel}</Text>
        <Text style={styles.customerName}>Customer: {item.customerName}</Text>

        <View style={styles.repoInfo}>
          <View style={styles.repoInfoRow}>
            <Icon name="calendar" size={14} color={COLORS.text.secondary} />
            <Text style={styles.repoInfoText}>{item.repoDate}</Text>
          </View>
          <View style={styles.repoInfoRow}>
            <Icon name="time" size={14} color={COLORS.text.secondary} />
            <Text style={styles.repoInfoText}>{item.repoTime}</Text>
          </View>
          <View style={styles.repoInfoRow}>
            <Icon name="location" size={14} color={COLORS.text.secondary} />
            <Text style={styles.repoInfoText}>{item.location}</Text>
          </View>
        </View>

        <View style={styles.repoFooter}>
          <View style={styles.overdueChip}>
            <Icon name="cash" size={14} color={COLORS.danger} />
            <Text style={styles.overdueText}>{item.emiOverdue}</Text>
          </View>
          <Text style={styles.loanId}>{item.loanId}</Text>
        </View>
      </TouchableOpacity>
    );
  };

  const renderEmptyState = () => (
    <View style={styles.emptyState}>
      <View style={styles.emptyIcon}>
        <Icon name="time" size={64} color={COLORS.gray400} />
      </View>
      <Text style={styles.emptyTitle}>No History Found</Text>
      <Text style={styles.emptyText}>
        {searchQuery
          ? `No results for "${searchQuery}"`
          : 'No repossession history available'}
      </Text>
    </View>
  );

  const renderDetailsModal = () => {
    if (!selectedRepo) return null;

    return (
      <Modal
        visible={showDetailsModal}
        transparent={true}
        animationType="slide"
        onRequestClose={() => setShowDetailsModal(false)}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            <View style={styles.modalHeader}>
              <Text style={styles.modalTitle}>Repossession Details</Text>
              <TouchableOpacity onPress={() => setShowDetailsModal(false)}>
                <Icon name="close" size={24} color={COLORS.text.primary} />
              </TouchableOpacity>
            </View>

            <ScrollView
              style={styles.modalBody}
              showsVerticalScrollIndicator={false}
            >
              {/* Vehicle Info */}
              <View style={styles.detailSection}>
                <Text style={styles.detailSectionTitle}>Vehicle Information</Text>
                <View style={styles.detailRow}>
                  <Text style={styles.detailLabel}>Vehicle Number</Text>
                  <Text style={styles.detailValue}>{selectedRepo.vehicleNumber}</Text>
                </View>
                <View style={styles.detailRow}>
                  <Text style={styles.detailLabel}>Model</Text>
                  <Text style={styles.detailValue}>{selectedRepo.vehicleModel}</Text>
                </View>
                <View style={styles.detailRow}>
                  <Text style={styles.detailLabel}>Odometer Reading</Text>
                  <Text style={styles.detailValue}>
                    {selectedRepo.odometerReading}
                  </Text>
                </View>
                <View style={styles.detailRow}>
                  <Text style={styles.detailLabel}>Fuel Level</Text>
                  <Text style={styles.detailValue}>{selectedRepo.fuelLevel}</Text>
                </View>
                <View style={styles.detailRow}>
                  <Text style={styles.detailLabel}>Condition</Text>
                  <Text style={styles.detailValue}>{selectedRepo.condition}</Text>
                </View>
              </View>

              {/* Customer Info */}
              <View style={styles.detailSection}>
                <Text style={styles.detailSectionTitle}>Customer Information</Text>
                <View style={styles.detailRow}>
                  <Text style={styles.detailLabel}>Name</Text>
                  <Text style={styles.detailValue}>{selectedRepo.customerName}</Text>
                </View>
                <View style={styles.detailRow}>
                  <Text style={styles.detailLabel}>Loan ID</Text>
                  <Text style={styles.detailValue}>{selectedRepo.loanId}</Text>
                </View>
                <View style={styles.detailRow}>
                  <Text style={styles.detailLabel}>EMI Overdue</Text>
                  <Text style={[styles.detailValue, { color: COLORS.danger }]}>
                    {selectedRepo.emiOverdue}
                  </Text>
                </View>
              </View>

              {/* Repossession Info */}
              <View style={styles.detailSection}>
                <Text style={styles.detailSectionTitle}>Repossession Details</Text>
                <View style={styles.detailRow}>
                  <Text style={styles.detailLabel}>Date</Text>
                  <Text style={styles.detailValue}>{selectedRepo.repoDate}</Text>
                </View>
                <View style={styles.detailRow}>
                  <Text style={styles.detailLabel}>Time</Text>
                  <Text style={styles.detailValue}>{selectedRepo.repoTime}</Text>
                </View>
                <View style={styles.detailRow}>
                  <Text style={styles.detailLabel}>Location</Text>
                  <Text style={styles.detailValue}>{selectedRepo.location}</Text>
                </View>
                <View style={styles.detailRow}>
                  <Text style={styles.detailLabel}>Agent</Text>
                  <Text style={styles.detailValue}>{selectedRepo.agentName}</Text>
                </View>
                <View style={styles.detailRow}>
                  <Text style={styles.detailLabel}>Yard Location</Text>
                  <Text style={styles.detailValue}>{selectedRepo.yardLocation}</Text>
                </View>
                <View style={styles.detailRow}>
                  <Text style={styles.detailLabel}>Status</Text>
                  <Text style={styles.detailValue}>{selectedRepo.status}</Text>
                </View>
              </View>
            </ScrollView>
          </View>
        </View>
      </Modal>
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Icon name="arrow-back" size={24} color={COLORS.text.primary} />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Repossession History</Text>
        <View style={styles.totalBadge}>
          <Text style={styles.totalBadgeText}>{filteredHistory.length}</Text>
        </View>
      </View>

      {/* Search Bar */}
      <View style={styles.searchContainer}>
        <View style={styles.searchBar}>
          <Icon name="search" size={20} color={COLORS.gray400} />
          <TextInput
            style={styles.searchInput}
            placeholder="Search by plate, name or loan ID"
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

      {/* Month Filter */}
      <View style={styles.filtersContainer}>
        <ScrollView horizontal showsHorizontalScrollIndicator={false}>
          <View style={styles.monthRow}>
            {months.map((month) => (
              <TouchableOpacity
                key={month}
                style={[
                  styles.monthChip,
                  selectedMonth === month && styles.monthChipActive,
                ]}
                onPress={() => setSelectedMonth(month)}
              >
                <Text
                  style={[
                    styles.monthText,
                    selectedMonth === month && styles.monthTextActive,
                  ]}
                >
                  {month}
                </Text>
              </TouchableOpacity>
            ))}
          </View>
        </ScrollView>
      </View>

      {/* History List */}
      <FlatList
        data={filteredHistory}
        renderItem={renderRepoCard}
        keyExtractor={(item) => item.id.toString()}
        contentContainerStyle={styles.listContent}
        showsVerticalScrollIndicator={false}
        ListEmptyComponent={renderEmptyState}
      />

      {renderDetailsModal()}
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
    fontSize: 20,
    fontWeight: 'bold',
    color: COLORS.text.primary,
    flex: 1,
    marginLeft: 16,
  },
  totalBadge: {
    backgroundColor: COLORS.primary,
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 12,
  },
  totalBadgeText: {
    color: COLORS.white,
    fontSize: 14,
    fontWeight: 'bold',
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
    paddingVertical: 12,
    backgroundColor: COLORS.white,
    borderBottomWidth: 1,
    borderBottomColor: COLORS.gray200,
  },
  monthRow: {
    flexDirection: 'row',
    paddingHorizontal: 20,
    gap: 8,
  },
  monthChip: {
    paddingHorizontal: 16,
    paddingVertical: 10,
    borderRadius: 20,
    backgroundColor: COLORS.gray50,
    borderWidth: 1,
    borderColor: COLORS.gray200,
  },
  monthChipActive: {
    backgroundColor: COLORS.primary,
    borderColor: COLORS.primary,
  },
  monthText: {
    fontSize: 14,
    fontWeight: '600',
    color: COLORS.text.secondary,
  },
  monthTextActive: {
    color: COLORS.white,
  },
  listContent: {
    paddingHorizontal: 20,
    paddingTop: 16,
    paddingBottom: 20,
  },
  repoCard: {
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
  repoHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  repoIdSection: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  vehicleNumber: {
    fontSize: 18,
    fontWeight: 'bold',
    color: COLORS.text.primary,
    marginLeft: 8,
  },
  statusBadge: {
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 12,
  },
  statusText: {
    fontSize: 11,
    fontWeight: '600',
  },
  vehicleModel: {
    fontSize: 16,
    fontWeight: '600',
    color: COLORS.text.primary,
    marginBottom: 6,
  },
  customerName: {
    fontSize: 14,
    color: COLORS.text.secondary,
    marginBottom: 12,
  },
  repoInfo: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 12,
    marginBottom: 12,
  },
  repoInfoRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  repoInfoText: {
    fontSize: 12,
    color: COLORS.text.secondary,
    marginLeft: 4,
  },
  repoFooter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingTop: 12,
    borderTopWidth: 1,
    borderTopColor: COLORS.gray200,
  },
  overdueChip: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: COLORS.dangerLight,
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 12,
  },
  overdueText: {
    fontSize: 12,
    fontWeight: '600',
    color: COLORS.danger,
    marginLeft: 4,
  },
  loanId: {
    fontSize: 12,
    fontWeight: '600',
    color: COLORS.text.secondary,
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
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.5)',
    justifyContent: 'flex-end',
  },
  modalContent: {
    backgroundColor: COLORS.white,
    borderTopLeftRadius: 24,
    borderTopRightRadius: 24,
    maxHeight: '85%',
  },
  modalHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 20,
    borderBottomWidth: 1,
    borderBottomColor: COLORS.gray200,
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: COLORS.text.primary,
  },
  modalBody: {
    padding: 20,
  },
  detailSection: {
    backgroundColor: COLORS.gray50,
    borderRadius: 12,
    padding: 16,
    marginBottom: 16,
  },
  detailSectionTitle: {
    fontSize: 14,
    fontWeight: 'bold',
    color: COLORS.text.primary,
    marginBottom: 12,
  },
  detailRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 8,
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
    maxWidth: '60%',
  },
});

export default RepossessionHistory;