const findOneCustomer = async () => {
  fetch('/api/customers', {
    method: 'GET',
  }).then(async (res) => {
    const code = res.status;

    res = await res.json();
    if (res.message) {
      alert(res.message);
    }

    if (code === 200) {
      const customer = res.data;
      document.querySelector('#email').value = customer.email;
      document.querySelector('#nickname').value = customer.nickname;
      document.querySelector('#password').value = customer.password;
      document.querySelector('#coin').value = customer.coin;
      document.querySelector('#phone').value = customer.phone;
    } else if (code === 307) {
      document.cookie = `accessToken=${res.accessToken}; path=/;`;
      getCustomer();
    } else if (code === 401) {
      alert(res.message);
      location.href = '/customers/login';
    }
  });
};

const email = document.querySelector('#email');
const nickname = document.querySelector('#nickname');
const password = document.querySelector('#password');
const coin = document.querySelector('#coin');
const phone = document.querySelector('#phone');

const checkInputValue = async () => {
  if (!email.value) {
    alert('빈 입력값이 있습니다.');
    email.focus();
    return false;
  }
  if (!nickname.value) {
    alert('빈 입력값이 있습니다.');
    nickname.focus();
    return false;
  }
  if (!password.value) {
    alert('빈 입력값이 있습니다.');
    password.focus();
    return false;
  }
  if (!phone.value) {
    alert('빈 입력값이 있습니다.');
    phone.focus();
    return false;
  }
  return true;
};

const changeCustomer = async () => {
  if (!(await checkInputValue())) {
    return;
  }
  const formData = new FormData();
  formData.append('email', email.value);
  formData.append('nickname', nickname.value);
  formData.append('password', password.value);
  formData.append('coin', coin.value);
  formData.append('phone', phone.value);

  await fetch(`/api/customers`, {
    method: 'PUT',
    body: formData,
  })
    .then(async (res) => {
      const code = res.status;

      res = await res.json();
      if (res.message) {
        alert(res.message);
      }

      if (code === 200) {
        location.href = `/customers/mypage`;
      } else if (code === 307) {
        document.cookie = `accessToken=${res.accessToken}; path=/;`;
        updateProduct();
      } else if (code === 401) {
        alert(res.message);
        location.href = '/customers/login';
      }
    })
    .catch((err) => {
      console.log('err: ', err);
    });
};

const addCustomerCoin = async () => {
  const formData = new FormData();
  formData.append('coin', coin.value);

  await fetch(`/api/customers/coin`, {
    method: 'PUT',
    body: formData,
  })
    .then(async (res) => {
      const code = res.status;

      res = await res.json();
      if (res.message) {
        alert(res.message);
      }

      if (code === 200) {
        location.href = `/customers/mypage`;
      } else if (code === 307) {
        document.cookie = `accessToken=${res.accessToken}; path=/;`;
        updateProduct();
      } else if (code === 401) {
        alert(res.message);
        location.href = '/customers/login';
      }
    })
    .catch((err) => {
      console.log('err: ', err);
    });
};

const deleteCustomer = async () => {
  await fetch(`/api/customers/mypage`, {
    method: 'DELETE',
  })
    .then(async (res) => {
      const code = res.status;

      res = await res.json();

      if (res.message) {
        alert(res.message);
      }

      if (code === 200) {
        location.href = `/customers/mypage`;
      } else if (code === 307) {
        document.cookie = `accessToken=${res.accessToken}; path=/;`;
        deleteProduct();
      } else if (code === 401) {
        alert(res.message);
        location.href = '/customers/login';
      }
    })
    .catch((err) => {
      console.log('err: ', err);
    });
};
