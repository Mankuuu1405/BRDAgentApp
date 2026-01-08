// src/navigation/MainNavigator.jsx
import React, { useState, useEffect } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { ActivityIndicator, View, StyleSheet } from 'react-native';
import { navigationRef } from './navigationRef';
import AuthNavigator from './AuthNavigator';
import FieldAgentNavigator from './FieldAgentNavigator';
import ChannelPartnerNavigator from './ChannelPartnerNavigator';
import Notifications from '../screens/fieldInvestigation/Notifications';
import CPNotifications from '../screens/channelPartner/CPNotifications';
import AboutApp from '../screens/support&others/AboutApp';
import PrivacyPolicy from '../screens/support&others/PrivacyPolicy';
import HelpSupport from '../screens/support&others/HelpSupport';
import RaiseTicketScreen from '../screens/support&others/RaiseTicketScreen';
import LeadDetails from '../screens/channelPartner/LeadDetails';

const COLORS = {
  primary: '#5D6AFF',
  white: '#FFFFFF',
  background: '#F5F7FA',
};

const Stack = createStackNavigator();

const MainNavigator = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    checkAuthStatus();
  }, []);

  const checkAuthStatus = async () => {
    try {
      setTimeout(() => {
        setIsAuthenticated(false);
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
          <>
            <Stack.Screen name="Auth" component={AuthNavigator} />
            <Stack.Screen name="FieldAgentMain" component={FieldAgentNavigator} />
            <Stack.Screen name="ChannelPartnerMain" component={ChannelPartnerNavigator} />
            <Stack.Screen name="Notifications" component={Notifications} />
            <Stack.Screen name="CPNotifications" component={CPNotifications} />
            <Stack.Screen name="AboutApp" component={AboutApp} />
            <Stack.Screen name="PrivacyPolicy" component={PrivacyPolicy} />
            <Stack.Screen name="HelpSupport" component={HelpSupport} />
            <Stack.Screen name="RaiseTicket" component={RaiseTicketScreen} />
            <Stack.Screen name="LeadDetails" component={LeadDetails} />
          </>
        ) : (
          <>
            <Stack.Screen name="FieldAgentMain" component={FieldAgentNavigator} />
            <Stack.Screen name="ChannelPartnerMain" component={ChannelPartnerNavigator} />
            <Stack.Screen name="Notifications" component={Notifications} />
            <Stack.Screen name="CPNotifications" component={CPNotifications} />
            <Stack.Screen name="AboutApp" component={AboutApp} />
            <Stack.Screen name="PrivacyPolicy" component={PrivacyPolicy} />
            <Stack.Screen name="HelpSupport" component={HelpSupport} />
            <Stack.Screen name="RaiseTicket" component={RaiseTicketScreen} />
            <Stack.Screen name="LeadDetails" component={LeadDetails} />
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
