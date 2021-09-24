export default function AuthPage({ $target }) {
  const $authPage = document.createElement('div');
  $authPage.className = 'authPage';

  $target.appendChild($authPage);

  this.render = () => {
    console.log('렌더');
    $authPage.innerHTML = `
      <button class="authPage__signInButton">구글로 로그인 하기</button>
    `;
  };

  $authPage.addEventListener('click', (e) => {
    const $button = e.target.closest('button');

    if ($button) {
      location.href =
        'https://accounts.google.com/o/oauth2/auth?client_id=728301967201-lktppiaq5m7bhf1005hl085mget3dgam.apps.googleusercontent.com&redirect_uri=http://localhost:5000/callback&scope=https://www.googleapis.com/auth/youtube https://www.googleapis.com/auth/userinfo.profile&response_type=token';
    }
  });
}
