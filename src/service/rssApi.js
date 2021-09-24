import { requestGet } from '../utils/api.js'
import { formatFeedItems } from './format.js'

const BASE_URL = 'https://api.rss2json.com/v1/api.json?rss_url=https://v2.velog.io/rss/'

const fetchRSSFeed = async (username) => {
  const data = await requestGet(`${BASE_URL}${username}`)

  return formatFeedItems(data.items, username)
}

const compareDate = (a, b) => {
  const dateA = new Date(a.pubDate)
  const dateB = new Date(b.pubDate)

  return dateB - dateA
}

const fetchAllRssFeed = async (subscriptions) => {
  const data = await Promise.all(
    subscriptions.map(async (username) => await fetchRSSFeed(username)),
  )

  const mergedData = data.reduce((acc, items) => [...items, ...acc], []).sort(compareDate)

  return mergedData
}

export default {
  fetchRSSFeed,
  fetchAllRssFeed,
}
