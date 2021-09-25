import Modal from './Modal.js'

export default function SubscriptionAddModal({ $target, onSubscribe }) {
  const $modalBody = document.createElement('div')
  $modalBody.className = 'modal-body'

  $modalBody.innerHTML = `
    <h3 class="modal__title">벨로그 유저명을 입력해주세요</h3>
    <form class="modal__form">
      <div class="modal__input">
        <div>
          <span>https://velog.io/@</span>
          <input class="modal__username-input" type="text" placeholder="유저명"/>
        </div>
        <div class="modal__warn"></div>
      </div>
      <div class="modal__buttons">
        <button type="button" class="modal__button modal__button--secondary">취소</button>
        <button type="submit" class="modal__button modal__button--primary">확인</button>
      </div>
    </form>
  `

  const modal = new Modal({
    $target,
    $modalBody: $modalBody,
  })

  this.setState = (nextState) => {
    modal.setState(nextState)
  }

  $modalBody.querySelector('.modal__button--secondary').addEventListener('click', () => {
    this.setState({
      isOpen: false,
    })
  })

  $modalBody.addEventListener('submit', async (e) => {
    e.preventDefault()
    const $warn = document.querySelector('.modal__warn')

    const $input = document.querySelector('.modal__username-input')
    const username = $input.value

    if (!username) {
      $warn.textContent = '빈 값은 등록할 수 없습니다.'
      return
    }
    $input.value = ''

    this.setState({
      isOpen: false,
    })
    onSubscribe(username)
  })
}
