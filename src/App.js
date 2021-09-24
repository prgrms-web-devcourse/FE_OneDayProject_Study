// DUMMY DATA
import { apiResponse } from './apiData.js';

import AuthPage from './AuthPage.js';
import UserPage from './UserPage.js';
import SharePage from './SharePage.js';
import { initRouter } from './router.js';

export default function App({ $target }) {
  const authPage = new AuthPage({ $target });
  const userPage = new UserPage({ $target });
  const sharePage = new SharePage({ $target });
  // 로그인 된 상황으로 가정
  const isAuthorized = true;

  this.state = {
    userProfile: null,
    subscriptionList: null,
    sharedList: null,
  };

  this.setState = (nextState, renderPage) => {
    if (renderPage === 'authPage') {
      authPage.setState();
    } else if (renderPage === 'userPage') {
      this.state = nextState;
      userPage.setState(nextState);
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
      // sharedList는 DB로부터 GET
      const sharedList = [];
      const nextState = {
        ...this.state,
        subscriptionList,
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
