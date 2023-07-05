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
  default: 'https://postiiserverpfe.onrender.com',
  //default: 'http://192.168.1.19:5000',
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
