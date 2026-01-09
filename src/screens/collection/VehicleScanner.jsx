// src/screens/collection/VehicleScanner.jsx
import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  TouchableOpacity,
  Alert,
  Modal,
  Dimensions,
  ScrollView,
} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import { COLORS } from '../../utils/constants';

const { width, height } = Dimensions.get('window');

const VehicleScanner = ({ navigation, route }) => {
  const [isScanning, setIsScanning] = useState(false);
  const [scannedPlate, setScannedPlate] = useState('');
  const [matchedVehicle, setMatchedVehicle] = useState(null);
  const [showMatchModal, setShowMatchModal] = useState(false);
  const [scanHistory, setScanHistory] = useState([]);

  // Mock repo database (in production, this would be from local storage)
  const repoDatabase = [
    {
      id: 1,
      vehicleNumber: 'DL-3CAB-1234',
      customerName: 'Rajesh Kumar',
      loanId: 'LA-2025-1234',
      vehicleModel: 'Maruti Swift VXI',
      vehicleColor: 'Red',
      emiOverdue: '₹36,000',
      lastKnownLocation: 'Dwarka Sector 10, Delhi',
    },
    {
      id: 2,
      vehicleNumber: 'DL-1CAA-5678',
      customerName: 'Priya Sharma',
      loanId: 'LA-2025-5678',
      vehicleModel: 'Honda Activa 6G',
      vehicleColor: 'Black',
      emiOverdue: '₹24,000',
      lastKnownLocation: 'Rohini Sector 15, Delhi',
    },
  ];

  const handleStartScan = () => {
    setIsScanning(true);
    // Simulate OCR scanning - in production, use actual camera OCR
    setTimeout(() => {
      const mockPlate = 'DL-3CAB-1234'; // Simulated OCR result
      handlePlateScanned(mockPlate);
    }, 2000);
  };

  const handlePlateScanned = (plate) => {
    setIsScanning(false);
    setScannedPlate(plate);

    // Add to scan history
    const scanRecord = {
      id: Date.now(),
      plate: plate,
      timestamp: new Date().toLocaleString(),
      matched: false,
    };

    // Check against repo database
    const match = repoDatabase.find(
      (v) => v.vehicleNumber.toLowerCase() === plate.toLowerCase()
    );

    if (match) {
      scanRecord.matched = true;
      setMatchedVehicle(match);
      setShowMatchModal(true);
    } else {
      Alert.alert(
        'No Match Found',
        `Vehicle plate "${plate}" is not in the repo list.`,
        [{ text: 'OK' }]
      );
    }

    setScanHistory([scanRecord, ...scanHistory]);
  };

  const handleManualEntry = () => {
    Alert.prompt(
      'Enter Plate Number',
      'Manually enter the vehicle plate number',
      [
        { text: 'Cancel', style: 'cancel' },
        {
          text: 'Check',
          onPress: (plate) => {
            if (plate && plate.trim()) {
              handlePlateScanned(plate.trim().toUpperCase());
            }
          },
        },
      ],
      'plain-text'
    );
  };

  const handleProceedToYardEntry = () => {
    setShowMatchModal(false);
    navigation.navigate('YardEntry', { vehicle: matchedVehicle });
  };

  const renderCameraView = () => (
    <View style={styles.cameraContainer}>
      {!isScanning ? (
        <View style={styles.cameraPlaceholder}>
          <Icon name="camera" size={80} color={COLORS.white} />
          <Text style={styles.cameraPlaceholderText}>
            Point camera at vehicle license plate
          </Text>
          <Text style={styles.cameraSubtext}>
            OCR will automatically detect and read the plate
          </Text>
        </View>
      ) : (
        <View style={styles.scanningView}>
          <View style={styles.scanFrame} />
          <View style={styles.scanLine} />
          <Text style={styles.scanningText}>Scanning license plate...</Text>
        </View>
      )}

      {/* Scanning Guide */}
      <View style={styles.guideOverlay}>
        <View style={styles.guideBox} />
        <Text style={styles.guideText}>Align plate within frame</Text>
      </View>
    </View>
  );

  const renderControls = () => (
    <View style={styles.controlsContainer}>
      {!isScanning ? (
        <>
          <TouchableOpacity
            style={styles.scanButton}
            onPress={handleStartScan}
            activeOpacity={0.8}
          >
            <Icon name="scan" size={32} color={COLORS.white} />
            <Text style={styles.scanButtonText}>Start Scanning</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.manualButton} onPress={handleManualEntry}>
            <Icon name="create" size={20} color={COLORS.primary} />
            <Text style={styles.manualButtonText}>Manual Entry</Text>
          </TouchableOpacity>
        </>
      ) : (
        <TouchableOpacity
          style={styles.cancelButton}
          onPress={() => setIsScanning(false)}
        >
          <Icon name="close" size={24} color={COLORS.white} />
          <Text style={styles.cancelButtonText}>Cancel</Text>
        </TouchableOpacity>
      )}
    </View>
  );

  const renderScanHistory = () => (
    <View style={styles.historyContainer}>
      <Text style={styles.historyTitle}>Recent Scans</Text>

      {scanHistory.length === 0 ? (
        <View style={styles.emptyHistory}>
          <Icon name="time" size={40} color={COLORS.gray400} />
          <Text style={styles.emptyHistoryText}>No scans yet</Text>
        </View>
      ) : (
        <ScrollView style={styles.historyList} showsVerticalScrollIndicator={false}>
          {scanHistory.map((scan) => (
            <View key={scan.id} style={styles.historyItem}>
              <View style={styles.historyIcon}>
                <Icon
                  name={scan.matched ? 'checkmark-circle' : 'close-circle'}
                  size={24}
                  color={scan.matched ? COLORS.success : COLORS.gray400}
                />
              </View>
              <View style={styles.historyInfo}>
                <Text style={styles.historyPlate}>{scan.plate}</Text>
                <Text style={styles.historyTime}>{scan.timestamp}</Text>
              </View>
              <View
                style={[
                  styles.historyBadge,
                  {
                    backgroundColor: scan.matched
                      ? COLORS.successLight
                      : COLORS.gray200,
                  },
                ]}
              >
                <Text
                  style={[
                    styles.historyBadgeText,
                    { color: scan.matched ? COLORS.success : COLORS.gray500 },
                  ]}
                >
                  {scan.matched ? 'Match' : 'No Match'}
                </Text>
              </View>
            </View>
          ))}
        </ScrollView>
      )}
    </View>
  );

  const renderInfoBox = () => (
    <View style={styles.infoBox}>
      <Icon name="information-circle" size={20} color={COLORS.info} />
      <View style={styles.infoContent}>
        <Text style={styles.infoTitle}>OCR Scanner Tips:</Text>
        <Text style={styles.infoText}>
          • Ensure good lighting{'\n'}
          • Keep camera steady{'\n'}
          • Plate should be clearly visible{'\n'}
          • Avoid glare and shadows
        </Text>
      </View>
    </View>
  );

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Icon name="arrow-back" size={24} color={COLORS.white} />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Vehicle Scanner</Text>
        <TouchableOpacity onPress={() => navigation.navigate('RepoList')}>
          <Icon name="list" size={24} color={COLORS.white} />
        </TouchableOpacity>
      </View>

      {renderCameraView()}
      {renderControls()}
      {renderInfoBox()}
      {renderScanHistory()}

      {/* Match Found Modal */}
      <Modal
        visible={showMatchModal}
        transparent={true}
        animationType="slide"
        onRequestClose={() => setShowMatchModal(false)}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.matchModal}>
            <View style={styles.matchIconContainer}>
              <Icon name="checkmark-circle" size={80} color={COLORS.primary} />
            </View>

            <Text style={styles.matchTitle}>Match Found!</Text>
            <Text style={styles.matchSubtitle}>
              This vehicle is in the repossession list
            </Text>

            {matchedVehicle && (
              <View style={styles.matchDetails}>
                <View style={styles.matchDetailRow}>
                  <Icon name="car-sport" size={20} color={COLORS.text.secondary} />
                  <View style={styles.matchDetailContent}>
                    <Text style={styles.matchDetailLabel}>Vehicle Number</Text>
                    <Text style={styles.matchDetailValue}>
                      {matchedVehicle.vehicleNumber}
                    </Text>
                  </View>
                </View>

                <View style={styles.matchDetailRow}>
                  <Icon name="person" size={20} color={COLORS.text.secondary} />
                  <View style={styles.matchDetailContent}>
                    <Text style={styles.matchDetailLabel}>Customer</Text>
                    <Text style={styles.matchDetailValue}>
                      {matchedVehicle.customerName}
                    </Text>
                  </View>
                </View>

                <View style={styles.matchDetailRow}>
                  <Icon name="document-text" size={20} color={COLORS.text.secondary} />
                  <View style={styles.matchDetailContent}>
                    <Text style={styles.matchDetailLabel}>Loan ID</Text>
                    <Text style={styles.matchDetailValue}>{matchedVehicle.loanId}</Text>
                  </View>
                </View>

                <View style={styles.matchDetailRow}>
                  <Icon name="cash" size={20} color={COLORS.text.secondary} />
                  <View style={styles.matchDetailContent}>
                    <Text style={styles.matchDetailLabel}>Overdue Amount</Text>
                    <Text style={[styles.matchDetailValue, { color: COLORS.danger }]}>
                      {matchedVehicle.emiOverdue}
                    </Text>
                  </View>
                </View>

                <View style={styles.matchDetailRow}>
                  <Icon name="location" size={20} color={COLORS.text.secondary} />
                  <View style={styles.matchDetailContent}>
                    <Text style={styles.matchDetailLabel}>Last Known Location</Text>
                    <Text style={styles.matchDetailValue}>
                      {matchedVehicle.lastKnownLocation}
                    </Text>
                  </View>
                </View>
              </View>
            )}

            <View style={styles.matchActions}>
              <TouchableOpacity
                style={styles.matchBtnSecondary}
                onPress={() => setShowMatchModal(false)}
              >
                <Text style={styles.matchBtnSecondaryText}>Close</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.matchBtnPrimary}
                onPress={handleProceedToYardEntry}
              >
                <Text style={styles.matchBtnPrimaryText}>Proceed to Yard Entry</Text>
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
    backgroundColor: COLORS.black,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingTop: 40,
    paddingBottom: 16,
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: COLORS.white,
  },
  cameraContainer: {
    height: height * 0.4,
    backgroundColor: '#1a1a1a',
    position: 'relative',
    justifyContent: 'center',
    alignItems: 'center',
  },
  cameraPlaceholder: {
    alignItems: 'center',
  },
  cameraPlaceholderText: {
    fontSize: 16,
    color: COLORS.white,
    marginTop: 20,
    fontWeight: '600',
  },
  cameraSubtext: {
    fontSize: 14,
    color: 'rgba(255,255,255,0.7)',
    marginTop: 8,
  },
  scanningView: {
    width: '100%',
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  scanFrame: {
    width: width * 0.8,
    height: 120,
    borderWidth: 3,
    borderColor: COLORS.warning,
    borderRadius: 8,
  },
  scanLine: {
    position: 'absolute',
    width: width * 0.8,
    height: 3,
    backgroundColor: COLORS.warning,
    top: '50%',
  },
  scanningText: {
    fontSize: 16,
    color: COLORS.white,
    marginTop: 20,
    fontWeight: '600',
  },
  guideOverlay: {
    position: 'absolute',
    top: 40,
    alignItems: 'center',
  },
  guideBox: {
    width: width * 0.7,
    height: 100,
    borderWidth: 2,
    borderColor: 'rgba(255,255,255,0.5)',
    borderStyle: 'dashed',
    borderRadius: 8,
  },
  guideText: {
    fontSize: 14,
    color: 'rgba(255,255,255,0.8)',
    marginTop: 8,
  },
  controlsContainer: {
    paddingHorizontal: 20,
    paddingVertical: 24,
    backgroundColor: COLORS.background,
    borderTopLeftRadius: 24,
    borderTopRightRadius: 24,
    marginTop: -24,
  },
  scanButton: {
    flexDirection: 'row',
    backgroundColor: COLORS.primary,
    padding: 18,
    borderRadius: 16,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 12,
  },
  scanButtonText: {
    color: COLORS.white,
    fontSize: 18,
    fontWeight: 'bold',
    marginLeft: 12,
  },
  manualButton: {
    flexDirection: 'row',
    backgroundColor: COLORS.white,
    padding: 16,
    borderRadius: 16,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 2,
    borderColor: COLORS.primary,
  },
  manualButtonText: {
    color: COLORS.primary,
    fontSize: 16,
    fontWeight: 'bold',
    marginLeft: 8,
  },
  cancelButton: {
    flexDirection: 'row',
    backgroundColor: COLORS.danger,
    padding: 18,
    borderRadius: 16,
    alignItems: 'center',
    justifyContent: 'center',
  },
  cancelButtonText: {
    color: COLORS.white,
    fontSize: 18,
    fontWeight: 'bold',
    marginLeft: 12,
  },
  infoBox: {
    flexDirection: 'row',
    backgroundColor: COLORS.infoLight,
    padding: 16,
    borderRadius: 12,
    marginHorizontal: 20,
    marginBottom: 16,
  },
  infoContent: {
    flex: 1,
    marginLeft: 12,
  },
  infoTitle: {
    fontSize: 14,
    fontWeight: 'bold',
    color: COLORS.text.primary,
    marginBottom: 8,
  },
  infoText: {
    fontSize: 12,
    color: COLORS.text.secondary,
    lineHeight: 18,
  },
  historyContainer: {
    flex: 1,
    backgroundColor: COLORS.white,
    paddingHorizontal: 20,
    paddingTop: 20,
  },
  historyTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: COLORS.text.primary,
    marginBottom: 16,
  },
  historyList: {
    flex: 1,
  },
  emptyHistory: {
    alignItems: 'center',
    paddingVertical: 40,
  },
  emptyHistoryText: {
    fontSize: 14,
    color: COLORS.text.secondary,
    marginTop: 12,
  },
  historyItem: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: COLORS.gray50,
    padding: 16,
    borderRadius: 12,
    marginBottom: 12,
  },
  historyIcon: {
    marginRight: 12,
  },
  historyInfo: {
    flex: 1,
  },
  historyPlate: {
    fontSize: 16,
    fontWeight: 'bold',
    color: COLORS.text.primary,
    marginBottom: 4,
  },
  historyTime: {
    fontSize: 12,
    color: COLORS.text.secondary,
  },
  historyBadge: {
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 12,
  },
  historyBadgeText: {
    fontSize: 11,
    fontWeight: '600',
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.5)',
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 20,
  },
  matchModal: {
    backgroundColor: COLORS.white,
    borderRadius: 24,
    padding: 24,
    width: '100%',
    maxWidth: 400,
  },
  matchIconContainer: {
    alignItems: 'center',
    marginBottom: 20,
  },
  matchTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: COLORS.text.primary,
    textAlign: 'center',
    marginBottom: 8,
  },
  matchSubtitle: {
    fontSize: 14,
    color: COLORS.text.secondary,
    textAlign: 'center',
    marginBottom: 24,
  },
  matchDetails: {
    backgroundColor: COLORS.gray50,
    borderRadius: 12,
    padding: 16,
    marginBottom: 24,
  },
  matchDetailRow: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: COLORS.gray200,
  },
  matchDetailContent: {
    flex: 1,
    marginLeft: 12,
  },
  matchDetailLabel: {
    fontSize: 12,
    color: COLORS.text.secondary,
    marginBottom: 4,
  },
  matchDetailValue: {
    fontSize: 15,
    fontWeight: '600',
    color: COLORS.text.primary,
  },
  matchActions: {
    flexDirection: 'row',
    gap: 12,
  },
  matchBtnSecondary: {
    flex: 1,
    backgroundColor: COLORS.gray50,
    padding: 16,
    borderRadius: 12,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: COLORS.gray200,
  },
  matchBtnSecondaryText: {
    fontSize: 15,
    fontWeight: '600',
    color: COLORS.text.primary,
  },
  matchBtnPrimary: {
    flex: 1,
    backgroundColor: COLORS.primary,
    padding: 16,
    borderRadius: 12,
    alignItems: 'center',
  },
  matchBtnPrimaryText: {
    fontSize: 15,
    fontWeight: '600',
    color: COLORS.white,
  },
});

export default VehicleScanner;