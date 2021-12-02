import React, { memo } from 'react'
import { Button, View, Text, StyleSheet, ViewStyle, Image, TextStyle, ImageStyle } from 'react-native'
import { NativeStackScreenProps } from '@react-navigation/native-stack'
import { Item } from '~/models/Item'

type ItemScreenProps = NativeStackScreenProps<
  {
    DashboardScreen: undefined
    ItemScreen: { item: Item | undefined }
  },
  'ItemScreen'
>
const ItemScreen = ({
  navigation,
  route: {
    params: { item },
  },
}: ItemScreenProps) => {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>Title: {item?.title}</Text>
      <Image source={{ uri: item?.image }} resizeMode="contain" style={styles.image} />
      <Text style={styles.text}>Author: {item?.author}</Text>
      <Button title="Go to DashboardScreen" onPress={() => navigation.goBack()} />
    </View>
  )
}

type ItemScreentyles = {
  container: ViewStyle
  text: TextStyle
  image: ImageStyle
}

const styles = StyleSheet.create<ItemScreentyles>({
  container: {
    flex: 1,
    padding: 10,
  },
  text: { paddingVertical: 10 },
  image: {
    width: 300,
    height: 200,
  },
})

export default memo(ItemScreen)
