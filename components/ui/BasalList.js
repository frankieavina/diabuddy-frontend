import React, { useState } from 'react'
import { FlatList, Pressable, SafeAreaView, StatusBar, StyleSheet, Text, TouchableOpacity } from "react-native";
import { Colors } from '../../constants/colors';
import { Ionicons } from '@expo/vector-icons';
import { Badge } from "@rneui/themed";

const Item = ({ item, onPress, backgroundColor, textColor }) => (
  <TouchableOpacity onPress={onPress} style={[styles.item, backgroundColor]}>
    <Text style={[styles.title, textColor]}>{item.numberOfTest}</Text>
    <Badge status="primary" value={item.glucose} badgeStyle={{backgroundColor: Colors.primary700, marginTop:5}}/>
    <Pressable>
      <Ionicons name="trash-outline" size={30} color={Colors.primary700} />
    </Pressable>
  </TouchableOpacity>
);

const BasalList = ({ basalTests }) => {
    const [selectedId, setSelectedId] = useState(null);

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
        marginLeft: 20,
        marginBottom: 20,
      },
      item: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        padding: 12,
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
})