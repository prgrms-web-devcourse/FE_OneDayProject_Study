export default function UserList({
  $target,
  initialState,
  onScrollEnd,
  onSave,
}) {
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
        <button class="controlPanel__selectAll">전체 해제</button>
        <button class="controlPanel__saveList">공유 목록 저장하기</button>
      </div>
      <div class="userList__contents">
        ${this.state.items
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
      this.state.items.forEach((item) => {
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

  // const isSelectAll = true;

  const addSelected = (channelId) => {
    this.state.selectedItems.push(channelId);
  };
  const removeSelected = (channelId) => {
    this.state.selectedItems.splice(
      this.state.selectedItems.indexOf(channelId),
      1,
    );
  };

  $userList.addEventListener('click', (e) => {
    if (e.target.className === 'userList__thumbnail') {
      const $item = e.target.closest('div');
      location.href = `https://www.youtube.com/channel/${$item.id}`;
    }

    if (e.target.className === 'userList__button') {
      const $item = e.target.closest('div');

      if ($item.classList.length === 1) {
        $item.classList.add('selected');
        addSelected($item.id);
      } else {
        $item.classList.remove('selected');
        removeSelected($item.id);
      }
    }

    // 전체 선택, 전체 해제
    // if (e.target.className === 'controlPanel__selectAll') {
    //   const $selectAllButton = e.target;
    //   const items = $userList.querySelectorAll('.userList__item');
    //   if (isSelectAll) {
    //     $selectAllButton.textContent = '전체 선택';
    //     isSelectAll = !isSelectAll;

    //     items.forEach((item) => {
    //       item.classList.remove('selected');
    //     });
    //   } else {
    //     $selectAllButton.textContent = '전체 해제';
    //     isSelectAll = !isSelectAll;

    //     items.forEach((item) => {
    //       item.classList.add('selected');
    //     });
    //   }
    // }

    if (e.target.className === 'controlPanel__saveList') {
      // 현재 선택되어 있는 item들 db로 내보내기
      // 선택, 해제 내용을 id만 담아뒀다가, 내보내기 할 때 subscriptionList에서 item에 필요정보를 취합해서 내보낸다?
      // 그리고 sharedList 업데이트
      onSave(selectedItems);
    }
  });
}
