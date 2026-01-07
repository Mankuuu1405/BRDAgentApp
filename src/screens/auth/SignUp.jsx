// src/screens/auth/SignUp.js
import React, { useState } from 'react';
import { 
  View, 
  Text, 
  TouchableOpacity, 
  StyleSheet, 
  SafeAreaView, 
  TextInput, 
  TouchableWithoutFeedback,
  Keyboard,
  Alert
} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import { COLORS } from '../../utils/constants';

const SignUp = ({ navigation }) => {
  const [contact, setContact] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const validateContact = (input) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const mobileRegex = /^[0-9]{10}$/;
    return emailRegex.test(input) || mobileRegex.test(input);
  };

  const getContactType = (input) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(input) ? 'email' : 'mobile';
  };

  const handleSignUp = () => {
    if (!contact || !password || !confirmPassword) {
      Alert.alert('Error', 'Please fill in all fields');
      return;
    }
    
    if (!validateContact(contact)) {
      Alert.alert('Error', 'Please enter a valid email or 10-digit mobile number');
      return;
    }
    
    if (password !== confirmPassword) {
      Alert.alert('Error', 'Passwords do not match');
      return;
    }

    if (password.length < 6) {
      Alert.alert('Error', 'Password must be at least 6 characters');
      return;
    }

    const contactType = getContactType(contact);
    navigation.navigate('OTPVerification', { 
      contact: contact,
      contactType: contactType,
      password: password
    });
  };

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <SafeAreaView style={styles.container}>
        <TouchableOpacity 
          style={styles.backButton}
          onPress={() => navigation.goBack()}
        >
          <Icon name="arrow-back" size={24} color={COLORS.text.primary} />
        </TouchableOpacity>

        <View style={styles.headerContainer}>
          <View style={styles.logoBadge}>
            <Text style={styles.logoText}>L</Text>
          </View>
        </View>
        
        <Text style={styles.title}>Create Account</Text>
        <Text style={styles.subtitle}>Sign up to get started</Text>
        
        <View style={styles.inputContainer}>
          <View style={styles.inputWrapper}>
            <Icon name="mail-outline" size={20} color={COLORS.gray500} style={styles.inputIcon} />
            <TextInput
              style={styles.input}
              placeholder="Email or Mobile Number"
              placeholderTextColor={COLORS.gray400}
              value={contact}
              onChangeText={setContact}
              keyboardType="default"
              autoCapitalize="none"
            />
          </View>

          <View style={styles.inputWrapper}>
            <Icon name="lock-closed-outline" size={20} color={COLORS.gray500} style={styles.inputIcon} />
            <TextInput
              style={styles.input}
              placeholder="Password"
              placeholderTextColor={COLORS.gray400}
              value={password}
              onChangeText={setPassword}
              secureTextEntry={!showPassword}
            />
            <TouchableOpacity 
              style={styles.eyeIcon}
              onPress={() => setShowPassword(!showPassword)}
              hitSlop={{top: 10, bottom: 10, left: 10, right: 10}}
            >
              <Icon 
                name={showPassword ? 'eye-outline' : 'eye-off-outline'} 
                size={20} 
                color={COLORS.gray500} 
              />
            </TouchableOpacity>
          </View>

          <View style={styles.inputWrapper}>
            <Icon name="lock-closed-outline" size={20} color={COLORS.gray500} style={styles.inputIcon} />
            <TextInput
              style={styles.input}
              placeholder="Confirm Password"
              placeholderTextColor={COLORS.gray400}
              value={confirmPassword}
              onChangeText={setConfirmPassword}
              secureTextEntry={!showConfirmPassword}
            />
            <TouchableOpacity 
              style={styles.eyeIcon}
              onPress={() => setShowConfirmPassword(!showConfirmPassword)}
              hitSlop={{top: 10, bottom: 10, left: 10, right: 10}}
            >
              <Icon 
                name={showConfirmPassword ? 'eye-outline' : 'eye-off-outline'} 
                size={20} 
                color={COLORS.gray500} 
              />
            </TouchableOpacity>
          </View>
        </View>
        
        <TouchableOpacity 
          style={styles.signUpButton}
          onPress={handleSignUp}
          activeOpacity={0.7}
        >
          <Text style={styles.signUpButtonText}>Sign Up</Text>
        </TouchableOpacity>
        
        <View style={styles.signInContainer}>
          <Text style={styles.haveAccountText}>Already have an account? </Text>
          <TouchableOpacity 
            onPress={() => navigation.navigate('SignIn')}
            hitSlop={{top: 10, bottom: 10, left: 10, right: 10}}
          >
            <Text style={styles.signInText}>Sign In</Text>
          </TouchableOpacity>
        </View>
      </SafeAreaView>
    </TouchableWithoutFeedback>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.white,
    alignItems: 'center',
    paddingHorizontal: 20,
  },
  backButton: {
    position: 'absolute',
    top: 50,
    left: 20,
    padding: 8,
    zIndex: 10,
  },
  headerContainer: {
    marginTop: 80,
    marginBottom: 30,
  },
  logoBadge: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: COLORS.primary,
    justifyContent: 'center',
    alignItems: 'center',
  },
  logoText: {
    color: COLORS.white,
    fontSize: 35,
    fontWeight: 'bold',
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    marginBottom: 8,
    color: COLORS.text.primary,
  },
  subtitle: {
    fontSize: 14,
    color: COLORS.text.secondary,
    marginBottom: 30,
  },
  inputContainer: {
    width: '100%',
    marginBottom: 20,
  },
  inputWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: COLORS.gray200,
    borderRadius: 10,
    marginBottom: 15,
    paddingHorizontal: 15,
    backgroundColor: COLORS.gray50,
  },
  inputIcon: {
    marginRight: 10,
  },
  input: {
    flex: 1,
    padding: 15,
    color: COLORS.text.primary,
    fontSize: 16,
  },
  eyeIcon: {
    padding: 5,
  },
  signUpButton: {
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
  },
  signUpButtonText: {
    color: COLORS.white,
    fontSize: 16,
    fontWeight: 'bold',
  },
  signInContainer: {
    flexDirection: 'row',
    marginTop: 20,
  },
  haveAccountText: {
    color: COLORS.text.secondary,
    fontSize: 14,
  },
  signInText: {
    color: COLORS.primary,
    fontWeight: 'bold',
    fontSize: 14,
  },
});

export default SignUp;