import http from './httpService'


const apiEndpoint = '/register';

export function register(user) {
  return http.post(apiEndpoint, {
    email: user.username,
    password: user.password,
    name: user.name
  });
}