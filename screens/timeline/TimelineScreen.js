import React from "react";
import { SafeAreaView } from 'react-native-safe-area-context';
import { Text, View, FlatList, Pressable, TouchableOpacity } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { Searchbar, FAB, Portal, Provider } from "react-native-paper";

import { timelineStyles } from "./TimelineStyles";
import { colors } from "../GlobalStyles";
import { getDataModel } from "../../DataModel";
import { color } from "react-native-reanimated";

export class Timeline extends React.Component {
  constructor(props) {
    super(props);

    this.dataModel = getDataModel();
    // this.userKey = this.props.route.params.currentUser.key;
    this.userKey = "9lnN5X4zdxeznPfWXp20"; // FLAG - for testing
    this.dataModel.loadLogs(); // FLAG - for testing
    this.dataModel.cleanLogs(this.userKey); // FLAG - for testing

    this.state = {
      logList: []
      // searchQuery: "",
      // fabOpen: false
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

  // onSearchChange = (query) => {
  //   this.setState({searchQuery: query});
  // }

  // onFABStateChange = (open) => {
  //   this.setState({fabOpen: open})
  // }
  
  render() {
    return (
      <SafeAreaView style={timelineStyles.container}>
        {/* <View style={timelineStyles.header}>
          <View style={timelineStyles.menuIcon}>
            <Pressable
              // onPress={()=>{this.props.navigation.navigate("Menu")}}
            >
              <Ionicons name="menu"
                size={24} 
                color={colors.blue}
              />
            </Pressable>
          </View>

          <View style={timelineStyles.searchBar}>
            <Searchbar
              placeholder="Search"
              value={this.state.searchQuery}
              onChangeText={this.onSearchChange}
            />
          </View>

          <View style={timelineStyles.filterIcon}>
            <Pressable
                // onPress={()=>{this.props.navigation.navigate("Menu")}}
              >
                <Ionicons name="filter"
                  size={24} 
                  color={colors.blue}
                />
              </Pressable>
          </View>
        </View> */}

        <View style={timelineStyles.body}>
          <FlatList
            data={this.state.logList.sort(function(a, b) {return b.timestamp - a.timestamp;})}
            showsVerticalScrollIndicator={false}
            // initialNumToRender={20} // how many fit in a large screen?
            // maxToRenderPerBatch={10}
            // windowSize={21}
            renderItem={({item})=>{
              let date = new Date(item.timestamp);

              return(
                <Pressable 
                  style={timelineStyles.card}
                  android_ripple={{color: colors.maize}}
                  onPress={()=>{this.props.navigation.navigate("DiveAddEdit", {
                    operation: "edit",
                    log: item})
                  }}
                >
                  <View style={timelineStyles.body}>

                  </View>
                  {/* <Text style={timelineStyles.listLogText}>
                    {date.toLocaleDateString("en-US", {month: "2-digit", day: "2-digit", year: "numeric"})}
                    {" - "}{item.site}, {item.location}{" - "}
                    {item.rating}{"* "}{item.favorite ? ("[favorite]") : ("")}
                  </Text> */}
                </Pressable>
              );
            }}
          />
        </View>

        <View>
          <FAB
            style={timelineStyles.fab}
            icon="plus-thick"
            color="#FFFFFF"
            onPress={() => {this.props.navigation.navigate("DiveAddEdit", {
              operation: "add",
              userKey: this.userKey})
            }}
          />

          {/* <Provider>
            <Portal>
              <FAB.Group
                open={this.fabOpen}
                icon={this.fabOpen ? "plus" : "plus-thick"}
                color={this.fabOpen ? colors.orange : "#FFFFFF"}
                fabStyle={this.fabOpen ? {backgroundColor: "#FFFFFF"} : {backgroundColor: colors.orange}}
                actions={[
                  {
                    icon: "parachute",
                    color: "#FFFFFF",
                    style: {backgroundColor: colors.orange},
                    label: "Skydive",
                    onPress: () => console.log("Pressed Skydive")
                  },
                  {
                    icon: "diving-scuba-tank",
                    color: "#FFFFFF",
                    style: {backgroundColor: colors.orange},
                    label: "SCUBA dive",
                    onPress: () => {this.props.navigation.navigate("DiveAddEdit", {
                      operation: "add",
                      userKey: this.userKey})
                    }
                  },
                ]}
                onStateChange={this.onFABStateChange}
                onPress={() => {
                  if (this.fabOpen) {
                    // do something if the speed dial is open
                  }
                }}
              />
            </Portal>
          </Provider> */}
        </View>
      </SafeAreaView>
    );
  }
}