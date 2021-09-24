import { formatter } from '../util/formatter.js';

export default function Purchase({ $target, initialState }) {
  const $form = document.createElement('form');
  $form.className = 'container-purchase';
  $target.appendChild($form);

  this.state = initialState;

  this.render = () => {
    $form.innerHTML = `
    <label for="purchaseInput">구입 갯수</label>
    <input id="purchaseInput" type="number" step="0.01" min="0"/>
    <span>총 금액</span>
    <span class="purchase-total"></span>
    
    <button>구입</button> 
    `;
  };
  this.render();

  $form.querySelector('input').addEventListener('input', (e) => {
    const $total = $form.querySelector('.purchase-total');
    $total.textContent = `${formatter.currency(
      e.target.value * this.state.price,
    )}원`;
  });
  $form.addEventListener('submit', (e) => {
    e.preventDefault();
  });
  $form.addEventListener('click', (e) => {
    e.stopPropagation();
  });
}
