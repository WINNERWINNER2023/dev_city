window.onload = () => {
  const search = JSON.parse(localStorage.getItem('search'));
  if (!search) {
    getProducts(1);
  } else {
    getProducts(1, search.filter, search.keyword);
  }
};

const filter = document.querySelector('#filter');
const keyword = document.querySelector('#keyword');

const getProducts = async (p, filter, keyword) => {
  fetch(`/api/admins/products?p=${p}&filter=${filter}&keyword=${keyword}`, {
    method: 'GET',
  }).then(async (res) => {
    const code = res.status;

    res = await res.json();
    if (res.message) {
      // alert(res.message);
      console.log(res.message);
    }

    document.querySelector('#products').innerHTML = '';
    if (code === 200) {
      const products = res.data;
      setPagination('getProducts', res.pagination, res.search); // 페이지네이션
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
      document.querySelectorAll('#products tr').forEach((el) => {
        el.addEventListener('mouseenter', (e) => {
          e.currentTarget.classList.add('table-active');
        });
        el.addEventListener('mouseleave', (e) => {
          e.currentTarget.classList.remove('table-active');
        });
      });
    } else if (code === 404) {
      const temp = `
          <tr>
            <td colspan="7">상품 정보가 없습니다.</td>
          </tr>
        `;
      document.querySelector('#products').insertAdjacentHTML('beforeend', temp);
      setPagination();
    } else if (code === 307) {
      document.cookie = `accessToken=${res.accessToken}; path=/;`;
      getProducts(p);
    } else if (code === 401) {
      alert(res.message);
      location.href = '/admins/login';
    }
  });
};

const setPagination = (getListFnName, pagination, search) => {
  document.querySelector('.pagination').innerHTML = '';
  if (!getListFnName) {
    return;
  }
  let page = parseInt(pagination.page);
  let totalPage = parseInt(pagination.totalPage);
  let startPage = parseInt(pagination.startPage);
  let endPage = parseInt(pagination.endPage);

  const filter = search.filter;
  const keyword = search.keyword;

  let temp = '';
  if (startPage != 1) {
    temp += `<li class="page-item" style="cursor: pointer;">
              <a class="page-link" onclick="${getListFnName}(${startPage - 1}, '${filter}', '${keyword}')"><span aria-hidden="true">&laquo;</span></a>
            </li>`;
  } else {
    temp += `<li class="page-item disabled">
              <a class="page-link"><span aria-hidden="true">&laquo;</span></a>
            </li>`;
  }
  for (let i = startPage; i <= endPage; i++) {
    if (i == page) {
      temp += `<li class="page-item active" style="cursor: pointer;"><a class="page-link" onclick="${getListFnName}(${i}, '${filter}', '${keyword}')">${i}</a></li>`;
    } else {
      temp += `<li class="page-item" style="cursor: pointer;"><a class="page-link" onclick="${getListFnName}(${i}, '${filter}', '${keyword}')">${i}</a></li>`;
    }
  }
  if (endPage != totalPage) {
    temp += `<li class="page-item" style="cursor: pointer;">
              <a class="page-link" onclick="${getListFnName}(${endPage + 1}, '${filter}', '${keyword}')"><span aria-hidden="true">&raquo;</span></a>
            </li>`;
  } else {
    temp += `<li class="page-item disabled">
              <a class="page-link"><span aria-hidden="true">&raquo;</span></a>
            </li>`;
  }
  document.querySelector('.pagination').insertAdjacentHTML('beforeend', temp);
};

document.querySelector('#searchBtn').addEventListener('click', (e) => {
  e.preventDefault();
  localStorage.setItem('search', JSON.stringify({ filter: filter.value, keyword: keyword.value }));
  getProducts(1, filter.value, keyword.value);
});

document.querySelector('#createBtn').addEventListener('click', (e) => {
  e.preventDefault();
  location.href = '/admins/products/create';
});
