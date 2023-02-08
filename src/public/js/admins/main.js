console.log('여기는 메인');

const simpleAdminInfo = JSON.parse(localStorage.getItem('simpleAdminInfo'));

if (!simpleAdminInfo) {
  location.href = '/admins/login';
}
