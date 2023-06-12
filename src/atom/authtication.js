import {atom} from 'recoil';

export const isAuthenticatedUser = atom({
  key: 'isAuthenticatedUSer',
  default: false,
});

export const userInformation = atom({
  key: 'userInformation',
  default: {},
});

export const apiUrl = atom({
  key: 'apiUrl',
  default: 'http://192.168.1.20:5000'
  // default: 'https://server-production-0458.up.railway.app',
});
// 192.168.1.10