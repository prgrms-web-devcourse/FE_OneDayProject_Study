import processInput from '../util/processInput.js'
import PeopleInfo from './PeopleInfo.js'

export default function App({ target }) {
  this.state = {
    currentPeople: '',
  }

  this.setState = (nextState) => {
    this.state = nextState
  }

  new PeopleInfo({
    target,
    initialState: this.state,
    onSubmit: async (text) => {
      const dataFrame = await processInput(text)
      console.log(dataFrame)
    },
  })
}
