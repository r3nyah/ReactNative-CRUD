import axios from "axios";

const API_URL = "http://localhost:8080/products";

export interface Product {
  id: number;
  name: string;
  stock: number;
  price: number;
}

// Get all products
export const getProducts = async (): Promise<Product[]> => {
  const response = await axios.get(API_URL);
  return response.data;
};

// Add a product
export const addProduct = async (product: Omit<Product, "id">) => {
  const response = await axios.post(API_URL, product);
  return response.data;
};

// Update a product
export const updateProduct = async (id: number, product: Omit<Product, "id">) => {
  const response = await axios.put(`${API_URL}/${id}`, product);
  return response.data;
};

// Delete a product
export const deleteProduct = async (id: number) => {
  await axios.delete(`${API_URL}/${id}`);
};
