import { useState } from 'react';
import { Ionicons } from '@expo/vector-icons';
import { createDrawerNavigator, DrawerContentScrollView, DrawerItemList, DrawerItem } from '@react-navigation/drawer';
import { View } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useDispatch } from 'react-redux';
import { useEffect } from 'react';

import DashboardScreen from '../screens/DashboardScreen';
import BasalTestingScreen from '../screens/BasalTestingScreen';
import TabNavigator from '../navigation/TabNavigation';
import { Colors } from '../constants/colors';
import { getFocusedRouteNameFromRoute } from '@react-navigation/native';
import { setLogout } from '../store/UserSlice';


const Drawer = createDrawerNavigator();

const screenOptionStyle = {
    headerStyle: { backgroundColor: Colors.primary500 },
    headerTintColor: 'white',
    sceneContainerStyle: { backgroundColor: Colors.primary800 },
    drawerContentStyle: { backgroundColor: 'white' },
    drawerInactiveTintColor: Colors.primary500,
    drawerActiveTintColor: Colors.primary500,
    drawerActiveBackgroundColor: Colors.primary800,
};

export default function DrawerNavigator() {
  const [user , setUser] = useState('User');
  useEffect(() => {
    const getUser = async () =>{
      await AsyncStorage.getItem('user')
        .then((name) => {
          setUser(name);
        })
    }
    getUser();
  },[])
  return (
    <Drawer.Navigator screenOptions={screenOptionStyle} drawerContent={props=><AppDrawerContent {...props}/>} >
      <Drawer.Screen name={user} component={TabNavigator} options={{ drawerIcon: ({ color, size }) => (<Ionicons name="home" color={color} size={size} />),}}/>
      <Drawer.Screen name='notifications' component={TabNavigator} options={{ drawerIcon: ({ color, size }) => (<Ionicons name="notifications" color={color} size={size} />),}}/>
    </Drawer.Navigator>
  );
}

function AppDrawerContent(props){
  const dispatch = useDispatch();
  
  return (
    <DrawerContentScrollView {...props} contentContainerStyle={{flex:1}}>
      {/*all of the drawer items*/}
      <DrawerItemList {...props}  style={{borderWidth:1}}/>
      <View style={{flex:1,marginVertical:20,borderWidth:1}}>
        <DrawerItem 
          label= {'Settings'}
          icon={({color,size}) => (<Ionicons name='cog-outline' color={color} size={size}/>)}
          onPress={ ()=> dispatch(setLogout()) }
          style={{flex:1,justifyContent:'flex-end'}}
        />
        <DrawerItem 
          label= {'Logout'}
          icon={({color,size}) => (<Ionicons name='log-out-outline' color={color} size={size}/>)}
          onPress={ ()=> dispatch(setLogout()) }
          style={{flex:1,justifyContent:'flex-end'}}
        />
      </View>
    </DrawerContentScrollView>
  );
}

