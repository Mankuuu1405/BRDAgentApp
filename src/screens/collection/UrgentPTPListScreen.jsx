import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  FlatList,
  TouchableOpacity,
} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import { COLORS } from '../../utils/constants';
import { PTPCard } from '../../components/collection/CollectionComponents';

const UrgentPTPListScreen = ({ navigation }) => {
  // Mock data
  const [ptpData] = useState([
    { id: 'LA-2025-1234', customerName: 'Rajesh Kumar', amount: '₹12,000', date: 'Today', status: 'Pending', phoneNumber: '+91 9876543210' },
    { id: 'LA-2025-5678', customerName: 'Suresh Raina', amount: '₹8,500', date: 'Tomorrow', status: 'Overdue', phoneNumber: '+91 9988776655' },
    { id: 'LA-2025-9012', customerName: 'Amit Shah', amount: '₹15,000', date: '12 Jan', status: 'Pending', phoneNumber: '+91 8877665544' },
  ]);

  const renderItem = ({ item }) => (
    <PTPCard
      accountId={item.id}
      customerName={item.customerName}
      amount={item.amount}
      date={item.date}
      status={item.status}
      onPress={() => navigation.navigate('FollowUpLogger', { 
        account: {
          id: item.id,
          customerName: item.customerName,
          phoneNumber: item.phoneNumber,
          overdueAmount: item.amount
        }
      })}
    />
  );

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
          <Icon name="arrow-back" size={24} color={COLORS.text.primary} />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Urgent PTPs</Text>
        <View style={styles.headerSpacer} />
      </View>

      <FlatList
        data={ptpData}
        renderItem={renderItem}
        keyExtractor={item => item.id}
        contentContainerStyle={styles.listContent}
        showsVerticalScrollIndicator={false}
        ListEmptyComponent={
          <View style={styles.emptyContainer}>
            <Icon name="calendar-outline" size={64} color={COLORS.gray300} />
            <Text style={styles.emptyText}>No urgent PTPs found</Text>
          </View>
        }
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F8F9FA',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    paddingVertical: 12,
    backgroundColor: COLORS.white,
    borderBottomWidth: 1,
    borderBottomColor: COLORS.gray100,
    paddingTop: 38,
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: COLORS.text.primary,
  },
  headerSpacer: {
    width: 40,
  },
  listContent: {
    padding: 16,
  },
  emptyContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 100,
  },
  emptyText: {
    marginTop: 16,
    fontSize: 16,
    color: COLORS.gray500,
  },
});

export default UrgentPTPListScreen;