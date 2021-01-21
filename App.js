// Adventure Log app
// Version 0.1
// Developed by Gui Ruggiero

import React from "react";
import { Provider } from 'react-native-paper';
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";

import { Login } from "./screens/login/LoginScreen";
// import { Settings } from "./screens/settings/SettingsScreen";
import { Timeline } from "./screens/timeline/TimelineScreen";
import { DiveAddEdit } from "./screens/dive/DiveAddEditScreen";
// import { DiveView } from "./screens/dive/DiveViewScreen";
// import { JumpAddEdit } from "./screens/jump/JumpAddEditScreen";
// import { JumpView } from "./screens/jump/JumpViewScreen";
// import { Map } from "./screens/map/MapScreen";
// import { Stats } from "./screens/stats/StatsScreen";

// FLAG - for testing
import { LogBox } from 'react-native';
LogBox.ignoreLogs(['Setting a timer']);
LogBox.ignoreLogs(['Remote debugger is']);

const Stack = createStackNavigator();

function App() {
  return (
    <Provider>
      <NavigationContainer>
        <Stack.Navigator 
          initialRouteName="Timeline" // FLAG - for testing
          screenOptions={{headerShown: false}}
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
    </Provider>
  );
}


export default App;