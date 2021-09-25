import { formatter } from '../util/formatter.js';
import Purchase from './Purchase.js';

export default function Coins({ $target, initialState, onPurchase }) {
  // Variables
  let isInit = true;
  // DOM Create
  const $container = document.createElement('div');
  $container.className = 'container-coins';
  $target.appendChild($container);
  this.state = initialState;

  this.setState = (nextState) => {
    this.state = { ...this.state, ...nextState };
    if (this.state.selectedCoin) {
      purchaseComp.setState({
        selectedCoin: this.state.selectedCoin,
        wallet: this.state.wallet,
      });
    }
    this.render();
  };

  // Components

  const purchaseComp = new Purchase({
    $target,
    initialState: {},
    onPurchase,
  });

  this.render = () => {
    if (isInit) {
      $container.innerHTML = `
        <h1>Coins</h1>
        <ul>
        ${this.state.coins
          .map(
            ({ id, name, image, current_price, price_change_percentage_24h }) =>
              `
              <li data-id=${id} class="coin">
                <img src="${image}" />
                <div class="coin-description">
                  <span class="coin-name">${name}</span>
                  <span class="coin-price">${formatter.currency(
                    current_price,
                  )}원</span>
                  <span class="coin-price__change">${parseFloat(
                    price_change_percentage_24h,
                  ).toFixed(2)} %</span>
                </div>
              </li>
              `,
          )
          .join('')}
        </ul>
        `;

      isInit = false;
    }
  };

  $container.addEventListener('click', (e) => {
    const $li = e.target.closest('li');
    if ($li) {
      const { id: coinId } = $li.dataset;
      const {
        id,
        name,
        image,
        current_price: price,
      } = this.state.coins.find((coin) => coin.id === coinId);
      this.setState({
        ...this.state,
        selectedCoin: { id, name, image, price },
      });
      purchaseComp.mount();
    }
  });
}
