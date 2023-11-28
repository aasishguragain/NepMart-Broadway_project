import { $axios } from "../axios";

export const addItemToCart = async (values) => {
  console.log({ values });
  return await $axios.post("/cart/add/item", values);
};

export const getCartData = async () => {
  return await $axios.get("/cart/details");
};

export const removeItemFromCart = async (id) => {
  return await $axios.put(`/cart/remove/item/${id}`);
};

export const updateCartQuantity = async (productId, values) => {
  return await $axios.put(`/cart/update/quantity/${productId}`, values);
};

export const getCartCount = async () => {
  return await $axios.get("/cart/count");
};
