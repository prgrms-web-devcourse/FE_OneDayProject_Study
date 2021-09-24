import Button from './Button.js'

export default function Header({ $target, onClick }) {
  const $header = document.createElement('header')
  $header.className = 'header'

  $target.appendChild($header)

  const $logo = document.createElement('div')
  $logo.textContent = '🐈프롱이 기록 모음'
  $header.appendChild($logo)

  new Button({
    $target: $header,
    text: '추가하기',
    onClick,
  })
}
