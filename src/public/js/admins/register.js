const account = document.querySelector('#account');
const password = document.querySelector('#password');
const confirmPassword = document.querySelector('#confirmPassword');

const checkPassword = () => {
  password.classList.remove('is-invalid');
  confirmPassword.classList.remove('is-invalid');
  if (password.value !== confirmPassword.value) {
    password.classList.add('is-invalid');
    confirmPassword.classList.add('is-invalid');
    return false;
  }
  return true;
};

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
  if (!confirmPassword.value) {
    alert('빈 입력값이 있습니다.');
    confirmPassword.focus();
    return false;
  }
  if (!checkPassword()) {
    alert('비밀번호를 확인해주세요.');
    password.focus();
    return false;
  }
  return true;
}

const enter = () => {
  register();
}

const register = async () => {
  if (!await checkInputValue()) {
    return;
  }

  const data = {
    account: account.value,
    password: password.value,
  };
  await fetch('/api/admins/register', {
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

      if (code === 201) {
        document.cookie = `accessToken=${res.accessToken}; path=/;`;
        document.cookie = `refreshToken=${res.refreshToken}; path=/;`;

        location.href = '/admins';
      }
    })
    .catch((err) => {
      console.log('err: ', err);
    });
}