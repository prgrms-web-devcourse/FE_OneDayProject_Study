// DUMMY DATA
import { apiResponse } from './apiData.js';

// import AuthPage from './AuthPage.js';
import UserPage from './UserPage.js';
// import SharePage from './SharePage.js';
import { initRouter } from './router.js';

export default function App({ $target }) {
  this.state = {
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

  // const authPage = new AuthPage({ $target });
  const userPage = new UserPage({
    $target,
    initialState: {
      thumbnail: this.state.userProfile.thumbnail,
      nickname: this.state.userProfile.nickname,
      totalResults: this.state.subscriptionList.totalResults,
      items: this.state.subscriptionList.items,
    },
  });
  // const sharePage = new SharePage({ $target });
  // 로그인 된 상황으로 가정
  const isAuthorized = true;

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
    } else if (renderPage === 'sharePage') {
      this.state = nextState;
      sharePage.setState(nextState.sharedList);
    }
  };

  this.route = () => {
    const { pathname } = window.location;
    const [, userId] = pathname.split('/');

    if (pathname === '/' && isAuthorized) {
      const subscriptionList = apiResponse;
      console.log(subscriptionList);
      // sharedList는 DB로부터 GET
      const sharedList = [];
      const nextState = {
        ...this.state,
        subscriptionList: {
          totalResults: subscriptionList.pageInfo.totalResults,
          items: subscriptionList.items,
        },
        sharedList,
      };

      this.setState(nextState, 'userPage');
    } else if (userId) {
      const sharedList = [];
      const nextState = {
        ...this.state,
        sharedList,
      };

      this.setState(nextState, 'sharedPage');
    } else {
      // Auth Page 렌더
    }
  };

  this.route();

  initRouter(() => this.route());
}
