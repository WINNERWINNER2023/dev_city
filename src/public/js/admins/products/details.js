window.onload = () => {
  getProduct(productId);
};

const getProduct = async (productId) => {
  fetch('/api/admins/products/' + productId, {
    method: 'GET',
  })
    .then(async (res) => {
      const code = res.status;

      res = await res.json();
      if (res.message) {
        alert(res.message);
      }

      if (code === 200) {
        const product = res.data;
        document.querySelector('#name').value = product.name;
        document.querySelector('#contents').value = product.contents;
        document.querySelector('#price').value = product.price;
        let useableDate = new Date(product.startUse).toLocaleDateString().split('.');

        // input type date에 넣기 위해 format 변경
        let year = useableDate[0].trim();
        let month = useableDate[1].trim();
        month = month.length === 1 ? '0' + month : month;
        let day = useableDate[2].trim();
        day = day.length === 1 ? '0' + day : day;
        useableDate = `${year}-${month}-${day}`;

        document.querySelector('#useableDate').value = useableDate;
        document.querySelector('#imageThumnail').src = product.imagePath;
      }
    });
};

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
};

const updateProduct = async () =>{
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

  await fetch(`/api/admins/products/${productId}`, {
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
        location.href = `/admins/products/${productId}`;
      }
    })
    .catch((err) => {
      console.log('err: ', err);
    });
};

const removeProduct = async () =>{
  alert('삭제 준비중');
};

const previewImg = (e) => {
  let url = URL.createObjectURL(e.files[0]);
  document.querySelector('#imageThumnail').src = url;
};