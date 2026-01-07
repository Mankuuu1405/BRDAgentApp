// src/screens/fieldInvestigation/AddNewScreen.js
import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  ScrollView,
  TouchableOpacity,
  TextInput,
  Switch,
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

const AddNewScreen = ({ navigation }) => {
  const [activeTab, setActiveTab] = useState('manual'); // 'manual' or 'verification'
  
  // Manual Lead Entry States
  const [formData, setFormData] = useState({
    name: '',
    mobile: '',
    email: '',
    panCard: '',
    aadhaar: '',
    address: '',
    pincode: '',
    loanType: '',
  });

  // Verification Form States
  const [verificationData, setVerificationData] = useState({
    caseId: 'LOC-2025-8832',
    applicantName: 'Rajesh Kumar',
    address: 'H-102, Dwarka Sector 10, Delhi',
    neighborName: '',
    neighborComment: '',
    houseOwnership: 'Owned',
    hasTV: false,
    hasFridge: false,
    hasWashingMachine: false,
    hasTwoWheeler: false,
    hasFourWheeler: false,
    isAddressConfirmed: true,
    hasNegativeProfile: false,
    additionalNotes: '',
  });

  const [capturedPhotos, setCapturedPhotos] = useState([]);
  const [isWithinRange, setIsWithinRange] = useState(false); // Simulate geofencing

  const handleOCRScan = () => {
    Alert.alert('OCR Scanner', 'Camera will open to scan PAN/Aadhaar');
  };

  const handleCameraCapture = () => {
    Alert.alert('Camera', 'Opening custom camera with watermark overlay');
    // Simulate photo capture
    setCapturedPhotos([...capturedPhotos, { id: Date.now(), type: 'house_exterior' }]);
  };

  const handleSubmitVerification = () => {
    if (!isWithinRange) {
      Alert.alert('Location Error', 'You are too far from the verification location (50m range required)');
      return;
    }
    
    if (capturedPhotos.length === 0) {
      Alert.alert('Error', 'Please capture at least one photo');
      return;
    }

    Alert.alert('Success', 'Verification submitted successfully!');
  };

  const renderManualEntry = () => (
    <ScrollView style={styles.tabContent} showsVerticalScrollIndicator={false}>
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Quick Actions</Text>
        <TouchableOpacity style={styles.ocrButton} onPress={handleOCRScan}>
          <Icon name="scan" size={24} color={COLORS.primary} />
          <View style={styles.ocrButtonText}>
            <Text style={styles.ocrButtonTitle}>Scan Document</Text>
            <Text style={styles.ocrButtonSubtitle}>Auto-fill from PAN/Aadhaar</Text>
          </View>
          <Icon name="chevron-forward" size={20} color={COLORS.gray400} />
        </TouchableOpacity>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Applicant Details</Text>
        
        <View style={styles.inputGroup}>
          <Text style={styles.label}>Full Name *</Text>
          <TextInput
            style={styles.input}
            placeholder="Enter full name"
            placeholderTextColor={COLORS.gray400}
            value={formData.name}
            onChangeText={(text) => setFormData({...formData, name: text})}
          />
        </View>

        <View style={styles.inputGroup}>
          <Text style={styles.label}>Mobile Number *</Text>
          <TextInput
            style={styles.input}
            placeholder="10-digit mobile number"
            placeholderTextColor={COLORS.gray400}
            keyboardType="phone-pad"
            maxLength={10}
            value={formData.mobile}
            onChangeText={(text) => setFormData({...formData, mobile: text})}
          />
        </View>

        <View style={styles.inputGroup}>
          <Text style={styles.label}>Email</Text>
          <TextInput
            style={styles.input}
            placeholder="email@example.com"
            placeholderTextColor={COLORS.gray400}
            keyboardType="email-address"
            autoCapitalize="none"
            value={formData.email}
            onChangeText={(text) => setFormData({...formData, email: text})}
          />
        </View>

        <View style={styles.inputGroup}>
          <Text style={styles.label}>PAN Card *</Text>
          <TextInput
            style={styles.input}
            placeholder="ABCDE1234F"
            placeholderTextColor={COLORS.gray400}
            autoCapitalize="characters"
            maxLength={10}
            value={formData.panCard}
            onChangeText={(text) => setFormData({...formData, panCard: text})}
          />
        </View>

        <View style={styles.inputGroup}>
          <Text style={styles.label}>Aadhaar Number *</Text>
          <TextInput
            style={styles.input}
            placeholder="XXXX-XXXX-XXXX"
            placeholderTextColor={COLORS.gray400}
            keyboardType="number-pad"
            maxLength={12}
            value={formData.aadhaar}
            onChangeText={(text) => setFormData({...formData, aadhaar: text})}
          />
        </View>

        <View style={styles.inputGroup}>
          <Text style={styles.label}>Address *</Text>
          <TextInput
            style={[styles.input, styles.textArea]}
            placeholder="Complete address"
            placeholderTextColor={COLORS.gray400}
            multiline
            numberOfLines={3}
            value={formData.address}
            onChangeText={(text) => setFormData({...formData, address: text})}
          />
        </View>

        <View style={styles.inputGroup}>
          <Text style={styles.label}>Pincode *</Text>
          <TextInput
            style={styles.input}
            placeholder="6-digit pincode"
            placeholderTextColor={COLORS.gray400}
            keyboardType="number-pad"
            maxLength={6}
            value={formData.pincode}
            onChangeText={(text) => setFormData({...formData, pincode: text})}
          />
        </View>
      </View>

      <TouchableOpacity style={styles.submitButton}>
        <Text style={styles.submitButtonText}>Create Lead</Text>
      </TouchableOpacity>
    </ScrollView>
  );

  const renderVerificationForm = () => (
    <ScrollView style={styles.tabContent} showsVerticalScrollIndicator={false}>
      {/* Case Info Card */}
      <View style={styles.caseInfoCard}>
        <Text style={styles.caseId}>{verificationData.caseId}</Text>
        <Text style={styles.caseName}>{verificationData.applicantName}</Text>
        <View style={styles.caseAddressRow}>
          <Icon name="location" size={16} color={COLORS.text.secondary} />
          <Text style={styles.caseAddress}>{verificationData.address}</Text>
        </View>
      </View>

      {/* Location Status */}
      <View style={[styles.locationCard, isWithinRange ? styles.locationCardSuccess : styles.locationCardDanger]}>
        <Icon 
          name={isWithinRange ? "checkmark-circle" : "alert-circle"} 
          size={24} 
          color={isWithinRange ? COLORS.success : COLORS.danger} 
        />
        <View style={styles.locationInfo}>
          <Text style={styles.locationText}>
            {isWithinRange ? 'Within verification range' : 'Too far from location'}
          </Text>
          <Text style={styles.locationSubtext}>
            {isWithinRange ? 'Ready to submit' : 'Move within 50m to enable submission'}
          </Text>
        </View>
      </View>

      {/* Camera Section */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Photo Documentation</Text>
        <TouchableOpacity style={styles.cameraButton} onPress={handleCameraCapture}>
          <Icon name="camera" size={24} color={COLORS.white} />
          <Text style={styles.cameraButtonText}>Capture Photo (Watermarked)</Text>
        </TouchableOpacity>
        
        {capturedPhotos.length > 0 && (
          <View style={styles.photosGrid}>
            {capturedPhotos.map((photo) => (
              <View key={photo.id} style={styles.photoItem}>
                <Icon name="image" size={40} color={COLORS.primary} />
                <Text style={styles.photoLabel}>{photo.type}</Text>
              </View>
            ))}
          </View>
        )}
      </View>

      {/* Neighbor Check */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Neighbor Reference</Text>
        <View style={styles.inputGroup}>
          <Text style={styles.label}>Neighbor Name</Text>
          <TextInput
            style={styles.input}
            placeholder="Name of neighbor met"
            placeholderTextColor={COLORS.gray400}
            value={verificationData.neighborName}
            onChangeText={(text) => setVerificationData({...verificationData, neighborName: text})}
          />
        </View>
        <View style={styles.inputGroup}>
          <Text style={styles.label}>Comments</Text>
          <TextInput
            style={[styles.input, styles.textArea]}
            placeholder="Any relevant information"
            placeholderTextColor={COLORS.gray400}
            multiline
            numberOfLines={2}
            value={verificationData.neighborComment}
            onChangeText={(text) => setVerificationData({...verificationData, neighborComment: text})}
          />
        </View>
      </View>

      {/* House Ownership */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Property Details</Text>
        <View style={styles.inputGroup}>
          <Text style={styles.label}>House Ownership</Text>
          <View style={styles.radioGroup}>
            {['Owned', 'Rented', 'Leased', 'Family Owned'].map((option) => (
              <TouchableOpacity
                key={option}
                style={[
                  styles.radioButton,
                  verificationData.houseOwnership === option && styles.radioButtonActive,
                ]}
                onPress={() => setVerificationData({...verificationData, houseOwnership: option})}
              >
                <Text
                  style={[
                    styles.radioButtonText,
                    verificationData.houseOwnership === option && styles.radioButtonTextActive,
                  ]}
                >
                  {option}
                </Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>
      </View>

      {/* Standard of Living */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Assets Observed</Text>
        
        {[
          { key: 'hasTV', label: 'Television' },
          { key: 'hasFridge', label: 'Refrigerator' },
          { key: 'hasWashingMachine', label: 'Washing Machine' },
          { key: 'hasTwoWheeler', label: 'Two Wheeler' },
          { key: 'hasFourWheeler', label: 'Four Wheeler' },
        ].map((asset) => (
          <View key={asset.key} style={styles.checkboxRow}>
            <Text style={styles.checkboxLabel}>{asset.label}</Text>
            <Switch
              value={verificationData[asset.key]}
              onValueChange={(value) => setVerificationData({...verificationData, [asset.key]: value})}
              trackColor={{ false: COLORS.gray200, true: COLORS.primary }}
              thumbColor={COLORS.white}
            />
          </View>
        ))}
      </View>

      {/* Verification Flags */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Verification Status</Text>
        
        <View style={styles.checkboxRow}>
          <Text style={styles.checkboxLabel}>Address Confirmed</Text>
          <Switch
            value={verificationData.isAddressConfirmed}
            onValueChange={(value) => setVerificationData({...verificationData, isAddressConfirmed: value})}
            trackColor={{ false: COLORS.gray200, true: COLORS.success }}
            thumbColor={COLORS.white}
          />
        </View>
        
        <View style={styles.checkboxRow}>
          <Text style={styles.checkboxLabel}>Negative Profile Detected</Text>
          <Switch
            value={verificationData.hasNegativeProfile}
            onValueChange={(value) => setVerificationData({...verificationData, hasNegativeProfile: value})}
            trackColor={{ false: COLORS.gray200, true: COLORS.danger }}
            thumbColor={COLORS.white}
          />
        </View>
      </View>

      {/* Additional Notes */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Additional Notes</Text>
        <TextInput
          style={[styles.input, styles.textArea]}
          placeholder="Any additional observations or concerns"
          placeholderTextColor={COLORS.gray400}
          multiline
          numberOfLines={4}
          value={verificationData.additionalNotes}
          onChangeText={(text) => setVerificationData({...verificationData, additionalNotes: text})}
        />
      </View>

      {/* Submit Button */}
      <TouchableOpacity 
        style={[styles.submitButton, !isWithinRange && styles.submitButtonDisabled]}
        onPress={handleSubmitVerification}
        disabled={!isWithinRange}
      >
        <Icon name="lock-closed" size={16} color={COLORS.white} style={{marginRight: 8}} />
        <Text style={styles.submitButtonText}>
          {isWithinRange ? 'Submit Verification' : 'Move Closer to Submit'}
        </Text>
      </TouchableOpacity>

      {/* Security Info */}
      <View style={styles.securityInfo}>
        <Icon name="shield-checkmark" size={16} color={COLORS.success} />
        <Text style={styles.securityText}>Data encrypted with AES-256</Text>
      </View>
    </ScrollView>
  );

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>New Entry</Text>
      </View>

      {/* Tab Selector */}
      <View style={styles.tabSelector}>
        <TouchableOpacity
          style={[styles.tab, activeTab === 'manual' && styles.tabActive]}
          onPress={() => setActiveTab('manual')}
        >
          <Icon 
            name="person-add" 
            size={20} 
            color={activeTab === 'manual' ? COLORS.primary : COLORS.gray500} 
          />
          <Text style={[styles.tabText, activeTab === 'manual' && styles.tabTextActive]}>
            Manual Lead
          </Text>
        </TouchableOpacity>
        
        <TouchableOpacity
          style={[styles.tab, activeTab === 'verification' && styles.tabActive]}
          onPress={() => setActiveTab('verification')}
        >
          <Icon 
            name="checkmark-done" 
            size={20} 
            color={activeTab === 'verification' ? COLORS.primary : COLORS.gray500} 
          />
          <Text style={[styles.tabText, activeTab === 'verification' && styles.tabTextActive]}>
            Start Verification
          </Text>
        </TouchableOpacity>
      </View>

      {activeTab === 'manual' ? renderManualEntry() : renderVerificationForm()}
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.background,
  },
  header: {
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
  tabSelector: {
    flexDirection: 'row',
    backgroundColor: COLORS.white,
    paddingHorizontal: 20,
    paddingTop: 12,
    paddingBottom: 16,
    borderBottomWidth: 1,
    borderBottomColor: COLORS.gray200,
  },
  tab: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 12,
    borderRadius: 12,
    backgroundColor: COLORS.gray50,
    marginHorizontal: 4,
  },
  tabActive: {
    backgroundColor: '#F0F1FF',
  },
  tabText: {
    fontSize: 14,
    fontWeight: '600',
    color: COLORS.gray500,
    marginLeft: 8,
  },
  tabTextActive: {
    color: COLORS.primary,
  },
  tabContent: {
    flex: 1,
    paddingHorizontal: 20,
    paddingTop: 16,
  },
  section: {
    marginBottom: 24,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: COLORS.text.primary,
    marginBottom: 16,
  },
  ocrButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: COLORS.white,
    padding: 16,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: COLORS.gray200,
    borderStyle: 'dashed',
  },
  ocrButtonText: {
    flex: 1,
    marginLeft: 12,
  },
  ocrButtonTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: COLORS.text.primary,
  },
  ocrButtonSubtitle: {
    fontSize: 12,
    color: COLORS.text.secondary,
    marginTop: 2,
  },
  inputGroup: {
    marginBottom: 16,
  },
  label: {
    fontSize: 14,
    fontWeight: '600',
    color: COLORS.text.primary,
    marginBottom: 8,
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
    height: 80,
    textAlignVertical: 'top',
  },
  caseInfoCard: {
    backgroundColor: COLORS.white,
    padding: 16,
    borderRadius: 12,
    marginBottom: 16,
  },
  caseId: {
    fontSize: 12,
    fontWeight: '600',
    color: COLORS.text.secondary,
    marginBottom: 4,
  },
  caseName: {
    fontSize: 18,
    fontWeight: 'bold',
    color: COLORS.text.primary,
    marginBottom: 8,
  },
  caseAddressRow: {
    flexDirection: 'row',
    alignItems: 'flex-start',
  },
  caseAddress: {
    fontSize: 14,
    color: COLORS.text.secondary,
    marginLeft: 4,
    flex: 1,
  },
  locationCard: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
    borderRadius: 12,
    marginBottom: 16,
  },
  locationCardSuccess: {
    backgroundColor: '#D1FAE5',
  },
  locationCardDanger: {
    backgroundColor: '#FEE2E2',
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
  cameraButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: COLORS.primary,
    padding: 16,
    borderRadius: 12,
  },
  cameraButtonText: {
    color: COLORS.white,
    fontSize: 16,
    fontWeight: 'bold',
    marginLeft: 8,
  },
  photosGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginTop: 16,
  },
  photoItem: {
    width: 80,
    height: 80,
    backgroundColor: COLORS.white,
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
    marginBottom: 12,
    borderWidth: 1,
    borderColor: COLORS.gray200,
  },
  photoLabel: {
    fontSize: 10,
    color: COLORS.text.secondary,
    marginTop: 4,
  },
  radioGroup: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
  },
  radioButton: {
    paddingHorizontal: 16,
    paddingVertical: 10,
    borderRadius: 20,
    backgroundColor: COLORS.white,
    borderWidth: 1,
    borderColor: COLORS.gray200,
  },
  radioButtonActive: {
    backgroundColor: COLORS.primary,
    borderColor: COLORS.primary,
  },
  radioButtonText: {
    fontSize: 14,
    fontWeight: '600',
    color: COLORS.text.secondary,
  },
  radioButtonTextActive: {
    color: COLORS.white,
  },
  checkboxRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: COLORS.white,
    padding: 16,
    borderRadius: 12,
    marginBottom: 12,
    borderWidth: 1,
    borderColor: COLORS.gray200,
  },
  checkboxLabel: {
    fontSize: 15,
    fontWeight: '500',
    color: COLORS.text.primary,
  },
  submitButton: {
    flexDirection: 'row',
    backgroundColor: COLORS.primary,
    padding: 18,
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 8,
    marginBottom: 16,
  },
  submitButtonDisabled: {
    backgroundColor: COLORS.gray400,
  },
  submitButtonText: {
    color: COLORS.white,
    fontSize: 16,
    fontWeight: 'bold',
  },
  securityInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 24,
  },
  securityText: {
    fontSize: 12,
    color: COLORS.text.secondary,
    marginLeft: 6,
  },
});

export default AddNewScreen;