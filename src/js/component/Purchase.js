import { formatter } from '../util/formatter.js';

export default function Purchase({ initialState, onPurchase }) {
  const $form = document.createElement('form');
  $form.className = 'container-purchase';

  this.state = initialState;

  this.setState = (nextState) => {
    this.state = nextState;
  };

  this.render = () => {
    $form.innerHTML = `
    <label for="purchaseInput">구입 갯수</label>
    <input id="purchaseInput" type="number" step="0.01" min="0" required/>
    <span>총 금액</span>
    <span class="purchase-total"></span>
    <button>구입</button> 
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
    const { price } = this.state.selectedCoin;
    const $total = $form.querySelector('.purchase-total');
    const totalCost = e.target.value * price;
    if (
      totalCost > this.state.wallet ||
      parseFloat(e.target.value) >
        parseFloat(this.state.wallet / price - 0.01).toFixed(2)
    ) {
      e.target.value = parseFloat(this.state.wallet / price - 0.01).toFixed(2);
    }
    $total.textContent = `${formatter.currency(e.target.value * price)}원`;
  });

  $form.addEventListener('submit', (e) => {
    e.preventDefault();
    const $input = $form.querySelector('input');
    const countity = $input.value;
    onPurchase({
      id: this.state.selectedCoin.id,
      countity,
      price: this.state.price,
    });
    this.unMount(e.target);
  });

  $form.addEventListener('click', (e) => {
    e.stopPropagation();
  });
}
