import 'react-native-gesture-handler'
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, SafeAreaView } from 'react-native';
import { NavigationContainer } from '@react-navigation/native'
// provides a native React view that transitions between multiple colors in a linear direction.

import DrawerNavigator from './navigation/DrawerNavigation';
import LandingStackNavigator from './navigation/StackNavigation';
const user = false; 

export default function App() {
  return (
  <>
    <StatusBar style='light'/>
    {/* <SafeAreaView style={styles.rootScreen}> */}
    <NavigationContainer>
      { user ?
        <DrawerNavigator/>
      :
        <LandingStackNavigator/> 
      }
    </NavigationContainer>
    {/* </SafeAreaView>  */}
  </>
  );
}

const styles = StyleSheet.create({
  rootScreen: {
    flex: 1,
  }
});