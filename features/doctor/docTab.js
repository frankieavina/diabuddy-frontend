import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Ionicons } from '@expo/vector-icons';

import DashboardScreen from './screens/DashboardScreen';
import PatientBasal from './screens/PatientBasal';
import PatientBolus from './screens/PatientBolus';

const Tab = createBottomTabNavigator();

const DocBottomTabs = () => {
  return (
    <Tab.Navigator screenOptions={{ headerShown: false }}>
      <Tab.Screen name="Dashboard" component={DashboardScreen} options={{ tabBarIcon: ({color,size}) => (<Ionicons name='home' color={color} size={size}/>) }}/>
      <Tab.Screen name="Patient Bolus" component={PatientBolus} options={{ tabBarIcon: ({color,size}) => (<Ionicons name='nutrition' color={color} size={size}/>) }}/>
      <Tab.Screen name="Patient Basal" component={PatientBasal} options={{ tabBarIcon: ({color,size}) => (<Ionicons name='calendar' color={color} size={size}/>) }}/>
    </Tab.Navigator>
  )
}

export default DocBottomTabs