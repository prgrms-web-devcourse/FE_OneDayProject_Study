export default function UserList({ $target }) {
  const $userList = document.createElement('div');
  $userList.className = 'userList';

  $target.appendChild($userList);

  this.state = [];

  this.setState = (nextState) => {
    this.state = nextState;

    this.render();
  };

  this.render = () => {
    $userList.innerHTML = `
      ${this.state
        .map(
          (item) => `
        <div id=${item.channelId} class="userList__item">
          <img class="userList__thumbnail" src="${item.snippet.thumbnails.default.url}" alt="channel-thumbnail" width="40px" height="40px">
          <span class="userList__title">${item.snippet.title}</span>
        </div>
      `,
        )
        .join('')}
    `;
  };
}
