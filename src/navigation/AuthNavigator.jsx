// src/navigation/AuthNavigator.js
import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import SignIn from '../screens/auth/SignIn';
import SignUp from '../screens/auth/SignUp';
import OTPVerification from '../screens/auth/OTPVerification';
import MPINSetup from '../screens/auth/MPINSetup';

const Stack = createStackNavigator();

const AuthNavigator = () => {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
        cardStyle: { backgroundColor: 'white' }
      }}
    >
      <Stack.Screen name="SignIn" component={SignIn} />
      <Stack.Screen name="SignUp" component={SignUp} />
      <Stack.Screen name="OTPVerification" component={OTPVerification} />
      <Stack.Screen name="MPINSetup" component={MPINSetup} />
    </Stack.Navigator>
  );
};

export default AuthNavigator;