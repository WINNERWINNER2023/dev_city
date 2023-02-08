window.onload = () => {
  loadCart();
};

const loadCart = () => {
  const cart = JSON.parse(localStorage.getItem('cart'));
  console.log(cart);
  if (!cart || cart.length === 0) {
    document.querySelector('#cartList').innerHTML = '';
    const temp = `
      <div class="card border-secondary border-2 mb-1">
        <div class="card-body">
          <h5 class="card-title">비었음</h5>
        </div>
      </div>
    `;
    document.querySelector('#cartList').insertAdjacentHTML('beforeend', temp);
  } else {
    document.querySelector('#cartList').innerHTML = '';
    cart.forEach((item) => {
      const temp = `
        <div class="card border-secondary border-2 mb-1">
          <div class="row g-0">
            <div class="col-md-2 p-1">
              <img src="${item.imagePath}" class="img-fluid rounded-start" style="width: 100%;">
            </div>
            <div class="col-md-8">
              <div class="card-body">
                <h5 class="card-title">${item.name}</h5>
                <p class="card-text">가격: ${item.price}</p>
                <p class="card-text"><small class="text-muted">사용가능일: ${new Date(
                  item.startUse
                ).toLocaleDateString()}</small></p>
              </div>
            </div>
            <div class="col-md-2 p-1">
              <button onclick="deleteItem(${item.id})" class="btn btn-outline-danger mb-2" style="width: 100px;">제거</button>
            </div>
          </div>
        </div>
      `;
      document.querySelector('#cartList').insertAdjacentHTML('beforeend', temp);
    });
  }
  setTotalPrice();
};

const getTotalPrice = () => {
  const cart = JSON.parse(localStorage.getItem('cart'));
  return cart.reduce((acc, item) => acc + item.price, 0);
};

const setTotalPrice = () => {
  document.querySelector('#totalPrice').value = getTotalPrice().toLocaleString('ko-KR');
};

const deleteItem = (id) => {
  const cart = JSON.parse(localStorage.getItem('cart'));
  const targetIndex = cart.findIndex((item) => item.id === id);
  cart.splice(targetIndex, 1);
  localStorage.setItem('cart', JSON.stringify(cart));
  loadCart();
};

const goOrder = () => {
  if (confirm(`총 결제 코인: ${getTotalPrice()} DEV\n결제하시겠습니까?`)) {
    const cart = JSON.parse(localStorage.getItem('cart'));
    const customer = JSON.parse(localStorage.getItem('customerInfo'));
    $.ajax({
      type: 'POST',
      url: '/api/products/order',
      data: {
        cart: cart,
        customer: customer,
      },
      success: function (response) {
        localStorage.removeItem('cart');
        location.reload();
      },
    });
  }
};
