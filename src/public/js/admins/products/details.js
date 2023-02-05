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
        const useableDate = new Date(product.startUse).toLocaleDateString().split('.');
        let year = useableDate[0].trim();
        let month = useableDate[1].trim();
        month = month.length === 1 ? '0' + month : month;
        let day = useableDate[1].trim();
        day = day.length === 1 ? '0' + day : day;
        document.querySelector('#useableDate').value = `${year}-${month}-${day}`;
      }
    });
};

const updateProduct = async () =>{
  alert('수정 준비중');
};

const removeProduct = async () =>{
  alert('삭제 준비중');
};