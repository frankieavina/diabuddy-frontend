import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Ionicons } from '@expo/vector-icons';

import DashboardScreen from './screens/DashboardScreen';
import UserBolus from './screens/UserBolus';
import UsersBasal from './screens/UsersBasal';

const Tab = createBottomTabNavigator();

const AdminBottomTabs = () => {
  return (
    <Tab.Navigator screenOptions={{ headerShown: false }}>
      <Tab.Screen name="Edit Users" component={DashboardScreen} options={{ tabBarIcon: ({color,size}) => (<Ionicons name='cog' color={color} size={size}/>) }}/>
      <Tab.Screen name="User Bolus History" component={UserBolus} options={{ tabBarIcon: ({color,size}) => (<Ionicons name='file-tray-full' color={color} size={size}/>) }}/>
      <Tab.Screen name="Users Basal History" component={UsersBasal} options={{ tabBarIcon: ({color,size}) => (<Ionicons name='file-tray-full' color={color} size={size}/>) }}/>
    </Tab.Navigator>
  )
}

export default AdminBottomTabs