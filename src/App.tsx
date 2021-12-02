import React, { ComponentType } from 'react'
import { keys, map } from 'lodash'
import { NavigationContainer } from '@react-navigation/native'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import { ApolloProvider } from '@apollo/client'

import * as screens from './screens/index'
import { client } from './api/api'

const Stack = createNativeStackNavigator()

const App = () => {
  return (
    <ApolloProvider client={client}>
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
    </ApolloProvider>
  )
}

export default App
