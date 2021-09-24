import { API, request } from './utils/api.js';
import { getItem, setItem, removeItem } from './utils/storage.js';
import AuthPage from './components/AuthPage.js';
import UserPage from './components/UserPage.js';
// import SharePage from './SharePage.js';
import { initRouter, push } from './utils/router.js';

export default function App({ $target }) {
  this.state = {
    isAuthorized: getItem('isAuthorized', false),
    userProfile: {
      id: '',
      thumbnail: '',
      nickname: '',
    },
    subscriptionList: {
      totalResults: 0,
      items: [],
    },
    sharedList: {
      userId: '',
      items: [],
    },
  };

  const authPage = new AuthPage({ $target });
  const userPage = new UserPage({
    $target,
    initialState: {
      thumbnail: this.state.userProfile.thumbnail,
      nickname: this.state.userProfile.nickname,
      totalResults: this.state.subscriptionList.totalResults,
      items: this.state.subscriptionList.items,
    },
    onScrollEnd: async () => {
      const nextPageToken = getItem('nextPageToken');
      if (nextPageToken !== undefined) {
        // accessToken 만료되면 어쩌지?
        const accessToken = getItem('accessToken');
        const nextSubscriptionData = await request(
          API.SUBSCRIPTION + `&pageToken=${nextPageToken}`,
          accessToken,
        );
        if (nextSubscriptionData.nextPageToken !== undefined) {
          setItem('nextPageToken', nextSubscriptionData.nextPageToken);
        } else {
          removeItem('nextPageToken');
        }

        const nextState = {
          ...this.state,
          subscriptionList: {
            ...this.state.subscriptionList,
            items: nextSubscriptionData.items,
          },
        };
        this.setState(nextState, 'userPage');
      }
    },
  });
  // const sharePage = new SharePage({ $target });

  this.setState = (nextState, renderPage) => {
    if (renderPage === 'authPage') {
      authPage.setState();
    } else if (renderPage === 'userPage') {
      this.state = nextState;
      userPage.setState({
        thumbnail: this.state.userProfile.thumbnail,
        nickname: this.state.userProfile.nickname,
        totalResults: this.state.subscriptionList.totalResults,
        items: this.state.subscriptionList.items,
      });
    }
    // else if (renderPage === 'sharePage') {
    //   this.state = nextState;
    //   sharePage.setState(nextState.sharedList);
    // }
  };

  this.route = async () => {
    const { pathname } = window.location;
    // const [, userId] = pathname.split('/');

    if (pathname === '/' && !this.state.isAuthorized) {
      authPage.render();
    } else if (pathname === '/callback') {
      const accessToken = location.hash.split('&')[0].substring(14);
      setItem('accessToken', accessToken);
      setItem('isAuthorized', true);
      const nextState = {
        ...this.state,
        isAuthorized: true,
      };
      // 직접 할당?
      this.state = nextState;
      push('/');
    } else if (pathname === '/' && this.state.isAuthorized) {
      const accessToken = getItem('accessToken');
      const userData = await request(API.USERINFO, accessToken);
      const subscriptionData = await request(API.SUBSCRIPTION, accessToken);

      if (subscriptionData.nextPageToken !== undefined) {
        setItem('nextPageToken', subscriptionData.nextPageToken);
      }

      const nextState = {
        ...this.state,
        isAuthorized: true,
        userProfile: {
          id: userData.id,
          thumbnail: userData.picture,
          nickname: userData.name,
        },
        subscriptionList: {
          totalResults: subscriptionData.pageInfo.totalResults,
          items: subscriptionData.items,
        },
      };

      this.setState(nextState, 'userPage');
    }
    // sharePage 렌더
    // else if (userId) {
    //   const sharedList = [];
    //   const nextState = {
    //     ...this.state,
    //     sharedList,
    //   };

    //   this.setState(nextState, 'sharedPage');
    // }
  };

  initRouter(() => this.route());

  this.route();
}
