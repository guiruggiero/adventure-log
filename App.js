// Adventure Log app
// Version 0.1
// Developed by Gui Ruggiero

import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";

import { Login } from "./LoginScreen";
// import { Settings } from "./SettingsScreen";
import { Timeline } from "./TimelineScreen";
import { DiveAddEdit } from "./DiveScreen";
// import { DiveView } from "./DiveScreen";
// import { JumpAddEdit } from "./JumpScreen";
// import { JumpView } from "./JumpScreen";
// import { Map } from "./MapScreen";
// import { Stats } from "./StatsScreen";

const Stack = createStackNavigator();

function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator 
        initialRouteName="Login" // FLAG - for testing
        screenOptions={{
          headerShown: false
        }}
      >
        <Stack.Screen name="Login" component={Login} />
        {/* <Stack.Screen name="Settings" component={Settings} /> */}
        <Stack.Screen name="Timeline" component={Timeline} />
        <Stack.Screen name="DiveAddEdit" component={DiveAddEdit} />
        {/* <Stack.Screen name="DiveView" component={DiveView} /> */}
        {/* <Stack.Screen name="JumpAddEdit" component={JumpAddEdit} /> */}
        {/* <Stack.Screen name="JumpView" component={JumpView} /> */}
        {/* <Stack.Screen name="Map" component={Map} /> */}
        {/* <Stack.Screen name="Stats" component={Stats} /> */}
      </Stack.Navigator>
    </NavigationContainer>
  );
}


export default App;