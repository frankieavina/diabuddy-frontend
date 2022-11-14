import React from 'react';
import { View, StyleSheet } from 'react-native';
import Colors from '../../../utils/constants/colors';

function SmallCard({children}) {
  return (
    <View style={styles.card}>
        {children}
    </View>
  )
}

export default SmallCard

const styles = StyleSheet.create({
    card:{
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 35, 
        marginHorizontal: 24,
        borderRadius: 8,
        padding: 16,
        backgroundColor: Colors.primary800,
        elevation: 4 , // adds shadow on Android
        shadowColor: 'black', // adding shadow on iOS
        shadowOffset: {width: 0,height: 2}, 
        shadowRadius: 6,
        shadowOpacity: 0.25
      }
})