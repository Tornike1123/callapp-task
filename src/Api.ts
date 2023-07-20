import axios from "axios";
import { IUser, IUserWithoutId } from "./type";

const baseUrl = "http://localhost:3000";

export const getUserData = async () => {
  const res = await axios.get(`${baseUrl}/user?_sort=id&_order=desc`);
  return res;
};

export const deleteUser = async (userId: number) => {
  await axios.delete(`${baseUrl}/user/${userId}`);
};

export const addUser = async (user: IUser) => {
  await axios.post(`${baseUrl}/user`, user);
};

export const updateUser = async (id: number, form: IUserWithoutId) => {
  await axios.put(`${baseUrl}/user/${id}`, form);
};

export const getUserById = async (id: number | string) => {
  const res = await axios.get(`${baseUrl}/user/${id}`);
  return res;
};
