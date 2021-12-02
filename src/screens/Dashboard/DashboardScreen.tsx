import React, { useCallback, useState } from 'react'
import { View, StyleSheet, ViewStyle, FlatList, Text } from 'react-native'
import { NativeStackScreenProps } from '@react-navigation/native-stack'
import { filter, find, map, uniq } from 'lodash'
import { useQuery, gql } from '@apollo/client'
import FilterMenu from '~/components/menu/FilterMenu'
import Card from '~/components/Item/Card'
import { Colors } from '~/helpers/Colors'
import { Item, ItemList } from '~/models/Item'

type DashboardScreenProps = NativeStackScreenProps<
  {
    DashboardScreen: undefined
    ItemScreen: { item: Item | undefined }
  },
  'DashboardScreen'
>

const DashboardScreen = ({ navigation }: DashboardScreenProps) => {
  const { data, loading, refetch } = useQuery<ItemList>(gql`
    {
      items {
        id
        title
        image
        category {
          id
          title
        }
        author
      }
    }
  `)

  const [filtered, setFiltered] = useState<any>()

  const categories = uniq(map(data?.items, item => item.category.title))
  categories.unshift('All')

  const handleItemPress = useCallback(
    id => {
      const itemFiltered: Item | undefined = find(data?.items, { id })
      navigation.navigate('ItemScreen', { item: itemFiltered })
    },
    [navigation, data]
  )

  const handleItemMenuPress = (category: string) => {
    if (category === 'All') {
      refetch()
    } else {
      setFiltered(filter(data?.items, { category: { title: category } }))
    }
  }

  if (loading) {
    return (
      <View style={styles.container}>
        <Text>Cargando...</Text>
      </View>
    )
  }

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <FilterMenu onPress={handleItemMenuPress} filters={categories} />
      </View>
      <View style={styles.body}>
        <FlatList
          data={filtered || data?.items}
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
