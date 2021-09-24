export default function ResultBox({ target, initialState }) {
  const resultBox = document.createElement('div')
  resultBox.className = 'resultBox'
  target.appendChild(resultBox)

  this.state = initialState

  this.setState = (nextState) => {
    this.state = nextState
  }

  this.render = () => {}
  this.render()
}
