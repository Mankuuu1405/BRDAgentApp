import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  SafeAreaView,
  TextInput,
  Alert,
  Modal,
} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';

const RaiseTicketScreen = ({ navigation }) => {
  const [category, setCategory] = useState('');
  const [categoryValue, setCategoryValue] = useState('');
  const [description, setDescription] = useState('');
  const [showCategoryModal, setShowCategoryModal] = useState(false);

  const categories = [
    { label: 'EMI / Payment Issue', value: 'emi_payment' },
    { label: 'Mandate Issue', value: 'mandate' },
    { label: 'Document Issue', value: 'document' },
    { label: 'KYC Issue', value: 'kyc' },
    { label: 'App / Technical Issue', value: 'technical' },
    { label: 'Other', value: 'other' },
  ];

  const handleSubmit = () => {
    if (!categoryValue) {
      Alert.alert('Validation Error', 'Please select an issue category');
      return;
    }

    if (!description.trim()) {
      Alert.alert('Validation Error', 'Please provide issue description');
      return;
    }

    Alert.alert(
      'Success',
      'Your ticket has been raised successfully',
      [
        {
          text: 'OK',
          onPress: () => navigation.goBack(),
        },
      ]
    );
  };

  const selectCategory = (value, label) => {
    setCategoryValue(value);
    setCategory(label);
    setShowCategoryModal(false);
  };

  return (
    <SafeAreaView style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity
          style={styles.backButton}
          onPress={() => navigation.goBack()}
        >
          <Icon name="arrow-back" size={24} color="white" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Raise a Ticket</Text>
        <View style={styles.placeholder} />
      </View>

      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={styles.content}>
          {/* Info Card */}
          <View style={styles.infoCard}>
            <Icon name="information-circle" size={24} color="#5D6AFF" />
            <Text style={styles.infoText}>
              Please provide detailed information about your issue. Our support team will get back to you within 24-48 hours.
            </Text>
          </View>

          {/* Issue Category */}
          <View style={styles.formGroup}>
            <Text style={styles.label}>Issue Category *</Text>
            <TouchableOpacity
              style={styles.dropdown}
              onPress={() => setShowCategoryModal(true)}
            >
              <Text style={[styles.dropdownText, !category && styles.placeholderText]}>
                {category || 'Select Issue Category'}
              </Text>
              <Icon name="chevron-down" size={24} color="#9CA3AF" />
            </TouchableOpacity>
          </View>

          {/* Issue Description */}
          <View style={styles.formGroup}>
            <Text style={styles.label}>Issue Description *</Text>
            <TextInput
              style={styles.textArea}
              placeholder="Please describe your issue in detail..."
              placeholderTextColor="#9CA3AF"
              multiline
              numberOfLines={8}
              textAlignVertical="top"
              value={description}
              onChangeText={setDescription}
            />
            <Text style={styles.characterCount}>
              {description.length} characters
            </Text>
          </View>

          {/* Submit Button */}
          <TouchableOpacity style={styles.submitButton} onPress={handleSubmit}>
            <Text style={styles.submitButtonText}>Submit Ticket</Text>
            <Icon name="checkmark-circle" size={24} color="white" />
          </TouchableOpacity>

          {/* Support Info */}
          <View style={styles.supportCard}>
            <View style={styles.supportHeader}>
              <Icon name="headset-outline" size={20} color="#6B7280" />
              <Text style={styles.supportTitle}>Need Immediate Help?</Text>
            </View>
            <Text style={styles.supportText}>
              For urgent matters, you can contact us directly via phone or WhatsApp from the Help & Support page.
            </Text>
          </View>
        </View>
      </ScrollView>

      {/* Category Selection Modal */}
      <Modal
        visible={showCategoryModal}
        transparent={true}
        animationType="slide"
        onRequestClose={() => setShowCategoryModal(false)}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            <View style={styles.modalHeader}>
              <Text style={styles.modalTitle}>Select Issue Category</Text>
              <TouchableOpacity
                onPress={() => setShowCategoryModal(false)}
                style={styles.closeButton}
              >
                <Icon name="close" size={24} color="#6B7280" />
              </TouchableOpacity>
            </View>
            <ScrollView style={styles.modalList}>
              {categories.map((cat) => (
                <TouchableOpacity
                  key={cat.value}
                  style={styles.categoryOption}
                  onPress={() => selectCategory(cat.value, cat.label)}
                >
                  <Text style={styles.categoryLabel}>{cat.label}</Text>
                  {category === cat.label && (
                    <Icon name="checkmark" size={24} color="#5D6AFF" />
                  )}
                </TouchableOpacity>
              ))}
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
    backgroundColor: '#F5F7FA',
  },
  header: {
    backgroundColor: '#5D6AFF',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    paddingVertical: 16,
    paddingTop: 40,
  },
  backButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: 'white',
  },
  placeholder: {
    width: 40,
  },
  content: {
    padding: 20,
  },
  infoCard: {
    backgroundColor: '#EEF2FF',
    borderRadius: 12,
    padding: 16,
    flexDirection: 'row',
    alignItems: 'flex-start',
    marginBottom: 24,
    gap: 12,
  },
  infoText: {
    flex: 1,
    fontSize: 14,
    color: '#4338CA',
    lineHeight: 20,
  },
  formGroup: {
    marginBottom: 24,
  },
  label: {
    fontSize: 16,
    fontWeight: '600',
    color: '#1F2937',
    marginBottom: 8,
  },
  dropdown: {
    backgroundColor: 'white',
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#E5E7EB',
    padding: 16,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    minHeight: 56,
  },
  dropdownText: {
    fontSize: 15,
    color: '#1F2937',
    flex: 1,
  },
  placeholderText: {
    color: '#9CA3AF',
  },
  textArea: {
    backgroundColor: 'white',
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#E5E7EB',
    padding: 16,
    fontSize: 15,
    color: '#1F2937',
    minHeight: 150,
  },
  characterCount: {
    fontSize: 12,
    color: '#9CA3AF',
    marginTop: 8,
    textAlign: 'right',
  },
  submitButton: {
    backgroundColor: '#5D6AFF',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 16,
    borderRadius: 12,
    gap: 8,
    shadowColor: '#5D6AFF',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 4,
  },
  submitButtonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
  supportCard: {
    backgroundColor: 'white',
    borderRadius: 12,
    padding: 16,
    marginTop: 24,
    borderWidth: 1,
    borderColor: '#E5E7EB',
  },
  supportHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
    gap: 8,
  },
  supportTitle: {
    fontSize: 15,
    fontWeight: '600',
    color: '#374151',
  },
  supportText: {
    fontSize: 14,
    color: '#6B7280',
    lineHeight: 20,
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'flex-end',
  },
  modalContent: {
    backgroundColor: 'white',
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
    borderBottomColor: '#E5E7EB',
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#1F2937',
  },
  closeButton: {
    padding: 4,
  },
  modalList: {
    padding: 8,
  },
  categoryOption: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 16,
    borderRadius: 8,
    marginBottom: 4,
  },
  categoryLabel: {
    fontSize: 16,
    color: '#1F2937',
    flex: 1,
  },
});

export default RaiseTicketScreen;

