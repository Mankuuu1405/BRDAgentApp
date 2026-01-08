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
  Modal,
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
  // Verification Form States
  const [verificationData, setVerificationData] = useState({
    caseId: 'LOC-2025-8832',
    applicantName: 'Rajesh Kumar',
    address: 'H-102, Dwarka Sector 10, Delhi',
    verificationType: 'CPV', // CPV, Business, Document
    neighborName: '',
    neighborContact: '',
    neighborComment: '',
    houseOwnership: 'Owned',
    residenceType: 'Independent House',
    hasTV: false,
    hasFridge: false,
    hasWashingMachine: false,
    hasTwoWheeler: false,
    hasFourWheeler: false,
    hasAC: false,
    isAddressConfirmed: true,
    hasNegativeProfile: false,
    applicantMet: true,
    familyMembersPresent: 2,
    additionalNotes: '',
  });

  const [capturedPhotos, setCapturedPhotos] = useState([]);
  const [isWithinRange, setIsWithinRange] = useState(false);
  const [currentLocation] = useState({ lat: 28.5921, lng: 77.0460 });
  const [targetLocation] = useState({ lat: 28.5935, lng: 77.0458 });
  const [showCameraOptions, setShowCameraOptions] = useState(false);

  // Calculate distance (simulated)
  const calculateDistance = () => {
    // Haversine formula would be used here
    return 45; // meters
  };

  const handleCameraCapture = (photoType) => {
    setShowCameraOptions(false);
    Alert.alert('Camera', `Opening camera for ${photoType}`);
    // Simulate photo capture with watermark
    const newPhoto = {
      id: Date.now(),
      type: photoType,
      timestamp: new Date().toISOString(),
      location: currentLocation,
      watermark: {
        lat: currentLocation.lat,
        lng: currentLocation.lng,
        datetime: new Date().toLocaleString(),
        caseId: verificationData.caseId,
      },
    };
    setCapturedPhotos([...capturedPhotos, newPhoto]);
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

    if (!verificationData.neighborName) {
      Alert.alert('Error', 'Please enter neighbor reference details');
      return;
    }

    Alert.alert('Success', 'Verification submitted successfully!', [
      { text: 'OK', onPress: () => navigation.navigate('Cases') }
    ]);
  };

  const photoTypes = [
    { id: 'house_exterior', label: 'House Exterior', icon: 'home' },
    { id: 'house_entrance', label: 'House Entrance', icon: 'enter' },
    { id: 'street_view', label: 'Street View', icon: 'navigate' },
    { id: 'applicant_photo', label: 'Applicant Photo', icon: 'person' },
    { id: 'address_proof', label: 'Address Proof', icon: 'document-text' },
  ];

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Icon name="arrow-back" size={24} color={COLORS.text.primary} />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Field Verification</Text>
        <View style={{ width: 24 }} />
      </View>

      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        {/* Case Info Card */}
        <View style={styles.caseInfoCard}>
          <View style={styles.caseIdRow}>
            <Text style={styles.caseId}>{verificationData.caseId}</Text>
            <View style={styles.verificationTypeBadge}>
              <Text style={styles.verificationTypeText}>{verificationData.verificationType}</Text>
            </View>
          </View>
          <Text style={styles.caseName}>{verificationData.applicantName}</Text>
          <View style={styles.caseAddressRow}>
            <Icon name="location" size={16} color={COLORS.text.secondary} />
            <Text style={styles.caseAddress}>{verificationData.address}</Text>
          </View>
        </View>

        {/* Geo-Fencing Status */}
        <View style={[styles.locationCard, isWithinRange ? styles.locationCardSuccess : styles.locationCardWarning]}>
          <Icon 
            name={isWithinRange ? "checkmark-circle" : "alert-circle"} 
            size={24} 
            color={isWithinRange ? COLORS.success : COLORS.warning} 
          />
          <View style={styles.locationInfo}>
            <Text style={styles.locationText}>
              {isWithinRange ? 'Within verification range' : `${calculateDistance()}m from location`}
            </Text>
            <Text style={styles.locationSubtext}>
              {isWithinRange ? 'Ready to submit' : 'Move within 50m to enable submission'}
            </Text>
          </View>
          <TouchableOpacity style={styles.locationBtn}>
            <Icon name="refresh" size={20} color={COLORS.primary} />
          </TouchableOpacity>
        </View>

        {/* Photo Documentation */}
        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>Photo Documentation</Text>
            <Text style={styles.requiredBadge}>Required</Text>
          </View>
          
          <TouchableOpacity 
            style={styles.cameraButton} 
            onPress={() => setShowCameraOptions(true)}
          >
            <Icon name="camera" size={24} color={COLORS.white} />
            <Text style={styles.cameraButtonText}>Capture Photo</Text>
          </TouchableOpacity>
          
          {capturedPhotos.length > 0 && (
            <View style={styles.photosGrid}>
              {capturedPhotos.map((photo) => (
                <View key={photo.id} style={styles.photoCard}>
                  <View style={styles.photoIcon}>
                    <Icon name="image" size={32} color={COLORS.primary} />
                  </View>
                  <Text style={styles.photoType}>{photo.type.replace('_', ' ')}</Text>
                  <View style={styles.watermarkBadge}>
                    <Icon name="location" size={10} color={COLORS.success} />
                    <Text style={styles.watermarkText}>Watermarked</Text>
                  </View>
                  <TouchableOpacity style={styles.removePhotoBtn}>
                    <Icon name="close-circle" size={20} color={COLORS.danger} />
                  </TouchableOpacity>
                </View>
              ))}
            </View>
          )}
        </View>

        {/* Applicant Interaction */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Applicant Interaction</Text>
          
          <View style={styles.checkboxRow}>
            <Text style={styles.checkboxLabel}>Applicant Met in Person</Text>
            <Switch
              value={verificationData.applicantMet}
              onValueChange={(value) => setVerificationData({...verificationData, applicantMet: value})}
              trackColor={{ false: COLORS.gray200, true: COLORS.primary }}
              thumbColor={COLORS.white}
            />
          </View>

          {!verificationData.applicantMet && (
            <View style={styles.warningBox}>
              <Icon name="warning" size={20} color={COLORS.warning} />
              <Text style={styles.warningText}>Please provide reason for non-interaction</Text>
            </View>
          )}
        </View>

        {/* Neighbor Reference */}
        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>Neighbor Reference</Text>
            <Text style={styles.requiredBadge}>Required</Text>
          </View>
          
          <View style={styles.inputGroup}>
            <Text style={styles.label}>Neighbor Name *</Text>
            <TextInput
              style={styles.input}
              placeholder="Full name of neighbor"
              placeholderTextColor={COLORS.gray400}
              value={verificationData.neighborName}
              onChangeText={(text) => setVerificationData({...verificationData, neighborName: text})}
            />
          </View>

          <View style={styles.inputGroup}>
            <Text style={styles.label}>Contact Number</Text>
            <TextInput
              style={styles.input}
              placeholder="10-digit mobile number"
              placeholderTextColor={COLORS.gray400}
              keyboardType="phone-pad"
              maxLength={10}
              value={verificationData.neighborContact}
              onChangeText={(text) => setVerificationData({...verificationData, neighborContact: text})}
            />
          </View>

          <View style={styles.inputGroup}>
            <Text style={styles.label}>Comments / Feedback</Text>
            <TextInput
              style={[styles.input, styles.textArea]}
              placeholder="What did the neighbor say about the applicant?"
              placeholderTextColor={COLORS.gray400}
              multiline
              numberOfLines={3}
              value={verificationData.neighborComment}
              onChangeText={(text) => setVerificationData({...verificationData, neighborComment: text})}
            />
          </View>
        </View>

        {/* Property Details */}
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

          <View style={styles.inputGroup}>
            <Text style={styles.label}>Residence Type</Text>
            <View style={styles.radioGroup}>
              {['Independent House', 'Apartment', 'Villa', 'Chawl'].map((option) => (
                <TouchableOpacity
                  key={option}
                  style={[
                    styles.radioButton,
                    verificationData.residenceType === option && styles.radioButtonActive,
                  ]}
                  onPress={() => setVerificationData({...verificationData, residenceType: option})}
                >
                  <Text
                    style={[
                      styles.radioButtonText,
                      verificationData.residenceType === option && styles.radioButtonTextActive,
                    ]}
                  >
                    {option}
                  </Text>
                </TouchableOpacity>
              ))}
            </View>
          </View>
        </View>

        {/* Standard of Living Assessment */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Standard of Living (Assets Observed)</Text>
          
          {[
            { key: 'hasTV', label: 'Television', icon: 'tv' },
            { key: 'hasFridge', label: 'Refrigerator', icon: 'snow' },
            { key: 'hasWashingMachine', label: 'Washing Machine', icon: 'water' },
            { key: 'hasAC', label: 'Air Conditioner', icon: 'thermometer' },
            { key: 'hasTwoWheeler', label: 'Two Wheeler', icon: 'bicycle' },
            { key: 'hasFourWheeler', label: 'Four Wheeler', icon: 'car' },
          ].map((asset) => (
            <View key={asset.key} style={styles.checkboxRow}>
              <View style={styles.assetInfo}>
                <Icon name={asset.icon} size={20} color={COLORS.text.secondary} />
                <Text style={styles.checkboxLabel}>{asset.label}</Text>
              </View>
              <Switch
                value={verificationData[asset.key]}
                onValueChange={(value) => setVerificationData({...verificationData, [asset.key]: value})}
                trackColor={{ false: COLORS.gray200, true: COLORS.primary }}
                thumbColor={COLORS.white}
              />
            </View>
          ))}
        </View>

        {/* Verification Status Flags */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Verification Confirmation</Text>
          
          <View style={styles.checkboxRow}>
            <View style={styles.assetInfo}>
              <Icon name="checkmark-circle" size={20} color={COLORS.success} />
              <Text style={styles.checkboxLabel}>Address Confirmed</Text>
            </View>
            <Switch
              value={verificationData.isAddressConfirmed}
              onValueChange={(value) => setVerificationData({...verificationData, isAddressConfirmed: value})}
              trackColor={{ false: COLORS.gray200, true: COLORS.success }}
              thumbColor={COLORS.white}
            />
          </View>
          
          <View style={styles.checkboxRow}>
            <View style={styles.assetInfo}>
              <Icon name="alert-circle" size={20} color={COLORS.danger} />
              <Text style={styles.checkboxLabel}>Negative Profile Detected</Text>
            </View>
            <Switch
              value={verificationData.hasNegativeProfile}
              onValueChange={(value) => setVerificationData({...verificationData, hasNegativeProfile: value})}
              trackColor={{ false: COLORS.gray200, true: COLORS.danger }}
              thumbColor={COLORS.white}
            />
          </View>

          {verificationData.hasNegativeProfile && (
            <View style={styles.alertBox}>
              <Icon name="warning" size={20} color={COLORS.danger} />
              <Text style={styles.alertText}>Please provide detailed remarks about negative findings</Text>
            </View>
          )}
        </View>

        {/* Additional Observations */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Additional Observations</Text>
          <TextInput
            style={[styles.input, styles.textArea]}
            placeholder="Any other relevant observations, concerns, or remarks..."
            placeholderTextColor={COLORS.gray400}
            multiline
            numberOfLines={5}
            value={verificationData.additionalNotes}
            onChangeText={(text) => setVerificationData({...verificationData, additionalNotes: text})}
          />
        </View>

        {/* Submit Section */}
        <View style={styles.submitSection}>
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

          <View style={styles.securityInfo}>
            <Icon name="shield-checkmark" size={16} color={COLORS.success} />
            <Text style={styles.securityText}>Data encrypted with AES-256</Text>
          </View>
        </View>
      </ScrollView>

      {/* Camera Options Modal */}
      <Modal
        visible={showCameraOptions}
        transparent={true}
        animationType="slide"
        onRequestClose={() => setShowCameraOptions(false)}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            <View style={styles.modalHeader}>
              <Text style={styles.modalTitle}>Select Photo Type</Text>
              <TouchableOpacity onPress={() => setShowCameraOptions(false)}>
                <Icon name="close" size={24} color={COLORS.text.primary} />
              </TouchableOpacity>
            </View>
            
            <ScrollView style={styles.photoTypesList}>
              {photoTypes.map((type) => (
                <TouchableOpacity
                  key={type.id}
                  style={styles.photoTypeItem}
                  onPress={() => handleCameraCapture(type.id)}
                >
                  <Icon name={type.icon} size={24} color={COLORS.primary} />
                  <Text style={styles.photoTypeLabel}>{type.label}</Text>
                  <Icon name="camera" size={20} color={COLORS.gray400} />
                </TouchableOpacity>
              ))}
            </ScrollView>

            <View style={styles.cameraNote}>
              <Icon name="information-circle" size={16} color={COLORS.primary} />
              <Text style={styles.cameraNoteText}>
                Photos will be watermarked with location, date-time, and case ID
              </Text>
            </View>
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
    paddingHorizontal: 20,
  },
  caseInfoCard: {
    backgroundColor: COLORS.white,
    padding: 16,
    borderRadius: 12,
    marginTop: 16,
    marginBottom: 12,
  },
  caseIdRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  caseId: {
    fontSize: 12,
    fontWeight: '600',
    color: COLORS.text.secondary,
    marginRight: 8,
  },
  verificationTypeBadge: {
    backgroundColor: '#F0F1FF',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
  },
  verificationTypeText: {
    fontSize: 10,
    fontWeight: '600',
    color: COLORS.primary,
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
  locationCardWarning: {
    backgroundColor: '#FEF3C7',
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
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: COLORS.text.primary,
  },
  requiredBadge: {
    fontSize: 11,
    fontWeight: '600',
    color: COLORS.danger,
    backgroundColor: '#FEE2E2',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 8,
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
    gap: 12,
  },
  photoCard: {
    width: '47%',
    backgroundColor: COLORS.white,
    borderRadius: 12,
    padding: 12,
    borderWidth: 1,
    borderColor: COLORS.gray200,
    position: 'relative',
  },
  photoIcon: {
    width: '100%',
    height: 80,
    backgroundColor: COLORS.gray50,
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 8,
  },
  photoType: {
    fontSize: 12,
    fontWeight: '600',
    color: COLORS.text.primary,
    textTransform: 'capitalize',
    marginBottom: 4,
  },
  watermarkBadge: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  watermarkText: {
    fontSize: 10,
    color: COLORS.success,
    marginLeft: 4,
  },
  removePhotoBtn: {
    position: 'absolute',
    top: 8,
    right: 8,
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
  assetInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  checkboxLabel: {
    fontSize: 15,
    fontWeight: '500',
    color: COLORS.text.primary,
    marginLeft: 8,
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
    height: 100,
    textAlignVertical: 'top',
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
  warningBox: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FEF3C7',
    padding: 12,
    borderRadius: 8,
    marginTop: 8,
  },
  warningText: {
    fontSize: 13,
    color: COLORS.warning,
    marginLeft: 8,
    flex: 1,
  },
  alertBox: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FEE2E2',
    padding: 12,
    borderRadius: 8,
    marginTop: 8,
  },
  alertText: {
    fontSize: 13,
    color: COLORS.danger,
    marginLeft: 8,
    flex: 1,
  },
  submitSection: {
    marginBottom: 24,
  },
  submitButton: {
    flexDirection: 'row',
    backgroundColor: COLORS.primary,
    padding: 18,
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 12,
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
    maxHeight: '70%',
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
  photoTypesList: {
    padding: 20,
  },
  photoTypeItem: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
    backgroundColor: COLORS.gray50,
    borderRadius: 12,
    marginBottom: 12,
  },
  photoTypeLabel: {
    flex: 1,
    fontSize: 16,
    fontWeight: '500',
    color: COLORS.text.primary,
    marginLeft: 12,
  },
  cameraNote: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
    backgroundColor: '#F0F1FF',
    marginHorizontal: 20,
    marginBottom: 20,
    borderRadius: 8,
  },
  cameraNoteText: {
    fontSize: 12,
    color: COLORS.text.secondary,
    marginLeft: 8,
    flex: 1,
  },
});

export default AddNewScreen;

