import React, { useCallback, useState } from 'react'
import { View, StyleSheet, ViewStyle, FlatList } from 'react-native'
import { NativeStackScreenProps } from '@react-navigation/native-stack'
import { filter, find, map, uniq } from 'lodash'
import * as ItemsList from '~/mocks/items.json'
import FilterMenu from '~/components/menu/FilterMenu'
import Card from '~/components/Item/Card'
import { Colors } from '~/helpers/Colors'
import { Item } from '~/models/Item'

type DashboardScreenProps = NativeStackScreenProps<
  {
    DashboardScreen: undefined
    ItemScreen: { item: Item | undefined }
  },
  'DashboardScreen'
>

const DashboardScreen = ({ navigation }: DashboardScreenProps) => {
  const [data, setData] = useState(ItemsList.data.items)

  const categories = uniq(map(ItemsList.data.items, items => items.category.title))
  categories.unshift('All')

  const handleItemPress = useCallback(
    id => {
      const itemFiltered: Item | undefined = find(ItemsList.data.items, { id })
      navigation.navigate('ItemScreen', { item: itemFiltered })
    },
    [navigation]
  )

  const handleItemMenuPress = (category: string) => {
    if (category === 'All') {
      setData(ItemsList.data.items)
    } else {
      setData(filter(ItemsList.data.items, { category: { title: category } }))
    }
  }

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <FilterMenu onPress={handleItemMenuPress} filters={categories} />
      </View>
      <View style={styles.body}>
        <FlatList
          data={data}
          numColumns={2}
          keyExtractor={item => item.id}
          scrollEventThrottle={16}
          renderItem={({ item }) => <Card item={item} onPress={handleItemPress} />}
        />
      </View>
    </View>
  )
}

type DashboardScreenStyles = {
  container: ViewStyle
  header: ViewStyle
  body: ViewStyle
}

const styles = StyleSheet.create<DashboardScreenStyles>({
  container: {
    flex: 1,
    padding: 10,
    backgroundColor: Colors.main,
  },
  header: {
    marginVertical: 10,
    backgroundColor: Colors.dark,
    paddingVertical: 10,
    paddingHorizontal: 5,
  },
  body: {
    backgroundColor: Colors.main,
  },
})

export default DashboardScreen
