// src/screens/auth/MPINSetup.js
import React, { useState, useRef } from 'react';
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  TouchableOpacity,
  TextInput,
  Alert,
} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import { COLORS } from '../../utils/constants';

const MPINSetup = ({ navigation, route }) => {
  const { contact, password } = route.params;
  const [step, setStep] = useState(1); // 1: Create MPIN, 2: Confirm MPIN
  const [mpin, setMpin] = useState(['', '', '', '']);
  const [confirmMpin, setConfirmMpin] = useState(['', '', '', '']);
  const inputRefs = useRef([]);

  const currentMpin = step === 1 ? mpin : confirmMpin;
  const setCurrentMpin = step === 1 ? setMpin : setConfirmMpin;

  const handleMpinChange = (value, index) => {
    if (isNaN(value)) return;

    const newMpin = [...currentMpin];
    newMpin[index] = value;
    setCurrentMpin(newMpin);

    // Auto-focus next input
    if (value && index < 3) {
      inputRefs.current[index + 1].focus();
    }

    // Auto-proceed when all digits are entered
    if (index === 3 && value) {
      if (step === 1) {
        setTimeout(() => {
          setStep(2);
          inputRefs.current[0].focus();
        }, 200);
      } else {
        verifyMpin(newMpin.join(''));
      }
    }
  };

  const handleKeyPress = (e, index) => {
    if (e.nativeEvent.key === 'Backspace' && !currentMpin[index] && index > 0) {
      inputRefs.current[index - 1].focus();
    }
  };

  const verifyMpin = (confirmMpinCode) => {
    const mpinCode = mpin.join('');
    
    if (confirmMpinCode === mpinCode) {
      // TODO: API call to complete registration
      Alert.alert(
        'Success',
        'Your account has been created successfully!',
        [
          {
            text: 'OK',
            onPress: () => {
              // Navigate to main app or login
              navigation.navigate('SignIn');
            },
          },
        ]
      );
    } else {
      Alert.alert('Error', 'MPINs do not match. Please try again.', [
        {
          text: 'OK',
          onPress: () => {
            setStep(1);
            setMpin(['', '', '', '']);
            setConfirmMpin(['', '', '', '']);
            inputRefs.current[0].focus();
          },
        },
      ]);
    }
  };

  const handleContinue = () => {
    const mpinCode = currentMpin.join('');
    
    if (mpinCode.length !== 4) {
      Alert.alert('Error', 'Please enter 4-digit MPIN');
      return;
    }

    if (step === 1) {
      setStep(2);
      setTimeout(() => {
        inputRefs.current[0].focus();
      }, 100);
    } else {
      verifyMpin(mpinCode);
    }
  };

  const handleBack = () => {
    if (step === 2) {
      setStep(1);
      setConfirmMpin(['', '', '', '']);
    } else {
      navigation.goBack();
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <TouchableOpacity 
        style={styles.backButton}
        onPress={handleBack}
      >
        <Icon name="arrow-back" size={24} color={COLORS.text.primary} />
      </TouchableOpacity>

      <View style={styles.content}>
        <View style={styles.iconContainer}>
          <Icon name="shield-checkmark" size={60} color={COLORS.primary} />
        </View>

        <Text style={styles.title}>
          {step === 1 ? 'Create MPIN' : 'Confirm MPIN'}
        </Text>
        <Text style={styles.subtitle}>
          {step === 1
            ? 'Create a 4-digit MPIN for quick login'
            : 'Re-enter your MPIN to confirm'}
        </Text>

        <View style={styles.mpinContainer}>
          {currentMpin.map((digit, index) => (
            <TextInput
              key={index}
              ref={(ref) => (inputRefs.current[index] = ref)}
              style={[
                styles.mpinInput,
                digit && styles.mpinInputFilled,
              ]}
              value={digit}
              onChangeText={(value) => handleMpinChange(value, index)}
              onKeyPress={(e) => handleKeyPress(e, index)}
              keyboardType="number-pad"
              maxLength={1}
              secureTextEntry
              selectTextOnFocus
            />
          ))}
        </View>

        {step === 1 && (
          <View style={styles.infoContainer}>
            <Icon name="information-circle-outline" size={20} color={COLORS.info} />
            <Text style={styles.infoText}>
              You'll use this MPIN for quick and secure login
            </Text>
          </View>
        )}

        <TouchableOpacity
          style={styles.continueButton}
          onPress={handleContinue}
          activeOpacity={0.7}
        >
          <Text style={styles.continueButtonText}>
            {step === 1 ? 'Continue' : 'Complete Setup'}
          </Text>
        </TouchableOpacity>

        <View style={styles.progressContainer}>
          <View style={[styles.progressDot, step >= 1 && styles.progressDotActive]} />
          <View style={[styles.progressDot, step >= 2 && styles.progressDotActive]} />
        </View>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.white,
  },
  backButton: {
    position: 'absolute',
    top: 50,
    left: 20,
    padding: 8,
    zIndex: 10,
  },
  content: {
    flex: 1,
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingTop: 100,
  },
  iconContainer: {
    width: 120,
    height: 120,
    borderRadius: 60,
    backgroundColor: COLORS.gray50,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 30,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    marginBottom: 12,
    color: COLORS.text.primary,
  },
  subtitle: {
    fontSize: 14,
    color: COLORS.text.secondary,
    textAlign: 'center',
    marginBottom: 40,
  },
  mpinContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '80%',
    marginBottom: 20,
  },
  mpinInput: {
    width: 60,
    height: 60,
    borderWidth: 1,
    borderColor: COLORS.gray200,
    borderRadius: 10,
    textAlign: 'center',
    fontSize: 24,
    fontWeight: 'bold',
    backgroundColor: COLORS.gray50,
    color: COLORS.text.primary,
  },
  mpinInputFilled: {
    borderColor: COLORS.primary,
    backgroundColor: COLORS.white,
  },
  infoContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: COLORS.gray50,
    padding: 12,
    borderRadius: 8,
    marginBottom: 30,
    width: '100%',
  },
  infoText: {
    fontSize: 12,
    color: COLORS.text.secondary,
    marginLeft: 8,
    flex: 1,
  },
  continueButton: {
    backgroundColor: COLORS.primary,
    width: '100%',
    padding: 16,
    borderRadius: 10,
    alignItems: 'center',
    shadowColor: COLORS.primary,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 5,
    marginBottom: 20,
  },
  continueButtonText: {
    color: COLORS.white,
    fontSize: 16,
    fontWeight: 'bold',
  },
  progressContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: 20,
  },
  progressDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: COLORS.gray300,
    marginHorizontal: 4,
  },
  progressDotActive: {
    backgroundColor: COLORS.primary,
    width: 24,
  },
});

export default MPINSetup;