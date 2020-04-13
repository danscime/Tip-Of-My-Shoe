import React from 'react';
import { 
  View,
  ScrollView, 
  StyleSheet ,
  Text,
  FlatList,
  Alert
} from 'react-native';

import DetectionSummary from '../components/DetectionSummary';

export default class ResultScreen extends React.PureComponent {

  static navigationOptions = {
    title: 'Shoe Result',
  };

  constructor(props) {
    super(props);

    this.state = {
      fetching: true,
      detections: [],
      imageUri: props.navigation.getParam("imageUri"),
      imageBase64: props.navigation.getParam("imageBase64")
    };
  }

  componentDidMount() {
    this.fetchDetections();
  }

  fetchDetections = async () => {
    let requestData = new FormData();
    requestData.append('image', {
      uri: this.state.imageUri,
      name: 'image.jpg',
      type: 'image/jpg'
    });
    
    try {
      let response = await fetch('http://192.168.11.20:5000/detect', {
        method: 'POST',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'multipart/form-data'
        },
        body: requestData
      });
      let responseJson = await response.json();
      this.setState({
        detections: JSON.parse(responseJson.detections)
      });
    } catch (error) {
      console.error(JSON.stringify(error));
      Alert.alert("An error occured while attempting to reach the server.");
    } finally {
      this.setState({
        fetching: false
      });
    }
  }

  render() {
    return (
      <View style={styles.container}>
        <Text style={{marginLeft: 5}}>Fetching: {this.state.fetching.toString()}</Text>
        <ScrollView style={styles.summaryContainer}>
          {this.state.detections.map((detection) => {
            return <DetectionSummary detection={detection} imageUri={this.state.imageUri} imageBase64={this.state.imageBase64} key={detection.box_points.toString() + detection.name}></DetectionSummary>
          })}
        </ScrollView>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 15,
    backgroundColor: '#fff',
  },
  summaryContainer: {
    marginHorizontal: 5,
    marginTop: 10
  }
});
