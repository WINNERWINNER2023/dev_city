window.onload = () => {
  getRandomProducts(1);
};

const getRandomProducts = async () => {
  fetch(`/api/products/random`, {
    method: 'GET',
  }).then(async (res) => {
    const code = res.status;

    res = await res.json();
    if (res.message) {
      alert(res.message);
    }

    if (code === 200) {
      products = res.data;
      products.forEach((product) => {
        const temp = `
        <div class="card">
          <img src="${product.imagePath}" class="card-img-top" style="height: 300px; overflow: hidden;">
          <div class="card-body">
            <h5 class="card-title">${product.name}</h5>
          </div>
          <div class="card-footer">
            <small class="text-muted">Price: ${product.price} dev</small>
          </div>
        </div>
        `;
        document.querySelector('#products').insertAdjacentHTML('beforeend', temp);
      })
    }
  }).catch((err) => {
    console.log('err: ', err);
  });
};