import Coins from './component/Coins.js';
import Header from './component/Header.js';
import MyCoins from './component/MyCoins.js';
import Wallet from './component/Wallet.js';
import { coinApi } from './util/api.js';
import { getItem, setItem, STORAGE_KEY } from './util/storage.js';

export default function App({ $target }) {
  this.state = { coins: [], myCoins: [], selectedCoin: {}, wallet: 0 };

  this.setState = (nextState) => {
    this.state = nextState;
    coinsComp.setState({ coins: this.state.coins, wallet: this.state.wallet });
    myCoinsComp.setState({ myCoins: this.state.myCoins });
    walletComp.setState({ wallet: this.state.wallet });
  };

  // Functions
  const getCoins = async () => {
    const coins = await coinApi.getCoins();

    this.setState({ ...this.state, coins });
  };

  const getMyCoins = async () => {
    let myCoins = getItem(STORAGE_KEY.MY_COIN, []);

    if (myCoins.length) {
      const coinIds = myCoins.map((coin) => coin.id).join(',');
      const coins = await coinApi.getCoinByIds(coinIds);
      myCoins = myCoins.map((coin) => {
        const sameCoinIndex = coins.findIndex(
          (newCoin) => newCoin.id === coin.id,
        );
        coin.price = coins[sameCoinIndex].current_price;
        return coin;
      });
      this.setState({ ...this.state, myCoins });
    }
  };

  const purchaseCoin = ({ selectedCoin, countity }) => {
    const { id, name, image, price } = selectedCoin;
    const { myCoins, wallet } = this.state;
    if (countity * price > wallet) return;
    changeWalletValue(-(countity * price));
    const index = myCoins.findIndex((coin) => coin.id === id);
    if (index >= 0) {
      myCoins[index].countity += countity;
      myCoins[index].totalSpent += countity * price;
    } else {
      myCoins.push({
        id,
        name,
        image,
        price,
        countity,
        totalSpent: countity * price,
      });
    }
    this.setState({ ...this.state, myCoins });
    setItem(STORAGE_KEY.MY_COIN, myCoins);
  };

  const sellCoin = ({ selectedCoin, countity }) => {
    const { id, price } = selectedCoin;
    const { myCoins } = this.state;

    changeWalletValue(countity * price);
    const index = myCoins.findIndex((coin) => coin.id === id);
    myCoins[index].countity -= countity;
    myCoins[index].totalSpent -= countity * price;
    if (myCoins[index].countity <= 0) {
      myCoins.splice(index, 1);
    }
    this.setState({ ...this.state, myCoins });
    setItem(STORAGE_KEY.MY_COIN, myCoins);
  };

  const getWallet = () => {
    const wallet = getItem(STORAGE_KEY.WALLET, 500000000);
    this.setState({ ...this.state, wallet });
  };

  const changeWalletValue = (number) => {
    let { wallet } = this.state;
    wallet += number;
    this.setState({ ...this.state, wallet });
    setItem(STORAGE_KEY.WALLET, wallet);
  };

  // Compoents

  new Header({ $target });

  const coinsComp = new Coins({
    $target,
    initialState: {
      coins: this.state.coins,
      wallet: this.state.wallet,
    },
    onPurchase: ({ selectedCoin, countity }) => {
      purchaseCoin({ selectedCoin, countity });
    },
  });

  const myCoinsComp = new MyCoins({
    $target,
    initialState: { myCoins: this.state.myCoins },
    onSell: ({ selectedCoin, countity }) => {
      sellCoin({ selectedCoin, countity });
    },
  });

  const walletComp = new Wallet({
    $target,
    initialState: { wallet: this.state.wallet },
  });

  this.init = async () => {
    await getCoins();
    await getMyCoins();
    setInterval(async () => {
      await getCoins();
      await getMyCoins();
    }, 10000);

    getWallet();
  };

  this.init();
}
