export default function PeopleInfo({ target, initialState, onSubmit }) {
  const infoFormat = document.createElement('div')
  infoFormat.className = 'informationForm'
  target.appendChild(infoFormat)

  this.state = initialState

  this.setState = (nextState) => {
    this.state = nextState
    this.render()
  }

  this.render = () => {
    infoFormat.innerHTML = `
    <div class= 'peopleInfoBlock'>
      <textarea class='inputText'  placeholder='사용자 정보를 입력해 주세요' /></textarea>
      <button class='submitbutton'>팀 제작 시작</button>
      <input class= 'slider' type='number' min='1' max='10' step='1' value='1' size="6">
    </div>
    `
  }

  this.render()

  const textarea = infoFormat.querySelector('.inputText')
  const slider = infoFormat.querySelector('.slider')

  textarea.addEventListener('mouseout', (e) => {
    const text = []
    textarea.value.split('\n').map((e) => {
      if (e) text.push(e)
    })

    slider.max = Math.floor(text.length / 2)
    if (slider.max === 0) slider.value = 0
    if (slider.max < slider.value) slider.value = 1

    this.state.currentData = text
  })

  infoFormat.addEventListener('click', (e) => {
    const target = e.target.closest('button')
    if (target) {
      onSubmit(this.state.currentData, slider.value)
    }
  })
}
