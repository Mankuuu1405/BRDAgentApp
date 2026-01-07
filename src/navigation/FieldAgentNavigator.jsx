// src/navigation/FieldAgentNavigator.js
import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Icon from 'react-native-vector-icons/Ionicons';

// Field Investigation Screens
import Dashboard from '../screens/fieldInvestigation/Dashboard';
import TaskBucket from '../screens/fieldInvestigation/TaskBucket';
import AddNewScreen from '../screens/fieldInvestigation/AddNewScreen';
import Profile from '../screens/fieldInvestigation/Profile';

const COLORS = {
  primary: '#5D6AFF',
  white: '#FFFFFF',
  gray200: '#E5E7EB',
  gray500: '#6B7280',
};

const Tab = createBottomTabNavigator();

const FieldAgentNavigator = () => {
  return (
    <Tab.Navigator
      screenOptions={{
        tabBarActiveTintColor: COLORS.primary,
        tabBarInactiveTintColor: COLORS.gray500,
        tabBarStyle: {
          backgroundColor: COLORS.white,
          borderTopWidth: 1,
          borderTopColor: COLORS.gray200,
          height: 60,
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
        component={Dashboard}
        options={{
          tabBarIcon: ({ color, size }) => (
            <Icon name="home" size={size} color={color} />
          ),
        }}
      />
      <Tab.Screen 
        name="Cases" 
        component={TaskBucket}
        options={{
          tabBarIcon: ({ color, size }) => (
            <Icon name="clipboard" size={size} color={color} />
          ),
          tabBarBadge: 8,
        }}
      />
      <Tab.Screen 
        name="Add" 
        component={AddNewScreen}
        options={{
          tabBarIcon: ({ color, size }) => (
            <Icon name="add-circle" size={size + 8} color={color} />
          ),
          tabBarLabel: '',
        }}
      />
      <Tab.Screen 
        name="Profile" 
        component={Profile}
        options={{
          tabBarIcon: ({ color, size }) => (
            <Icon name="person" size={size} color={color} />
          ),
        }}
      />
    </Tab.Navigator>
  );
};

export default FieldAgentNavigator;