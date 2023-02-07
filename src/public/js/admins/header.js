const logout = () => {
  deleteCookie('accessToken');
  deleteCookie('refreshToken');
  localStorage.removeItem('simpleAdminInfo');
  location.reload();
};

const deleteCookie = (key) => {
  document.cookie = `${key}=; path=/; expires=Thu, 01 Jan 1970 00:00:01 GMT;`;
};

const goMenu = (menu) => {
  localStorage.removeItem('search');
  location.href = `/admins/${menu}`;
};
