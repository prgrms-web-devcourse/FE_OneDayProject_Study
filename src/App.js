import AuthPage from './AuthPage.js'
import UserPage from './UserPage.js'
import SharePage from './SharePage.js'

export default function App({ $target }) {
  new AuthPage()
  new UserPage()
  new SharePage()
}
