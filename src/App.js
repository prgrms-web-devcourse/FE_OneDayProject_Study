import HomePage from './pages/HomePage.js'

import RouterUtils from './utils/router.js'
import StorageUtils from './utils/storage.js'
import rssApi from './service/rssApi.js'

const SUBSCRIPTIONS_SAVE_KEY = 'SUBSCRIPTIONS_SAVE_KEY'
export default function App({ $target }) {
  this.state = {
    subscriptions: StorageUtils.getItem(SUBSCRIPTIONS_SAVE_KEY, ['surim014']),
    items: [],
  }

  const homePage = new HomePage({
    $target,
    initialState: this.state,
    onSubscribe: async (username) => {
      const subscriptions = [...this.state.subscriptions, username]

      this.setState({
        ...this.state,
        subscriptions,
      })

      StorageUtils.setItem(SUBSCRIPTIONS_SAVE_KEY, subscriptions)

      await fetchItems()
    },
  })

  this.setState = (nextState) => {
    this.state = nextState
    homePage.setState(this.state)
  }

  this.route = () => {
    const { pathname } = window.location
    if (pathname === '/') {
      homePage.render()
    } else {
      $target.innerHTML = '존재하지 않는 페이지입니다.'
    }
  }

  const fetchItems = async () => {
    const items = await rssApi.fetchAllRssFeed(this.state.subscriptions)

    this.setState({
      ...this.state,
      items,
    })
  }

  RouterUtils.init(this.route)

  this.route()
  fetchItems()
}
