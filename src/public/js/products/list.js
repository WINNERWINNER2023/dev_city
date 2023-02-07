window.onload = () => {
  infiniteScroll();
};

let page = 1;
let isGetOrdersWaitingLoading = false;

const infiniteScroll = () => {
  const scrollEnd = document.querySelector('#scroll-end');

  const io = new IntersectionObserver((entries, observer) => {
    entries.forEach((entry) => {
      if (!entry.isIntersecting) return;
      if (isGetOrdersWaitingLoading) return;
      observer.observe(scrollEnd);
      getProducts(page);
      page += 1;
    });
  });
  io.observe(scrollEnd);
};

const getProducts = async (p) => {
  isGetOrdersWaitingLoading = true;

  console.log('p: ' + p);
  fetch(`/api/products?page=${p}`, {
    method: 'GET',
  }).then(async (res) => {
    const code = res.status;

    res = await res.json();
    if (res.message) {
      alert(res.message);
    }

    if (code === 200) {
      products = res.data;
      if (products === undefined) {
        document.querySelector('#scroll-end').style.display = 'none';
        return;
      }
      products.forEach((product) => {
        const temp = `
        <div class="col" onclick="location.href='/products/${product.id}'">
          <div class="card h-100 item" style="cursor: pointer;">
            <img src="${product.imagePath}" class="card-img-top" style="height: 180px; overflow: hidden;">
            <div class="card-body">
              <h5 class="card-title">${product.name}</h5>
              <p class="card-text">Price: ${product.price} dev</p>
            </div>
          </div>
        </div>
        `;
        document.querySelector('#products').insertAdjacentHTML('beforeend', temp);
      })
    }
  }).catch((err) => {
    console.log('err: ', err);
  }).finally(() => {
    isGetOrdersWaitingLoading = false;
  });
};