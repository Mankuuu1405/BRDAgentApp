// src/navigation/MainNavigator.js
import React, { useState, useEffect } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { ActivityIndicator, View, Text, StyleSheet } from 'react-native';
import { navigationRef } from './navigationRef';
import AuthNavigator from './AuthNavigator';
// Disabled BottomTabNavigator and many feature screens temporarily to keep the app runnable while those screens are implemented.
// import BottomTabNavigator from './BottomTabNavigator';
import { COLORS, ROLES } from '../utils/constants';

// NOTE: Several feature screens are not yet implemented (or missing). They are commented out above.
// A simple placeholder screen is provided for authenticated states.

const HomePlaceholder = () => (
  <View style={styles.loadingContainer}>
    <Text style={{fontSize:18, color: COLORS.primary}}>Home (placeholder)</Text>
  </View>
);

const Stack = createStackNavigator();

const MainNavigator = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [userRole, setUserRole] = useState(null);

  useEffect(() => {
    // Check authentication status and user role
    checkAuthStatus();
  }, []);

  const checkAuthStatus = async () => {
    try {
      // TODO: Check secure storage for auth token and user role
      // For now, simulating a check
      setTimeout(() => {
        setIsAuthenticated(false); // Change to true for testing dashboard
        setUserRole(ROLES.FIELD_INVESTIGATION); // Set user role
        setIsLoading(false);
      }, 1000);
    } catch (error) {
      console.error('Auth check error:', error);
      setIsLoading(false);
    }
  };

  if (isLoading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color={COLORS.primary} />
      </View>
    );
  }

  return (
    <NavigationContainer ref={navigationRef}>
      <Stack.Navigator
        screenOptions={{
          headerShown: false,
          cardStyle: { backgroundColor: COLORS.background }
        }}
      >
        {!isAuthenticated ? (
          <Stack.Screen name="Auth" component={AuthNavigator} />
        ) : (
          <>
            <Stack.Screen name="HomePlaceholder" component={HomePlaceholder} />
            {/* NOTE: Authenticated screens (bottom tabs and feature screens) are temporarily disabled
                to keep the app running with implemented UI only. Uncomment and restore when screens are ready. */}
          </>
        )}
      </Stack.Navigator>
    </NavigationContainer>
  );
};

const styles = StyleSheet.create({
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: COLORS.background,
  },
});

export default MainNavigator;