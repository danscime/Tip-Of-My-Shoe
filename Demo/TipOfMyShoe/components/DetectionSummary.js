import React from 'react';
import { 
  View ,
  StyleSheet,
  Text,
  Image,
  TouchableOpacity
} from 'react-native';

import * as ImageManipulator from 'expo-image-manipulator';

export default class DetectionSummary extends React.PureComponent {

  constructor(props) {
    super(props);

    this.state = {
      imageWidth: 150,
      imageHeight: 150,
      imageUri: ""
    };

    this.cropImage(props.imageUri);
  }

  cropImage = async (imageUri) => {
    const croppedImage = await ImageManipulator.manipulateAsync(
      imageUri, [
        { crop: {originX: this.props.detection.box_points[0], originY: this.props.detection.box_points[1], width: this.props.detection.box_points[2] - this.props.detection.box_points[0], height: this.props.detection.box_points[3] - this.props.detection.box_points[1]} }
      ],
      { compress: 1}
    );
    this.setState({
      imageWidth: croppedImage.width,
      imageHeight: croppedImage.height,
      imageUri: croppedImage.uri
    });
  }
    
  render() {
    return (
      <TouchableOpacity style={{backgroundColor: '#68a0cf', borderColor: '#fff', borderWidth: 1, borderRadius: 10}}>
      <View style={{justifyContent: "space-between", flexDirection: "row", alignItems: "center", paddingRight: 6}}>
        <View style={{
          width: 150,
          height: 150,
          overflow: 'hidden',
          marginVertical: 10,
          marginHorizontal: 10,
          borderWidth: 1,
          borderRadius: 10,
          borderColor: '#fff'
        }}>
          <Image 
            style={{
              width: 150,
              height: 150,
              resizeMode: 'stretch'
            }}
            source={{uri: this.state.imageUri}} 
          />
        </View>
        <View style={{flex: 1, flexDirection: 'row'}}>
          <Text style={{flex: 1, flexWrap: 'wrap', paddingRight: 10}}>{this.props.detection.name}</Text>
        </View>
        <Text style={{backgroundColor: 'green', fontWeight: 'bold', padding: 2}}>{this.props.detection.percentage_probability.toString().substring(0, 4)}%</Text>
      </View>
    </TouchableOpacity>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 15,
    backgroundColor: '#fff',
  },
});
