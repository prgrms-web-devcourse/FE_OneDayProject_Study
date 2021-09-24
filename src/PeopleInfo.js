export default function PeopleInfo({ target, initialState, onSubmit }) {
  const infoFormat = document.createElement('div')
  infoFormat.className = 'informationForm' // css적용을 위한 클래스이

  target.appendChild(infoFormat)

  this.render = () => {
    infoFormat.innerHTML = `
    <div class= 'peopleInfoBlock'>
      <textarea class='inputText'  placeholder='사용자 정보를 입력해 주세요' /></textarea>
      <button class='submitbutton'>팀 제작 시작</button>
      <input type="number" min="0" max="10" step="2" value="6" size="6">
    <div>
    `
  }

  this.render()

  infoFormat.addEventListener('click', (e) => {
    const target = e.target.closest('button')
    if (target) {
      const textareaElement = e.target.parentNode.querySelector('.inputText')
      const text = textareaElement.value
      onSubmit(text)
    }
  })
}
