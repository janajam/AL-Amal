import Cookies from 'js-cookie'


export const setToken = (token: string) => {
  Cookies.set('token', token, { expires: 7 }); // Expires in 7 days
};

export const getToken = () => {
  return Cookies.get('token');
};

export const removeToken = () => {
  Cookies.remove('token');
};


export default Cookies;
