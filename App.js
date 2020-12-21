import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

import { LoginScreen } from './LoginScreen';
// import { HomeScreen } from './HomeScreen';
// import { SettingsScreen } from './SettingsScreen';
import { TimelineScreen } from './TimelineScreen';
import { DiveScreen } from './DiveScreen';
// import { JumpScreen } from './JumpScreen';
// import { CameraScreen } from './CameraScreen'; // FLAG

const Stack = createStackNavigator();

function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator 
        initialRouteName="Login"
        screenOptions={{
          headerShown: true
        }}
      >
        <Stack.Screen name="Login" component={LoginScreen} />
        {/* <Stack.Screen name="Home" component={HomeScreen} /> */}
        {/* <Stack.Screen name="Settings" component={SettingsScreen} /> */}
        <Stack.Screen name="Timeline" component={TimelineScreen} />
        <Stack.Screen name="Dive" component={DiveScreen} />
        {/* <Stack.Screen name="Jump" component={DiveScreen} /> */}
        {/* <Stack.Screen name="Camera" component={CameraScreen} /> */}
      </Stack.Navigator>
    </NavigationContainer>
  );
}


export default App;