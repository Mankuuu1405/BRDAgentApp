// src/screens/collection/YardEntry.jsx
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

const YardEntry = ({ navigation, route }) => {
  const vehicle = route?.params?.vehicle || {
    vehicleNumber: 'DL-3CAB-1234',
    vehicleModel: 'Maruti Swift VXI',
    customerName: 'Rajesh Kumar',
    loanId: 'LA-2025-1234',
  };

  const [yardData, setYardData] = useState({
    vehicleNumber: vehicle.vehicleNumber,
    odometerReading: '',
    fuelLevel: 'Half',
    vehicleCondition: 'Good',
    exteriorCondition: '',
    interiorCondition: '',
    tyresCondition: 'Good',
    damages: '',
    accessories: {
      spareTyre: true,
      jack: true,
      toolkit: false,
      floorMats: true,
      musicSystem: true,
    },
    documents: {
      rc: false,
      insurance: false,
      pollution: false,
      serviceBook: false,
    },
    additionalNotes: '',
  });

  const [capturedPhotos, setCapturedPhotos] = useState([]);
  const [showCameraOptions, setShowCameraOptions] = useState(false);

  const fuelLevels = ['Empty', 'Quarter', 'Half', 'Three Quarter', 'Full'];
  const conditionOptions = ['Excellent', 'Good', 'Fair', 'Poor'];

  const photoTypes = [
    { id: 'front', label: 'Front View', icon: 'car-sport' },
    { id: 'back', label: 'Back View', icon: 'car-sport' },
    { id: 'left', label: 'Left Side', icon: 'car-sport' },
    { id: 'right', label: 'Right Side', icon: 'car-sport' },
    { id: 'dashboard', label: 'Dashboard/Odometer', icon: 'speedometer' },
    { id: 'interior', label: 'Interior', icon: 'body' },
    { id: 'damages', label: 'Damages', icon: 'warning' },
    { id: 'documents', label: 'Documents', icon: 'document-text' },
  ];

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

  const handleSubmitYardEntry = () => {
    if (!yardData.odometerReading) {
      Alert.alert('Error', 'Please enter odometer reading');
      return;
    }

    if (capturedPhotos.length < 4) {
      Alert.alert('Error', 'Please capture at least 4 photos (all angles)');
      return;
    }

    Alert.alert(
      'Success',
      'Yard entry completed successfully!\nVehicle has been logged into the yard.',
      [
        {
          text: 'OK',
          onPress: () => navigation.navigate('RecoveryHub'),
        },
      ]
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Icon name="arrow-back" size={24} color={COLORS.text.primary} />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Yard Entry Form</Text>
        <View style={{ width: 24 }} />
      </View>

      <ScrollView
        style={styles.content}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}
      >
        {/* Vehicle Info */}
        <View style={styles.vehicleCard}>
          <View style={styles.vehicleHeader}>
            <Icon name="car-sport" size={24} color={COLORS.primary} />
            <View style={styles.vehicleInfo}>
              <Text style={styles.vehicleNumber}>{vehicle.vehicleNumber}</Text>
              <Text style={styles.vehicleModel}>{vehicle.vehicleModel}</Text>
            </View>
          </View>
          <View style={styles.vehicleDetails}>
            <Text style={styles.vehicleDetailText}>
              Customer: {vehicle.customerName}
            </Text>
            <Text style={styles.vehicleDetailText}>Loan ID: {vehicle.loanId}</Text>
          </View>
        </View>

        {/* Odometer Reading */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Odometer Reading *</Text>
          <View style={styles.inputRow}>
            <Icon name="speedometer" size={20} color={COLORS.text.secondary} />
            <TextInput
              style={styles.input}
              placeholder="Enter reading in KM"
              placeholderTextColor={COLORS.gray400}
              keyboardType="numeric"
              value={yardData.odometerReading}
              onChangeText={(text) =>
                setYardData({ ...yardData, odometerReading: text })
              }
            />
            <Text style={styles.unitText}>KM</Text>
          </View>
        </View>

        {/* Fuel Level */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Fuel Level</Text>
          <View style={styles.optionsGrid}>
            {fuelLevels.map((level) => (
              <TouchableOpacity
                key={level}
                style={[
                  styles.optionChip,
                  yardData.fuelLevel === level && styles.optionChipActive,
                ]}
                onPress={() => setYardData({ ...yardData, fuelLevel: level })}
              >
                <Text
                  style={[
                    styles.optionText,
                    yardData.fuelLevel === level && styles.optionTextActive,
                  ]}
                >
                  {level}
                </Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>

        {/* Overall Vehicle Condition */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Overall Vehicle Condition</Text>
          <View style={styles.optionsGrid}>
            {conditionOptions.map((condition) => (
              <TouchableOpacity
                key={condition}
                style={[
                  styles.optionChip,
                  yardData.vehicleCondition === condition && styles.optionChipActive,
                ]}
                onPress={() =>
                  setYardData({ ...yardData, vehicleCondition: condition })
                }
              >
                <Text
                  style={[
                    styles.optionText,
                    yardData.vehicleCondition === condition && styles.optionTextActive,
                  ]}
                >
                  {condition}
                </Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>

        {/* Tyres Condition */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Tyres Condition</Text>
          <View style={styles.optionsGrid}>
            {conditionOptions.map((condition) => (
              <TouchableOpacity
                key={condition}
                style={[
                  styles.optionChip,
                  yardData.tyresCondition === condition && styles.optionChipActive,
                ]}
                onPress={() =>
                  setYardData({ ...yardData, tyresCondition: condition })
                }
              >
                <Text
                  style={[
                    styles.optionText,
                    yardData.tyresCondition === condition && styles.optionTextActive,
                  ]}
                >
                  {condition}
                </Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>

        {/* Accessories Inventory */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Accessories Inventory</Text>
          {Object.keys(yardData.accessories).map((key) => (
            <View key={key} style={styles.checkboxRow}>
              <TouchableOpacity
                style={styles.checkbox}
                onPress={() =>
                  setYardData({
                    ...yardData,
                    accessories: {
                      ...yardData.accessories,
                      [key]: !yardData.accessories[key],
                    },
                  })
                }
              >
                {yardData.accessories[key] && (
                  <Icon name="checkmark-sharp" size={22} color={COLORS.primary} />
                )}
              </TouchableOpacity>
              <Text style={styles.checkboxLabel}>
                {key.replace(/([A-Z])/g, ' $1').replace(/^./, (str) => str.toUpperCase())}
              </Text>
            </View>
          ))}
        </View>

        {/* Documents Available */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Documents Available</Text>
          {Object.keys(yardData.documents).map((key) => (
            <View key={key} style={styles.checkboxRow}>
              <TouchableOpacity
                style={styles.checkbox}
                onPress={() =>
                  setYardData({
                    ...yardData,
                    documents: {
                      ...yardData.documents,
                      [key]: !yardData.documents[key],
                    },
                  })
                }
              >
                {yardData.documents[key] && (
                  <Icon name="checkmark-sharp" size={22} color={COLORS.primary} />
                )}
              </TouchableOpacity>
              <Text style={styles.checkboxLabel}>
                {key.toUpperCase().replace(/([A-Z])/g, ' $1').trim()}
              </Text>
            </View>
          ))}
        </View>

        {/* Damages */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Damages (if any)</Text>
          <TextInput
            style={[styles.textArea]}
            placeholder="Describe any scratches, dents, or damages..."
            placeholderTextColor={COLORS.gray400}
            multiline
            numberOfLines={4}
            value={yardData.damages}
            onChangeText={(text) => setYardData({ ...yardData, damages: text })}
          />
        </View>

        {/* Photo Documentation */}
        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>Photo Documentation *</Text>
            <Text style={styles.requiredBadge}>Min 4 photos</Text>
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
                  <Text style={styles.photoType}>{photo.type.replace('_', ' ')}</Text>
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

        {/* Additional Notes */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Additional Notes</Text>
          <TextInput
            style={[styles.textArea]}
            placeholder="Any other relevant information..."
            placeholderTextColor={COLORS.gray400}
            multiline
            numberOfLines={4}
            value={yardData.additionalNotes}
            onChangeText={(text) =>
              setYardData({ ...yardData, additionalNotes: text })
            }
          />
        </View>

        {/* Info Box */}
        <View style={styles.infoBox}>
          <Icon name="information-circle" size={20} color={COLORS.info} />
          <Text style={styles.infoText}>
            Ensure all details are accurate. This entry will be used for asset
            verification and auction purposes.
          </Text>
        </View>

        {/* Submit Button */}
        <TouchableOpacity
          style={styles.submitButton}
          onPress={handleSubmitYardEntry}
          activeOpacity={0.7}
        >
          <Icon name="checkmark-circle" size={20} color={COLORS.white} />
          <Text style={styles.submitButtonText}>Complete Yard Entry</Text>
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
  vehicleCard: {
    backgroundColor: COLORS.white,
    borderRadius: 16,
    padding: 16,
    marginBottom: 20,
    borderLeftWidth: 4,
    borderLeftColor: COLORS.primary,
  },
  vehicleHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },
  vehicleInfo: {
    flex: 1,
    marginLeft: 12,
  },
  vehicleNumber: {
    fontSize: 18,
    fontWeight: 'bold',
    color: COLORS.text.primary,
  },
  vehicleModel: {
    fontSize: 14,
    color: COLORS.text.secondary,
    marginTop: 2,
  },
  vehicleDetails: {
    paddingTop: 12,
    borderTopWidth: 1,
    borderTopColor: COLORS.gray200,
  },
  vehicleDetailText: {
    fontSize: 14,
    color: COLORS.text.secondary,
    marginBottom: 4,
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
  inputRow: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: COLORS.white,
    borderRadius: 12,
    paddingHorizontal: 16,
    paddingVertical: 4,
    borderWidth: 1,
    borderColor: COLORS.gray200,
  },
  input: {
    flex: 1,
    fontSize: 16,
    color: COLORS.text.primary,
    paddingVertical: 12,
    marginLeft: 12,
  },
  unitText: {
    fontSize: 14,
    fontWeight: '600',
    color: COLORS.text.secondary,
  },
  optionsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
  },
  optionChip: {
    paddingHorizontal: 16,
    paddingVertical: 10,
    borderRadius: 20,
    backgroundColor: COLORS.white,
    borderWidth: 1,
    borderColor: COLORS.gray200,
  },
  optionChipActive: {
    backgroundColor: COLORS.primary,
    borderColor: COLORS.primary,
  },
  optionText: {
    fontSize: 14,
    fontWeight: '600',
    color: COLORS.text.secondary,
  },
  optionTextActive: {
    color: COLORS.white,
  },
  checkboxRow: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: COLORS.white,
    padding: 16,
    borderRadius: 12,
    marginBottom: 12,
    borderWidth: 1,
    borderColor: COLORS.gray200,
  },
  checkbox: {
    width: 24,
    height: 24,
    borderRadius: 6,
    borderWidth: 2,
    borderColor: COLORS.primary,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: COLORS.white,
    marginRight: 12,
  },
  checkboxLabel: {
    fontSize: 15,
    fontWeight: '500',
    color: COLORS.text.primary,
  },
  textArea: {
    backgroundColor: COLORS.white,
    borderWidth: 1,
    borderColor: COLORS.gray200,
    borderRadius: 12,
    paddingHorizontal: 16,
    paddingVertical: 14,
    fontSize: 16,
    color: COLORS.text.primary,
    textAlignVertical: 'top',
    minHeight: 100,
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
  infoBox: {
    flexDirection: 'row',
    backgroundColor: COLORS.infoLight,
    padding: 16,
    borderRadius: 12,
    marginBottom: 20,
  },
  infoText: {
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
});

export default YardEntry;