import {atom, } from 'recoil'


export const isAuthenticatedUser = atom({
    key:'isAuthenticatedUSer',
    default:false,

})

export const userInformation = atom({
    key:'userInformation',
    default:{}
})

export const apiUrl = atom({
    key: 'apiUrl',
    default : '192.168.0.4'
})
//192.168.1.19