// src/screens/auth/SignIn.js
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
  Alert,
  ScrollView
} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';

const COLORS = {
  primary: '#5D6AFF',
  white: '#FFFFFF',
  gray50: '#F9FAFB',
  gray200: '#E5E7EB',
  gray400: '#9CA3AF',
  gray500: '#6B7280',
  text: {
    primary: '#1F2937',
    secondary: '#6B7280',
  }
};

const ROLES = {
  FIELD_INVESTIGATION: 'FI',
  COLLECTION: 'COL',
  CHANNEL_PARTNER: 'CP'
};

const SignIn = ({ navigation }) => {
  const [contact, setContact] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [selectedRole, setSelectedRole] = useState(ROLES.FIELD_INVESTIGATION);
  const [showRoleDropdown, setShowRoleDropdown] = useState(false);

  const roleOptions = [
    { label: 'Field Investigation Officer', value: ROLES.FIELD_INVESTIGATION },
    { label: 'Collection Agent', value: ROLES.COLLECTION },
    { label: 'Channel Partner', value: ROLES.CHANNEL_PARTNER }
  ];

  const validateContact = (input) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const mobileRegex = /^[0-9]{10}$/;
    return emailRegex.test(input) || mobileRegex.test(input);
  };

  const handleSignIn = () => {
    if (!contact || !password) {
      Alert.alert('Error', 'Please fill in all fields');
      return;
    }
    
    if (!validateContact(contact)) {
      Alert.alert('Error', 'Please enter a valid email or 10-digit mobile number');
      return;
    }

    // Navigate based on role
    if (selectedRole === ROLES.FIELD_INVESTIGATION) {
      navigation.navigate('FieldAgentMain');
    } else if (selectedRole === ROLES.COLLECTION) {
      navigation.navigate('CollectionAgentMain');
    } else {
      Alert.alert('Coming Soon', 'This role interface is under development');
    }
  };

  const getRoleLabel = (value) => {
    const role = roleOptions.find(r => r.value === value);
    return role ? role.label : '';
  };

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <SafeAreaView style={styles.container}>
        <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
          <View style={styles.headerContainer}>
            <View style={styles.logoBadge}>
              <Text style={styles.logoText}>L</Text>
            </View>
          </View>
          
          <Text style={styles.title}>Sign In</Text>
          <Text style={styles.subtitle}>Welcome back! Please enter your details.</Text>
          
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

            {/* Role Selection Dropdown */}
            <View style={styles.roleContainer}>
              <Text style={styles.roleLabel}>Select Role</Text>
              <TouchableOpacity 
                style={styles.dropdownButton}
                onPress={() => setShowRoleDropdown(!showRoleDropdown)}
              >
                <Text style={styles.dropdownButtonText}>{getRoleLabel(selectedRole)}</Text>
                <Icon 
                  name={showRoleDropdown ? "chevron-up" : "chevron-down"} 
                  size={20} 
                  color={COLORS.gray500} 
                />
              </TouchableOpacity>

              {showRoleDropdown && (
                <View style={styles.dropdownList}>
                  {roleOptions.map((role) => (
                    <TouchableOpacity
                      key={role.value}
                      style={[
                        styles.dropdownItem,
                        selectedRole === role.value && styles.dropdownItemSelected
                      ]}
                      onPress={() => {
                        setSelectedRole(role.value);
                        setShowRoleDropdown(false);
                      }}
                    >
                      <Text style={[
                        styles.dropdownItemText,
                        selectedRole === role.value && styles.dropdownItemTextSelected
                      ]}>
                        {role.label}
                      </Text>
                      {selectedRole === role.value && (
                        <Icon name="checkmark" size={20} color={COLORS.primary} />
                      )}
                    </TouchableOpacity>
                  ))}
                </View>
              )}
            </View>
            
            <TouchableOpacity style={styles.forgotPassword}>
              <Text style={styles.forgotPasswordText}>Forgot Password?</Text>
            </TouchableOpacity>
          </View>
          
          <TouchableOpacity 
            style={styles.signInButton}
            onPress={handleSignIn}
            activeOpacity={0.7}
          >
            <Text style={styles.signInButtonText}>Sign In</Text>
          </TouchableOpacity>
          
          <View style={styles.signUpContainer}>
            <Text style={styles.noAccountText}>Don't have an account? </Text>
            <TouchableOpacity 
              onPress={() => navigation.navigate('SignUp')}
              hitSlop={{top: 10, bottom: 10, left: 10, right: 10}}
            >
              <Text style={styles.signUpText}>Sign Up</Text>
            </TouchableOpacity>
          </View>
        </ScrollView>
      </SafeAreaView>
    </TouchableWithoutFeedback>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.white,
  },
  scrollContent: {
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingBottom: 20,
  },
  headerContainer: {
    marginTop: 60,
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
  roleContainer: {
    width: '100%',
    marginBottom: 15,
  },
  roleLabel: {
    fontSize: 14,
    color: COLORS.text.primary,
    marginBottom: 8,
    fontWeight: '600',
  },
  dropdownButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    borderWidth: 1,
    borderColor: COLORS.gray200,
    borderRadius: 10,
    padding: 15,
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
    padding: 15,
    borderBottomWidth: 1,
    borderBottomColor: COLORS.gray200,
  },
  dropdownItemSelected: {
    backgroundColor: '#F0F1FF',
  },
  dropdownItemText: {
    fontSize: 16,
    color: COLORS.text.primary,
  },
  dropdownItemTextSelected: {
    color: COLORS.primary,
    fontWeight: '600',
  },
  forgotPassword: {
    alignSelf: 'flex-end',
    marginBottom: 20,
  },
  forgotPasswordText: {
    color: COLORS.primary,
    fontSize: 14,
    fontWeight: '600',
  },
  signInButton: {
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
  signInButtonText: {
    color: COLORS.white,
    fontSize: 16,
    fontWeight: 'bold',
  },
  signUpContainer: {
    flexDirection: 'row',
    marginTop: 20,
  },
  noAccountText: {
    color: COLORS.text.secondary,
    fontSize: 14,
  },
  signUpText: {
    color: COLORS.primary,
    fontWeight: 'bold',
    fontSize: 14,
  },
});

export default SignIn;





// // src/screens/auth/SignIn.js
// import React, { useState } from 'react';
// import { 
//   View, 
//   Text, 
//   TouchableOpacity, 
//   StyleSheet, 
//   SafeAreaView, 
//   TextInput, 
//   TouchableWithoutFeedback,
//   Keyboard,
//   Alert
// } from 'react-native';
// import Icon from 'react-native-vector-icons/Ionicons';
// import { COLORS } from '../../utils/constants';

// const SignIn = ({ navigation }) => {
//   const [contact, setContact] = useState('');
//   const [password, setPassword] = useState('');
//   const [showPassword, setShowPassword] = useState(false);

//   const validateContact = (input) => {
//     const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
//     const mobileRegex = /^[0-9]{10}$/;
//     return emailRegex.test(input) || mobileRegex.test(input);
//   };

//   const handleSignIn = () => {
//     if (!contact || !password) {
//       Alert.alert('Error', 'Please fill in all fields');
//       return;
//     }
    
//     if (!validateContact(contact)) {
//       Alert.alert('Error', 'Please enter a valid email or 10-digit mobile number');
//       return;
//     }

//     // TODO: API call for authentication
//     // For now, navigate to main app
//     Alert.alert('Success', 'Login successful!');
//     // navigation.navigate('Main'); // Uncomment after MainNavigator is properly set up
//   };

//   return (
//     <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
//       <SafeAreaView style={styles.container}>
//         <View style={styles.headerContainer}>
//           <View style={styles.logoBadge}>
//             <Text style={styles.logoText}>L</Text>
//           </View>
//         </View>
        
//         <Text style={styles.title}>Sign In</Text>
//         <Text style={styles.subtitle}>Welcome back! Please enter your details.</Text>
        
//         <View style={styles.inputContainer}>
//           <View style={styles.inputWrapper}>
//             <Icon name="mail-outline" size={20} color={COLORS.gray500} style={styles.inputIcon} />
//             <TextInput
//               style={styles.input}
//               placeholder="Email or Mobile Number"
//               placeholderTextColor={COLORS.gray400}
//               value={contact}
//               onChangeText={setContact}
//               keyboardType="default"
//               autoCapitalize="none"
//             />
//           </View>
          
//           <View style={styles.inputWrapper}>
//             <Icon name="lock-closed-outline" size={20} color={COLORS.gray500} style={styles.inputIcon} />
//             <TextInput
//               style={styles.input}
//               placeholder="Password"
//               placeholderTextColor={COLORS.gray400}
//               value={password}
//               onChangeText={setPassword}
//               secureTextEntry={!showPassword}
//             />
//             <TouchableOpacity 
//               style={styles.eyeIcon}
//               onPress={() => setShowPassword(!showPassword)}
//               hitSlop={{top: 10, bottom: 10, left: 10, right: 10}}
//             >
//               <Icon 
//                 name={showPassword ? 'eye-outline' : 'eye-off-outline'} 
//                 size={20} 
//                 color={COLORS.gray500} 
//               />
//             </TouchableOpacity>
//           </View>
          
//           <TouchableOpacity style={styles.forgotPassword}>
//             <Text style={styles.forgotPasswordText}>Forgot Password?</Text>
//           </TouchableOpacity>
//         </View>
        
//         <TouchableOpacity 
//           style={styles.signInButton}
//           onPress={handleSignIn}
//           activeOpacity={0.7}
//         >
//           <Text style={styles.signInButtonText}>Sign In</Text>
//         </TouchableOpacity>
        
//         <View style={styles.signUpContainer}>
//           <Text style={styles.noAccountText}>Don't have an account? </Text>
//           <TouchableOpacity 
//             onPress={() => navigation.navigate('SignUp')}
//             hitSlop={{top: 10, bottom: 10, left: 10, right: 10}}
//           >
//             <Text style={styles.signUpText}>Sign Up</Text>
//           </TouchableOpacity>
//         </View>
//       </SafeAreaView>
//     </TouchableWithoutFeedback>
//   );
// };

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: COLORS.white,
//     alignItems: 'center',
//     paddingHorizontal: 20,
//   },
//   headerContainer: {
//     marginTop: 80,
//     marginBottom: 30,
//   },
//   logoBadge: {
//     width: 80,
//     height: 80,
//     borderRadius: 40,
//     backgroundColor: COLORS.primary,
//     justifyContent: 'center',
//     alignItems: 'center',
//   },
//   logoText: {
//     color: COLORS.white,
//     fontSize: 35,
//     fontWeight: 'bold',
//   },
//   title: {
//     fontSize: 28,
//     fontWeight: 'bold',
//     marginBottom: 8,
//     color: COLORS.text.primary,
//   },
//   subtitle: {
//     fontSize: 14,
//     color: COLORS.text.secondary,
//     marginBottom: 30,
//   },
//   inputContainer: {
//     width: '100%',
//     marginBottom: 20,
//   },
//   inputWrapper: {
//     flexDirection: 'row',
//     alignItems: 'center',
//     borderWidth: 1,
//     borderColor: COLORS.gray200,
//     borderRadius: 10,
//     marginBottom: 15,
//     paddingHorizontal: 15,
//     backgroundColor: COLORS.gray50,
//   },
//   inputIcon: {
//     marginRight: 10,
//   },
//   input: {
//     flex: 1,
//     padding: 15,
//     color: COLORS.text.primary,
//     fontSize: 16,
//   },
//   eyeIcon: {
//     padding: 5,
//   },
//   forgotPassword: {
//     alignSelf: 'flex-end',
//     marginBottom: 20,
//   },
//   forgotPasswordText: {
//     color: COLORS.primary,
//     fontSize: 14,
//     fontWeight: '600',
//   },
//   signInButton: {
//     backgroundColor: COLORS.primary,
//     width: '100%',
//     padding: 16,
//     borderRadius: 10,
//     alignItems: 'center',
//     shadowColor: COLORS.primary,
//     shadowOffset: { width: 0, height: 4 },
//     shadowOpacity: 0.3,
//     shadowRadius: 8,
//     elevation: 5,
//   },
//   signInButtonText: {
//     color: COLORS.white,
//     fontSize: 16,
//     fontWeight: 'bold',
//   },
//   signUpContainer: {
//     flexDirection: 'row',
//     marginTop: 20,
//   },
//   noAccountText: {
//     color: COLORS.text.secondary,
//     fontSize: 14,
//   },
//   signUpText: {
//     color: COLORS.primary,
//     fontWeight: 'bold',
//     fontSize: 14,
//   },
// });

// export default SignIn;