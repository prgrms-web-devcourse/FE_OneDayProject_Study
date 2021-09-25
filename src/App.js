import processInput from '../util/processInput.js'
import PeopleInfo from './PeopleInfo.js'
import ResultBox from './ResultBox.js'

/* 13명 예시

윤승록, INFP
손수림, INFJ
JOHN, ENTP
YUri, ENTJ
김사휘, ENFJ
김정운, ENFP
권정희, INFJ
YUri2, ENTJ
리아, INFP
윤상준, ENFP
박상우,  ISFP
이소정, ESFP
오재원, ESFP

*/

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
    onSubmit: (text, numOfTeam) => {
      const preprocessedInput = processInput(text)
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
