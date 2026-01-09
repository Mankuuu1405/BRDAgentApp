// src/navigation/CollectionAgentNavigator.jsx
import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createStackNavigator } from '@react-navigation/stack';
import Icon from 'react-native-vector-icons/Ionicons';

// Collection Screens
import CollectionDashboard from '../screens/collection/CollectionDashboard';
import DelinquencyList from '../screens/collection/DelinquencyList';
import AccountDetails from '../screens/collection/AccountDetails';
import PaymentCollection from '../screens/collection/PaymentCollection';
import FollowUpLogger from '../screens/collection/FollowUpLogger';
import VisitRecording from '../screens/collection/VisitRecording';
import RecoveryHub from '../screens/collection/RecoveryHub';
import RepoList from '../screens/collection/RepoList';
import VehicleScanner from '../screens/collection/VehicleScanner';
import YardEntry from '../screens/collection/YardEntry';
import RepossessionHistory from '../screens/collection/RepossessionHistory';
import CollectionProfile from '../screens/collection/CollectionProfile';

const COLORS = {
  primary: '#5D6AFF',
  warning: '#F59E0B',
  white: '#FFFFFF',
  gray200: '#E5E7EB',
  gray500: '#6B7280',
};

const Tab = createBottomTabNavigator();
const Stack = createStackNavigator();

// Accounts Stack Navigator
const AccountsStack = () => {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
      }}
    >
      <Stack.Screen name="DelinquencyList" component={DelinquencyList} />
      <Stack.Screen name="AccountDetails" component={AccountDetails} />
      <Stack.Screen name="PaymentCollection" component={PaymentCollection} />
      <Stack.Screen name="FollowUpLogger" component={FollowUpLogger} />
      <Stack.Screen name="VisitRecording" component={VisitRecording} />
    </Stack.Navigator>
  );
};

// Recovery Stack Navigator
const RecoveryStack = () => {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
      }}
    >
      <Stack.Screen name="RecoveryHub" component={RecoveryHub} />
      <Stack.Screen name="RepoList" component={RepoList} />
      <Stack.Screen name="VehicleScanner" component={VehicleScanner} />
      <Stack.Screen name="YardEntry" component={YardEntry} />
      <Stack.Screen name="RepossessionHistory" component={RepossessionHistory} />
    </Stack.Navigator>
  );
};

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
        name="Dashboard" 
        component={CollectionDashboard}
        options={{
          tabBarIcon: ({ color, size }) => (
            <Icon name="home" size={size} color={color} />
          ),
        }}
      />
      <Tab.Screen 
        name="Accounts" 
        component={AccountsStack}
        options={{
          tabBarIcon: ({ color, size }) => (
            <Icon name="list" size={size} color={color} />
          ),
          tabBarBadge: 12,
        }}
      />
      <Tab.Screen 
        name="Recovery" 
        component={RecoveryStack}
        options={{
          tabBarIcon: ({ color, size }) => (
            <Icon name="car-sport" size={size} color={color} />
          ),
          tabBarBadge: '🟡',
          tabBarBadgeStyle: {
            fontSize: 10,
            minWidth: 20,
            height: 20,
            borderRadius: 10,
            backgroundColor: 'transparent',
          },
        }}
      />
      <Tab.Screen 
        name="Profile" 
        component={CollectionProfile}
        options={{
          tabBarIcon: ({ color, size }) => (
            <Icon name="person" size={size} color={color} />
          ),
        }}
      />
    </Tab.Navigator>
  );
};

export default CollectionAgentNavigator;