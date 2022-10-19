import { FlatList, Pressable, SafeAreaView, StyleSheet, Text, View } from 'react-native';
import React , { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { Input } from "@rneui/themed";
import { Colors } from '../constants/colors';
import { Button } from '@rneui/themed';
import { Icon, Card} from "@rneui/themed";
import { Ionicons } from '@expo/vector-icons';
import DateTimePickerModal from "react-native-modal-datetime-picker";
import moment from 'moment';
import ListCard from '../components/ui/ListCard';
import * as Notifications from 'expo-notifications';
import * as Permissions from 'expo-permissions';
import { StatusBar } from 'expo-status-bar';
import { addReminder } from '../store/ReminderSlice';

// settings for notification so just show alert (no sound or badge)
Notifications.setNotificationHandler({
  handleNotification: async () => {
    return {
      shouldPlaySound: false,
      shouldSetBadge: false,
      shouldShowAlert: true
    };
  }
});

const ReminderScreen = () => {
  const now = moment();
  const [name, setName] = useState('');
  const [dateTime, setDateTime] = useState(now.format("MM DD YYYY hh:mm"));
  const [isDatePickerVisible, setDatePickerVisibility] = useState(false);
  const [show, setShow] = useState(false);
  const input = React.createRef();
  const dispatch = useDispatch();

  //************** local handler ******************************//
  useEffect(() => {
    // receiving notification(s) and handling them
    const subscription1 = Notifications.addNotificationReceivedListener((notification) => {
      console.log('NOTIFICATION RECEIVED');
      console.log(notification);
      const userName = notification.request.content.data.userName;
      console.log(userName);
    });

    // reacting to incoming notification(s)
    const subscription2 = Notifications.addNotificationResponseReceivedListener((response) => {
      console.log('NOTIFICATION RESPONSE RECEIVED');
      console.log(response);
      const userName = response.notification.request.content.data.userName;
      console.log(userName);
    });

    return () => {
      subscription1.remove();
      subscription2.remove();
    };
  }, []);

  // function for iOS for permission
  useEffect(() => {
    Permissions.getAsync(Permissions.NOTIFICATIONS)
      .then((statusObj) => {
        if (statusObj.status !== 'granted') {
          return Permissions.askAsync(Permissions.NOTIFICATIONS)
        }
        return statusObj;
      })
      .then((statusObj) => {
        if (statusObj.status !== 'granted') {
          return;
        }
      });
  }, []);

  //********************* scheduling notification(s) *****************/
  const scheduleNotificationHandler = async () => {
    await Notifications.scheduleNotificationAsync({
      content: {
        title: "You've got mail! 📬",
        body: 'Here is the notification body',
        data: { userName: 'Max' }
      },
      trigger: {
        seconds: 5
      }
    });
  }

  const showDatePicker = () => {
    setDatePickerVisibility(true);
  };

  const hideDatePicker = () => {
    setDatePickerVisibility(false);
    toggleShowAlarm();
  };

  const handleConfirm = (date) => {
    const d = moment(date);
    const m = d.format("LLL")
    setDateTime(m);
    hideDatePicker();
  };

  const onSubmit = () => {
    dispatch(addReminder({name, dateTime}))
    scheduleNotificationHandler();
  }

  const toggleShowAlarm = () =>{
    setShow(!show);
  }


  return (
    <View style={styles.notificationContainer}>
      {show? 
      <Card style={styles.formContent}>
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
          <Button buttonStyle={{backgroundColor:Colors.primary500}} onPress={toggleShowAlarm}>
            Cancel
          </Button> 
        </View>
      </Card>
      : 
        <View style={styles.buttonsContainer}>
          <Text style={{fontSize: 25, color:Colors.icon500}}>Add Alarm</Text>
          <Pressable onPress={toggleShowAlarm}>
            <Ionicons name="add-circle-outline" size={30} color={Colors.primary700} />
          </Pressable>
        </View>
      }
      <ListCard/> 
    </View>

  )
}

export default ReminderScreen

const styles = StyleSheet.create({
  formContent:{
    //marginTop: 64,
   // marginHorizontal: 32,
    padding: 16,
    color: Colors.primary500,
    borderRadius: 4,
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
  },
  buttonsContainer:{
    margin: 20,
    padding: 20,
    flexDirection: 'row',
    justifyContent: 'flex-start'
  }
})