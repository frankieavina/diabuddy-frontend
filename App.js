/* eslint-disable no-unused-vars */
/* eslint-disable react/react-in-jsx-scope */
import 'react-native-gesture-handler'
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, SafeAreaView } from 'react-native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { Colors } from './constants/colors';
import { NavigationContainer } from '@react-navigation/native';
import { Provider, useDispatch, useSelector } from 'react-redux';

import DrawerNavigator from './navigation/DrawerNavigation';
import LandingScreen from './screens/LandingScreen';
import SignInScreen from './screens/SignInScreen';
import SignUpScreen from './screens/SignUpScreen';
import DashboardScreen from './screens/DashboardScreen';
import IconButton from './components/ui/IconButton';
import { setLogout } from './store/UserSlice';
import store from './store';
import { useEffect, useState } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

const Stack = createNativeStackNavigator();

export default function App() {
  return (
  <>
    <Provider store={store}>
      <StatusBar style='light'/>
      <Navigation/>      
    </Provider>
  </>
  );
}

////////////////// if user hasnt logged in yet ////////////////
function AuthStack() {
  return (
    <Stack.Navigator
      screenOptions={{
        headerStyle: { backgroundColor: Colors.primary500 },
        headerTintColor: 'white',
      }}
    >
      <Stack.Screen name='LandingPage' component={LandingScreen}/>
      <Stack.Screen name="Login" component={SignInScreen} />
      <Stack.Screen name="Signup" component={SignUpScreen} /> 
    </Stack.Navigator>
  );
}

////////////////// if user logged in ////////////////
function AuthenticatedStack() {
  return (
    <Stack.Navigator
      screenOptions={{
        headerStyle: { backgroundColor: Colors.primary500 },
        headerTintColor: 'white',
        contentStyle: { backgroundColor: Colors.primary700 },
      }}
    >
      <Stack.Screen name='LandingPage' component={DrawerNavigator} 
        options={{
          headerShown: false
        }} 
      />
    </Stack.Navigator>
  );
}

//////////// switches between logged in or landing page////////
function Navigation() {
  const isAuthenticated = useSelector((state) => state.UserData.loggedIn);
  const dispatch = useDispatch();

  useEffect(() => {
    async function fetchUserExist(){
      const storedUser = await AsyncStorage.getItem('token');
      if(storedUser){
        dispatch(userLoggedIn());
      }
    }
    fetchUserExist();
  },[]);

  return (
    // add a dynamic variable from userslice that changes from
    // AuthStack to AuthenticatedStack 
    <NavigationContainer>
      { (isAuthenticated)
        ?
          <AuthenticatedStack />
        :
          <AuthStack />
      }
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  rootScreen: {
    flex: 1,
  }
});