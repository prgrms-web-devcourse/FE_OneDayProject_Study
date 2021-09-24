import { PEOPLEINFO, WEIGHT_GRAPH } from '../util/embededData.js'

export default function ResultBox({ target, initialState }) {
  const resultBox = document.createElement('div')
  resultBox.className = 'resultBox'
  target.appendChild(resultBox)

  this.state = initialState

  this.setState = (nextState) => {
    this.state = nextState
    this.render()
  }

  this.render = () => {
    const nOfTeam = this.state.nOfTeam
    const people = this.state.currentData
    console.log('people', people)
  }

  this.render()
}
