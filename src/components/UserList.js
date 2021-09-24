export default function UserList({ $target, initialState, onScrollEnd }) {
  const $userList = document.createElement('div');
  $userList.className = 'userList';

  $target.appendChild($userList);

  this.state = initialState;

  let isInitialize = true;

  this.setState = (nextState) => {
    this.state = nextState;

    this.render();
  };

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          observer.unobserve(entry.target);
          onScrollEnd();
        }
      });
    },
    {
      threshold: 0.5,
    },
  );

  this.render = () => {
    if (isInitialize) {
      $userList.innerHTML = `
      ${this.state
        .map(
          (item) => `
        <div id=${item.snippet.resourceId.channelId} class="userList__item">
          <img class="userList__thumbnail" src="${item.snippet.thumbnails.default.url}" alt="channel-thumbnail" width="40px" height="40px">
          <span class="userList__title">${item.snippet.title}</span>
        </div>
      `,
        )
        .join('')}
    `;

      isInitialize = false;
    } else {
      this.state.forEach((item) => {
        const $item = document.createElement('div');
        $item.id = item.snippet.resourceId.channelId;
        $item.className = 'userList__item';
        $item.innerHTML = `
          <img class="userList__thumbnail" src="${item.snippet.thumbnails.default.url}" alt="channel-thumbnail" width="40px" height="40px">
          <span class="userList__title">${item.snippet.title}</span>
        `;

        $userList.appendChild($item);
      });
    }

    observer.observe($userList.querySelector('.userList__item:last-child'));
  };

  $userList.addEventListener('click', (e) => {
    const $item = e.target.closest('div');
    location.href = `https://www.youtube.com/channel/${$item.id}`;
  });
}
