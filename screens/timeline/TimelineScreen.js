import React from "react";
import { Text, View, FlatList, TouchableOpacity } from "react-native";
import { Ionicons } from "@expo/vector-icons";

import { timelineStyles } from "./TimelineStyles";
import { colors } from "../GlobalStyles";
import { getDataModel } from "../../DataModel";

export class Timeline extends React.Component {
  constructor(props) {
    super(props);

    this.dataModel = getDataModel();
    this.userKey = this.props.route.params.currentUser.key;
    // this.userKey = "9lnN5X4zdxeznPfWXp20"; // FLAG - for testing
    // this.dataModel.cleanLogs(this.userKey); // FLAG - for testing

    this.state = {
      logList: []
    };
  }

  // execute every time the screen receives focus
  componentDidMount = () => {
    this.focusUnsubscribe = this.props.navigation.addListener("focus", this.onFocus);
  }
  onFocus = () => {
    let logs = this.dataModel.getLogs();
    this.setState({logList: logs});

    this.props.navigation.setParams({operation: "none"});
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
              data={this.state.logList.sort(function(a, b) {return b.timestamp - a.timestamp;})}
              ItemSeparatorComponent={()=>(<View style={timelineStyles.separator}/>)}
              renderItem={({item})=>{
                let date = new Date(item.timestamp);

                return(
                  <TouchableOpacity 
                    style={timelineStyles.listLogContainer}
                    onPress={()=>{this.props.navigation.navigate("DiveAddEdit", {
                      operation: "edit",
                      log: item})
                    }}
                  >
                    <View style={timelineStyles.listLogTextContainer}> 
                      <Text style={timelineStyles.listLogText}>
                        {date.toLocaleDateString("en-US", {month: "2-digit", day: "2-digit", year: "numeric"})}
                        {" - "}{item.site}, {item.location}{" - "}
                        {item.rating}{"* "}{item.favorite ? ("[favorite]") : ("")}
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
              userKey: this.userKey})
            }}
          >
            <Ionicons name="md-add-circle"
              size={80} 
              color={colors.orange}
            />
          </TouchableOpacity>
        </View>
      </View>
    );
  }
}