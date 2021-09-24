export default function MyCoins({ $target, initialState }) {
  const $container = document.createElement('div');
  $container.className = 'container-my_coins';
  $target.appendChild($container);
  this.state = initialState;

  this.setState = (nextState) => {
    this.state = nextState;

    this.render();
  };

  this.render = () => {
    $container.innerHTML = `
      <h1>My Coins</h1>
      <ul>
        ${this.state.myCoins
          .map(
            ({ id, name, countity, price }) => `
          <li data-id=${id}>
            ${name}
          </li>`,
          )
          .join('')}
      </ul>
      `;
  };
}
