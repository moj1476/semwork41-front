import Cookies from 'universal-cookie';

export const setToken = (token) => {
    const cookies = new Cookies();
    cookies.set('token', token, { path: '/' });
}

export const getToken = () => {
    const cookies = new Cookies();
    return cookies.get('token');
}

export const removeToken = () => {
    const cookies = new Cookies();
    cookies.remove('token');
}