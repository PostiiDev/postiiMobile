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
  default: 'http://192.168.1.21:5000',
  //default: 'https://server-production-0458.up.railway.app',
});
export const selectedCategories = atom({
  key: 'selectedCategories',
  default: {
    value: '',
    list: [
      {
        _id: 0,
        value: 'Développement Web',
      },
      {
        _id: 1,
        value: 'Développement mobile Design (affiche et logo)',
      },
      {
        _id: 2,
        value: 'Encadrement Simulation (électrique et mécanique)',
      },
      {
        _id: 3,
        value: 'Conception',
      },
      {
        _id: 4,
        value: 'Étude et formation en ligne',
      },
    ],
    selectedList: [],
    error: '',
  },
});

// 192.168.1.10
