export default function UserInfo({ $target, initialState }) {
  const $userInfo = document.createElement('div');
  $userInfo.className = 'userInfo';

  $target.appendChild($userInfo);

  this.state = initialState;

  this.setState = (nextState) => {
    this.state = nextState;

    this.render();
  };

  this.render = () => {
    $userInfo.innerHTML = `
      <img class="userInfo__thumbnail" src="${this.state.thumbnail}" alt="user-thumbnail" width="50px" height="50px">
      <span class="userInfo__text">${this.state.nickname}님은 ${this.state.totalResults}개의 채널을 구독 중입니다!</span>
    `;
  };
}
