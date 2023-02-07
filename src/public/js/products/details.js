window.onload = () => {
  getProduct(productId);
};

let product;

const getProduct = async (productId) => {
  fetch('/api/products/' + productId, {
    method: 'GET',
  }).then(async (res) => {
    const code = res.status;

    res = await res.json();
    if (res.message) {
      alert(res.message);
    }

    if (code === 200) {
      product = res;
      document.querySelector('#name').innerHTML = product.name;
      document.querySelector('#price').innerHTML = product.price.toLocaleString();
      document.querySelector('#usableDate').innerHTML = new Date(product.startUse).toLocaleDateString();
      document.querySelector('#imagePath').src = product.imagePath;
    }
  });
};

const addCart = () => {
  let cart = JSON.parse(localStorage.getItem('cart'));
  if (!cart) {
    cart = [];
  }
  if (cart.findIndex((item) => item.id === product.id) > -1) {
    alert('이미 장바구니에 포함되어 있습니다.');
    return;
  }
  cart.push(product);
  localStorage.setItem('cart', JSON.stringify(cart));

  if (confirm('장바구니로 이동할까요?')) {
    location.href = '/cart';
  }
};

const goOrder = () => {
  alert('준비중');
};
