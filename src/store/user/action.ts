import {  User, UserEnum } from "../type";


export const addUser = (payload:User) => ({
  type: UserEnum.ADD_USER,
  payload
});

export const deleteUser = (payload:number) => ({
  type: UserEnum.DELETE_USER,
  payload
});