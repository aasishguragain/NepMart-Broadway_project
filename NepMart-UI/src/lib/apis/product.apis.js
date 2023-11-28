import { $axios } from "../axios";

export const fetchSellerProducts = async (paginationData) => {
  return await $axios.post("/product/seller/all", paginationData);
};

export const deleteSellerProduct = async (_id) => {
  return await $axios.delete(`/product/delete/${_id}`);
};

export const addProductBySeller = async (values) => {
  return await $axios.post("/product/add", values);
};

export const getBuyerProducts = async (paginationData) => {
  return await $axios.post("/product/buyer/all", paginationData);
};

export const getProductDetails = async (id) => {
  return await $axios.get(`/product/details/${id}`);
};

export const editProduct = async (productId, values) => {
  return await $axios.put(`/product/edit/${productId}`, values);
};

export const getLatestProducts = async (count = 5) => {
  return await $axios.get(`/product/latest/${count}`);
};
