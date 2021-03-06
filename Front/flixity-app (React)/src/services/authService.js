import http from './httpService'
import jwtDecode from 'jwt-decode';

const tokenKey = "token"
const apiEndpoint = '/login';

http.setJwt(getJwt());

export async function login(email, password) {
  const { data: jwt } = await http.post(apiEndpoint, {
    email,
    password
  });
  localStorage.setItem(tokenKey, jwt);
}

export function loginWithJwt() {
  localStorage.setItem(tokenKey);
}

export function logout() {
  localStorage.removeItem(tokenKey);
}

export function getCurrentUser() {
  try {
    const jwt = localStorage.getItem(tokenKey);
    return jwtDecode(jwt);
  } catch (error) {
    return null;
  }
}

export function getJwt() {
  return localStorage.getItem(tokenKey)
}

export default {
  login,
  logout,
  getCurrentUser,
  loginWithJwt,
  getJwt
}