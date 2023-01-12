import { Pressable, View, StyleSheet, Text, TouchableOpacity } from "react-native";
import React, {useEffect, useState} from 'react';
import { Colors } from '../../../utils/constants/colors';
import { Ionicons } from '@expo/vector-icons';
import { Chip } from "@rneui/themed";

import Messaging from "./Messaging";

const PatientList = ({data, onMessage}) => {
    const [selectedId, setSelectedId] = useState(null);
    const [roleName, setRoleName] = useState('');

    useEffect(()=>{
        const role = () =>{
           if(data.roleId == 1){setRoleName('Patient')}
           if(data.roleId == 2){setRoleName('Admin')}
           if(data.roleId == 3){setRoleName('Doctor')}
        }
        role(); 
    },[])

    const backgroundColor = data.id === selectedId ? Colors.icon800 : 'white';
    const textColor = data.id === selectedId ? Colors.icon500 : Colors.icon500;

    const onPress = () =>{
      setSelectedId(data.id);
    }

  return (
    <View style={styles.list}>
      <TouchableOpacity onPress={onPress} style={[styles.item, backgroundColor]}>
          <Chip status="primary" title={data.name} titleStyle={{fontSize: 20}} buttonStyle={{backgroundColor: Colors.primary700, marginTop:5, padding: 0}}/>
          <Text style={[styles.title, textColor]}>{roleName}</Text>
      </TouchableOpacity>
      <Pressable style={styles.trash} onPress={onMessage}>
          <Ionicons name="chatbox-outline" size={30} color={Colors.primary700} />
      </Pressable>
    </View>
  )
}

export default PatientList

const styles = StyleSheet.create({
    container: {
        flex: 1,
        marginRight: 20,
        marginLeft: 10,
        marginBottom: 20,
      },
      item: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        padding: 12,
        width: '75%',
        marginVertical: 8,
        marginHorizontal: 16,
        borderRadius: 4,
        elevation: 2,
        shadowColor: 'black',
        shadowOffset: { width: 1, height: 1 },
        shadowOpacity: 0.35,
        shadowRadius: 4,
      },
      title: {
        fontSize: 15,
        fontWeight: 'bold',
        padding: 5,
        paddingRight: 0,
      },
      list:{
        flexDirection: 'row',
        justifyContent: 'center',
        marginRight: 40
      },
      trash:{
        marginTop:17
      }
})