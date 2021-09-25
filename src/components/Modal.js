export default function Modal({ $target, $modalBody }) {
  const $modalContainer = document.createElement('div')

  const $modal = document.createElement('div')
  $modal.className = 'modal'
  $modal.appendChild($modalBody)

  const $backdrop = document.createElement('div')
  $backdrop.className = 'backdrop'

  $modalContainer.appendChild($backdrop)
  $modalContainer.appendChild($modal)

  $target.appendChild($modalContainer)

  this.state = {
    isOpen: false,
  }

  this.setState = (nextState) => {
    this.state = nextState
    this.render()
  }

  this.render = () => {
    $modalContainer.className = this.state.isOpen ? 'modal-container' : 'none'
    $modalContainer.querySelector('input').focus()
  }

  $backdrop.addEventListener('click', (e) => {
    this.setState({
      ...this.state,
      isOpen: false,
    })
  })

  this.render()
}
