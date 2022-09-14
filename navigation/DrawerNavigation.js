import { Ionicons } from '@expo/vector-icons';
import { createDrawerNavigator } from '@react-navigation/drawer';

import DashboardScreen from '../screens/DashboardScreen';
import BasalTestingScreen from '../screens/BasalTestingScreen';
import TabNavigator from '../navigation/TabNavigation';


const Drawer = createDrawerNavigator();

const screenOptionStyle = {
    headerStyle: { backgroundColor: '#351401' },
    headerTintColor: 'white',
    sceneContainerStyle: { backgroundColor: '#3f2f25' },
    drawerContentStyle: { backgroundColor: '#351401' },
    drawerInactiveTintColor: 'white',
    drawerActiveTintColor: '#351401',
    drawerActiveBackgroundColor: '#e4baa1',
};

export default function DrawerNavigator() {
    return (
      <Drawer.Navigator screenOptions={screenOptionStyle}>
        <Drawer.Screen name="home" component={TabNavigator} options={{ drawerIcon: ({ color, size }) => (<Ionicons name="home" color={color} size={size} />),}}/>
        {/* <Drawer.Screen
          name="BasalTesting"
          component={BasalTestingScreen}
          options={{
            drawerIcon: ({ color, size }) => (
              <Ionicons name="blood" color={color} size={size} />
            ),
          }}
        /> */}
      </Drawer.Navigator>
    );
  }