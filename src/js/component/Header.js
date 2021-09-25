export default function Header({ $target }) {
  const $header = document.createElement('h1');
  $header.className = 'header';
  $target.appendChild($header);
  this.render = () => {
    $header.innerHTML = `Coin Trader`;
  };

  this.render();
}
