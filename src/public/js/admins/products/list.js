window.onload = () => {
  getProducts(1);
};

const getProducts = async (p) => {
  fetch('/api/admins/products?p=' + p, {
    method: 'GET',
  })
    .then(async (res) => {
      const code = res.status;

      res = await res.json();
      if (res.message) {
        alert(res.message);
      }

      if (code === 200) {
        document.querySelector('#products').innerHTML = '';

        setPagination(res.pagination, 'getProducts'); // 페이지네이션
        const products = res.data;
        products.forEach((product) => {
          const temp = `
            <tr onclick="location.href='/admins/products/${product.id}'">
              <th scope="row">${product.id}</th>
              <td>${product.name}</td>
              <td>${new Date(product.startUse).toLocaleDateString()}</td>
              <td>${product.price}</td>
              <td>${product.count}</td>
              <td>${new Date(product.createdAt).toLocaleString()}</td>
              <td>${new Date(product.updatedAt).toLocaleString()}</td>
            </tr>
          `;
          document.querySelector('#products').insertAdjacentHTML('beforeend', temp);
        });

        // 테이블 tr 마우스 오버 시 하이라이트 효과
        document.querySelectorAll("#products tr").forEach(el => {
          el.addEventListener("mouseenter", (e) => {
            e.currentTarget.classList.add("table-active");
          });
          el.addEventListener("mouseleave", (e) => {
            e.currentTarget.classList.remove("table-active");
          });
        });
      }
    });
};

const setPagination = (obj, getListFnName) => {
  let page = parseInt(obj.page);
  let totalPage = parseInt(obj.totalPage);
  let startPage = parseInt(obj.startPage);
  let endPage = parseInt(obj.endPage);

  let temp = '';
  if (startPage != 1) {
    temp += `<li class="page-item" style="cursor: pointer;">
              <a class="page-link" onclick="${getListFnName}(${startPage - 1})"><span aria-hidden="true">&laquo;</span></a>
            </li>`;
  } else {
    temp += `<li class="page-item disabled">
              <a class="page-link"><span aria-hidden="true">&laquo;</span></a>
            </li>`;
  }
  for (let i = startPage; i <= endPage; i++) {
    if (i == page) {
      temp += `<li class="page-item active" style="cursor: pointer;"><a class="page-link" onclick="${getListFnName}(${i})">${i}</a></li>`;
    } else {
      temp += `<li class="page-item" style="cursor: pointer;"><a class="page-link" onclick="${getListFnName}(${i})">${i}</a></li>`;
    }
  }
  if (endPage != totalPage) {
    temp += `<li class="page-item" style="cursor: pointer;">
              <a class="page-link" onclick="${getListFnName}(${endPage + 1})"><span aria-hidden="true">&raquo;</span></a>
            </li>`;
  } else {
    temp += `<li class="page-item disabled">
              <a class="page-link"><span aria-hidden="true">&raquo;</span></a>
            </li>`;
  }
  document.querySelector('.pagination').innerHTML = '';
  document.querySelector('.pagination').insertAdjacentHTML('beforeend', temp);
};