// api.ts
import axios from "axios";

const API_URL = "http://localhost:8080/products";

export const api = axios.create({
  baseURL: "http://localhost:8080",
});

export const getProducts = async () => {
  const res = await fetch(API_URL);
  return res.json();
};

export const addProduct = async (product: { name: string; stock: number; price: number }) => {
  const res = await fetch(API_URL, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(product),
  });
  return res.json();
};

export const updateProduct = async (id: number, product: { name: string; stock: number; price: number }) => {
  const res = await fetch(`${API_URL}/${id}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(product),
  });
  return res.json();
};

export const deleteProduct = async (id: number) => {
  await fetch(`${API_URL}/${id}`, { method: "DELETE" });
};
