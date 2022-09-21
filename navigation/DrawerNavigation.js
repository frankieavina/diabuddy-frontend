import { Ionicons } from '@expo/vector-icons';
import { createDrawerNavigator, DrawerContentScrollView, DrawerItemList, DrawerItem } from '@react-navigation/drawer';
import { View } from 'react-native';

import DashboardScreen from '../screens/DashboardScreen';
import BasalTestingScreen from '../screens/BasalTestingScreen';
import TabNavigator from '../navigation/TabNavigation';
import { Colors } from '../constants/colors';


const Drawer = createDrawerNavigator();

const screenOptionStyle = {
    headerStyle: { backgroundColor: Colors.primary500 },
    headerTintColor: 'white',
    sceneContainerStyle: { backgroundColor: Colors.primary800 },
    drawerContentStyle: { backgroundColor: 'white' },
    drawerInactiveTintColor: 'white',
    drawerActiveTintColor: Colors.primary500,
    drawerActiveBackgroundColor: Colors.primary800,
};

export default function DrawerNavigator() {
    return (
      <Drawer.Navigator screenOptions={screenOptionStyle} drawerContent={props=><AppDrawerContent {...props}/>} >
        <Drawer.Screen name="home" component={TabNavigator} options={{ drawerIcon: ({ color, size }) => (<Ionicons name="home" color={color} size={size} />),}}/>
      </Drawer.Navigator>
    );
  }

  function AppDrawerContent(props){
    return (
       <DrawerContentScrollView {...props} contentContainerStyle={{flex:1}}>
         {/*all of the drawer items*/}
         <DrawerItemList {...props}  style={{borderWidth:1}}/>
         <View style={{flex:1,marginVertical:20,borderWidth:1}}>
           {/* here's where you put your logout drawer item*/}
           <DrawerItem 
             label="Log out"
             icon={({color,size}) => (<Ionicons name='log-out-outline' color={color} size={size}/>)}
             onPress={()=>{
               AsyncStorage.clear();
               props.navigation.replace("loginScreen");
             }}
             style={{flex:1,justifyContent:'flex-end'}}
           />
         </View>
       </DrawerContentScrollView>
     );
   }

