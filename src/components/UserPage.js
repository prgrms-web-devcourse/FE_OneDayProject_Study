import UserInfo from './UserInfo.js';
import UserList from './UserList.js';

export default function UserPage({ $target, initialState }) {
  const $userPage = document.createElement('div');
  $userPage.className = 'userPage';

  $target.appendChild($userPage);

  this.state = initialState;

  const userInfo = new UserInfo({
    $target: $userPage,
    initialState: {
      thumbnail: this.state.thumbnail,
      nickname: this.state.nickname,
      totalResults: this.state.totalResults,
    },
  });
  const userList = new UserList({
    $target: $userPage,
    initialState: this.state.items,
  });

  this.setState = (nextState) => {
    this.state = nextState;

    userInfo.setState({
      thumbnail: this.state.thumbnail,
      nickname: this.state.nickname,
      totalResults: this.state.totalResults,
    });

    userList.setState(this.state.items);
  };
}
