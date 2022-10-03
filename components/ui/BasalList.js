import React, { useState } from 'react'
import { FlatList, SafeAreaView, StatusBar, StyleSheet, Text, TouchableOpacity } from "react-native";
import { Colors } from '../../constants/colors';
import { Ionicons } from '@expo/vector-icons';
import { Badge } from "@rneui/themed";

const DATA = [
    {
      id: "1",
      title: "Start:",
      dateTime: "127 mg/dL"
    },
    {
      id: "2",
      title: "+1:",
      dateTime: '230 mg/dL'
    },
    {
      id: "3",
      title: "+2:",
      dateTime: '80 mg/dL'
    },
  ];

  const Item = ({ item, onPress, backgroundColor, textColor }) => (
    <TouchableOpacity onPress={onPress} style={[styles.item, backgroundColor]}>
      <Text style={[styles.title, textColor]}>{item.title}</Text>
      <Badge status="primary" value={item.dateTime} badgeStyle={{backgroundColor: Colors.primary700, marginTop:5}}/>
      <Ionicons name="trash-outline" size={30} color={Colors.primary700} />
    </TouchableOpacity>
  );

const BasalList = () => {
    const [selectedId, setSelectedId] = useState(null);

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

  return (
    <SafeAreaView style={styles.container}>
        <FlatList
            data={DATA}
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
        margin: 20,
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
        fontWeight: 'bold'
      },
})