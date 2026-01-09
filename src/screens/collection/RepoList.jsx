// src/screens/collection/RepoList.jsx
import React, { useState, useMemo } from 'react';
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  FlatList,
  TouchableOpacity,
  TextInput,
  Alert,
} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import { COLORS } from '../../utils/constants';

const RepoList = ({ navigation }) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedFilter, setSelectedFilter] = useState('All');

  const [vehicles] = useState([
    {
      id: 1,
      loanId: 'LA-2025-1234',
      customerName: 'Rajesh Kumar',
      vehicleNumber: 'DL-3CAB-1234',
      vehicleModel: 'Maruti Swift VXI',
      vehicleColor: 'Red',
      vehicleType: 'Car',
      lastKnownLocation: 'Dwarka Sector 10, Delhi',
      addedDate: '05 Jan 2026',
      priority: 'High',
      status: 'Pending',
      emiOverdue: '₹36,000',
      dpd: 45,
    },
    {
      id: 2,
      loanId: 'LA-2025-5678',
      customerName: 'Priya Sharma',
      vehicleNumber: 'DL-1CAA-5678',
      vehicleModel: 'Honda Activa 6G',
      vehicleColor: 'Black',
      vehicleType: 'Two Wheeler',
      lastKnownLocation: 'Rohini Sector 15, Delhi',
      addedDate: '03 Jan 2026',
      priority: 'Urgent',
      status: 'Pending',
      emiOverdue: '₹24,000',
      dpd: 60,
    },
    {
      id: 3,
      loanId: 'LA-2025-9012',
      customerName: 'Amit Verma',
      vehicleNumber: 'MH-02-AB-5678',
      vehicleModel: 'Hyundai i20 Sportz',
      vehicleColor: 'Blue',
      vehicleType: 'Car',
      lastKnownLocation: 'Janakpuri, Delhi',
      addedDate: '02 Jan 2026',
      priority: 'Medium',
      status: 'Repossessed',
      emiOverdue: '₹48,000',
      dpd: 75,
    },
  ]);

  const filters = ['All', 'Pending', 'Repossessed'];

  const filteredVehicles = useMemo(() => {
    let filtered = vehicles;

    if (searchQuery.trim()) {
      filtered = filtered.filter(
        (v) =>
          v.vehicleNumber.toLowerCase().includes(searchQuery.toLowerCase()) ||
          v.customerName.toLowerCase().includes(searchQuery.toLowerCase()) ||
          v.loanId.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    if (selectedFilter !== 'All') {
      filtered = filtered.filter((v) => v.status === selectedFilter);
    }

    return filtered;
  }, [vehicles, searchQuery, selectedFilter]);

  const handleVehiclePress = (vehicle) => {
    Alert.alert(
      vehicle.vehicleNumber,
      `Customer: ${vehicle.customerName}\nModel: ${vehicle.vehicleModel}\nLocation: ${vehicle.lastKnownLocation}`,
      [
        {
          text: 'Navigate',
          onPress: () => Alert.alert('Navigate', 'Opening maps...'),
        },
        {
          text: 'Yard Entry',
          onPress: () => navigation.navigate('YardEntry', { vehicle }),
        },
        { text: 'Cancel', style: 'cancel' },
      ]
    );
  };

  const renderVehicleCard = ({ item }) => {
    const getPriorityColor = () => {
      switch (item.priority) {
        case 'Urgent':
          return COLORS.danger;
        case 'High':
          return COLORS.warning;
        case 'Medium':
          return COLORS.info;
        default:
          return COLORS.gray500;
      }
    };

    return (
      <TouchableOpacity
        style={styles.vehicleCard}
        onPress={() => handleVehiclePress(item)}
        activeOpacity={0.7}
      >
        <View style={styles.vehicleHeader}>
          <View style={styles.vehicleNumberContainer}>
            <Icon
              name={item.vehicleType === 'Car' ? 'car-sport' : 'bicycle'}
              size={20}
              color={COLORS.primary}
            />
            <Text style={styles.vehicleNumber}>{item.vehicleNumber}</Text>
          </View>
          <View style={styles.badges}>
            <View
              style={[
                styles.priorityBadge,
                { backgroundColor: `${getPriorityColor()}20` },
              ]}
            >
              <Text style={[styles.priorityText, { color: getPriorityColor() }]}>
                {item.priority}
              </Text>
            </View>
            <View
              style={[
                styles.statusBadge,
                {
                  backgroundColor:
                    item.status === 'Repossessed'
                      ? COLORS.successLight
                      : COLORS.warningLight,
                },
              ]}
            >
              <Text
                style={[
                  styles.statusText,
                  {
                    color:
                      item.status === 'Repossessed' ? COLORS.success : COLORS.warning,
                  },
                ]}
              >
                {item.status}
              </Text>
            </View>
          </View>
        </View>

        <Text style={styles.vehicleModel}>{item.vehicleModel}</Text>
        <Text style={styles.vehicleColor}>Color: {item.vehicleColor}</Text>

        <View style={styles.customerInfo}>
          <Icon name="person-outline" size={16} color={COLORS.text.secondary} />
          <Text style={styles.customerName}>{item.customerName}</Text>
          <Text style={styles.loanId}>({item.loanId})</Text>
        </View>

        <View style={styles.locationInfo}>
          <Icon name="location-outline" size={16} color={COLORS.text.secondary} />
          <Text style={styles.location}>{item.lastKnownLocation}</Text>
        </View>

        <View style={styles.vehicleFooter}>
          <View style={styles.dpdBadge}>
            <Text style={styles.dpdText}>{item.dpd} DPD</Text>
          </View>
          <Text style={styles.overdueAmount}>Overdue: {item.emiOverdue}</Text>
        </View>

        <View style={styles.actionButtons}>
          <TouchableOpacity style={styles.actionBtn}>
            <Icon name="call" size={18} color={COLORS.primary} />
          </TouchableOpacity>
          <TouchableOpacity style={styles.actionBtn}>
            <Icon name="navigate" size={18} color={COLORS.primary} />
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.actionBtn, styles.scanBtn]}
            onPress={() => navigation.navigate('VehicleScanner', { vehicle: item })}
          >
            <Icon name="scan" size={18} color={COLORS.white} />
            <Text style={styles.scanBtnText}>Scan</Text>
          </TouchableOpacity>
        </View>
      </TouchableOpacity>
    );
  };

  const renderEmptyState = () => (
    <View style={styles.emptyState}>
      <View style={styles.emptyIcon}>
        <Icon name="car-sport" size={64} color={COLORS.gray400} />
      </View>
      <Text style={styles.emptyTitle}>No Vehicles Found</Text>
      <Text style={styles.emptyText}>
        {searchQuery
          ? `No results for "${searchQuery}"`
          : `No ${selectedFilter.toLowerCase()} vehicles`}
      </Text>
    </View>
  );

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Icon name="arrow-back" size={24} color={COLORS.text.primary} />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Repo List</Text>
        <View style={styles.totalBadge}>
          <Text style={styles.totalBadgeText}>{filteredVehicles.length}</Text>
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

      {/* Filters */}
      <View style={styles.filtersContainer}>
        {filters.map((filter) => {
          const count = filter === 'All' 
            ? vehicles.length 
            : vehicles.filter(v => v.status === filter).length;
          
          return (
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
              <View
                style={[
                  styles.filterCount,
                  selectedFilter === filter && styles.filterCountActive,
                ]}
              >
                <Text
                  style={[
                    styles.filterCountText,
                    selectedFilter === filter && styles.filterCountTextActive,
                  ]}
                >
                  {count}
                </Text>
              </View>
            </TouchableOpacity>
          );
        })}
      </View>

      {/* Vehicle List */}
      <FlatList
        data={filteredVehicles}
        renderItem={renderVehicleCard}
        keyExtractor={(item) => item.id.toString()}
        contentContainerStyle={styles.listContent}
        showsVerticalScrollIndicator={false}
        ListEmptyComponent={renderEmptyState}
      />

      {/* Floating Scan Button */}
      <TouchableOpacity
        style={styles.floatingBtn}
        onPress={() => navigation.navigate('VehicleScanner')}
      >
        <Icon name="scan" size={28} color={COLORS.white} />
      </TouchableOpacity>
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
    flexDirection: 'row',
    paddingHorizontal: 20,
    paddingVertical: 12,
    backgroundColor: COLORS.white,
    borderBottomWidth: 1,
    borderBottomColor: COLORS.gray200,
    gap: 8,
  },
  filterChip: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 14,
    paddingVertical: 8,
    borderRadius: 20,
    backgroundColor: COLORS.gray50,
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
  listContent: {
    paddingHorizontal: 20,
    paddingTop: 16,
    paddingBottom: 100,
  },
  vehicleCard: {
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
  vehicleHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  vehicleNumberContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  vehicleNumber: {
    fontSize: 18,
    fontWeight: 'bold',
    color: COLORS.text.primary,
    marginLeft: 8,
  },
  badges: {
    flexDirection: 'row',
    gap: 6,
  },
  priorityBadge: {
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
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
  vehicleModel: {
    fontSize: 16,
    fontWeight: '600',
    color: COLORS.text.primary,
    marginBottom: 4,
  },
  vehicleColor: {
    fontSize: 14,
    color: COLORS.text.secondary,
    marginBottom: 12,
  },
  customerInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  customerName: {
    fontSize: 14,
    color: COLORS.text.primary,
    marginLeft: 6,
    fontWeight: '500',
  },
  loanId: {
    fontSize: 12,
    color: COLORS.text.secondary,
    marginLeft: 4,
  },
  locationInfo: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    marginBottom: 12,
  },
  location: {
    fontSize: 14,
    color: COLORS.text.secondary,
    marginLeft: 6,
    flex: 1,
  },
  vehicleFooter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingTop: 12,
    borderTopWidth: 1,
    borderTopColor: COLORS.gray200,
    marginBottom: 12,
  },
  dpdBadge: {
    backgroundColor: COLORS.dangerLight,
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 12,
  },
  dpdText: {
    fontSize: 12,
    fontWeight: '600',
    color: COLORS.danger,
  },
  overdueAmount: {
    fontSize: 14,
    fontWeight: 'bold',
    color: COLORS.danger,
  },
  actionButtons: {
    flexDirection: 'row',
    gap: 8,
  },
  actionBtn: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: COLORS.gray50,
    justifyContent: 'center',
    alignItems: 'center',
  },
  scanBtn: {
    flex: 1,
    flexDirection: 'row',
    backgroundColor: COLORS.primary,
  },
  scanBtnText: {
    color: COLORS.white,
    fontSize: 14,
    fontWeight: 'bold',
    marginLeft: 6,
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
  floatingBtn: {
    position: 'absolute',
    bottom: 24,
    right: 24,
    width: 64,
    height: 64,
    borderRadius: 32,
    backgroundColor: COLORS.primary,
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 8,
  },
});

export default RepoList;