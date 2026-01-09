// src/screens/collection/VisitRecording.jsx
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
  Image,
  Modal,
} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import { COLORS } from '../../utils/constants';
import { AudioRecordingCard } from '../../components/collection/CollectionComponents';

const VisitRecording = ({ navigation, route }) => {
  const account = route?.params?.account || {
    id: 'LA-2025-1234',
    customerName: 'Rajesh Kumar',
    address: 'H-102, Dwarka Sector 10, Delhi',
  };

  const [visitData, setVisitData] = useState({
    visitType: 'CUSTOMER_VISIT',
    visitOutcome: '',
    customerMet: true,
    personMet: 'SELF',
    discussionPoints: '',
    nextAction: '',
    followUpDate: '',
  });

  const [capturedPhotos, setCapturedPhotos] = useState([]);
  const [recordings, setRecordings] = useState([]);
  const [isRecording, setIsRecording] = useState(false);
  const [recordingDuration, setRecordingDuration] = useState(0);
  const [showConsentModal, setShowConsentModal] = useState(false);
  const [consentGiven, setConsentGiven] = useState(false);
  const [isWithinRange, setIsWithinRange] = useState(false);
  const [showCameraOptions, setShowCameraOptions] = useState(false);

  const visitTypes = [
    { id: 'CUSTOMER_VISIT', label: 'Customer Visit', icon: 'person' },
    { id: 'RESIDENCE_VISIT', label: 'Residence Visit', icon: 'home' },
    { id: 'OFFICE_VISIT', label: 'Office Visit', icon: 'business' },
  ];

  const visitOutcomes = [
    { id: 'MET_DISCUSSED', label: 'Met & Discussed', icon: 'checkmark-circle', color: COLORS.success },
    { id: 'NOT_AVAILABLE', label: 'Not Available', icon: 'close-circle', color: COLORS.warning },
    { id: 'REFUSED_MEET', label: 'Refused to Meet', icon: 'hand-left', color: COLORS.danger },
    { id: 'ADDRESS_NOT_FOUND', label: 'Address Not Found', icon: 'location-outline', color: COLORS.gray500 },
  ];

  const personMetOptions = [
    { id: 'SELF', label: 'Self (Customer)' },
    { id: 'SPOUSE', label: 'Spouse' },
    { id: 'FAMILY', label: 'Family Member' },
    { id: 'NEIGHBOR', label: 'Neighbor' },
    { id: 'SECURITY', label: 'Security/Watchman' },
    { id: 'OTHER', label: 'Other' },
  ];

  const photoTypes = [
    { id: 'house_exterior', label: 'House/Office Exterior', icon: 'home' },
    { id: 'customer_photo', label: 'Customer Photo', icon: 'person' },
    { id: 'address_proof', label: 'Address Proof', icon: 'document-text' },
    { id: 'meeting_proof', label: 'Meeting Proof', icon: 'camera' },
  ];

  const handleStartRecording = () => {
    if (!consentGiven) {
      setShowConsentModal(true);
      return;
    }
    setIsRecording(true);
    setRecordingDuration(0);
  };

  const handleStopRecording = () => {
    setIsRecording(false);
    const newRecording = {
      id: Date.now(),
      duration: formatDuration(recordingDuration),
      timestamp: new Date().toLocaleString(),
      isUploaded: false,
    };
    setRecordings([...recordings, newRecording]);
    setRecordingDuration(0);
  };

  const handleConsentAccept = () => {
    setConsentGiven(true);
    setShowConsentModal(false);
    handleStartRecording();
  };

  const handleCameraCapture = (photoType) => {
    setShowCameraOptions(false);
    const newPhoto = {
      id: Date.now(),
      type: photoType,
      timestamp: new Date().toISOString(),
      uri: 'https://via.placeholder.com/150',
    };
    setCapturedPhotos([...capturedPhotos, newPhoto]);
  };

  const handleDeletePhoto = (photoId) => {
    Alert.alert('Delete Photo', 'Are you sure you want to delete this photo?', [
      { text: 'Cancel', style: 'cancel' },
      {
        text: 'Delete',
        style: 'destructive',
        onPress: () => {
          setCapturedPhotos(capturedPhotos.filter((photo) => photo.id !== photoId));
        },
      },
    ]);
  };

  const handleDeleteRecording = (recordingId) => {
    Alert.alert('Delete Recording', 'Are you sure you want to delete this recording?', [
      { text: 'Cancel', style: 'cancel' },
      {
        text: 'Delete',
        style: 'destructive',
        onPress: () => {
          setRecordings(recordings.filter((rec) => rec.id !== recordingId));
        },
      },
    ]);
  };

  const formatDuration = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  const handleSubmitVisit = () => {
    if (!visitData.visitOutcome) {
      Alert.alert('Error', 'Please select visit outcome');
      return;
    }

    if (!visitData.discussionPoints.trim()) {
      Alert.alert('Error', 'Please add discussion points or notes');
      return;
    }

    if (!isWithinRange) {
      Alert.alert('Location Error', 'You must be within 100m of the visit location');
      return;
    }

    Alert.alert('Success', 'Visit recorded successfully!', [
      { text: 'OK', onPress: () => navigation.goBack() },
    ]);
  };

  const calculateDistance = () => 75;

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Icon name="arrow-back" size={24} color={COLORS.text.primary} />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Record Visit</Text>
        <View style={{ width: 24 }} />
      </View>

      <ScrollView
        style={styles.content}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}
      >
        {/* Account Info */}
        <View style={styles.accountCard}>
          <Text style={styles.accountId}>{account.id}</Text>
          <Text style={styles.customerName}>{account.customerName}</Text>
          <View style={styles.accountInfo}>
            <Icon name="location-outline" size={14} color={COLORS.text.secondary} />
            <Text style={styles.address}>{account.address}</Text>
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
              {isWithinRange ? 'Within visit range' : `${calculateDistance()}m from location`}
            </Text>
            <Text style={styles.locationSubtext}>
              {isWithinRange ? 'Ready to record' : 'Move within 100m to enable submission'}
            </Text>
          </View>
          <TouchableOpacity style={styles.locationBtn}>
            <Icon name="refresh" size={20} color={COLORS.primary} />
          </TouchableOpacity>
        </View>

        {/* Visit Type */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Visit Type</Text>
          <View style={styles.typeGrid}>
            {visitTypes.map((type) => (
              <TouchableOpacity
                key={type.id}
                style={[
                  styles.typeCard,
                  visitData.visitType === type.id && styles.typeCardActive,
                ]}
                onPress={() => setVisitData({ ...visitData, visitType: type.id })}
              >
                <Icon
                  name={type.icon}
                  size={24}
                  color={visitData.visitType === type.id ? COLORS.primary : COLORS.gray400}
                />
                <Text
                  style={[
                    styles.typeText,
                    visitData.visitType === type.id && styles.typeTextActive,
                  ]}
                >
                  {type.label}
                </Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>

        {/* Visit Outcome */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Visit Outcome *</Text>
          <View style={styles.outcomeGrid}>
            {visitOutcomes.map((outcome) => (
              <TouchableOpacity
                key={outcome.id}
                style={[
                  styles.outcomeCard,
                  visitData.visitOutcome === outcome.id && styles.outcomeCardActive,
                ]}
                onPress={() => setVisitData({ ...visitData, visitOutcome: outcome.id })}
              >
                <View style={[styles.outcomeIcon, { backgroundColor: `${outcome.color}20` }]}>
                  <Icon name={outcome.icon} size={20} color={outcome.color} />
                </View>
                <Text
                  style={[
                    styles.outcomeText,
                    visitData.visitOutcome === outcome.id && styles.outcomeTextActive,
                  ]}
                >
                  {outcome.label}
                </Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>

        {/* Person Met */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Person Met</Text>
          <ScrollView horizontal showsHorizontalScrollIndicator={false}>
            <View style={styles.personRow}>
              {personMetOptions.map((person) => (
                <TouchableOpacity
                  key={person.id}
                  style={[
                    styles.personChip,
                    visitData.personMet === person.id && styles.personChipActive,
                  ]}
                  onPress={() => setVisitData({ ...visitData, personMet: person.id })}
                >
                  <Text
                    style={[
                      styles.personText,
                      visitData.personMet === person.id && styles.personTextActive,
                    ]}
                  >
                    {person.label}
                  </Text>
                </TouchableOpacity>
              ))}
            </View>
          </ScrollView>
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
                  <Image source={{ uri: photo.uri }} style={styles.photoImage} />
                  <Text style={styles.photoType}>
                    {photo.type.replace('_', ' ')}
                  </Text>
                  <TouchableOpacity
                    style={styles.deletePhotoBtn}
                    onPress={() => handleDeletePhoto(photo.id)}
                  >
                    <Icon name="close-circle" size={24} color={COLORS.danger} />
                  </TouchableOpacity>
                </View>
              ))}
            </View>
          )}
        </View>

        {/* Audio Recording */}
        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>Voice Recording</Text>
            {consentGiven && (
              <View style={styles.consentBadge}>
                <Icon name="checkmark-circle" size={14} color={COLORS.success} />
                <Text style={styles.consentText}>Consent Given</Text>
              </View>
            )}
          </View>

          {!isRecording ? (
            <TouchableOpacity style={styles.recordButton} onPress={handleStartRecording}>
              <Icon name="mic" size={32} color={COLORS.white} />
              <Text style={styles.recordButtonText}>Start Recording</Text>
            </TouchableOpacity>
          ) : (
            <View style={styles.recordingCard}>
              <View style={styles.recordingIndicator}>
                <View style={styles.recordingDot} />
                <Text style={styles.recordingText}>Recording...</Text>
              </View>
              <Text style={styles.recordingDuration}>{formatDuration(recordingDuration)}</Text>
              <TouchableOpacity style={styles.stopButton} onPress={handleStopRecording}>
                <Icon name="stop" size={24} color={COLORS.white} />
              </TouchableOpacity>
            </View>
          )}

          {recordings.length > 0 && (
            <View style={styles.recordingsList}>
              {recordings.map((recording) => (
                <AudioRecordingCard
                  key={recording.id}
                  duration={recording.duration}
                  timestamp={recording.timestamp}
                  isUploaded={recording.isUploaded}
                  onPlay={() => Alert.alert('Play', 'Playing audio...')}
                  onDelete={() => handleDeleteRecording(recording.id)}
                />
              ))}
            </View>
          )}
        </View>

        {/* Discussion Points */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Discussion Points & Notes *</Text>
          <TextInput
            style={[styles.input, styles.textArea]}
            placeholder="Enter detailed notes about the visit, discussion points, customer response, etc..."
            placeholderTextColor={COLORS.gray400}
            multiline
            numberOfLines={6}
            value={visitData.discussionPoints}
            onChangeText={(text) =>
              setVisitData({ ...visitData, discussionPoints: text })
            }
          />
        </View>

        {/* Next Action */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Next Action Plan</Text>
          <TextInput
            style={[styles.input, styles.textArea]}
            placeholder="What should be the next course of action?"
            placeholderTextColor={COLORS.gray400}
            multiline
            numberOfLines={4}
            value={visitData.nextAction}
            onChangeText={(text) =>
              setVisitData({ ...visitData, nextAction: text })
            }
          />
        </View>

        {/* Submit Button */}
        <TouchableOpacity
          style={[styles.submitButton, !isWithinRange && styles.submitButtonDisabled]}
          onPress={handleSubmitVisit}
          disabled={!isWithinRange}
          activeOpacity={0.7}
        >
          <Icon name="save" size={20} color={COLORS.white} />
          <Text style={styles.submitButtonText}>
            {isWithinRange ? 'Submit Visit Record' : 'Move Closer to Submit'}
          </Text>
        </TouchableOpacity>
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
          </View>
        </View>
      </Modal>

      {/* Consent Modal */}
      <Modal
        visible={showConsentModal}
        transparent={true}
        animationType="fade"
        onRequestClose={() => setShowConsentModal(false)}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.consentModal}>
            <Icon name="mic" size={48} color={COLORS.primary} />
            <Text style={styles.consentTitle}>Recording Consent Required</Text>
            <Text style={styles.consentModalText}>
              Before recording, please ensure you have informed the customer/person that this
              conversation will be recorded for audit purposes.
            </Text>
            <Text style={styles.consentQuestion}>
              Have you informed them and received their consent?
            </Text>

            <View style={styles.consentButtons}>
              <TouchableOpacity
                style={styles.consentBtnCancel}
                onPress={() => setShowConsentModal(false)}
              >
                <Text style={styles.consentBtnCancelText}>Cancel</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.consentBtnAccept}
                onPress={handleConsentAccept}
              >
                <Text style={styles.consentBtnAcceptText}>Yes, Start Recording</Text>
              </TouchableOpacity>
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
  accountId: {
    fontSize: 12,
    fontWeight: '600',
    color: COLORS.text.secondary,
    marginBottom: 6,
  },
  customerName: {
    fontSize: 20,
    fontWeight: 'bold',
    color: COLORS.text.primary,
    marginBottom: 8,
  },
  accountInfo: {
    flexDirection: 'row',
    alignItems: 'flex-start',
  },
  address: {
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
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: COLORS.text.primary,
    marginBottom: 12,
  },
  requiredBadge: {
    fontSize: 11,
    fontWeight: '600',
    color: COLORS.danger,
    backgroundColor: COLORS.dangerLight,
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 8,
  },
  typeGrid: {
    flexDirection: 'row',
    gap: 12,
  },
  typeCard: {
    flex: 1,
    backgroundColor: COLORS.white,
    borderRadius: 12,
    padding: 16,
    alignItems: 'center',
    borderWidth: 2,
    borderColor: COLORS.gray200,
  },
  typeCardActive: {
    borderColor: COLORS.primary,
    backgroundColor: '#F0F1FF',
  },
  typeText: {
    fontSize: 12,
    color: COLORS.text.secondary,
    marginTop: 8,
    textAlign: 'center',
    fontWeight: '600',
  },
  typeTextActive: {
    color: COLORS.primary,
  },
  outcomeGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 12,
  },
  outcomeCard: {
    width: '47%',
    backgroundColor: COLORS.white,
    borderRadius: 12,
    padding: 12,
    borderWidth: 2,
    borderColor: COLORS.gray200,
    flexDirection: 'row',
    alignItems: 'center',
  },
  outcomeCardActive: {
    borderColor: COLORS.primary,
    backgroundColor: '#F0F1FF',
  },
  outcomeIcon: {
    width: 36,
    height: 36,
    borderRadius: 18,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 10,
  },
  outcomeText: {
    fontSize: 11,
    color: COLORS.text.secondary,
    fontWeight: '600',
    flex: 1,
  },
  outcomeTextActive: {
    color: COLORS.primary,
  },
  personRow: {
    flexDirection: 'row',
    gap: 8,
  },
  personChip: {
    backgroundColor: COLORS.white,
    paddingHorizontal: 16,
    paddingVertical: 10,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: COLORS.gray200,
  },
  personChipActive: {
    backgroundColor: COLORS.primary,
    borderColor: COLORS.primary,
  },
  personText: {
    fontSize: 14,
    fontWeight: '600',
    color: COLORS.text.secondary,
  },
  personTextActive: {
    color: COLORS.white,
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
  photoImage: {
    width: '100%',
    height: 100,
    borderRadius: 8,
    marginBottom: 8,
  },
  photoType: {
    fontSize: 12,
    fontWeight: '600',
    color: COLORS.text.primary,
    textTransform: 'capitalize',
  },
  deletePhotoBtn: {
    position: 'absolute',
    top: 8,
    right: 8,
  },
  recordButton: {
    backgroundColor: COLORS.danger,
    borderRadius: 16,
    padding: 20,
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
  },
  recordButtonText: {
    color: COLORS.white,
    fontSize: 16,
    fontWeight: 'bold',
    marginLeft: 12,
  },
  recordingCard: {
    backgroundColor: COLORS.white,
    borderRadius: 16,
    padding: 20,
    alignItems: 'center',
    borderWidth: 2,
    borderColor: COLORS.danger,
  },
  recordingIndicator: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },
  recordingDot: {
    width: 12,
    height: 12,
    borderRadius: 6,
    backgroundColor: COLORS.danger,
    marginRight: 8,
  },
  recordingText: {
    fontSize: 16,
    fontWeight: '600',
    color: COLORS.danger,
  },
  recordingDuration: {
    fontSize: 32,
    fontWeight: 'bold',
    color: COLORS.text.primary,
    marginBottom: 16,
  },
  stopButton: {
    backgroundColor: COLORS.danger,
    width: 56,
    height: 56,
    borderRadius: 28,
    justifyContent: 'center',
    alignItems: 'center',
  },
  recordingsList: {
    marginTop: 16,
  },
  consentBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: COLORS.successLight,
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 12,
  },
  consentText: {
    fontSize: 11,
    fontWeight: '600',
    color: COLORS.success,
    marginLeft: 4,
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
    height: 120,
    textAlignVertical: 'top',
  },
  submitButton: {
    flexDirection: 'row',
    backgroundColor: COLORS.primary,
    padding: 18,
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 24,
  },
  submitButtonDisabled: {
    backgroundColor: COLORS.gray400,
  },
  submitButtonText: {
    color: COLORS.white,
    fontSize: 16,
    fontWeight: 'bold',
    marginLeft: 8,
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
  consentModal: {
    backgroundColor: COLORS.white,
    borderRadius: 20,
    padding: 24,
    alignItems: 'center',
    width: '90%',
    maxWidth: 400,
  },
  consentTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: COLORS.text.primary,
    marginTop: 16,
    marginBottom: 12,
    textAlign: 'center',
  },
  consentconsentModalText: {
    fontSize: 14,
    color: COLORS.text.secondary,
    textAlign: 'center',
    lineHeight: 20,
    marginBottom: 12,
  },
  consentQuestion: {
    fontSize: 15,
    fontWeight: '600',
    color: COLORS.text.primary,
    textAlign: 'center',
    marginBottom: 20,
  },
  consentButtons: {
    flexDirection: 'row',
    width: '100%',
    gap: 12,
  },
  consentBtnCancel: {
    flex: 1,
    paddingVertical: 14,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: COLORS.gray300,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: COLORS.white,
  },
  consentBtnCancelText: {
    fontSize: 14,
    fontWeight: '600',
    color: COLORS.text.secondary,
  },
  consentBtnAccept: {
    flex: 1,
    paddingVertical: 14,
    borderRadius: 12,
    backgroundColor: COLORS.primary,
    alignItems: 'center',
    justifyContent: 'center',
  },
  consentBtnAcceptText: {
    fontSize: 14,
    fontWeight: '600',
    color: COLORS.white,
  },
});


export default VisitRecording;