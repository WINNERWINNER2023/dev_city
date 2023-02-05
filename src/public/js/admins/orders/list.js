window.onload = () => {
  getOrders(1);
};

const getOrders = async (p) => {
  fetch('/api/admins/orders?p=' + p, {
    method: 'GET',
  })
    .then(async (res) => {
      const code = res.status;

      res = await res.json();
      if (res.message) {
        // alert(res.message);
        console.log(res.message);
      }

      document.querySelector('#orders').innerHTML = '';
      if (code === 200) {

        const orders = res.data;
        setPagination(res.pagination, 'getOrders'); // 페이지네이션
        orders.forEach((order) => {
          const temp = `
            <tr>
              <th scope="row">${order.subOrderId}</th>
              <td>${order.orderId}</td>
              <td>${order.status}</td>
              <td>${order.customerId}</td>
              <td>${order.productName}</td>
              <td>${new Date(order.startUse).toLocaleDateString()}</td>
              <td>${order.price}</td>
              <td>${order.count}</td>
              <td>${new Date(order.orderedAt).toLocaleString()}</td>
            </tr>
          `;
          document.querySelector('#orders').insertAdjacentHTML('beforeend', temp);
        });

        // 테이블 tr 마우스 오버 시 하이라이트 효과
        document.querySelectorAll("#orders tr").forEach(el => {
          el.addEventListener("mouseenter", (e) => {
            e.currentTarget.classList.add("table-active");
          });
          el.addEventListener("mouseleave", (e) => {
            e.currentTarget.classList.remove("table-active");
          });
        });
      } else if (code === 404) {
        const temp = `
          <tr>
            <td colspan="9">주문 정보가 없습니다.</td>
          </tr>
        `;
        document.querySelector('#orders').insertAdjacentHTML('beforeend', temp);
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

document.querySelector('#searchBtn').addEventListener('click', (e) => {
  e.preventDefault();
  alert('검색 기능 준비중');
});