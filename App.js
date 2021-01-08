// Adventure Log app
// Version 0.1
// Developed by Gui Ruggiero

import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

import { Login } from './LoginScreen';

// import { Home } from './HomeScreen';
// import { Settings } from './SettingsScreen';

// import { Selector } from './AdventuresScreen';
import { Timeline } from './TimelineScreen';

// import { DiveView } from './DiveScreen';
import { DiveAddEdit } from './DiveScreen';

// import { JumpView } from './JumpScreen';
// import { JumpAddEdit } from './JumpScreen';

// import { Cam } from './CameraScreen';

// import { Stats } from './StatsScreen';

// import { MapScreen } from './MapScreen';

const Stack = createStackNavigator();

function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator 
        initialRouteName="Timeline" // FLAG - testing
        screenOptions={{
          headerShown: false
        }}
      >
        <Stack.Screen name="Login" component={Login} />
        
        {/* <Stack.Screen name="Home" component={Home} /> */}
        {/* <Stack.Screen name="Settings" component={Settings} /> */}

        {/* <Stack.Screen name="Selector" component={Selector} /> */}
        <Stack.Screen name="Timeline" component={Timeline} />
        
        {/* <Stack.Screen name="DiveView" component={DiveView} /> */}
        <Stack.Screen name="DiveAddEdit" component={DiveAddEdit} />
        
        {/* <Stack.Screen name="JumpView" component={JumpView} /> */}
        {/* <Stack.Screen name="JumpAddEdit" component={JumpAddEdit} /> */}

        {/* <Stack.Screen name="Camera" component={Camera} /> */}

        {/* <Stack.Screen name="Stats" component={Stats} /> */}

        {/* <Stack.Screen name="Map" component={Map} /> */}
      </Stack.Navigator>
    </NavigationContainer>
  );
}


export default App;