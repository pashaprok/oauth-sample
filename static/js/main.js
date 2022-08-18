const URL_PARAMS = new URLSearchParams(window.location.search);
const USERNAME = URL_PARAMS.get('username');

// Show an element
const show = (selector) => {
  document.querySelector(selector).style.display = 'block';
};

// Hide an element
const hide = (selector) => {
  document.querySelector(selector).style.display = 'none';
};

// show username
const username = document.getElementById('username');

if (USERNAME) {
  hide('.content.unauthorized');
  show('.content.authorized');
  username.textContent = USERNAME;
}
