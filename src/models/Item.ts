export type Item = {
  id: string
  title: string
  image: string
  category: {
    id: string
    title: string
  }
  author: string | null
  content: string
}

export type ItemList = {
  items: Item[]
}
