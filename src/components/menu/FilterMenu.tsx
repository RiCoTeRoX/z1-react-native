import React, { FC, useCallback } from 'react'
import { View, Text, StyleSheet, ViewStyle, ScrollView, TouchableOpacity } from 'react-native'
import { Colors } from '~/helpers/Colors'

export type FilterMenuProps = {
  onPress: (category: string) => void
  filters: string[]
}

const FilterMenu: FC<FilterMenuProps> = ({ onPress, filters }) => {
  const handleFilterOnPress = useCallback(
    (category: string) => {
      onPress(category)
    },
    [onPress]
  )

  return (
    <View style={styles.container}>
      <ScrollView horizontal showsHorizontalScrollIndicator={false} scrollEventThrottle={16}>
        {filters.map(filter => (
          <View style={styles.button} key={filter}>
            <TouchableOpacity onPress={() => handleFilterOnPress(filter)}>
              <Text>{filter}</Text>
            </TouchableOpacity>
          </View>
        ))}
      </ScrollView>
    </View>
  )
}

type FilterMenuStyles = {
  container: ViewStyle
  button: ViewStyle
}

const styles = StyleSheet.create<FilterMenuStyles>({
  container: {
    flexDirection: 'row',
  },
  button: {
    backgroundColor: Colors.light,
    padding: 5,
    paddingHorizontal: 10,
    borderRadius: 7,
    marginHorizontal: 5,
  },
})

export default FilterMenu
