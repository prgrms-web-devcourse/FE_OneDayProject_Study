const deletedKeys = ['guid', 'description', 'enclosure', 'categories']
const PREVIEW_LENGTH = 50
const htmlTagRegex = /<[^>]*>/g

export const formatFeedItems = (items, username) =>
  items.map((item) => {
    for (const key in deletedKeys) {
      delete item[key]
    }
    item['content'] = item['content']
      .replace(htmlTagRegex, '')
      .replace(/\n/g, ' ')
      .substr(0, PREVIEW_LENGTH)

    item['author'] = username

    return item
  })
