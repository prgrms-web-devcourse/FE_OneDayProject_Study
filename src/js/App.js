import Coins from './component/Coins.js';
import MyCoins from './component/MyCoins.js';
import Wallet from './component/Wallet.js';
import { coinApi } from './util/api.js';
import { getItem, setItem, STORAGE_KEY } from './util/storage.js';

export default function App({ $target }) {
  this.state = { coins: [], myCoins: [], selectedCoin: {}, wallet: 5000000000 };

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
    initialState: {
      coins: this.state.coins,
      wallet: this.state.wallet,
    },
    onPurchase: ({ id, name, countity, price }) => {
      console.log(id, countity, price);
      const { myCoins } = this.state;
      const index = myCoins.findIndex((coin) => coin.id === id);
      if (index >= 0) {
        myCoins[index].countity = countity;
      } else {
        myCoins.push({ id, name, countity, price });
      }
      this.setState({ ...this.state, myCoins });
      setItem(STORAGE_KEY.MY_COIN, myCoins);
    },
  });

  const myCoinsComp = new MyCoins({
    $target,
    initialState: { myCoins: this.state.myCoins },
  });

  const walletComp = new Wallet({
    $target,
    initialState: { wallet: this.state.wallet },
  });

  this.init = async () => {
    await getCoins();
    const myCoins = getItem(STORAGE_KEY.MY_COIN, []);
    console.log(myCoins);
    if (myCoins.length) {
      this.setState({ ...this.state, myCoins });
    }
  };

  this.init();
}
