import React from 'react';
import { TextInput, Text, View, TouchableOpacity } from 'react-native';

import { diveStyles } from './Styles';
import { getDataModel } from './DataModel';

export class DiveAddEdit extends React.Component {
  constructor(props) {
    super(props);

    this.dataModel = getDataModel();
    this.operation = this.props.route.params.operation;

    if (this.operation === 'add') {
      this.dive = {
        country: '',
        diver: this.props.route.params.diver,
        diveSite: '',
        gas: '',
        location: '',
        notes: '',
        pictureURL: '',
        maxDepth: 0,
        pictureHeight: 0,
        pictureWidth: 0,
        rating: 0,
        tempBottom: 0,
        tempSurface: 0,
        totalTime: 0,
        weights: 0,
        favorite: false,

        day: '', // FLAG
        time: '', // FLAG
        // start: ???, // timestamp, Date.now(), October 11, 2020 at 12:34:00 PM UTC-5 - https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Date

        latitude: 0, // FLAG
        longitude: 0, // FLAG
        // coordinates: ???, // geopoint, [41.0153513° N, 83.9355813° W] 
      }
    }

    else { // === 'edit'
      this.dive = this.props.route.params.dive;
    }

    this.state = {
      dive: this.dive
    }
  }

  async onSave() {
    if (this.operation === 'add') {
      await this.dataModel.addDive(this.state.dive);
    }

    else { // === 'edit'
      await this.dataModel.editDive(this.state.dive);
    }

    this.props.navigation.navigate("Timeline");
  }

  render() {
    return (
      <View style={diveStyles.container}>
        <View style={diveStyles.header}>
          <Text style={diveStyles.headerText}>
            {this.operation === 'add'? "Add" : "Edit"}
          </Text>
        </View>

        <View style={diveStyles.body}>
          {/* <View style={diveStyles.imageContainer}> FLAG
          </View> */}

          <View style={diveStyles.fieldsContainer}>

{/* gas: '',
location: '',
notes: '',
maxDepth: 0,
rating: 0,
tempBottom: 0,
tempSurface: 0,
totalTime: 0,
weights: 0,
favorite: false,
time: '',
latitude: 0,
longitude: 0, */}

            <View style={diveStyles.fieldRow}>
              <Text style={diveStyles.fieldLabel}>
                Day:
              </Text>

              <TextInput
                style={diveStyles.fieldBox}

                placeholder="MM.DD.YYYY"
                // defaultValue={this.today} // FLAG
                keyboardType="numeric"
                autoCorrect={false}

                value={this.state.dive.day}

                onChangeText={(text) => {let dive = this.state.dive;
                                        dive.day = text;
                                        this.setState({dive: dive})}}
              />
            </View>

            <View style={diveStyles.fieldRow}>
              <Text style={diveStyles.fieldLabel}>
                Dive site:
              </Text>

              <TextInput
                style={diveStyles.fieldBox}

                autoCapitalize="words"
                autoCorrect={true}

                value={this.state.dive.diveSite}

                onChangeText={(text) => {let dive = this.state.dive;
                                        dive.diveSite = text;
                                        this.setState({dive: dive})}}
              />
            </View>

            <View style={diveStyles.fieldRow}>
              <Text style={diveStyles.fieldLabel}>
                Country:
              </Text>

              <TextInput
                style={diveStyles.fieldBox}

                autoCapitalize="words"
                autoCorrect={true}

                value={this.state.dive.country}

                onChangeText={(text) => {let dive = this.state.dive;
                                        dive.country = text;
                                        this.setState({dive: dive})}}
              />
            </View>
          </View>
        </View>

        <View style={diveStyles.footer}>
          <View style={diveStyles.footerButtonContainer}>
            <TouchableOpacity 
              style={diveStyles.footerButton}

              onPress={()=>{this.props.navigation.navigate("Timeline")}}
            >
              <Text style={diveStyles.footerButtonText}>Cancel</Text>
            </TouchableOpacity>

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