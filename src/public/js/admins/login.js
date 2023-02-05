const account = document.querySelector('#account');
const password = document.querySelector('#password');

const checkInputValue = async () => {
  if (!account.value) {
    alert('빈 입력값이 있습니다.');
    account.focus();
    return false;
  }
  if (!password.value) {
    alert('빈 입력값이 있습니다.');
    password.focus();
    return false;
  }
  return true;
}

const enter = () => {
  login();
}

const login = async () => {
  if (!await checkInputValue()) {
    return;
  }

  const data = {
    account: account.value,
    password: password.value,
  };
  await fetch('/api/admins/login', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
  })
    .then(async (res) => {
      const code = res.status;

      res = await res.json();
      if (res.message) {
        alert(res.message);
      }

      if (code === 200) {
        document.cookie = `accessToken=${res.accessToken}; path=/;`;
        document.cookie = `refreshToken=${res.refreshToken}; path=/;`;
        localStorage.setItem('simpleAdminInfo', JSON.stringify(res.simpleAdminInfo));

        location.href = '/admins';
      }
    })
    .catch((err) => {
      console.log('err: ', err);
    });
}