// 조성훈님 출처코드 변경사항 simpleAdminInfo -> simpleCustomerInfo / admins -> customers

console.log('여기는 메인');

const simpleAdminInfo = JSON.parse(localStorage.getItem('simpleCustomerInfo'));

if (!simpleCustomerInfo) {
  location.href = '/customers/login';
}
