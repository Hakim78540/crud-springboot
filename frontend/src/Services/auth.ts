export const getToken = () => localStorage.getItem("token");
export const isAuth = () => !!getToken();
export const logout = () => {
  localStorage.removeItem("token");
};
