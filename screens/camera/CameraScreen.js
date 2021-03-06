import React from "react";
import { Text, View, TouchableOpacity } from "react-native";
import { Button } from "react-native-elements";
import * as Permissions from "expo-permissions";
import { Camera } from "expo-camera"; // "expo-camera": "~9.1.0", on package.json

import { cameraStyles } from "./CameraStyles";
import { getDataModel } from "../../DataModel";

export class Cam extends React.Component {
  constructor(props) {
    super(props);

    this.dataModel = getDataModel();
    this.logKey = this.props.route.params.logKey;

    this.state = {
      hasCameraPermission: null,
      type: Camera.Constants.Type.back,
    };  
  }

  componentDidMount = () => {
    this.getPermissions();
  }

  getPermissions = async () => {
    let cameraPerms = await Permissions.askAsync(Permissions.CAMERA);

    let permGranted = cameraPerms.status === "granted";
    this.setState({hasCameraPermission: permGranted});
  }

  handleTakePicture = async () => {
    let picData = await this.camera.takePictureAsync();
    this.dataModel.addLogPicture(this.logKey, picData);
    this.props.navigation.goBack();
  }

  setupCamera = async (cameraRef) => {
    this.camera = cameraRef;
  }

  render() {
    const {hasCameraPermission} = this.state;
    if (hasCameraPermission === null) {
      return <View />;
    }
    
    else if (hasCameraPermission === false) {
      return <Text>No access to camera</Text>;
    }
    
    else {
      return (
        <View style={cameraStyles.container}>
          <Camera 
            style={cameraStyles.container}

            type={this.state.type}
            ratio="4:3" // FLAG - stretched image problem
            pictureSize="Medium"
            ref={this.setupCamera}
          >
            <View style={cameraStyles.camera}>
              <TouchableOpacity
                style={cameraStyles.flip}

                onPress={() => {this.setState({
                    type: this.state.type === Camera.Constants.Type.back
                        ? Camera.Constants.Type.front
                        : Camera.Constants.Type.back,
                  });
                }}>
                <Text style={cameraStyles.flipText}> 
                  Flip 
                </Text>
              </TouchableOpacity>
            </View>
          </Camera>

          <Button
            title="Take picture"
            onPress={this.handleTakePicture}
          />
        </View>
      );
    }
  }
}