import React, { ComponentType } from 'react'
import { keys, map } from 'lodash'
import { NavigationContainer } from '@react-navigation/native'
import { createNativeStackNavigator } from '@react-navigation/native-stack'

import * as screens from './screens/index'

const Stack = createNativeStackNavigator()

const App = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        {map(keys(screens), (screenName: any) => (
          <Stack.Screen
            key={screenName}
            name={screenName}
            component={(screens as Record<string, ComponentType<any>>)[screenName]}
          />
        ))}
      </Stack.Navigator>
    </NavigationContainer>
  )
}

//   registerScreen((screens as Record<string, ComponentType<any>>)[screenName], screenName)
export default App
