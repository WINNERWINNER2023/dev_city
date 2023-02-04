const category = document.querySelector('#category');
const name = document.querySelector('#name');
const contents = document.querySelector('#contents');
const price = document.querySelector('#price');
const useableDate = document.querySelector('#useableDate');
const imagePath = document.querySelector('#imagePath');

const checkInputValue = async () => {
  if (!name.value) {
    alert('빈 입력값이 있습니다.');
    name.focus();
    return false;
  }
  if (!contents.value) {
    alert('빈 입력값이 있습니다.');
    contents.focus();
    return false;
  }
  if (!price.value) {
    alert('빈 입력값이 있습니다.');
    price.focus();
    return false;
  }
  if (!useableDate.value) {
    alert('빈 입력값이 있습니다.');
    useableDate.focus();
    return false;
  }
  if (!imagePath.value) {
    alert('상품 사진이 필요합니다.');
    imagePath.focus();
    return false;
  }
  if (isNaN(price.value)) {
    alert('상품 가격은 숫자만 입력 가능합니다.');
    price.focus();
    return false;
  }
  if (imagePath.files.length > 1) {
    alert('상품 사진은 하나만 등록 가능합니다.');
    imagePath.focus();
    return false;
  }
  return true;
}

const createProduct = async () => {
  if (!await checkInputValue()) {
    return;
  }
  const formData = new FormData();
  formData.append('category', category.value);
  formData.append('name', name.value);
  formData.append('contents', contents.value);
  formData.append('price', price.value);
  formData.append('count', 1);
  formData.append('startUse', useableDate.value + ' 00:00:00');
  formData.append('endUse', useableDate.value + ' 23:59:59');
  formData.append('files', imagePath.files[0]);

  await fetch('/api/admins/products', {
    method: 'POST',
    body: formData,
  })
    .then(async (res) => {
      const code = res.status;

      res = await res.json();
      if (res.message) {
        alert(res.message);
      }
      if (code === 201) {
        location.href = '/admins';
      }

      if (code === 201) {
        location.href = '/admins/products/list';
      }
    })
    .catch((err) => {
      console.log('err: ', err);
    });
}