import React, { useState } from 'react'
import { FlatList, SafeAreaView, Pressable, StatusBar, StyleSheet, Text, TouchableOpacity, View} from "react-native";
import { Colors } from '../../constants/colors';
import { Ionicons } from '@expo/vector-icons';
import { Badge } from "@rneui/themed";
import moment from 'moment';
import { useDispatch } from 'react-redux';
import { deleteReminder,getReminders } from '../../store/ReminderSlice';


  const Item = ({ item, onPress, backgroundColor, textColor, onDelete }) => (
    <View style={styles.list}>
      <TouchableOpacity onPress={onPress} style={[styles.item, backgroundColor]}>
        <Text style={[styles.title, textColor]}>{item.name}</Text>
          <Badge status="primary" value={moment(item.time).format('L').toString()} badgeStyle={{backgroundColor: Colors.primary700, marginTop:5}}/>
          <Badge status="primary" value={moment(item.time).format('LT').toString()} badgeStyle={{backgroundColor: Colors.primary700, marginTop:5}}/>
      </TouchableOpacity>
      <Pressable style={styles.trash} onPress={() => onDelete(item.id)}>
        <Ionicons name="trash-outline" size={30} color={Colors.primary700} />
      </Pressable>  
    </View>

  );

const ListCard = ({remindersData, userId}) => {
    const [selectedId, setSelectedId] = useState(null);
    const dispatch = useDispatch();

    /////////////////////////////////////////////////////////////////////////
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
              await dispatch(deleteReminder(id));
              await dispatch(getReminders(userId));
            }}
          />
        );
    };
    /////////////////////////////////////////////////////////////////////////

  return (
    <SafeAreaView style={styles.container}>
        <FlatList
            data={remindersData}
            renderItem={renderItem}
            keyExtractor={(item) => item.id}
            extraData={selectedId}
        />
    </SafeAreaView>
  )
}

export default ListCard

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
        //marginHorizontal: 10,
        borderRadius: 4,
        elevation: 2,
        shadowColor: 'black',
        shadowOffset: { width: 1, height: 1 },
        shadowOpacity: 0.35,
        shadowRadius: 4,
        width: '78%'
      },
      title: {
        fontSize: 15,
        fontWeight: 'bold',
        padding: 5,
        paddingRight: 0
      },
      list:{
        flexDirection: 'row',
        justifyContent: 'space-around'
      },
      trash:{
        marginTop:17
      }
})