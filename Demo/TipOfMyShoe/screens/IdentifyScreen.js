import React from 'react';
import {
  Image,
  Platform,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  Alert,
} from 'react-native';

import { Ionicons } from '@expo/vector-icons';
import * as Permissions from 'expo-permissions';
import * as ImagePicker from 'expo-image-picker';

import Colors from '../constants/Colors';

export default class IdentifyScreen extends React.PureComponent {

  componentDidMount() {
    this.getPermissionAsync(Permissions.CAMERA_ROLL);
    this.getPermissionAsync(Permissions.CAMERA);
  }

  render() {
    return (
      <View style={styles.container}>
          <View style={styles.logoContainer}>
            <Image
              source={require('../assets/images/icon.png')}
              style={styles.logoImage}
            />
          </View>
          <View style={styles.instructionContainer}>
            <Text style={styles.instructionText}>
              Upload an image of some shoes 
              and we'll try to identify them for you!
            </Text>
          </View>
          <View style={styles.bodyContainer}>
            <View style={styles.mainContainer}>
              <TouchableOpacity onPress={this._takeImage} style={{backgroundColor: '#68a0cf', borderColor: '#fff', borderWidth: 1, borderRadius: 10}}>
                <View style={{justifyContent: "space-between", flexDirection: "row", alignItems: "center", paddingRight: 6}}>
                  <Ionicons
                    name="ios-camera"
                    size={80}
                    style={{paddingHorizontal: 10}}
                    color="#fff"
                  />
                  <Text style={styles.mainButtonText}>
                    From Camera
                  </Text>
                </View>
              </TouchableOpacity>
              <TouchableOpacity onPress={this._pickImage} style={{backgroundColor: '#68a0cf', borderColor: '#fff', borderWidth: 1, borderRadius: 10, marginTop: 20}}>
                <View style={{justifyContent: "space-between", flexDirection: "row", alignItems: "center", paddingRight: 6}}>
                  <Ionicons
                    name="ios-photos"
                    size={80}
                    style={{paddingHorizontal: 10}}
                    color="#fff"
                  />
                  <Text style={styles.mainButtonText}>
                    From Library
                  </Text>
                </View>
              </TouchableOpacity>
  
          </View>
          <View style={{flex: 1}}></View>
        </View>
        <View style={styles.footerContainer}>
          <Text style={styles.footerText}>
            Warning: Super duper alpha version
          </Text>
        </View>
      </View>
    );
  }

  getPermissionAsync = async (permission) => {
    const { status } = await Permissions.askAsync(permission);
    if (status !== 'granted') {
      Alert.alert("You must enable the camera and/or camera roll permissions in settings to continue using the app!");
    }
  };

  _takeImage = async () => {
    let result = await ImagePicker.launchCameraAsync({
      allowsEditing: true,
      allowsMultipleSelection: false,
      quality: 1,
      base64: true,
      mediaTypes: ImagePicker.MediaTypeOptions.Images
    });

    const { navigate } = this.props.navigation;
    navigate('Result', { imageUri: result.uri, imageBase64: result.base64 });
  };

  _pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsMultipleSelection: false,
      allowsEditing: true,
      base64: true,
      quality: 1
    });

    const { navigate } = this.props.navigation;
    navigate('Result', { imageUri: result.uri, imageBase64: result.base64 });
  };
}

IdentifyScreen.navigationOptions = {
  header: null,
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 30,
    backgroundColor: '#fff',
  },
  bodyContainer: {
    flex: 10,
  },
  instructionContainer: {
    marginTop: 20,
    alignItems: 'center',
    marginHorizontal: 50,
  },
  instructionText: {
    fontSize: 17,
    color: 'rgba(96,100,109, 1)',
    lineHeight: 24,
    textAlign: 'center',
  },
  footerContainer: {
    flex: 1,
    ...Platform.select({
      ios: {
        shadowColor: 'black',
        shadowOffset: { width: 0, height: -3 },
        shadowOpacity: 0.1,
        shadowRadius: 3,
      },
      android: {
        elevation: 20,
      },
    }),
    alignItems: 'center',
    backgroundColor: '#fbfbfb',
    paddingVertical: 5,
    justifyContent: 'center'
  },
  logoContainer: {
    alignItems: 'center',
    marginTop: 10,
  },
  logoImage: {
    width: 300,
    height: 150,
    resizeMode: 'contain',
    marginTop: 3,
    marginLeft: -10,
  },
  mainContainer: {
    flex: 4,
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    marginHorizontal: 10,
  },
  mainButtonText: {
    fontSize: 50,
    color: '#fff',
    lineHeight: 56,
    textAlign: 'center',
  },
  getStartedText: {
    fontSize: 17,
    color: 'rgba(96,100,109, 1)',
    lineHeight: 24,
    textAlign: 'center',
  },
  footerText: {
    fontSize: 17,
    color: 'rgba(96,100,109, 1)',
    textAlign: 'center',
  },
});
