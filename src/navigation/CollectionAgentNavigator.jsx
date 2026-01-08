// src/navigation/CollectionAgentNavigator.jsx
import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Icon from 'react-native-vector-icons/Ionicons';

// Collection Screens
import CollectionDashboard from '../screens/collection/CollectionDashboard';
import DelinquencyList from '../screens/collection/DelinquencyList';
import PaymentCollection from '../screens/collection/PaymentCollection';
import FollowUpLogger from '../screens/collection/FollowUpLogger';
import CollectionProfile from '../screens/collection/CollectionProfile';

const COLORS = {
  primary: '#5D6AFF',
  white: '#FFFFFF',
  gray200: '#E5E7EB',
  gray500: '#6B7280',
};

const Tab = createBottomTabNavigator();

const CollectionAgentNavigator = () => {
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
        name="CollectionHome" 
        component={CollectionDashboard}
        options={{
          tabBarLabel: 'Home',
          tabBarIcon: ({ color, size }) => (
            <Icon name="home" size={size} color={color} />
          ),
        }}
      />
      <Tab.Screen 
        name="Accounts" 
        component={DelinquencyList}
        options={{
          tabBarIcon: ({ color, size }) => (
            <Icon name="list" size={size} color={color} />
          ),
          tabBarBadge: 12,
        }}
      />
      <Tab.Screen 
        name="Payment" 
        component={PaymentCollection}
        options={{
          tabBarIcon: ({ color, size }) => (
            <Icon name="cash" size={size + 8} color={color} />
          ),
          tabBarLabel: 'Payments',
        }}
      />
      <Tab.Screen 
        name="FollowUp" 
        component={FollowUpLogger}
        options={{
          tabBarIcon: ({ color, size }) => (
            <Icon name="call" size={size} color={color} />
          ),
        }}
      />
      <Tab.Screen 
        name="CollectionProfile" 
        component={CollectionProfile}
        options={{
          tabBarLabel: 'Profile',
          tabBarIcon: ({ color, size }) => (
            <Icon name="person" size={size} color={color} />
          ),
        }}
      />
    </Tab.Navigator>
  );
};

export default CollectionAgentNavigator;