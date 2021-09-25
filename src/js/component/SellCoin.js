import { formatter } from '../util/formatter.js';

export default function SellCoin({ $target, initialState, onSell }) {
  const $form = document.createElement('form');
  $form.className = 'container-sell';

  this.state = initialState;

  this.setState = (nextState) => {
    this.state = nextState;
  };

  this.render = () => {
    $form.innerHTML = `
      <h1>Sell</h1>
      <label for="sellInput">${this.state.selectedCoin.name} 판매 갯수</label>
      <input id="sellInput" type="number" step="0.01" min="0" required/>
      <span>총 금액</span>
      <span class="sell-total">0원</span>
      <button>판매</button> 
      `;
  };

  this.render();

  this.parent = null;

  this.mount = (parent = $target) => {
    this.unMount();
    this.parent = parent;
    this.parent.appendChild($form);
    this.render();
    $form.querySelector('input').focus();
  };

  this.unMount = () => {
    if (this.parent?.contains($form)) {
      this.parent.removeChild($form);
    }
  };

  // Event Listener
  $form.addEventListener('input', (e) => {
    const { price, countity } = this.state.selectedCoin;
    const $total = $form.querySelector('.sell-total');
    if (e.target.value > countity) {
      e.target.value = countity;
    }
    $total.textContent = `${formatter.currency(e.target.value * price)}원`;
  });

  $form.addEventListener('submit', (e) => {
    e.preventDefault();
    const $input = $form.querySelector('input');
    const countity = Number($input.value);
    onSell({
      selectedCoin: this.state.selectedCoin,
      countity,
    });
    this.unMount(e.target);
  });

  $form.addEventListener('click', (e) => {
    e.stopPropagation();
  });
}
