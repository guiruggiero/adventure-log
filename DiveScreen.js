import React from 'react';
import { TextInput, Text, View, TouchableOpacity } from 'react-native';

import { diveStyles, timelineStyles } from './Styles';
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
        time: '',
        // start: ???, // timestamp, Date.now(), October 11, 2020 at 12:34:00 PM UTC-5 - https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Date

        latitude: 0, // FLAG
        longitude: 0,
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
            <View style={diveStyles.fieldRow}>
              <Text style={diveStyles.fieldLabel}>
                Dive site:
              </Text>

              <TextInput
                style={diveStyles.fieldBox}

                autoCapitalize="words"
                autoCorrect={true}

                value={this.state.dive.diveSite}

                onChangeText={(text) => this.setState({dive: {...this.state.dive, diveSite: text}})}
              />
            </View>

            <View style={diveStyles.fieldRow}>
              <Text style={diveStyles.fieldLabel}>
                Location:
              </Text>

              <TextInput
                style={diveStyles.fieldBox}

                autoCapitalize="words"
                autoCorrect={true}

                value={this.state.dive.location}

                onChangeText={(text) => this.setState({dive: {...this.state.dive, location: text}})}
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

                onChangeText={(text) => this.setState({dive: {...this.state.dive, country: text}})}
              />
            </View>
          
            <View style={diveStyles.fieldRow}>
              <Text style={diveStyles.fieldLabel}>
                Latitude:
              </Text>

              <TextInput
                style={diveStyles.fieldBox}

                keyboardType="numeric"
                autoCorrect={false}

                value={this.state.dive.latitude}

                onChangeText={(text) => this.setState({dive: {...this.state.dive, latitude: text}})}
              />
            </View>

            <View style={diveStyles.fieldRow}>
              <Text style={diveStyles.fieldLabel}>
                Longitude:
              </Text>

              <TextInput
                style={diveStyles.fieldBox}

                keyboardType="numeric"
                autoCorrect={false}

                value={this.state.dive.longitude}

                onChangeText={(text) => this.setState({dive: {...this.state.dive, longitude: text}})}
              />
            </View>

            <View style={timelineStyles.separator}/>
          
            <View style={diveStyles.fieldRow}>
              <Text style={diveStyles.fieldLabel}>
                Day:
              </Text>

              <TextInput
                style={diveStyles.fieldBox}

                // defaultValue={this.today} // FLAG
                keyboardType="numeric"
                autoCorrect={false}

                value={this.state.dive.day}

                onChangeText={(text) => this.setState({dive: {...this.state.dive, day: text}})}
              />
            </View>
          
            <View style={diveStyles.fieldRow}>
              <Text style={diveStyles.fieldLabel}>
                Start time:
              </Text>

              <TextInput
                style={diveStyles.fieldBox}

                keyboardType="numeric"
                autoCorrect={false}

                value={this.state.dive.time}

                onChangeText={(text) => this.setState({dive: {...this.state.dive, time: text}})}
              />
            </View>

            <View style={diveStyles.fieldRow}>
              <Text style={diveStyles.fieldLabel}>
                Total time:
              </Text>

              <TextInput
                style={diveStyles.fieldBox}

                keyboardType="numeric"
                autoCorrect={false}

                value={this.state.dive.totalTime}

                onChangeText={(text) => this.setState({dive: {...this.state.dive, totalTime: text}})}
              />
            </View>

            <View style={diveStyles.fieldRow}>
              <Text style={diveStyles.fieldLabel}>
                Max depth:
              </Text>

              <TextInput
                style={diveStyles.fieldBox}

                keyboardType="numeric"
                autoCorrect={false}

                value={this.state.dive.maxDepth}

                onChangeText={(text) => this.setState({dive: {...this.state.dive, maxDepth: text}})}
              />
            </View>

            <View style={diveStyles.fieldRow}>
              <Text style={diveStyles.fieldLabel}>
                Surface temp.:
              </Text>

              <TextInput
                style={diveStyles.fieldBox}

                keyboardType="numeric"
                autoCorrect={false}

                value={this.state.dive.tempSurface}

                onChangeText={(text) => this.setState({dive: {...this.state.dive, tempSurface: text}})}
              />
            </View>

            <View style={diveStyles.fieldRow}>
              <Text style={diveStyles.fieldLabel}>
                Bottom temp.:
              </Text>

              <TextInput
                style={diveStyles.fieldBox}

                keyboardType="numeric"
                autoCorrect={false}

                value={this.state.dive.tempBottom}

                onChangeText={(text) => this.setState({dive: {...this.state.dive, tempBottom: text}})}
              />
            </View>

            <View style={timelineStyles.separator}/>

            <View style={diveStyles.fieldRow}>
              <Text style={diveStyles.fieldLabel}>
                Gas:
              </Text>

              <TextInput
                style={diveStyles.fieldBox}

                autoCapitalize="words"
                autoCorrect={true}

                value={this.state.dive.gas}

                onChangeText={(text) => this.setState({dive: {...this.state.dive, gas: text}})}
              />
            </View>

            <View style={diveStyles.fieldRow}>
              <Text style={diveStyles.fieldLabel}>
                Weights:
              </Text>

              <TextInput
                style={diveStyles.fieldBox}

                keyboardType="numeric"
                autoCorrect={false}

                value={this.state.dive.weights}

                onChangeText={(text) => this.setState({dive: {...this.state.dive, weights: text}})}
              />
            </View>

            <View style={diveStyles.fieldRow}>
              <Text style={diveStyles.fieldLabel}>
                Rating:
              </Text>

              <TextInput
                style={diveStyles.fieldBox}

                keyboardType="numeric"
                autoCorrect={false}

                value={this.state.dive.rating}

                onChangeText={(text) => this.setState({dive: {...this.state.dive, rating: text}})}
              />
            </View>
            
            <View style={diveStyles.fieldRow}>
              <Text style={diveStyles.fieldLabel}>
                Favorite:
              </Text>

              <TextInput
                style={diveStyles.fieldBox}

                autoCapitalize="words"
                autoCorrect={false}

                value={this.state.dive.favorite}

                onChangeText={(text) => this.setState({dive: {...this.state.dive, favorite: text}})}
              />
            </View>

            <View style={diveStyles.fieldRow}>
              <Text style={diveStyles.fieldLabel}>
                Notes:
              </Text>

              <TextInput
                style={diveStyles.fieldBox}

                autoCapitalize="words"
                autoCorrect={true}

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