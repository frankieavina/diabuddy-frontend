import { StyleSheet, Text, View } from 'react-native';
import React from 'react';
import { Input } from "@rneui/themed";

const BasalTestCard = () => {
  return (
    <View style={styles.basalContainer}>
        <View style={styles.lineContainer}>
            <Text>Start:</Text>
            <Input
                placeholder='BASIC INPUT'
            />
        </View>
        <View>
            <Text>Hello</Text>
        </View>
    </View>
  )
}

export default BasalTestCard

const styles = StyleSheet.create({
    basalContainer:{
        flex:1,
        flexDirection: 'row',

    },
    lineContainer:{
        flex:1,
        flexDirection: 'row',
        width: '50%'
    }
})