// src/navigation/ChannelPartnerNavigator.jsx
import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Icon from 'react-native-vector-icons/Ionicons';

// Channel Partner Screens
import CPDashboard from '../screens/channelPartner/CPDashboard';
import LeadManagement from '../screens/channelPartner/LeadManagement';
import CreateLead from '../screens/channelPartner/CreateLead';
import PayoutLedger from '../screens/channelPartner/PayoutLedger';
import CPProfile from '../screens/channelPartner/CPProfile';

const COLORS = {
  primary: '#5D6AFF',
  white: '#FFFFFF',
  gray200: '#E5E7EB',
  gray500: '#6B7280',
};

const Tab = createBottomTabNavigator();

const ChannelPartnerNavigator = () => {
  return (
    <Tab.Navigator
      screenOptions={{
        tabBarActiveTintColor: COLORS.primary,
        tabBarInactiveTintColor: COLORS.gray500,
        tabBarStyle: {
          backgroundColor: COLORS.white,
          borderTopWidth: 1,
          borderTopColor: COLORS.gray200,
          height: 85,
          paddingBottom: 8,
          paddingTop: 8,
        },
        tabBarLabelStyle: {
          fontSize: 12,
          fontWeight: '600',
        },
        headerShown: false,
      }}
    >
      <Tab.Screen 
        name="Home" 
        component={CPDashboard}
        options={{
          tabBarIcon: ({ color, size }) => (
            <Icon name="home" size={size} color={color} />
          ),
        }}
      />
      <Tab.Screen 
        name="Leads" 
        component={LeadManagement}
        options={{
          tabBarIcon: ({ color, size }) => (
            <Icon name="people" size={size} color={color} />
          ),
          tabBarBadge: 5,
        }}
      />
      <Tab.Screen 
        name="Create" 
        component={CreateLead}
        options={{
          tabBarIcon: ({ color, size }) => (
            <Icon name="add" size={size + 8} color={color} />
          ),
          tabBarLabel: 'New Lead',
        }}
      />
      <Tab.Screen 
        name="Payouts" 
        component={PayoutLedger}
        options={{
          tabBarIcon: ({ color, size }) => (
            <Icon name="wallet" size={size} color={color} />
          ),
        }}
      />
      <Tab.Screen 
        name="Profile" 
        component={CPProfile}
        options={{
          tabBarIcon: ({ color, size }) => (
            <Icon name="person" size={size} color={color} />
          ),
        }}
      />
    </Tab.Navigator>
  );
};

export default ChannelPartnerNavigator;