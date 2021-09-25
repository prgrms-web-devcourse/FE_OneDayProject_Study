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
      <div class="userList__controlPanel">
        <button class="controlPanel__selectAll">전체 선택</button>
        <button class="controlPanel__share">선택 채널 공유하기</button>
      </div>
      <div class="userList__contents">
        ${this.state
          .map(
            (item) => `
          <div id=${item.snippet.resourceId.channelId} class="userList__item">
            <img class="userList__thumbnail" src="${item.snippet.thumbnails.default.url}" alt="channel-thumbnail">
            <span class="userList__title">${item.snippet.title}</span>
            <button class="userList__button">선택</button>
          </div>
        `,
          )
          .join('')}
      </div>
    `;

      isInitialize = false;
    } else {
      this.state.forEach((item) => {
        const $item = document.createElement('div');
        $item.id = item.snippet.resourceId.channelId;
        $item.className = 'userList__item';
        $item.innerHTML = `
          <img class="userList__thumbnail" src="${item.snippet.thumbnails.default.url}" alt="channel-thumbnail">
          <span class="userList__title">${item.snippet.title}</span>
          <button class="userList__button">선택</button>
        `;

        const $contents = $userList.querySelector('.userList__contents');
        $contents.appendChild($item);
      });
    }

    observer.observe($userList.querySelector('.userList__item:last-child'));
  };

  $userList.addEventListener('click', (e) => {
    if (e.target.className === 'userList__thumbnail') {
      const $item = e.target.closest('div');
      location.href = `https://www.youtube.com/channel/${$item.id}`;
    }

    if (e.target.className === 'userList__button') {
      const $item = e.target.closest('div');
      console.log($item.classList.length);
      if ($item.classList.length === 1) {
        $item.classList.add('selected');
      } else {
        $item.classList.remove('selected');
      }
    }

    if (e.target.className === 'controlPanel__share') {
      // 현재 선택되어 있는
    }
  });
}
