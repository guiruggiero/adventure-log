import React from "react";
import { View, Text, TouchableOpacity } from "react-native";

import { loginStyles } from "./login/LoginStyles"; // homeStyles

export class Home extends React.Component {
  constructor(props) {
    super(props);

    this.userKey = this.props.route.params.currentUser.key;
  }

  onChoice = (chosenSport) => {
    this.props.navigation.navigate("Timeline", {
      currentUser: this.userKey,
      sport: chosenSport
    });
  }

  render() {
    return (
      <View style={loginStyles.container}>
        <TouchableOpacity 
          style={loginStyles.buttonContainer}
          onPress={this.onChoice("scubaDiving")}
          >
          <Text style={loginStyles.buttonText}>SCUBA diving</Text>
        </TouchableOpacity>

        <TouchableOpacity 
          style={loginStyles.buttonContainer}
          onPress={this.onChoice("skydiving")}
          >
          <Text style={loginStyles.buttonText}>Skydiving</Text>
        </TouchableOpacity>
      </View>
    );
  }
}