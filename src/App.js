import processInput from '../util/processInput.js'
import PeopleInfo from './PeopleInfo.js'
import ResultBox from './ResultBox.js'

export default function App({ target }) {
  this.state = {
    currentData: null,
    totalPeople: 0,
    totalTeamNum: 0,
  }

  this.setState = (nextState) => {
    this.state = nextState
    resultBox.setState(this.state)
  }

  const peopleInfo = new PeopleInfo({
    target,
    initialState: this.state,
    onSubmit: async (text, numOfTeam) => {
      const preprocessedInput = await processInput(text)
      this.setState({
        ...this.state,
        currentData: preprocessedInput,
        totalPeople: preprocessedInput.length,
        totalTeamNum: numOfTeam,
      })
    },
  })

  const resultBox = new ResultBox({
    target,
    initialState: this.state,
  })
}
