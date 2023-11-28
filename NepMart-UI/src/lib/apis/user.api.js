import { $axios } from "../axios";

export const loginUser = async (values) => {
  return await $axios.post("/user/login", values);
};

export const registerUser = async (values) => {
  return await $axios.post("/user/register", values);
};
