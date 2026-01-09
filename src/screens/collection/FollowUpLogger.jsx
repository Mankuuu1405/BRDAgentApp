// src/screens/collection/FollowUpLogger.jsx
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
  Platform,
} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import { COLORS } from '../../utils/constants';
import { DispositionBadge, CallLogEntry, AudioRecordingCard } from '../../components/collection/CollectionComponents';

const FollowUpLogger = ({ navigation, route }) => {

  // 1. EXTRACT DATA FROM NAVIGATION PARAMS
  const passedAccount = route?.params?.account;

  // 2. INITIALIZE STATE WITH PASSED DATA OR DEFAULTS
  const [accountData] = useState({
    id: passedAccount?.id || 'LA-2025-1234',
    customerName: passedAccount?.customerName || 'Rajesh Kumar',
    phoneNumber: passedAccount?.phoneNumber || '+91 9876543210',
    overdueAmount: passedAccount?.overdueAmount || passedAccount?.amount || '₹36,000',
  });



  // const accountData = route?.params?.account || {
  //   id: 'LA-2025-1234',
  //   customerName: 'Rajesh Kumar',
  //   phoneNumber: '+91 9876543210',
  //   overdueAmount: '₹36,000',
  // };

  // Automatically set type to PTP if we came from a PTP card
  const [followUpType, setFollowUpType] = useState(passedAccount ? 'PTP' : 'CALL'); 
  const [disposition, setDisposition] = useState(passedAccount ? 'PTP' : '');

  // const [followUpType, setFollowUpType] = useState('CALL'); // CALL, FIELD_VISIT, PTP
  // const [disposition, setDisposition] = useState('');
  const [contactPerson, setContactPerson] = useState('SELF');
  const [callDuration, setCallDuration] = useState('');
  const [ptpDate, setPtpDate] = useState('');
  const [ptpAmount, setPtpAmount] = useState(passedAccount?.amount?.replace(/[^0-9]/g, '') || ''); // Pre-fill amount if available
  // const [ptpDate, setPtpDate] = useState('');
  // const [ptpAmount, setPtpAmount] = useState('');
  const [notes, setNotes] = useState('');
  const [isRecording, setIsRecording] = useState(false);
  const [recordingDuration, setRecordingDuration] = useState(0);
  const [recordings, setRecordings] = useState([]);
  const [showConsentModal, setShowConsentModal] = useState(false);
  const [consentGiven, setConsentGiven] = useState(false);
  



  const [callHistory] = useState([
    {
      id: 1,
      disposition: 'RTP',
      datetime: 'Today, 10:30 AM',
      duration: '5 min 23 sec',
      notes: 'Customer promised to pay by tomorrow',
    },
    {
      id: 2,
      disposition: 'WPC',
      datetime: 'Yesterday, 3:45 PM',
      duration: '2 min 10 sec',
      notes: 'Wrong number, customer number changed',
    },
    {
      id: 3,
      disposition: 'PTP',
      datetime: '05 Jan, 11:00 AM',
      duration: '8 min 45 sec',
      notes: 'PTP for ₹15,000 by 10th Jan',
    },
  ]);

  const followUpTypes = [
    { id: 'CALL', label: 'Phone Call', icon: 'call' },
    { id: 'FIELD_VISIT', label: 'Field Visit', icon: 'walk' },
    { id: 'PTP', label: 'Promise to Pay', icon: 'calendar' },
  ];

  const dispositions = [
    { id: 'RTP', label: 'Right Party Contact', icon: 'person', color: COLORS.success },
    { id: 'WPC', label: 'Wrong Party Contact', icon: 'person-remove', color: COLORS.warning },
    { id: 'NC', label: 'No Contact', icon: 'close-circle', color: COLORS.gray500 },
    { id: 'SWO', label: 'Switched Off', icon: 'power', color: COLORS.danger },
    { id: 'CBL', label: 'Call Back Later', icon: 'time', color: COLORS.info },
    { id: 'PTP', label: 'Promise to Pay', icon: 'checkmark-circle', color: COLORS.primary },
  ];

  const contactPersons = [
    { id: 'SELF', label: 'Self' },
    { id: 'SPOUSE', label: 'Spouse' },
    { id: 'FAMILY', label: 'Family Member' },
    { id: 'COLLEAGUE', label: 'Colleague' },
    { id: 'OTHER', label: 'Other' },
  ];

  const handleStartRecording = () => {
    if (!consentGiven) {
      setShowConsentModal(true);
      return;
    }
    
    setIsRecording(true);
    setRecordingDuration(0);
    
    // Simulate recording timer
    const timer = setInterval(() => {
      setRecordingDuration(prev => prev + 1);
    }, 1000);
    
    // Store timer to clear later
    setTimeout(() => {
      if (isRecording) {
        handleStopRecording();
      }
    }, 300000); // Auto-stop after 5 minutes
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
    
    // Simulate upload
    setTimeout(() => {
      setRecordings(prev => prev.map(rec => 
        rec.id === newRecording.id ? { ...rec, isUploaded: true } : rec
      ));
    }, 2000);
  };

  const handleConsentAccept = () => {
    setConsentGiven(true);
    setShowConsentModal(false);
    handleStartRecording();
  };

  const handleDeleteRecording = (recordingId) => {
    Alert.alert(
      'Delete Recording',
      'Are you sure you want to delete this recording?',
      [
        { text: 'Cancel', style: 'cancel' },
        {
          text: 'Delete',
          style: 'destructive',
          onPress: () => {
            setRecordings(recordings.filter(rec => rec.id !== recordingId));
          },
        },
      ]
    );
  };

  const formatDuration = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  const validateFollowUp = () => {
    if (!disposition) {
      Alert.alert('Error', 'Please select a disposition');
      return false;
    }

    if (followUpType === 'PTP' && (!ptpDate || !ptpAmount)) {
      Alert.alert('Error', 'Please enter PTP date and amount');
      return false;
    }

    if (!notes.trim()) {
      Alert.alert('Error', 'Please add notes about this interaction');
      return false;
    }

    return true;
  };

  const handleSubmitFollowUp = () => {
    if (validateFollowUp()) {
      Alert.alert(
        'Success',
        'Follow-up logged successfully!',
        [
          {
            text: 'OK',
            onPress: () => {
              // Reset form
              setDisposition('');
              setNotes('');
              setPtpAmount('');
              setPtpDate('');
              setRecordings([]);
              navigation.goBack();
            },
          },
        ]
      );
    }
  };

  const renderFollowUpTypeSelector = () => (
    <View style={styles.section}>
      <Text style={styles.sectionTitle}>Follow-Up Type</Text>
      <View style={styles.typeGrid}>
        {followUpTypes.map((type) => (
          <TouchableOpacity
            key={type.id}
            style={[
              styles.typeCard,
              followUpType === type.id && styles.typeCardActive,
            ]}
            onPress={() => setFollowUpType(type.id)}
          >
            <Icon
              name={type.icon}
              size={24}
              color={followUpType === type.id ? COLORS.primary : COLORS.gray400}
            />
            <Text
              style={[
                styles.typeText,
                followUpType === type.id && styles.typeTextActive,
              ]}
            >
              {type.label}
            </Text>
          </TouchableOpacity>
        ))}
      </View>
    </View>
  );

  const renderDispositionSelector = () => (
    <View style={styles.section}>
      <Text style={styles.sectionTitle}>Disposition *</Text>
      <View style={styles.dispositionGrid}>
        {dispositions.map((disp) => (
          <TouchableOpacity
            key={disp.id}
            style={[
              styles.dispositionCard,
              disposition === disp.id && styles.dispositionCardActive,
            ]}
            onPress={() => setDisposition(disp.id)}
          >
            <View style={[styles.dispositionIcon, { backgroundColor: `${disp.color}20` }]}>
              <Icon name={disp.icon} size={20} color={disp.color} />
            </View>
            <Text
              style={[
                styles.dispositionText,
                disposition === disp.id && styles.dispositionTextActive,
              ]}
            >
              {disp.label}
            </Text>
          </TouchableOpacity>
        ))}
      </View>
    </View>
  );

  const renderContactPersonSelector = () => (
    <View style={styles.section}>
      <Text style={styles.sectionTitle}>Contact Person</Text>
      <ScrollView horizontal showsHorizontalScrollIndicator={false}>
        <View style={styles.contactPersonRow}>
          {contactPersons.map((person) => (
            <TouchableOpacity
              key={person.id}
              style={[
                styles.contactPersonChip,
                contactPerson === person.id && styles.contactPersonChipActive,
              ]}
              onPress={() => setContactPerson(person.id)}
            >
              <Text
                style={[
                  styles.contactPersonText,
                  contactPerson === person.id && styles.contactPersonTextActive,
                ]}
              >
                {person.label}
              </Text>
            </TouchableOpacity>
          ))}
        </View>
      </ScrollView>
    </View>
  );

  const renderAudioRecording = () => (
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
        <TouchableOpacity
          style={styles.recordButton}
          onPress={handleStartRecording}
        >
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
          <TouchableOpacity
            style={styles.stopButton}
            onPress={handleStopRecording}
          >
            <Icon name="stop" size={24} color={COLORS.white} />
          </TouchableOpacity>
        </View>
      )}

      {recordings.length > 0 && (
        <View style={styles.recordingsList}>
          <Text style={styles.recordingsTitle}>Recorded Audio ({recordings.length})</Text>
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

      <View style={styles.audioNote}>
        <Icon name="information-circle" size={16} color={COLORS.info} />
        <Text style={styles.audioNoteText}>
          Recordings are consent-based and uploaded securely for audit purposes
        </Text>
      </View>
    </View>
  );

  const renderPTPFields = () => {
    if (followUpType !== 'PTP' && disposition !== 'PTP') return null;

    return (
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Promise to Pay Details</Text>
        
        <View style={styles.inputGroup}>
          <Text style={styles.label}>PTP Date *</Text>
          <TouchableOpacity style={styles.dateInput}>
            <Icon name="calendar" size={20} color={COLORS.gray400} />
            <TextInput
              style={styles.dateInputText}
              placeholder="Select date"
              placeholderTextColor={COLORS.gray400}
              value={ptpDate}
              onChangeText={setPtpDate}
            />
          </TouchableOpacity>
        </View>

        <View style={styles.inputGroup}>
          <Text style={styles.label}>PTP Amount *</Text>
          <View style={styles.amountInput}>
            <Text style={styles.currencySymbol}>₹</Text>
            <TextInput
              style={styles.amountInputText}
              placeholder="0"
              placeholderTextColor={COLORS.gray400}
              value={ptpAmount}
              onChangeText={setPtpAmount}
              keyboardType="numeric"
            />
          </View>
        </View>
      </View>
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Icon name="arrow-back" size={24} color={COLORS.text.primary} />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Log Follow-Up</Text>
        <View style={{ width: 24 }} />
      </View>

      <ScrollView
        style={styles.content}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}
      >
        {/* Account Info */}
        <View style={styles.accountCard}>
          <Text style={styles.accountId}>{accountData.id}</Text>
          <Text style={styles.customerName}>{accountData.customerName}</Text>
          <View style={styles.accountInfo}>
            <Icon name="call-outline" size={14} color={COLORS.text.secondary} />
            <Text style={styles.phoneNumber}>{accountData.phoneNumber}</Text>
          </View>
          <Text style={styles.overdueAmount}>
            Overdue: {accountData.overdueAmount}
          </Text>
        </View>

        {renderFollowUpTypeSelector()}
        {renderDispositionSelector()}
        {renderContactPersonSelector()}

        {/* Call Duration (for calls only) */}
        {followUpType === 'CALL' && (
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Call Duration</Text>
            <TextInput
              style={styles.input}
              placeholder="e.g., 5 min 30 sec"
              placeholderTextColor={COLORS.gray400}
              value={callDuration}
              onChangeText={setCallDuration}
            />
          </View>
        )}

        {renderPTPFields()}
        {renderAudioRecording()}

        {/* Notes */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Notes *</Text>
          <TextInput
            style={[styles.input, styles.textArea]}
            placeholder="Add detailed notes about this interaction..."
            placeholderTextColor={COLORS.gray400}
            multiline
            numberOfLines={6}
            value={notes}
            onChangeText={setNotes}
          />
        </View>

        {/* Submit Button */}
        <TouchableOpacity
          style={styles.submitButton}
          onPress={handleSubmitFollowUp}
          activeOpacity={0.7}
        >
          <Icon name="save" size={20} color={COLORS.white} />
          <Text style={styles.submitButtonText}>Log Follow-Up</Text>
        </TouchableOpacity>

        {/* Call History */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Recent Call History</Text>
          {callHistory.map((call) => (
            <CallLogEntry
              key={call.id}
              disposition={call.disposition}
              datetime={call.datetime}
              duration={call.duration}
              notes={call.notes}
            />
          ))}
        </View>
      </ScrollView>

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
            <Text style={styles.consentText}>
              Before recording, please ensure you have informed the customer that this call
              will be recorded for quality and audit purposes.
            </Text>
            <Text style={styles.consentQuestion}>
              Have you informed the customer and received their consent?
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
    marginBottom: 20,
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
    alignItems: 'center',
    marginBottom: 8,
  },
  phoneNumber: {
    fontSize: 14,
    color: COLORS.text.secondary,
    marginLeft: 4,
  },
  overdueAmount: {
    fontSize: 16,
    fontWeight: '600',
    color: COLORS.danger,
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
    fontSize: 13,
    color: COLORS.text.secondary,
    marginTop: 8,
    textAlign: 'center',
    fontWeight: '600',
  },
  typeTextActive: {
    color: COLORS.primary,
  },
  dispositionGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 12,
  },
  dispositionCard: {
    width: '47%',
    backgroundColor: COLORS.white,
    borderRadius: 12,
    padding: 12,
    borderWidth: 2,
    borderColor: COLORS.gray200,
    flexDirection: 'row',
    alignItems: 'center',
  },
  dispositionCardActive: {
    borderColor: COLORS.primary,
    backgroundColor: '#F0F1FF',
  },
  dispositionIcon: {
    width: 36,
    height: 36,
    borderRadius: 18,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 10,
  },
  dispositionText: {
    fontSize: 12,
    color: COLORS.text.secondary,
    fontWeight: '600',
    flex: 1,
  },
  dispositionTextActive: {
    color: COLORS.primary,
  },
  contactPersonRow: {
    flexDirection: 'row',
    gap: 8,
  },
  contactPersonChip: {
    backgroundColor: COLORS.white,
    paddingHorizontal: 16,
    paddingVertical: 10,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: COLORS.gray200,
  },
  contactPersonChipActive: {
    backgroundColor: COLORS.primary,
    borderColor: COLORS.primary,
  },
  contactPersonText: {
    fontSize: 14,
    fontWeight: '600',
    color: COLORS.text.secondary,
  },
  contactPersonTextActive: {
    color: COLORS.white,
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
  recordingsTitle: {
    fontSize: 14,
    fontWeight: '600',
    color: COLORS.text.primary,
    marginBottom: 12,
  },
  audioNote: {
    flexDirection: 'row',
    backgroundColor: COLORS.infoLight,
    padding: 12,
    borderRadius: 8,
    marginTop: 12,
  },
  audioNoteText: {
    flex: 1,
    fontSize: 12,
    color: COLORS.text.secondary,
    marginLeft: 8,
    lineHeight: 18,
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
  inputGroup: {
    marginBottom: 16,
  },
  label: {
    fontSize: 14,
    fontWeight: '600',
    color: COLORS.text.primary,
    marginBottom: 8,
  },
  dateInput: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: COLORS.white,
    borderRadius: 12,
    paddingHorizontal: 16,
    paddingVertical: 14,
    borderWidth: 1,
    borderColor: COLORS.gray200,
  },
  dateInputText: {
    flex: 1,
    fontSize: 16,
    color: COLORS.text.primary,
    marginLeft: 12,
  },
  amountInput: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: COLORS.white,
    borderRadius: 12,
    paddingHorizontal: 16,
    paddingVertical: 14,
    borderWidth: 1,
    borderColor: COLORS.gray200,
  },
  currencySymbol: {
    fontSize: 20,
    fontWeight: 'bold',
    color: COLORS.text.secondary,
    marginRight: 8,
  },
  amountInputText: {
    flex: 1,
    fontSize: 20,
    fontWeight: 'bold',
    color: COLORS.text.primary,
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
  submitButtonText: {
    color: COLORS.white,
    fontSize: 16,
    fontWeight: 'bold',
    marginLeft: 8,
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.5)',
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 20,
  },
  consentModal: {
    backgroundColor: COLORS.white,
    borderRadius: 20,
    padding: 24,
    alignItems: 'center',
    width: '100%',
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
  consentText: {
    fontSize: 14,
    color: COLORS.text.secondary,
    textAlign: 'center',
    lineHeight: 20,
    marginBottom: 16,
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
    gap: 12,
    width: '100%',
  },
  consentBtnCancel: {
    flex: 1,
    backgroundColor: COLORS.gray50,
    padding: 14,
    borderRadius: 12,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: COLORS.gray200,
  },
  consentBtnCancelText: {
    fontSize: 15,
    fontWeight: '600',
    color: COLORS.text.primary,
  },
  consentBtnAccept: {
    flex: 1,
    backgroundColor: COLORS.primary,
    padding: 14,
    borderRadius: 12,
    alignItems: 'center',
  },
  consentBtnAcceptText: {
    fontSize: 15,
    fontWeight: '600',
    color: COLORS.white,
  },
});

export default FollowUpLogger;