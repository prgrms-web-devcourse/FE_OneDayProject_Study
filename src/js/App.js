import Coins from './component/Coins.js';
import MyCoins from './component/MyCoins.js';
import Wallet from './component/Wallet.js';
import { coinApi } from './util/api.js';

export default function App({ $target }) {
  this.state = { coins: [], myCoins: [], wallet: 5000000000 };

  this.setState = (nextState) => {
    this.state = nextState;
    console.log(this.state);
    coinsComp.setState({ coins: this.state.coins });
    myCoinsComp.setState({ myCoins: this.state.myCoins });
    walletComp.setState({ wallet: this.state.wallet });
  };

  // Functions
  const getCoins = async () => {
    const coins = await coinApi.getCoins();

    this.setState({ ...this.state, coins });
  };

  // Compoents
  const coinsComp = new Coins({
    $target,
    initialState: { coins: this.state.coins },
  });

  const myCoinsComp = new MyCoins({
    $target,
    initialState: { myCoins: this.state.myCoins },
  });

  const walletComp = new Wallet({
    $target,
    initialState: { wallet: this.state.wallet },
  });

  this.init = () => {
    getCoins();
  };

  this.init();
}
