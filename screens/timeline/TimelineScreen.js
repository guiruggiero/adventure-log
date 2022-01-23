import { Ionicons, MaterialCommunityIcons } from "@expo/vector-icons";
import getUnicodeFlagIcon from "country-flag-icons/unicode";
import React, { useCallback } from "react";
import { Text, View, FlatList, Pressable } from "react-native";
import { Searchbar, FAB, Portal, Provider } from "react-native-paper";
import { SafeAreaView } from "react-native-safe-area-context";

import { getDataModel } from "../../DataModel";
import { colors } from "../GlobalStyles";
import { timelineStyles } from "./TimelineStyles";

export class Timeline extends React.Component {
  constructor(props) {
    super(props);

    this.dataModel = getDataModel();
    this.userKey = this.props.route.params.currentUser.key;
    // this.userKey = "9lnN5X4zdxeznPfWXp20"; // FLAG - for testing
    // this.dataModel.loadLogs(); // FLAG - for testing
    // this.dataModel.cleanLogs(this.userKey); // FLAG - for testing

    this.state = {
      logList: [],
      // searchQuery: "",
      // fabOpen: false
    };
  }

  // execute every time the screen receives focus
  componentDidMount = () => {
    this.focusUnsubscribe = this.props.navigation.addListener("focus", this.onFocus);
  };
  onFocus = () => {
    let logs = this.dataModel.getLogs();
    this.setState({logList: logs});

    this.props.navigation.setParams({operation: "none"});
  };
  componentWillUnmount = () => {
    this.focusUnsubscribe();
  };

  // renderItem = useCallback(
  //   ({item})=>{
  //     let date = new Date(item.timestamp);
  //     let [month, day, year] = date.toLocaleDateString("en-US",
  //       {month: "short", day: "numeric", year: "numeric"}).split(" ");

  //     return(
  //       <Pressable
  //         style={timelineStyles.card}
  //         android_ripple={{color: colors.gray}}
  //         onPress={()=>{this.props.navigation.navigate("DiveAddEdit", {
  //           operation: "edit",
  //           log: item})
  //         }}
  //       >
  //         <View style={timelineStyles.iconDate}>
  //           <MaterialCommunityIcons
  //             name={item.sport === "scubaDiving" ? "diving-scuba-flag" : "parachute"}
  //             size={36}
  //             color={colors.blue}
  //           />

  //           <Text style={timelineStyles.monthDay}>
  //             {month + " " + day.slice(0, -1)}
  //           </Text>

  //           <Text style={timelineStyles.year}>
  //             {year}
  //           </Text>
  //         </View>

  //         <View style={timelineStyles.textContainer}>
  //           <Text style={timelineStyles.textSite}>
  //             {item.site}
  //           </Text>

  //           <Text style={timelineStyles.textLocation}>
  //             {item.location}
              
  //             {item.location === "" ? "" : "  "}
              
  //             {item.country === "" ? "" : getUnicodeFlagIcon(item.country)}
  //           </Text>
  //         </View>
  //       </Pressable>
  //     );
  //   }, []
  // );

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
              <Ionicons
                name="menu"
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
                <Ionicons
                  name="filter"
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
            // windowSize={21}
            // initialNumToRender={20} // enough to fill the viewport in all supported devices
            // maxToRenderPerBatch={10}
            renderItem={({item})=>{
              let date = new Date(item.timestamp);
              let [month, day, year] = date.toLocaleDateString("en-US",
                {month: "short", day: "numeric", year: "numeric"}).split(" ");
        
              return(
                <Pressable 
                  style={timelineStyles.card}
                  android_ripple={{color: colors.gray}}
                  onPress={()=>{this.props.navigation.navigate("DiveAddEdit", {
                    operation: "edit",
                    log: item})
                  }}
                >
                  <View style={timelineStyles.iconDate}>
                    <MaterialCommunityIcons
                      name={item.sport === "scubaDiving" ? "diving-scuba-flag" : "parachute"}
                      size={36}
                      color={colors.blue}
                    />
        
                    <Text style={timelineStyles.monthDay}>
                      {month + " " + day.slice(0, -1)}
                    </Text>
        
                    <Text style={timelineStyles.year}>
                      {year}
                    </Text>
                  </View>
        
                  <View style={timelineStyles.textContainer}>
                    <Text style={timelineStyles.textSite}>
                      {item.site}
                    </Text>
        
                    <Text style={timelineStyles.textLocation}>
                      {item.location}
                      
                      {item.location === "" ? "" : "  "}
                      
                      {item.country === "" ? "" : getUnicodeFlagIcon(item.country)}
                    </Text>
                  </View>
                </Pressable>
              );
            }}
            // renderItem={this.renderItem}
          />
        </View>

        <View style={timelineStyles.footer}>
          <FAB
            icon="plus-thick"
            style={timelineStyles.fab}
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
                    icon: "diving-scuba-flag",
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
