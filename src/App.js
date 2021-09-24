import processInput from '../util/processInput.js'
import PeopleInfo from './PeopleInfo.js'

export default function App({ target }) {
  this.state = {
    currentData: null,
    totalPeople: 0,
    totalTeamNum: 0,
  }

  this.setState = (nextState) => {
    this.state = nextState
  }

  new PeopleInfo({
    target,
    initialState: this.state,
    onSubmit: async (text, numOfTeam) => {
      const preprocessedInput = await processInput(text)
      console.log(preprocessedInput)
      this.setState({
        ...this.state,
        currentData: preprocessedInput,
        totalPeople: preprocessedInput.length,
        totalTeamNum: numOfTeam,
      })
    },
  })
}
