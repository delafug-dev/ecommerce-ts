import axios from "axios";
import { Producto } from "../interfaces/producto-tienda";

const API_URL = "http://localhost:3000/products";

export const addProductMiddleware = async (newProduct : Producto) => {
  try {
    await axios.post(API_URL, newProduct);
  } catch (error : any) {
    throw new Error(error.message);
  }
};

export const removeProductMiddleware = async (id : string) => {
  try {
    await axios.delete(`${API_URL}/${id}`);
  } catch (error : any) {
    throw new Error(error.message);
  }
};

export const updateProductMiddleware = async (product) => {
  try {
    await axios.put(`${API_URL}/${product.id}`, product);
  } catch (error : any) {
    throw new Error(error.message);
  }
};

export const getProductsMiddleware = async () => {
  try {
    const response = await axios.get(API_URL);
    return response.data;
  } catch (error : any) {
    throw new Error(error.message);
  }
};
