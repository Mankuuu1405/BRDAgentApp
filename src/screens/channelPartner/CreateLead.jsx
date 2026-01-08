// src/screens/channelPartner/CreateLead.js
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

const CreateLead = ({ navigation }) => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    mobile: '',
    panNumber: '',
    aadhaarNumber: '',
    product: '',
    loanAmount: '',
    address: '',
  });

  const [showProductDropdown, setShowProductDropdown] = useState(false);

  const productOptions = [
    { label: 'Personal Loan', value: 'personal', icon: 'person' },
    { label: 'Business Loan', value: 'business', icon: 'briefcase' },
    { label: 'Home Loan', value: 'home', icon: 'home' },
    { label: 'Vehicle Loan', value: 'vehicle', icon: 'car' },
  ];

  const updateField = (field, value) => {
    setFormData({ ...formData, [field]: value });
  };

  const getProductLabel = (value) => {
    const product = productOptions.find(p => p.value === value);
    return product ? product.label : 'Select Product Type';
  };

  const handleScanDocument = (docType) => {
    Alert.alert(
      'OCR Scanner',
      `${docType} scanning feature will be implemented using OCR technology to auto-populate details`,
      [{ text: 'OK' }]
    );
  };

  const handleSubmit = () => {
    if (!formData.name || !formData.mobile || !formData.product || !formData.loanAmount) {
      Alert.alert('Error', 'Please fill in all required fields');
      return;
    }

    Alert.alert(
      'Success',
      'Lead created successfully! You will be notified once it is reviewed.',
      [
        { 
          text: 'OK', 
          onPress: () => {
            navigation.navigate('Leads');
          }
        }
      ]
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Create New Lead</Text>
        <View style={{ width: 24 }} />
      </View>

      <ScrollView
        style={styles.scrollView}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}
      >
        {/* OCR Scan Section */}
        <View style={styles.scanSection}>
          <Text style={styles.sectionTitle}>Quick Scan (OCR)</Text>
          <View style={styles.scanButtons}>
            <TouchableOpacity 
              style={styles.scanCard}
              onPress={() => handleScanDocument('PAN Card')}
            >
              <View style={[styles.scanIcon, { backgroundColor: '#DBEAFE' }]}>
                <Icon name="card" size={24} color={COLORS.primary} />
              </View>
              <Text style={styles.scanLabel}>Scan PAN</Text>
            </TouchableOpacity>

            <TouchableOpacity 
              style={styles.scanCard}
              onPress={() => handleScanDocument('Aadhaar Card')}
            >
              <View style={[styles.scanIcon, { backgroundColor: '#D1FAE5' }]}>
                <Icon name="finger-print" size={24} color={COLORS.success} />
              </View>
              <Text style={styles.scanLabel}>Scan Aadhaar</Text>
            </TouchableOpacity>
          </View>
        </View>

        {/* Personal Details Section */}
        <View style={styles.formSection}>
          <Text style={styles.sectionTitle}>Personal Details</Text>

          <View style={styles.inputGroup}>
            <Text style={styles.inputLabel}>Full Name *</Text>
            <View style={styles.inputWrapper}>
              <Icon name="person-outline" size={20} color={COLORS.gray500} style={styles.inputIcon} />
              <TextInput
                style={styles.input}
                placeholder="Enter full name"
                placeholderTextColor={COLORS.gray400}
                value={formData.name}
                onChangeText={(text) => updateField('name', text)}
              />
            </View>
          </View>

          <View style={styles.inputGroup}>
            <Text style={styles.inputLabel}>Mobile Number *</Text>
            <View style={styles.inputWrapper}>
              <Icon name="call-outline" size={20} color={COLORS.gray500} style={styles.inputIcon} />
              <TextInput
                style={styles.input}
                placeholder="10-digit mobile number"
                placeholderTextColor={COLORS.gray400}
                value={formData.mobile}
                onChangeText={(text) => updateField('mobile', text)}
                keyboardType="phone-pad"
                maxLength={10}
              />
            </View>
          </View>

          <View style={styles.inputGroup}>
            <Text style={styles.inputLabel}>Email Address</Text>
            <View style={styles.inputWrapper}>
              <Icon name="mail-outline" size={20} color={COLORS.gray500} style={styles.inputIcon} />
              <TextInput
                style={styles.input}
                placeholder="email@example.com"
                placeholderTextColor={COLORS.gray400}
                value={formData.email}
                onChangeField={(text) => updateField('email', text)}
                keyboardType="email-address"
                autoCapitalize="none"
              />
            </View>
          </View>

          <View style={styles.inputGroup}>
            <Text style={styles.inputLabel}>PAN Number</Text>
            <View style={styles.inputWrapper}>
              <Icon name="card-outline" size={20} color={COLORS.gray500} style={styles.inputIcon} />
              <TextInput
                style={styles.input}
                placeholder="ABCDE1234F"
                placeholderTextColor={COLORS.gray400}
                value={formData.panNumber}
                onChangeText={(text) => updateField('panNumber', text.toUpperCase())}
                maxLength={10}
                autoCapitalize="characters"
              />
            </View>
          </View>

          <View style={styles.inputGroup}>
            <Text style={styles.inputLabel}>Aadhaar Number</Text>
            <View style={styles.inputWrapper}>
              <Icon name="finger-print-outline" size={20} color={COLORS.gray500} style={styles.inputIcon} />
              <TextInput
                style={styles.input}
                placeholder="XXXX XXXX XXXX"
                placeholderTextColor={COLORS.gray400}
                value={formData.aadhaarNumber}
                onChangeText={(text) => updateField('aadhaarNumber', text)}
                keyboardType="number-pad"
                maxLength={12}
              />
            </View>
          </View>

          <View style={styles.inputGroup}>
            <Text style={styles.inputLabel}>Address</Text>
            <View style={styles.inputWrapper}>
              <Icon name="location-outline" size={20} color={COLORS.gray500} style={styles.inputIcon} />
              <TextInput
                style={styles.input}
                placeholder="Enter complete address"
                placeholderTextColor={COLORS.gray400}
                value={formData.address}
                onChangeText={(text) => updateField('address', text)}
                multiline
              />
            </View>
          </View>
        </View>

        {/* Loan Details Section */}
        <View style={styles.formSection}>
          <Text style={styles.sectionTitle}>Loan Details</Text>

          <View style={styles.inputGroup}>
            <Text style={styles.inputLabel}>Product Type *</Text>
            <TouchableOpacity
              style={styles.dropdownButton}
              onPress={() => setShowProductDropdown(!showProductDropdown)}
            >
              <Text style={[
                styles.dropdownButtonText,
                !formData.product && { color: COLORS.gray400 }
              ]}>
                {getProductLabel(formData.product)}
              </Text>
              <Icon
                name={showProductDropdown ? "chevron-up" : "chevron-down"}
                size={20}
                color={COLORS.gray500}
              />
            </TouchableOpacity>

            {showProductDropdown && (
              <View style={styles.dropdownList}>
                {productOptions.map((product) => (
                  <TouchableOpacity
                    key={product.value}
                    style={[
                      styles.dropdownItem,
                      formData.product === product.value && styles.dropdownItemSelected
                    ]}
                    onPress={() => {
                      updateField('product', product.value);
                      setShowProductDropdown(false);
                    }}
                  >
                    <View style={styles.dropdownItemContent}>
                      <Icon name={product.icon} size={20} color={
                        formData.product === product.value ? COLORS.primary : COLORS.gray500
                      } />
                      <Text style={[
                        styles.dropdownItemText,
                        formData.product === product.value && styles.dropdownItemTextSelected
                      ]}>
                        {product.label}
                      </Text>
                    </View>
                    {formData.product === product.value && (
                      <Icon name="checkmark" size={20} color={COLORS.primary} />
                    )}
                  </TouchableOpacity>
                ))}
              </View>
            )}
          </View>

          <View style={styles.inputGroup}>
            <Text style={styles.inputLabel}>Loan Amount Required *</Text>
            <View style={styles.inputWrapper}>
              <Icon name="cash-outline" size={20} color={COLORS.gray500} style={styles.inputIcon} />
              <Text style={styles.currencySymbol}>₹</Text>
              <TextInput
                style={[styles.input, { paddingLeft: 0 }]}
                placeholder="Enter amount"
                placeholderTextColor={COLORS.gray400}
                value={formData.loanAmount}
                onChangeText={(text) => updateField('loanAmount', text)}
                keyboardType="number-pad"
              />
            </View>
          </View>
        </View>

        {/* Info Banner */}
        <View style={styles.infoBanner}>
          <Icon name="information-circle" size={20} color={COLORS.primary} />
          <Text style={styles.infoText}>
            All leads are subject to verification and approval. You'll be notified of any status changes.
          </Text>
        </View>

        {/* Submit Button */}
        <TouchableOpacity
          style={styles.submitButton}
          onPress={handleSubmit}
          activeOpacity={0.7}
        >
          <Icon name="checkmark-circle" size={20} color={COLORS.white} />
          <Text style={styles.submitButtonText}>Create Lead</Text>
        </TouchableOpacity>

        <View style={{ height: 20 }} />
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
  },
  scanSection: {
    marginBottom: 24,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: COLORS.text.primary,
    marginBottom: 16,
  },
  scanButtons: {
    flexDirection: 'row',
    gap: 12,
  },
  scanCard: {
    flex: 1,
    backgroundColor: COLORS.white,
    borderRadius: 16,
    padding: 20,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 8,
    elevation: 2,
  },
  scanIcon: {
    width: 56,
    height: 56,
    borderRadius: 28,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 12,
  },
  scanLabel: {
    fontSize: 14,
    fontWeight: '600',
    color: COLORS.text.primary,
  },
  formSection: {
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
  inputGroup: {
    marginBottom: 16,
  },
  inputLabel: {
    fontSize: 14,
    fontWeight: '600',
    color: COLORS.text.primary,
    marginBottom: 8,
  },
  inputWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: COLORS.gray200,
    borderRadius: 10,
    paddingHorizontal: 12,
    backgroundColor: COLORS.gray50,
  },
  inputIcon: {
    marginRight: 8,
  },
  input: {
    flex: 1,
    paddingVertical: 12,
    fontSize: 16,
    color: COLORS.text.primary,
  },
  currencySymbol: {
    fontSize: 16,
    fontWeight: '600',
    color: COLORS.text.primary,
    marginRight: 4,
  },
  dropdownButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    borderWidth: 1,
    borderColor: COLORS.gray200,
    borderRadius: 10,
    padding: 12,
    backgroundColor: COLORS.gray50,
  },
  dropdownButtonText: {
    fontSize: 16,
    color: COLORS.text.primary,
  },
  dropdownList: {
    marginTop: 8,
    borderWidth: 1,
    borderColor: COLORS.gray200,
    borderRadius: 10,
    backgroundColor: COLORS.white,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 5,
  },
  dropdownItem: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 12,
    borderBottomWidth: 1,
    borderBottomColor: COLORS.gray200,
  },
  dropdownItemSelected: {
    backgroundColor: '#F0F1FF',
  },
  dropdownItemContent: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  dropdownItemText: {
    fontSize: 16,
    color: COLORS.text.primary,
  },
  dropdownItemTextSelected: {
    color: COLORS.primary,
    fontWeight: '600',
  },
  infoBanner: {
    flexDirection: 'row',
    backgroundColor: '#EEF2FF',
    borderRadius: 12,
    padding: 16,
    marginBottom: 20,
    gap: 12,
  },
  infoText: {
    flex: 1,
    fontSize: 13,
    color: COLORS.primary,
    lineHeight: 18,
  },
  submitButton: {
    flexDirection: 'row',
    backgroundColor: COLORS.primary,
    paddingVertical: 16,
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
    shadowColor: COLORS.primary,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 5,
  },
  submitButtonText: {
    color: COLORS.white,
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default CreateLead;