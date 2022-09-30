import { Pressable, StyleSheet, Text, View } from 'react-native';
import React , {useState} from 'react';
import { Input } from "@rneui/themed";
import { Colors } from '../constants/colors';
import { Button } from '@rneui/themed';
import { Icon } from "@rneui/themed";
import { Ionicons } from '@expo/vector-icons';
import DateTimePickerModal from "react-native-modal-datetime-picker";
import moment from 'moment';

const ReminderScreen = () => {
  const now = moment();
  const [name, setName] = useState('');
  const [dateTime, setDateTime] = useState(now.format("MM DD YYYY hh:mm"));
  const [isDatePickerVisible, setDatePickerVisibility] = useState(false);
  const input = React.createRef();

  const showDatePicker = () => {
    setDatePickerVisibility(true);
  };

  const hideDatePicker = () => {
    setDatePickerVisibility(false);
  };

  const handleConfirm = (date) => {
    const d = moment(date);
    const m = d.format("LLL")
    console.log(m);
    setDateTime(m);
    hideDatePicker();
  };

  const onSubmit = () => {

  }


  return (
    <View style={styles.notificationContainer}>
      <View style={styles.formContent}>
        <View style={styles.form}>
          <Input 
            onChangeText={value => setName(value)} 
            containerStyle={{width: '100%'}} 
            label={'Name'} 
            labelStyle={{color: Colors.primary500, fontSize:12}}
          />
          <View style={styles.addDateContainer}>
            <Input 
              onChangeText={value => setDateTime(value)} 
              containerStyle={{width: '88%'}} 
              label={'Time and Date'} 
              labelStyle={{color: Colors.primary500, fontSize:12}}
              disabled={true}
              disabledInputStyle={{backgroundColor:Colors.icon700}}
            >
              {dateTime}
            </Input>
            <Pressable style={{marginTop:15}} onPress={showDatePicker}>
              <Ionicons name="ios-calendar-outline" size={30} color={Colors.primary700} />
              <DateTimePickerModal
                isVisible={isDatePickerVisible}
                mode="datetime"
                onConfirm={handleConfirm}
                onCancel={hideDatePicker}
              />
            </Pressable>
          </View>
        </View>
        <View style={styles.buttons}>
          <Button type="outline" raised buttonStyle={{borderColor:Colors.primary500, borderWidth:1}} titleStyle={{ color: Colors.primary500}} onPress={onSubmit}>
            Save
          </Button>    
          <Button buttonStyle={{backgroundColor:Colors.primary500}}>
            Cancel
          </Button> 
        </View>
      </View>    
    </View>

  )
}

export default ReminderScreen

const styles = StyleSheet.create({
  formContent:{
    marginTop: 64,
    marginHorizontal: 32,
    padding: 16,
    borderRadius: 8,
    // backgroundColor: Colors.primary800,
    borderColor: Colors.primary500,
    borderWidth: 1,
    color: Colors.primary500,
    elevation: 2,
    shadowColor: 'black',
    shadowOffset: { width: 1, height: 1 },
    shadowOpacity: 0.35,
    shadowRadius: 4,
  },
  buttons:{
    marginTop: 8,
    flexDirection: 'row',
    justifyContent: 'space-evenly'
  },
  notificationContainer:{
    flex:1,
    backgroundColor: 'white',
  },
  addDateContainer:{
    flexDirection: 'row'
  }
})