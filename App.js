import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Authentication from './screens/Authentication/authentication';
import NoteManager from './screens/NoteManager/note-manager';

const Stack = createNativeStackNavigator();

function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen
          name="Authentication"
          component={Authentication}
          options={{
            title: 'Authentication',
            headerTitleAlign: 'center'
          }}
        />
        <Stack.Screen
          name="NoteManager"
          component={NoteManager}
          options={{
            title: 'Note',
            headerTitleAlign: 'center'
          }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default App;
