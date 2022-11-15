import { useState } from 'react';
import { Ionicons } from '@expo/vector-icons';
import { createDrawerNavigator, DrawerContentScrollView, DrawerItemList, DrawerItem } from '@react-navigation/drawer';
import { View, Image, ImageBackground, Text, Pressable } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useDispatch, useSelector, shallowEqual } from 'react-redux';
import { useEffect } from 'react';
import { useNavigation } from '@react-navigation/native';

import TabNavigator from '../navigation/TabNavigation';
import { Colors } from '../utils/constants/colors';
import { setLogout } from '../app/redux/slices/UserSlice';
import ReminderScreen from '../screens/ReminderScreen';


const Drawer = createDrawerNavigator();

const screenOptionStyle = {
    headerTitle: '',
    headerStyle: { backgroundColor: Colors.primary500 },
    headerTintColor: 'white',
    sceneContainerStyle: { backgroundColor: Colors.primary800 },
    drawerContentStyle: { backgroundColor: 'white' },
    drawerInactiveTintColor: Colors.primary500,
    drawerActiveTintColor: Colors.primary500,
    drawerActiveBackgroundColor: Colors.primary800,
};

export default function DrawerNavigator() {

  return (
    <Drawer.Navigator 
      screenOptions={screenOptionStyle}
      drawerContent={(props) => <CustomDrawerContent {...props}/>}
    >
      <Drawer.Screen name='dashboard' component={TabNavigator} options={{ drawerIcon: ({ color, size }) => (<Ionicons name="home-outline" color={color} size={size} />),}}/>
      <Drawer.Screen name='notifications' component={ReminderScreen} options={{ drawerIcon: ({ color, size }) => (<Ionicons name="notifications-outline" color={color} size={size} />),}}/>
    </Drawer.Navigator>
  );
}

function CustomDrawerContent(props){
  const dispatch = useDispatch();
  const profilePic = useSelector((state)=> state.UserData.imageProfile); 
  const navigation = useNavigation();

  const [user , setUser] = useState('User');
  useEffect(() => {
    const getUser = async () =>{
      await AsyncStorage.getItem('user')
        .then((name) => {
          setUser(name);
        })
    }
    getUser();
  },[]);
  
  
  
  return (
    <View style={{flex:1}}>
      <DrawerContentScrollView {...props}>
        <ImageBackground source={require('../assets/images/pen.jpg')} style={{padding:30}}>
          <Pressable onPress={() =>{ navigation.navigate('Camera')}}>
            { profilePic 
              ? 
                <Image
                  source={{ uri: profilePic }}
                  style={{height: 80, width: 80, borderRadius: 40, marginBottom: 10}}
                />
              :
                <Image
                  source={require('../assets/images/profilePic.jpeg')} 
                  style={{height: 80, width: 80, borderRadius: 40, marginBottom: 10}}
                />
            }
          </Pressable>
          <Text style={{fontSize:18, margin:5}}>{user}</Text>
        </ImageBackground>
        {/*all of the drawer items(dashboard and notifications)*/}
        <DrawerItemList {...props}  style={{borderWidth:1}}/>
        <DrawerItem 
          label= {'Settings'}
          labelStyle = {{color: Colors.primary600}}
          icon={({color,size}) => (<Ionicons name='cog-outline' color={Colors.primary600} size={size}/>)}
          onPress={ ()=> dispatch(setLogout()) }
        />
        <DrawerItem 
          label= {'Logout'}
          labelStyle = {{color: Colors.primary600}}
          icon={({color,size}) => (<Ionicons name='log-out-outline' color={Colors.primary600} size={size}/>)}
          onPress={ ()=> dispatch(setLogout()) }
        />
      </DrawerContentScrollView>      
    </View>

  );
}

