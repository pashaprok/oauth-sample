const URL_PARAMS = new URLSearchParams(window.location.search);
const USERNAME = URL_PARAMS.get('username');
const IMAGE = URL_PARAMS.get('avatar');

// set username
const username = document.getElementById('username');
if (USERNAME) {
  username.textContent = USERNAME;
}

// set avatar
const avatar = document.getElementById('avatar');
if (IMAGE) {
  avatar.src = IMAGE;
}
