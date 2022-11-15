import React, { useState } from 'react';
import { Alert, Modal, StyleSheet, Text, Pressable, View, TextInput,ScrollView, Keyboard, TouchableWithoutFeedback } from 'react-native';
import { Colors } from '../../../utils/constants/colors';
import { Card, Input } from "@rneui/themed";
import { Ionicons } from '@expo/vector-icons';
import getCarbs from '../../api/FoodAPI';


const FoodModal = ({onVisible, modalVisible,setTotalCarbs}) => {
    const [searchText, setSearchText] = useState('');

    const searchFood = async() =>{
        const arrayFood = searchText.trim().split(/\s+/);
        await getCarbs(arrayFood)
          .then((total) =>{
            setTotalCarbs(total);
          }); 
        onVisible();
    }

    return (
      
      <View style={styles.centeredView}>
        
        <Modal
          animationType="slide"
          transparent={true}
          visible={modalVisible}
          onRequestClose={() => {
            Alert.alert('Modal has been closed.');
            onVisible();
          }}>
          <View style={styles.centeredView}>
            <View style={styles.modalView}>
              {/* ///////////////////////////////////// */}
              <Text>Please separate food with space.</Text>
                <Card style={styles.formContent}>
                    <View style={styles.form}>
                    <TextInput
                        blurOnSubmit={true}
                        multiline={true}
                        numberOfLines={4}
                        onChangeText={(text) => setSearchText(text)}
                        value={searchText}
                        style={{ width:200, height:200, textAlignVertical: 'top'}}
                    />
                    </View>
                </Card>
              {/* //////////////////////////////////// */}
              <View style={styles.buttonContainer}>
                <Pressable
                    style={[styles.button, styles.buttonClose]}
                    onPress={onVisible}>
                    <Text style={styles.textStyle}>Cancel</Text>
                </Pressable>
                <Pressable
                    style={[styles.button, styles.buttonClose]}
                    onPress={searchFood}
                >
                  <Text style={styles.textStyle}>Add</Text>
                </Pressable>            
              </View>

            </View>
          </View>
        </Modal>
      </View>
      
    );
}

export default FoodModal

const styles = StyleSheet.create({
    centeredView: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 22,
      },
      modalView: {
        margin: 20,
        backgroundColor: 'white',
        borderRadius: 20,
        padding: 35,
        alignItems: 'center',
        shadowColor: '#000',
        shadowOffset: {
          width: 0,
          height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 4,
        elevation: 5,
      },
      button: {
        borderRadius: 20,
        padding: 10,
        elevation: 2,
        margin: 5
      },
      buttonClose: {
        backgroundColor: Colors.primary500,
      },
      buttonContainer:{
        flexDirection: 'row',
        marginTop: 10
      },
      formContent:{
        padding: 16,
        color: Colors.primary500,
        borderRadius: 4,
        elevation: 2,
        shadowColor: 'black',
        shadowOffset: { width: 1, height: 1 },
        shadowOpacity: 0.35,
        shadowRadius: 4,
        marginBottom: 20
      },
      textStyle: {
        color: 'white',
        fontWeight: 'bold',
        textAlign: 'center',
      },
      modalText: {
        marginBottom: 15,
        textAlign: 'center',
      },
})