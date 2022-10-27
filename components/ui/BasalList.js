import React, { useState } from 'react'
import { FlatList, Pressable, SafeAreaView, View, StyleSheet, Text, TouchableOpacity } from "react-native";
import { useDispatch } from 'react-redux';
import { Colors } from '../../constants/colors';
import { Ionicons } from '@expo/vector-icons';
import { Badge } from "@rneui/themed";

import { deleteBasalTest, getBasalTest } from '../../store/BasalTestingSlice';


const Item = ({ item, onPress, backgroundColor, textColor, onDelete }) => (
  <View style={styles.list}>
    <TouchableOpacity onPress={onPress} style={[styles.item, backgroundColor]}>
      <Text style={[styles.title, textColor]}>{item.numberOfTest}</Text>
      <Badge status="primary" value={item.glucose} badgeStyle={{backgroundColor: Colors.primary700, marginTop:5}}/>
    </TouchableOpacity>
    <Pressable style={styles.trash} onPress={() => onDelete(item.id)}>
      <Ionicons name="trash-outline" size={30} color={Colors.primary700} />
    </Pressable>
  </View>

);

const BasalList = ({ basalTests, userId }) => {
    const [selectedId, setSelectedId] = useState(null);
    const dispatch = useDispatch();

    ////////////////////////////////////////////////////////////////////////////
    const renderItem = ({ item }) => {
        const backgroundColor = item.id === selectedId ? Colors.icon800 : 'white';
        const color = item.id === selectedId ? Colors.icon500 : Colors.icon500;
    
        return (
          <Item
            item={item}
            onPress={() => setSelectedId(item.id)}
            backgroundColor={{ backgroundColor }}
            textColor={{ color }}
            onDelete={ async (id) =>{
              
              await dispatch(deleteBasalTest(id));
              await dispatch(getBasalTest(userId));
            }}
          />
        );
    };
    ////////////////////////////////////////////////////////////////////////////

  return (
    <SafeAreaView style={styles.container}>
        <FlatList
            data={basalTests}
            renderItem={renderItem}
            keyExtractor={(item) => item.id}
            extraData={selectedId}
        />
    </SafeAreaView>
  )
}

export default BasalList

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
        justifyContent: 'space-around'
      },
      trash:{
        marginTop:17
      }
})