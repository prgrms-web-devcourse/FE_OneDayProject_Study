const API_END_POINT = 'https://www.googleapis.com';
export const API = {
  USERINFO: '/oauth2/v1/userinfo',
  SUBSCRIPTION:
    '/youtube/v3/subscriptions?part=snippet&mine=true&maxResults=50',
  SAVE_LIST: '공유 리스트를 저장할 api 주소',
};

export const request = async (url, accessToken, options = {}) => {
  try {
    const res = await fetch(`${API_END_POINT}${url}`, {
      ...options,
      headers: {
        Authorization: `Bearer ${accessToken}`,
        // 'Content-Type': 'application/json',
      },
    });

    if (res.ok) {
      return await res.json();
    }
  } catch (e) {
    alert(e.message);
  }
};

// export const getList = async (url, options = {}) => {
//   try {
//     const res = await fetch(`${API_END_POINT}${url}`, {
//       ...options,
//       headers: {
//         'Content-Type': 'application/json',
//       },
//     });

//     if (res.ok) {
//       return await res.json();
//     }
//   } catch (e) {
//     alert(e.message);
//   }
// };

export const saveList = async (url, options = {}) => {
  try {
    const res = await fetch(`${API_END_POINT}${url}`, {
      ...options,
      headers: {
        'Content-Type': 'application/json',
      },
    });

    if (res.ok) {
      return await res.json();
    }
  } catch (e) {
    alert(e.message);
  }
};
