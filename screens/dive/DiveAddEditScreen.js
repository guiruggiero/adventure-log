import React from "react";
import { Text, View, Platform, TextInput, TouchableOpacity, Alert, Switch } from "react-native";
import { AirbnbRating, Divider, CheckBox } from "react-native-elements";
import { Picker } from "@react-native-picker/picker";
// import DateTimePicker from "@react-native-community/datetimepicker";
// import DatePicker from "react-datepicker";

import { diveStyles } from "./DiveStyles";
import { getDataModel } from "../../DataModel";
// import "../../node_modules/react-datepicker/dist/react-datepicker.css";

export class DiveAddEdit extends React.Component {
  constructor(props) {
    super(props);

    this.dataModel = getDataModel();
    this.operation = this.props.route.params.operation;
    // this.operation = "add"; // FLAG - for testing

    if (this.operation === "add") {
      this.dive = this.dataModel.createDive(this.props.route.params.diver);
      // this.dive = this.dataModel.createDive("9lnN5X4zdxeznPfWXp20"); // FLAG - for testing
    }

    else { // === "edit"
      this.dive = this.props.route.params.dive;
    }

    // converting timestamp into date variables
    this.date = new Date(this.dive.timestamp);
    // [this.month, this.day, this.year] = this.date.toLocaleDateString("en-US").split("/");
    // [this.hour, this.minute] = this.date.toLocaleTimeString("en-US").split(/:| /);

    this.state = {
      dive: this.dive
    }
  }

  onDelete = async (diveKey) => {
    if (Platform.OS === "web") {
      let response = confirm("Whoa, slow down! This will delete the log forever");
      if (response === true) {
        await this.dataModel.deleteDive(diveKey);
        this.props.navigation.navigate("Timeline");
      }
    }
    
    else { // if running on app, iOS or Android
      Alert.alert(
        "Whoa, slow down",
        "This will delete the log forever",
        [
          {
            text: "Cancel",
            style: "cancel"
          },
          {
            text: "OK",
            onPress: async () => {
              await this.dataModel.deleteDive(diveKey);
              this.props.navigation.navigate("Timeline");
            }
          }
        ],
        { cancelable: false }
      );
    }
  }

  onCancel = () => {
    if (Platform.OS === "web") {
      let response = confirm("Heads up, nothing will be saved!");
      if (response === true) {
        this.props.navigation.goBack();
      }
    }
    
    else { // if running on app, iOS or Android
      Alert.alert(
        "Heads up",
        "Nothing will be saved!",
        [
          {
            text: "Cancel",
            style: "cancel"
          },
          {
            text: "OK",
            onPress: () => {this.props.navigation.goBack()}
          }
        ],
        { cancelable: false }
      );
    }
  }

  onSave = async () => {
    if (this.operation === "add") {
      await this.dataModel.addDive(this.state.dive);
    }

    else { // === "edit"
      await this.dataModel.editDive(this.state.dive);
    }

    this.props.navigation.navigate("Timeline");
  }

  render() {
    return (
      <View style={diveStyles.container}>
        <View style={diveStyles.header}>
          <Text style={diveStyles.headerText}>
            {this.operation === "add" ? "Add" : "Edit"}
          </Text>
        </View>

        <View style={diveStyles.body}>
          {/* <View style={diveStyles.imageContainer}>
          </View> */}

          <View style={diveStyles.fieldsContainer}>
            {/* dive site */}
            <View style={diveStyles.fieldRow}>
              <Text style={diveStyles.fieldLabel}>
                Dive site:
              </Text>

              <TextInput
                style={diveStyles.fieldBox}
                autoCapitalize="words"
                autoCorrect={false}
                returnKeyType="next"
                value={this.state.dive.diveSite}
                onChangeText={(text) => this.setState({dive: {...this.state.dive, diveSite: text}})}
              />
            </View>

            {/* location */}
            <View style={diveStyles.fieldRow}>
              <Text style={diveStyles.fieldLabel}>
                Location:
              </Text>

              <TextInput
                style={diveStyles.fieldBox}
                autoCapitalize="words"
                returnKeyType="next"
                value={this.state.dive.location}
                onChangeText={(text) => this.setState({dive: {...this.state.dive, location: text}})}
              />
            </View>

            {/* country */}
            <View style={diveStyles.fieldRow}>
              <Text style={diveStyles.fieldLabel}>
                Country:
              </Text>

              <TextInput
                style={diveStyles.fieldBox}
                autoCapitalize="words"
                returnKeyType="next"
                value={this.state.dive.country}
                onChangeText={(text) => this.setState({dive: {...this.state.dive, country: text}})}
              />
            </View>
          
            {/* latitude */}
            <View style={diveStyles.fieldRow}>
              <Text style={diveStyles.fieldLabel}>
                Latitude:
              </Text>

              <TextInput
                style={diveStyles.fieldBox}
                keyboardType="numeric"
                autoCorrect={false}
                autoCapitalize="none"
                returnKeyType="next"
                autoCompleteType="off"
                value={this.state.dive.latitude}
                onChangeText={(text) => this.setState({dive: {...this.state.dive, latitude: text}})}
              />
            </View>

            {/* longitude */}
            <View style={diveStyles.fieldRow}>
              <Text style={diveStyles.fieldLabel}>
                Longitude:
              </Text>

              <TextInput
                style={diveStyles.fieldBox}
                keyboardType="numeric"
                autoCorrect={false}
                autoCapitalize="none"
                returnKeyType="next"
                autoCompleteType="off"
                value={this.state.dive.longitude}
                onChangeText={(text) => this.setState({dive: {...this.state.dive, longitude: text}})}
              />
            </View>

            <Divider style={{ backgroundColor: "black" }} />
          
            {/* date and time - FLAG*/}
            <View style={diveStyles.fieldRow}>
              <Text style={diveStyles.fieldLabel}>
                Day and time:
              </Text>

              <View>
                {/* <Text>{this.date.toDateString()} @ {this.date.getHours()}:{this.date.getMinutes()}</Text> */}
                {/* <Text>{this.month}/{this.day}/{this.year} @ {this.hour}:{this.minute} {this.date.getHours > 12 ? ("AM") : ("PM")}</Text> */}
                <Text>
                  {this.date.toLocaleDateString("en-US", {weekday: "short", month: "short", day: "numeric", year: "numeric"})}{" "}
                  @ {this.date.toLocaleTimeString("en-US", {hour: "numeric", minute: "2-digit", hour12: true, timeZoneName: "short"})}
                </Text>
              </View>

              {/* {Platform.OS === "web" ? (
                <DatePicker
                  showTimeSelect
                  selected={this.dive.dateTime}
                  onChange={(date) => this.setState({dive: {...this.state.dive, dateTime: date}})}
                />
              ):(
                <View/>
              )} */}
            </View>

            {/* total time */}
            <View style={diveStyles.fieldRow}>
              <Text style={diveStyles.fieldLabel}>
                Total time:
              </Text>

              <TextInput
                style={diveStyles.fieldBox}
                keyboardType="numeric"
                autoCorrect={false}
                autoCapitalize="none"
                returnKeyType="next"
                autoCompleteType="off"
                value={this.state.dive.totalTime}
                onChangeText={(text) => this.setState({dive: {...this.state.dive, totalTime: text}})}
              />
            </View>

            {/* max depth */}
            <View style={diveStyles.fieldRow}>
              <Text style={diveStyles.fieldLabel}>
                Max. depth:
              </Text>

              <TextInput
                style={diveStyles.fieldBox}
                keyboardType="numeric"
                autoCorrect={false}
                autoCapitalize="none"
                returnKeyType="next"
                autoCompleteType="off"
                value={this.state.dive.maxDepth}
                onChangeText={(text) => this.setState({dive: {...this.state.dive, maxDepth: text}})}
              />
            </View>

            {/* surface temp */}
            <View style={diveStyles.fieldRow}>
              <Text style={diveStyles.fieldLabel}>
                Surface temp.:
              </Text>

              <TextInput
                style={diveStyles.fieldBox}
                keyboardType="numeric"
                autoCorrect={false}
                autoCapitalize="none"
                returnKeyType="next"
                autoCompleteType="off"
                value={this.state.dive.tempSurface}
                onChangeText={(text) => this.setState({dive: {...this.state.dive, tempSurface: text}})}
              />
            </View>

            {/* bottom temp */}
            <View style={diveStyles.fieldRow}>
              <Text style={diveStyles.fieldLabel}>
                Bottom temp.:
              </Text>

              <TextInput
                style={diveStyles.fieldBox}
                keyboardType="numeric"
                autoCorrect={false}
                autoCapitalize="none"
                returnKeyType="next"
                autoCompleteType="off"
                value={this.state.dive.tempBottom}
                onChangeText={(text) => this.setState({dive: {...this.state.dive, tempBottom: text}})}
              />
            </View>

            <Divider style={{ backgroundColor: "black" }} />

            {/* gas - FLAG*/}
            <View style={diveStyles.fieldRow}>
              <Text style={diveStyles.fieldLabel}>
                Gas:
              </Text>

              <Picker
                selectedValue={this.state.dive.gas}
                // prompt={"Test"} // Android only
                // mode={"dropdown"} // Android only
                onValueChange={(itemValue) => this.setState({dive: {...this.state.dive, gas: itemValue}})}>
                <Picker.Item label="" value="" />
                <Picker.Item label="Air" value="air" />
                <Picker.Item label="EAN28" value="ean28" />
                <Picker.Item label="EAN32" value="ean32" />
                <Picker.Item label="EAN36" value="ean36" />
              </Picker>
            </View>

            {/* weights */}
            <View style={diveStyles.fieldRow}>
              <Text style={diveStyles.fieldLabel}>
                Weights:
              </Text>

              <TextInput
                style={diveStyles.fieldBox}
                keyboardType="numeric"
                autoCorrect={false}
                autoCapitalize="none"
                returnKeyType="next"
                autoCompleteType="off"
                value={this.state.dive.weights}
                onChangeText={(text) => this.setState({dive: {...this.state.dive, weights: text}})}
              />
            </View>

            {/* rating */}
            <View style={diveStyles.fieldRow}>
              <Text style={diveStyles.fieldLabel}>
                Rating:
              </Text>

              <AirbnbRating
                count={5}
                defaultRating={this.state.dive.rating}
                showRating={false}
                onFinishRating={(rating) => this.setState({dive: {...this.state.dive, rating: rating}})}
              />
            </View>

            {/* favorite */}
            <View style={diveStyles.fieldRow}>
              <Text style={diveStyles.fieldLabel}>
                Favorite:
              </Text>

              <Switch
                value={this.state.dive.favorite}
                onValueChange={(value) => this.setState({dive: {...this.state.dive, favorite: value}})}
              />

              {/* <CheckBox
                iconRight
                title="Favorite"
                checked={this.state.dive.favorite}
                onPress={(value) => this.setState({dive: {...this.state.dive, favorite: value}})}
              /> */}
            </View>

            {/* notes */}
            <View style={diveStyles.fieldRow}> 
              <Text style={diveStyles.fieldLabel}>
                Notes:
              </Text>

              <TextInput
                style={diveStyles.fieldBox}
                autoCapitalize="sentences"
                autoCompleteType="off"
                multiline={true}
                textAlignVertical="top"
                value={this.state.dive.notes}
                onChangeText={(text) => this.setState({dive: {...this.state.dive, notes: text}})}
              />
            </View>
          </View>
        </View>

        <View style={diveStyles.footer}>
          <View style={diveStyles.footerButtonContainer}>
            <TouchableOpacity 
              style={diveStyles.footerButton}
              onPress={()=>{this.onCancel()}}
            >
              <Text style={diveStyles.footerButtonText}>Cancel</Text>
            </TouchableOpacity>
            
            {this.operation === "edit" ? (
              <TouchableOpacity 
                style={diveStyles.footerButton}
                onPress={()=>{this.onDelete(this.dive.key)}}
              >
                <Text style={diveStyles.footerButtonText}>Delete</Text>
              </TouchableOpacity>
            ):(
              <View/>
            )}

            <TouchableOpacity
              style={diveStyles.footerButton}
              onPress={()=>{this.onSave()}}
            >
              <Text style={diveStyles.footerButtonText}>Save</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    );
  }
}