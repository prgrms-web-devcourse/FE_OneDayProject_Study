import { formatter } from '../util/formatter.js';
import SellCoin from './SellCoin.js';

export default function MyCoins({ $target, initialState, onSell }) {
  const $container = document.createElement('div');
  $container.className = 'container-my_coins';
  $target.appendChild($container);
  this.state = initialState;

  this.setState = (nextState) => {
    this.state = nextState;

    sellCoinComp.setState({
      selectedCoin: this.state.selectedCoin,
    });

    this.render();
  };

  // Components
  const sellCoinComp = new SellCoin({
    $target,
    initialState: { selectedCoin: {} },
    onSell,
  });

  this.render = () => {
    $container.innerHTML = `
      <h1>My Coins</h1>
      <ul>
        ${this.state.myCoins
          .map(
            ({ id, name, image, price, countity, totalSpent }) => `
          <li data-id=${id}>
            <img src="${image}" />
                <div class="coin-description">
                  <span class="coin-name">${name}</span>
                  <span class="coin-price">${formatter.currency(price)}원</span>
                  <span class="coin-countity">${countity}개</span>
                  <span class="coin-price__change">${parseFloat(
                    (price * countity * 100) / totalSpent - 100,
                  ).toFixed(2)}%</span>
                </div>
          </li>`,
          )
          .join('')}
      </ul>
      `;
  };

  $container.addEventListener('click', (e) => {
    const $li = e.target.closest('li');
    if ($li) {
      const { id: coinId } = $li.dataset;
      const { id, name, price, countity } = this.state.myCoins.find(
        (coin) => coin.id === coinId,
      );
      this.setState({
        ...this.state,
        selectedCoin: { id, name, price, countity },
      });
      sellCoinComp.mount();
    }
  });
}
