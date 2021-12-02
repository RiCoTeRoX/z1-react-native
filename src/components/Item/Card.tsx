import React, { FC, memo, useCallback } from 'react'
import { Image, ImageStyle, StyleSheet, Text, TextStyle, TouchableOpacity, View, ViewStyle } from 'react-native'
import { Colors } from '~/helpers/Colors'
import { Item } from '~/models/Item'

type CardProps = {
  item: Item
  onPress: (id: string) => void
}

const Card: FC<CardProps> = ({
  onPress,
  item: {
    id,
    title,
    image,
    category: { title: titleCategory },
  },
}) => {
  const handleCardPress = useCallback(() => {
    onPress(id)
  }, [onPress, id])

  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={handleCardPress}>
        <Image source={{ uri: image }} resizeMode="contain" style={styles.image} />
        <Text style={styles.title}>Title: {title}</Text>
        <Text style={styles.category}>Category: {titleCategory}</Text>
      </TouchableOpacity>
    </View>
  )
}

type CardStyles = {
  container: ViewStyle
  image: ImageStyle
  title: TextStyle
  category: TextStyle
}

const styles = StyleSheet.create<CardStyles>({
  container: {
    padding: 5,
    paddingVertical: 10,
    marginHorizontal: 10,
    flex: 1,
    backgroundColor: Colors.dark,
    borderRadius: 10,
    marginVertical: 10,
  },
  title: {
    paddingHorizontal: 5,
    fontSize: 12,
    paddingVertical: 5,
    color: Colors.white,
  },
  category: {
    paddingHorizontal: 5,
    fontSize: 10,
    paddingVertical: 5,
    color: Colors.white,
  },
  image: {
    width: 150,
    height: 80,
    alignSelf: 'center',
  },
})

export default memo(Card)
