import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Ionicons } from '@expo/vector-icons';

import BasalTestingScreen from '../screens/BasalTestingScreen';
import DashboardScreen from '../screens/DashboardScreen';
import AddFoodScreen from '../screens/AddFoodScreen';
import MonthLogScreen from '../screens/MonthLogScreen';

const Tab = createBottomTabNavigator();

const BottomTabNavigator = () => {
  return (
    <Tab.Navigator screenOptions={{ headerShown: false }}>
      <Tab.Screen name="Dashboard" component={DashboardScreen} options={{ tabBarIcon: ({color,size}) => (<Ionicons name='home' color={color} size={size}/>) }}/>
      <Tab.Screen name="Bolus" component={AddFoodScreen} options={{ tabBarIcon: ({color,size}) => (<Ionicons name='nutrition' color={color} size={size}/>) }}/>
      <Tab.Screen name="History" component={MonthLogScreen} options={{ tabBarIcon: ({color,size}) => (<Ionicons name='calendar' color={color} size={size}/>) }}/>
      <Tab.Screen name="Testing" component={BasalTestingScreen} options={{ tabBarIcon: ({color,size}) => (<Ionicons name='heart-circle' color={color} size={size}/>) }} />
    </Tab.Navigator>
  )
}

export default BottomTabNavigator