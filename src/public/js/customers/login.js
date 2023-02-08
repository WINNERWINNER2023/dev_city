const email = document.querySelector('#email');
const password = document.querySelector('#password');

const checkInputValue = async () => {
  if (!email.value) {
    alert('빈 입력값이 있습니다.');
    email.focus();
    return false;
  }
  if (!password.value) {
    alert('빈 입력값이 있습니다.');
    password.focus();
    return false;
  }
  return true;
};

const enter = () => {
  login();
};

const login = async () => {
  if (!(await checkInputValue())) {
    return;
  }

  const data = {
    email: email.value,
    password: password.value,
  };
  await fetch('/api/customers/login', {
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
        localStorage.setItem('simpleCustomerInfo', JSON.stringify(res.simpleCustomerInfo));

        location.href = '/customers';
      }
    })
    .catch((err) => {
      console.log('err: ', err);
    });
};
