// src/screens/collection/PaymentCollection.jsx
import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  ScrollView,
  TouchableOpacity,
  TextInput,
  Alert,
  Modal,
} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import { COLORS, PAYMENT_MODES } from '../../utils/constants';
import { ReceiptPreview, PaymentModeBadge } from '../../components/collection/CollectionComponents';

const PaymentCollection = ({ navigation, route }) => {
  const accountData = route?.params?.account || {
    id: 'LA-2025-1234',
    customerName: 'Rajesh Kumar',
    phoneNumber: '+91 9876543210',
    emiAmount: '₹12,000',
    overdueAmount: '₹36,000',
  };

  const [paymentData, setPaymentData] = useState({
    accountId: accountData.id,
    customerName: accountData.customerName,
    amount: '',
    paymentMode: 'CASH',
    referenceNumber: '',
    remarks: '',
    collectionDate: new Date().toLocaleDateString('en-GB'),
  });

  const [isWithinRange, setIsWithinRange] = useState(false);
  const [currentLocation] = useState({ lat: 28.5921, lng: 77.046 });
  const [showReceipt, setShowReceipt] = useState(false);
  const [generatedReceipt, setGeneratedReceipt] = useState(null);

  const paymentModes = [
    { id: PAYMENT_MODES.CASH, label: 'Cash', icon: 'cash', needsRef: false },
    { id: PAYMENT_MODES.UPI, label: 'UPI', icon: 'phone-portrait', needsRef: true },
    { id: PAYMENT_MODES.CHEQUE, label: 'Cheque', icon: 'document-text', needsRef: true },
    { id: PAYMENT_MODES.NEFT, label: 'NEFT', icon: 'swap-horizontal', needsRef: true },
    { id: PAYMENT_MODES.RTGS, label: 'RTGS', icon: 'swap-horizontal', needsRef: true },
  ];

  const selectedMode = paymentModes.find((m) => m.id === paymentData.paymentMode);

  const handleAmountChange = (text) => {
    // Remove non-numeric characters
    const numericValue = text.replace(/[^0-9]/g, '');
    setPaymentData({ ...paymentData, amount: numericValue });
  };

  const validatePayment = () => {
    if (!paymentData.amount || parseInt(paymentData.amount) <= 0) {
      Alert.alert('Error', 'Please enter a valid amount');
      return false;
    }

    if (selectedMode?.needsRef && !paymentData.referenceNumber.trim()) {
      Alert.alert('Error', `Please enter ${paymentData.paymentMode} reference number`);
      return false;
    }

    if (!isWithinRange) {
      Alert.alert(
        'Location Required',
        'You must be within 100m of the customer location for physical collections',
        [
          { text: 'Cancel', style: 'cancel' },
          { text: 'Override', onPress: () => processPayment() },
        ]
      );
      return false;
    }

    return true;
  };

  const processPayment = () => {
    const receipt = {
      receiptNumber: `RCP-${Date.now()}`,
      accountId: paymentData.accountId,
      customerName: paymentData.customerName,
      amount: `₹${parseInt(paymentData.amount).toLocaleString()}`,
      mode: paymentData.paymentMode,
      referenceNumber: paymentData.referenceNumber,
      date: paymentData.collectionDate,
      time: new Date().toLocaleTimeString('en-US', {
        hour: '2-digit',
        minute: '2-digit',
      }),
      location: `${currentLocation.lat}, ${currentLocation.lng}`,
      agentId: 'AG-COL-001',
    };

    setGeneratedReceipt(receipt);
    setShowReceipt(true);
  };

  const handleSubmitPayment = () => {
    if (validatePayment()) {
      processPayment();
    }
  };

  const handleReceiptAction = (action) => {
    setShowReceipt(false);
    
    if (action === 'share') {
      Alert.alert('Share Receipt', 'Receipt will be shared via WhatsApp/SMS');
    } else if (action === 'print') {
      Alert.alert('Print Receipt', 'Receipt will be printed');
    }

    // Reset form
    setTimeout(() => {
      Alert.alert('Success', 'Payment recorded successfully!', [
        {
          text: 'OK',
          onPress: () => {
            setPaymentData({
              ...paymentData,
              amount: '',
              referenceNumber: '',
              remarks: '',
            });
            navigation.goBack();
          },
        },
      ]);
    }, 500);
  };

  const calculateDistance = () => 75; // Mock distance in meters

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Icon name="arrow-back" size={24} color={COLORS.text.primary} />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Collect Payment</Text>
        <View style={{ width: 24 }} />
      </View>

      <ScrollView
        style={styles.content}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}
      >
        {/* Account Info */}
        <View style={styles.accountCard}>
          <View style={styles.accountHeader}>
            <Text style={styles.accountId}>{accountData.id}</Text>
          </View>
          <Text style={styles.customerName}>{accountData.customerName}</Text>
          <View style={styles.accountDetails}>
            <View style={styles.detailItem}>
              <Text style={styles.detailLabel}>EMI Amount</Text>
              <Text style={styles.detailValue}>{accountData.emiAmount}</Text>
            </View>
            <View style={styles.detailItem}>
              <Text style={styles.detailLabel}>Total Overdue</Text>
              <Text style={[styles.detailValue, styles.overdueText]}>
                {accountData.overdueAmount}
              </Text>
            </View>
          </View>
        </View>

        {/* Location Status */}
        <View
          style={[
            styles.locationCard,
            isWithinRange ? styles.locationCardSuccess : styles.locationCardWarning,
          ]}
        >
          <Icon
            name={isWithinRange ? 'checkmark-circle' : 'alert-circle'}
            size={24}
            color={isWithinRange ? COLORS.success : COLORS.warning}
          />
          <View style={styles.locationInfo}>
            <Text style={styles.locationText}>
              {isWithinRange
                ? 'Within collection range'
                : `${calculateDistance()}m from customer`}
            </Text>
            <Text style={styles.locationSubtext}>
              {isWithinRange
                ? 'Ready to collect'
                : 'For field collection, move within 100m'}
            </Text>
          </View>
          <TouchableOpacity style={styles.locationBtn}>
            <Icon name="refresh" size={20} color={COLORS.primary} />
          </TouchableOpacity>
        </View>

        {/* Payment Amount */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Payment Amount *</Text>
          <View style={styles.amountInputContainer}>
            <Text style={styles.currencySymbol}>₹</Text>
            <TextInput
              style={styles.amountInput}
              placeholder="0"
              placeholderTextColor={COLORS.gray400}
              value={paymentData.amount}
              onChangeText={handleAmountChange}
              keyboardType="numeric"
              maxLength={8}
            />
          </View>

          {/* Quick Amount Buttons */}
          <View style={styles.quickAmounts}>
            {['3000', '5000', '10000', '12000'].map((amt) => (
              <TouchableOpacity
                key={amt}
                style={styles.quickAmountBtn}
                onPress={() => setPaymentData({ ...paymentData, amount: amt })}
              >
                <Text style={styles.quickAmountText}>₹{parseInt(amt).toLocaleString()}</Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>

        {/* Payment Mode */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Payment Mode *</Text>
          <View style={styles.paymentModeGrid}>
            {paymentModes.map((mode) => (
              <TouchableOpacity
                key={mode.id}
                style={[
                  styles.paymentModeCard,
                  paymentData.paymentMode === mode.id && styles.paymentModeCardActive,
                ]}
                onPress={() =>
                  setPaymentData({ ...paymentData, paymentMode: mode.id })
                }
              >
                <Icon
                  name={mode.icon}
                  size={28}
                  color={
                    paymentData.paymentMode === mode.id
                      ? COLORS.primary
                      : COLORS.gray400
                  }
                />
                <Text
                  style={[
                    styles.paymentModeText,
                    paymentData.paymentMode === mode.id &&
                      styles.paymentModeTextActive,
                  ]}
                >
                  {mode.label}
                </Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>

        {/* Reference Number (if needed) */}
        {selectedMode?.needsRef && (
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>
              {paymentData.paymentMode} Reference Number *
            </Text>
            <TextInput
              style={styles.input}
              placeholder={`Enter ${paymentData.paymentMode} transaction/reference number`}
              placeholderTextColor={COLORS.gray400}
              value={paymentData.referenceNumber}
              onChangeText={(text) =>
                setPaymentData({ ...paymentData, referenceNumber: text })
              }
            />
          </View>
        )}

        {/* Collection Date */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Collection Date</Text>
          <View style={styles.dateCard}>
            <Icon name="calendar" size={20} color={COLORS.primary} />
            <Text style={styles.dateText}>{paymentData.collectionDate}</Text>
          </View>
        </View>

        {/* Remarks */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Remarks (Optional)</Text>
          <TextInput
            style={[styles.input, styles.textArea]}
            placeholder="Add any notes about this payment..."
            placeholderTextColor={COLORS.gray400}
            multiline
            numberOfLines={4}
            value={paymentData.remarks}
            onChangeText={(text) =>
              setPaymentData({ ...paymentData, remarks: text })
            }
          />
        </View>

        {/* Important Note */}
        <View style={styles.noteCard}>
          <Icon name="information-circle" size={20} color={COLORS.info} />
          <Text style={styles.noteText}>
            Receipt will be generated automatically after payment submission. Customer
            will receive SMS/WhatsApp notification.
          </Text>
        </View>

        {/* Submit Button */}
        <TouchableOpacity
          style={styles.submitButton}
          onPress={handleSubmitPayment}
          activeOpacity={0.7}
        >
          <Icon name="checkmark-circle" size={20} color={COLORS.white} />
          <Text style={styles.submitButtonText}>Record Payment</Text>
        </TouchableOpacity>

        <View style={styles.securityInfo}>
          <Icon name="shield-checkmark" size={16} color={COLORS.success} />
          <Text style={styles.securityText}>Secure & Encrypted Transaction</Text>
        </View>
      </ScrollView>

      {/* Receipt Modal */}
      <Modal
        visible={showReceipt}
        transparent={true}
        animationType="slide"
        onRequestClose={() => setShowReceipt(false)}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            <View style={styles.modalHeader}>
              <Text style={styles.modalTitle}>Payment Receipt</Text>
              <TouchableOpacity onPress={() => setShowReceipt(false)}>
                <Icon name="close" size={24} color={COLORS.text.primary} />
              </TouchableOpacity>
            </View>

            <ScrollView style={styles.receiptContainer}>
              {generatedReceipt && (
                <ReceiptPreview
                  receiptNumber={generatedReceipt.receiptNumber}
                  amount={generatedReceipt.amount}
                  mode={generatedReceipt.mode}
                  date={`${generatedReceipt.date} ${generatedReceipt.time}`}
                  customerName={generatedReceipt.customerName}
                />
              )}

              {generatedReceipt?.referenceNumber && (
                <View style={styles.receiptInfo}>
                  <Text style={styles.receiptInfoLabel}>Reference Number</Text>
                  <Text style={styles.receiptInfoValue}>
                    {generatedReceipt.referenceNumber}
                  </Text>
                </View>
              )}

              <View style={styles.receiptInfo}>
                <Text style={styles.receiptInfoLabel}>Location</Text>
                <Text style={styles.receiptInfoValue}>
                  {generatedReceipt?.location}
                </Text>
              </View>

              <View style={styles.receiptActions}>
                <TouchableOpacity
                  style={styles.receiptActionBtn}
                  onPress={() => handleReceiptAction('share')}
                >
                  <Icon name="share-social" size={20} color={COLORS.primary} />
                  <Text style={styles.receiptActionText}>Share</Text>
                </TouchableOpacity>

                <TouchableOpacity
                  style={styles.receiptActionBtn}
                  onPress={() => handleReceiptAction('print')}
                >
                  <Icon name="print" size={20} color={COLORS.primary} />
                  <Text style={styles.receiptActionText}>Print</Text>
                </TouchableOpacity>

                <TouchableOpacity
                  style={[styles.receiptActionBtn, styles.receiptActionBtnPrimary]}
                  onPress={() => handleReceiptAction('done')}
                >
                  <Icon name="checkmark" size={20} color={COLORS.white} />
                  <Text style={[styles.receiptActionText, styles.receiptActionTextWhite]}>
                    Done
                  </Text>
                </TouchableOpacity>
              </View>
            </ScrollView>
          </View>
        </View>
      </Modal>
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
    fontSize: 18,
    fontWeight: 'bold',
    color: COLORS.text.primary,
  },
  content: {
    flex: 1,
  },
  scrollContent: {
    paddingHorizontal: 20,
    paddingTop: 16,
    paddingBottom: 24,
  },
  accountCard: {
    backgroundColor: COLORS.white,
    borderRadius: 16,
    padding: 16,
    marginBottom: 16,
  },
  accountHeader: {
    marginBottom: 8,
  },
  accountId: {
    fontSize: 12,
    fontWeight: '600',
    color: COLORS.text.secondary,
  },
  customerName: {
    fontSize: 20,
    fontWeight: 'bold',
    color: COLORS.text.primary,
    marginBottom: 12,
  },
  accountDetails: {
    flexDirection: 'row',
    justifyContent: 'space-between',
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
  overdueText: {
    color: COLORS.danger,
  },
  locationCard: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
    borderRadius: 12,
    marginBottom: 20,
  },
  locationCardSuccess: {
    backgroundColor: COLORS.successLight,
  },
  locationCardWarning: {
    backgroundColor: COLORS.warningLight,
  },
  locationInfo: {
    flex: 1,
    marginLeft: 12,
  },
  locationText: {
    fontSize: 14,
    fontWeight: '600',
    color: COLORS.text.primary,
  },
  locationSubtext: {
    fontSize: 12,
    color: COLORS.text.secondary,
    marginTop: 2,
  },
  locationBtn: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: COLORS.white,
    justifyContent: 'center',
    alignItems: 'center',
  },
  section: {
    marginBottom: 24,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: COLORS.text.primary,
    marginBottom: 12,
  },
  amountInputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: COLORS.white,
    borderRadius: 16,
    paddingHorizontal: 20,
    paddingVertical: 16,
    borderWidth: 2,
    borderColor: COLORS.primary,
  },
  currencySymbol: {
    fontSize: 32,
    fontWeight: 'bold',
    color: COLORS.text.secondary,
    marginRight: 8,
  },
  amountInput: {
    flex: 1,
    fontSize: 32,
    fontWeight: 'bold',
    color: COLORS.text.primary,
  },
  quickAmounts: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
    marginTop: 12,
  },
  quickAmountBtn: {
    backgroundColor: COLORS.gray50,
    paddingHorizontal: 16,
    paddingVertical: 10,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: COLORS.gray200,
  },
  quickAmountText: {
    fontSize: 14,
    fontWeight: '600',
    color: COLORS.text.primary,
  },
  paymentModeGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 12,
  },
  paymentModeCard: {
    width: '30%',
    backgroundColor: COLORS.white,
    borderRadius: 12,
    padding: 16,
    alignItems: 'center',
    borderWidth: 2,
    borderColor: COLORS.gray200,
  },
  paymentModeCardActive: {
    borderColor: COLORS.primary,
    backgroundColor: '#F0F1FF',
  },
  paymentModeText: {
    fontSize: 13,
    color: COLORS.text.secondary,
    marginTop: 8,
    fontWeight: '600',
  },
  paymentModeTextActive: {
    color: COLORS.primary,
  },
  input: {
    backgroundColor: COLORS.white,
    borderWidth: 1,
    borderColor: COLORS.gray200,
    borderRadius: 12,
    paddingHorizontal: 16,
    paddingVertical: 14,
    fontSize: 16,
    color: COLORS.text.primary,
  },
  textArea: {
    height: 100,
    textAlignVertical: 'top',
  },
  dateCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: COLORS.white,
    borderRadius: 12,
    padding: 16,
    borderWidth: 1,
    borderColor: COLORS.gray200,
  },
  dateText: {
    fontSize: 16,
    fontWeight: '600',
    color: COLORS.text.primary,
    marginLeft: 12,
  },
  noteCard: {
    flexDirection: 'row',
    backgroundColor: COLORS.infoLight,
    padding: 16,
    borderRadius: 12,
    marginBottom: 20,
  },
  noteText: {
    flex: 1,
    fontSize: 13,
    color: COLORS.text.secondary,
    marginLeft: 12,
    lineHeight: 20,
  },
  submitButton: {
    flexDirection: 'row',
    backgroundColor: COLORS.success,
    padding: 18,
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 12,
  },
  submitButtonText: {
    color: COLORS.white,
    fontSize: 16,
    fontWeight: 'bold',
    marginLeft: 8,
  },
  securityInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  securityText: {
    fontSize: 12,
    color: COLORS.text.secondary,
    marginLeft: 6,
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
  receiptContainer: {
    padding: 20,
  },
  receiptInfo: {
    backgroundColor: COLORS.gray50,
    padding: 12,
    borderRadius: 8,
    marginTop: 12,
  },
  receiptInfoLabel: {
    fontSize: 12,
    color: COLORS.text.secondary,
    marginBottom: 4,
  },
  receiptInfoValue: {
    fontSize: 14,
    fontWeight: '600',
    color: COLORS.text.primary,
  },
  receiptActions: {
    flexDirection: 'row',
    gap: 12,
    marginTop: 20,
  },
  receiptActionBtn: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: COLORS.gray50,
    padding: 14,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: COLORS.gray200,
  },
  receiptActionBtnPrimary: {
    backgroundColor: COLORS.primary,
    borderColor: COLORS.primary,
  },
  receiptActionText: {
    fontSize: 14,
    fontWeight: '600',
    color: COLORS.primary,
    marginLeft: 6,
  },
  receiptActionTextWhite: {
    color: COLORS.white,
  },
});

export default PaymentCollection;