const config = {
  baseUrl: 'https://nomoreparties.co/v1/plus-cohort-14',
  headers: {
    authorization: '3a76beda-dcbb-4c59-817c-2a3fb7dba694',
    'Content-Type': 'application/json'
  }
}

function serverRequest(target, method) {
  return fetch(`${config.baseUrl}/${target}`, {
    method: method,
    headers: config.headers
  })
  .then((res) => {
    if (res.ok) {
      return res.json()
    };
    return Promise.reject(`Ошибка: ${res.status}`);
  });
}

function serverRequestWithData(target, method, data) {
  return fetch(`${config.baseUrl}/${target}`, {
    method: method,
    headers: config.headers,
    body: JSON.stringify(data)
  })
  .then((res) => {
    if (res.ok) {
      return res.json()
    };
    return Promise.reject(`Ошибка: ${res.status}`);
  })
}

function fetchProfileInfo() {
  return serverRequest('users/me', 'GET');
}

function fetchCards() {
  return serverRequest('cards', 'GET');
}

function sendCard(name, link) {
  return serverRequestWithData('cards', 'POST', {
    name: name,
    link: link
  });
}

function sendProfile(name, about) {
  return serverRequestWithData('users/me', 'PATCH', {
    name: name,
    about: about
  });
}

function sendAvatar(avatarUrl) {
  return serverRequestWithData('users/me/avatar', 'PATCH', {
    avatar: avatarUrl
  });
}

function sendLike(cardId, like) {
  const method = like ? 'PUT' : 'DELETE';
  return serverRequest(`cards/likes/${cardId}`, method);
}

function sendCardDelete(cardId) {
  return serverRequest(`cards/${cardId}`, 'DELETE');
}

export {fetchProfileInfo, fetchCards, sendCard, sendProfile, sendAvatar, sendLike, sendCardDelete};
