// src/navigation/BottomTabNavigator.js
import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Icon from 'react-native-vector-icons/Ionicons';
import { COLORS, ROLES } from '../utils/constants';

// Common Screens
import Dashboard from '../screens/common/Dashboard';
import Profile from '../screens/common/Profile';

// Field Investigation Screens
import TaskBucket from '../screens/fieldInvestigation/TaskBucket';
import RouteMap from '../screens/fieldInvestigation/RouteMap';

// Collection Screens
import DelinquencyList from '../screens/collection/DelinquencyList';
import PaymentCollection from '../screens/collection/PaymentCollection';

// Channel Partner Screens
import LeadList from '../screens/channelPartner/LeadList';
import LeadCreation from '../screens/channelPartner/LeadCreation';

const Tab = createBottomTabNavigator();

const BottomTabNavigator = ({ userRole }) => {
  
  // Field Investigation Tabs
  const renderFITabs = () => (
    <>
      <Tab.Screen 
        name="Dashboard" 
        component={Dashboard}
        options={{
          tabBarIcon: ({ color, size }) => (
            <Icon name="home" size={size} color={color} />
          ),
          headerShown: false
        }}
      />
      <Tab.Screen 
        name="Tasks" 
        component={TaskBucket}
        options={{
          tabBarIcon: ({ color, size }) => (
            <Icon name="clipboard" size={size} color={color} />
          ),
          tabBarBadge: 8, // Dynamic count
          headerShown: false
        }}
      />
      <Tab.Screen 
        name="Route" 
        component={RouteMap}
        options={{
          tabBarIcon: ({ color, size }) => (
            <Icon name="map" size={size} color={color} />
          ),
          headerShown: false
        }}
      />
      <Tab.Screen 
        name="Profile" 
        component={Profile}
        options={{
          tabBarIcon: ({ color, size }) => (
            <Icon name="person" size={size} color={color} />
          ),
          headerShown: false
        }}
      />
    </>
  );

  // Collection Agent Tabs
  const renderCollectionTabs = () => (
    <>
      <Tab.Screen 
        name="Dashboard" 
        component={Dashboard}
        options={{
          tabBarIcon: ({ color, size }) => (
            <Icon name="home" size={size} color={color} />
          ),
          headerShown: false
        }}
      />
      <Tab.Screen 
        name="Cases" 
        component={DelinquencyList}
        options={{
          tabBarIcon: ({ color, size }) => (
            <Icon name="list" size={size} color={color} />
          ),
          tabBarBadge: 15, // Dynamic count
          headerShown: false
        }}
      />
      <Tab.Screen 
        name="Collect" 
        component={PaymentCollection}
        options={{
          tabBarIcon: ({ color, size }) => (
            <Icon name="cash" size={size} color={color} />
          ),
          headerShown: false
        }}
      />
      <Tab.Screen 
        name="Profile" 
        component={Profile}
        options={{
          tabBarIcon: ({ color, size }) => (
            <Icon name="person" size={size} color={color} />
          ),
          headerShown: false
        }}
      />
    </>
  );

  // Channel Partner Tabs
  const renderChannelPartnerTabs = () => (
    <>
      <Tab.Screen 
        name="Dashboard" 
        component={Dashboard}
        options={{
          tabBarIcon: ({ color, size }) => (
            <Icon name="home" size={size} color={color} />
          ),
          headerShown: false
        }}
      />
      <Tab.Screen 
        name="Leads" 
        component={LeadList}
        options={{
          tabBarIcon: ({ color, size }) => (
            <Icon name="people" size={size} color={color} />
          ),
          headerShown: false
        }}
      />
      <Tab.Screen 
        name="Add" 
        component={LeadCreation}
        options={{
          tabBarIcon: ({ color, size }) => (
            <Icon name="add-circle" size={size} color={color} />
          ),
          tabBarButton: (props) => (
            <Tab.Screen
              {...props}
              style={{
                top: -10,
              }}
            />
          ),
          headerShown: false
        }}
      />
      <Tab.Screen 
        name="Profile" 
        component={Profile}
        options={{
          tabBarIcon: ({ color, size }) => (
            <Icon name="person" size={size} color={color} />
          ),
          headerShown: false
        }}
      />
    </>
  );

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
      }}
    >
      {userRole === ROLES.FIELD_INVESTIGATION && renderFITabs()}
      {userRole === ROLES.COLLECTION && renderCollectionTabs()}
      {userRole === ROLES.CHANNEL_PARTNER && renderChannelPartnerTabs()}
    </Tab.Navigator>
  );
};

export default BottomTabNavigator;