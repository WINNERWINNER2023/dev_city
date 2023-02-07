// 조성훈님 출처코드 변경사항 account -> email / admins -> customers / simpleAdminInfo -> simpleCustomerInfo

const email = document.querySelector('#email');
const nickname = document.querySelector('#nickname');
const password = document.querySelector('#password');
const confirmPassword = document.querySelector('#confirmPassword');
const phone = document.querySelector('#phone');

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
  if (!email.value) {
    alert('빈 입력값이 있습니다.');
    email.focus();
    return false;
  }
  if (!nickname.value) {
    alert('빈 입력값이 있습니다.');
    password.focus();
    return false;
  }
  if (!password.value) {
    alert('빈 입력값이 있습니다.');
    confirmPassword.focus();
    return false;
  }
  if (!confirmPassword.value) {
    alert('빈 입력값이 있습니다.');
    password.focus();
    return false;
  }
  if (!phone.value) {
    alert('빈 입력값이 있습니다.');
    password.focus();
    return false;
  }
  return true;
};

const enter = () => {
  register();
};

const register = async () => {
  if (!(await checkInputValue())) {
    return;
  }

  const data = {
    email: email.value,
    nickname: nickname.value,
    password: password.value,
    phone: phone.value,
  };
  await fetch('/api/customers', {
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
        localStorage.setItem('simpleCustomerInfo', JSON.stringify(res.simpleCustomerInfo));
        location.href = '/customers';
      }
    })
    .catch((err) => {
      console.log('err: ', err);
    });
};
