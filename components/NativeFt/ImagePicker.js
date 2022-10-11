import { Alert, Image, StyleSheet, Text, View } from 'react-native';
import { Button } from '@rneui/themed';
import {
  launchCameraAsync,
  useCameraPermissions,
  PermissionStatus,
} from 'expo-image-picker';
import { useState } from 'react';
import { useNavigation } from '@react-navigation/native';
import { useDispatch } from 'react-redux';
import { setProfileImage } from '../../store/UserSlice';

import { Colors } from '../../constants/colors';

function ImagePicker() {
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const [pickedImage, setPickedImage] = useState();

  const [cameraPermissionInformation, requestPermission] = useCameraPermissions();

  const onSave = () => {
    // set image picked in user slice 
    dispatch(setProfileImage(pickedImage));
    navigation.navigate('LandingPage');
  }

  async function verifyPermissions() {
    if (cameraPermissionInformation.status === PermissionStatus.UNDETERMINED) {
      const permissionResponse = await requestPermission();

      return permissionResponse.granted;
    }

    if (cameraPermissionInformation.status === PermissionStatus.DENIED) {
      Alert.alert(
        'Insufficient Permissions!',
        'You need to grant camera permissions to use this app.'
      );
      return false;
    }

    return true;
  }

  async function takeImageHandler() {
    const hasPermission = await verifyPermissions();

    if (!hasPermission) {
      return;
    }

    const image = await launchCameraAsync({
      allowsEditing: true,
      aspect: [16, 9],
      quality: 0.5,
    });

    setPickedImage(image.uri);
  }

  let imagePreview = <Text>No image taken yet.</Text>;

  if (pickedImage) {
    imagePreview = <Image style={styles.image} source={{ uri: pickedImage }} />;
  }

  return (
    <View>
      <View style={styles.imagePreview}>{imagePreview}</View>
      <View style={styles.buttonContainer}>
        <Button type="outline" buttonStyle={{borderColor: Colors.primary500}} titleStyle={{ color: Colors.primary500}} onPress={onSave}>
          Save
        </Button> 
        <Button buttonStyle={styles.button} onPress={takeImageHandler}>
          Take Image
        </Button>
        <Button type="outline" buttonStyle={{borderColor: Colors.primary500}} titleStyle={{ color: Colors.primary500}} onPress={() =>{ navigation.navigate('LandingPage')}}>
          Cancel
        </Button>        
      </View>

    </View>
  );
}

export default ImagePicker;

const styles = StyleSheet.create({
  imagePreview: {
    width: '100%',
    height: 200,
    marginBottom: 20,
    marginTop:20,
    marginVertical: 8,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'white',
    borderRadius: 4,
    elevation: 2,
    shadowColor: 'black',
    shadowOffset: { width: 1, height: 1 },
    shadowOpacity: 0.35,
    shadowRadius: 4,
  },
  image: {
    width: '100%',
    height: '100%',
  },
  button:{
    backgroundColor: Colors.primary500
  },
  buttonContainer:{
    marginTop: 20,
    flexDirection: 'row',
    justifyContent: 'space-around'
  }
});