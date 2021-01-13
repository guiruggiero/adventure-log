import React from 'react';
import { Text, View, FlatList, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

import { timelineStyles, colors } from './Styles';
import { getDataModel } from './DataModel';

export class Timeline extends React.Component {
  constructor(props) {
    super(props);

    this.dataModel = getDataModel();
    this.userKey = this.props.route.params.currentUser.key;
    // this.userKey = '9lnN5X4zdxeznPfWXp20'; // FLAG - for testing

    this.state = {
      diveList: []
    };
  }

  componentDidMount = () => {
    this.focusUnsubscribe = this.props.navigation.addListener('focus', this.onFocus);
  }

  onFocus = () => {
    let dives = this.dataModel.getDives();
    this.setState({diveList: dives});
    console.log("Updated list");
    
    this.props.navigation.setParams({operation: 'none'});
  }

  componentWillUnmount = () => {
    this.focusUnsubscribe();
  }

  render() {
    return (
      <View style={timelineStyles.container}>
        <View style={timelineStyles.body}>
          <View style={timelineStyles.listContainer}>
            <FlatList
              data={this.state.diveList}

              ItemSeparatorComponent={()=>(
                <View style={timelineStyles.separator}/>
              )}

              renderItem={({item})=>{
                return(
                  <TouchableOpacity 
                    style={timelineStyles.listDiveContainer}
                    onPress={()=>{this.props.navigation.navigate("DiveAddEdit", {
                      operation: "edit",
                      dive: item})
                    }}
                  >
                    <View style={timelineStyles.listDiveTextContainer}> 
                      <Text style={timelineStyles.listDiveText}>
                        {item.diveSite}, {item.country}
                      </Text> 
                    </View>
                  </TouchableOpacity>
                );
              }}
            />
          </View>
        </View>

        <View style={timelineStyles.footer}>
          <TouchableOpacity
            onPress={()=>{this.props.navigation.navigate("DiveAddEdit", {
              operation: "add",
              diver: this.userKey})
            }}>
            <Ionicons name="md-add-circle"
              size={80} 
              color={colors.primaryDark} />
          </TouchableOpacity>
        </View>
      </View>
    );
  }
}