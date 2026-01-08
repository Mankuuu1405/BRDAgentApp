// src/navigation/MainNavigator.js
import React, { useState, useEffect } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { ActivityIndicator, View, StyleSheet } from 'react-native';
import { navigationRef } from './navigationRef';
import AuthNavigator from './AuthNavigator';
import FieldAgentNavigator from './FieldAgentNavigator';
import Notifications from '../screens/fieldInvestigation/Notifications';
import CollectionAgentNavigator from './CollectionAgentNavigator';

const COLORS = {
  primary: '#5D6AFF',
  white: '#FFFFFF',
  background: '#F5F7FA',
};

const Stack = createStackNavigator();

const MainNavigator = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [userRole, setUserRole] = useState(null); // 'FI', 'COL', 'CP'

  useEffect(() => {
    checkAuthStatus();
  }, []);

  const checkAuthStatus = async () => {
    try {
      setTimeout(() => {
        setIsAuthenticated(false);
        setUserRole(null);
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

  // Determine which navigator to show based on role
  const getRoleBasedNavigator = () => {
    switch (userRole) {
      case 'FI':
        return FieldAgentNavigator;
      case 'COL':
        return CollectionAgentNavigator;
      case 'CP':
        // TODO: Add Channel Partner Navigator
        return FieldAgentNavigator; // Temporary fallback
      default:
        return FieldAgentNavigator;
    }
  };

  const RoleNavigator = getRoleBasedNavigator();


  return (
    <NavigationContainer ref={navigationRef}>
      <Stack.Navigator
        screenOptions={{
          headerShown: false,
          cardStyle: { backgroundColor: COLORS.background }
        }}
      >
        {!isAuthenticated ? (
          <>
            <Stack.Screen name="Auth" component={AuthNavigator} />
            <Stack.Screen name="FieldAgentMain" component={FieldAgentNavigator} />
            <Stack.Screen name="CollectionAgentMain" component={CollectionAgentNavigator} />
            <Stack.Screen name="Notifications" component={Notifications} />
          </>
        ) : (
          <>
            <Stack.Screen name="FieldAgentMain" component={FieldAgentNavigator} />
            <Stack.Screen name="Main" component={RoleNavigator} />
            <Stack.Screen name="Notifications" component={Notifications} />
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

