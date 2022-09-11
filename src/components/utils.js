const token = '3a76beda-dcbb-4c59-817c-2a3fb7dba694';
const cohort = 'plus-cohort-14';
const server = 'https://nomoreparties.co/v1';

function fetchDataFromServer(target) {
  return fetch(`${server}/${cohort}/${target}`, {
    headers: {
      authorization: token
    }
  })
  .then((res) => {
    return res.json()
  });
}

function putDataToServer(target, method, data) {
  return fetch(`${server}/${cohort}/${target}`, {
    method: method,
    headers: {
      authorization: token,
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(data)
  })
  .then((res) => {
    return res.json()
  })
  .catch((err) => {
    console.log(err);
  });
}

export {fetchDataFromServer, putDataToServer};
