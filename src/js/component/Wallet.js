import { formatter } from '../util/formatter';

export default function Wallet({ $target, initialState }) {
  const $container = document.createElement('div');
  $container.className = 'container-wallet';
  $target.appendChild($container);
  this.state = initialState;

  this.setState = (nextState) => {
    this.state = nextState;

    this.render();
  };

  this.render = () => {
    $container.innerHTML = `
    <h1>Wallet</h1>
    <span>보유 자산: ${formatter.currency(this.state.wallet)}원</span>  
    `;
  };
  this.render();
}
