const ROUTE_CHANGE = 'route-change'

const push = (nextUrl) => {
  window.history.pushState(null, null, nextUrl)
  window.dispatchEvent(new CustomEvent(ROUTE_CHANGE))
}

const init = (route) => {
  window.addEventListener('popstate', route)
  window.addEventListener(ROUTE_CHANGE, route)
}

export default {
  init,
  push,
}
