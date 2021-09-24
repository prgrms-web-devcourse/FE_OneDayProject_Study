export default function Button({ $target, text, onClick }) {
  const $button = document.createElement('button')
  $button.className = 'button'
  $button.textContent = text

  $target.appendChild($button)

  $button.addEventListener('click', onClick)
}
