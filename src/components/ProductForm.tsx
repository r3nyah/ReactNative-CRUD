import React, { useState, useEffect } from "react";
import { View, Text, TextInput, Button } from "react-native";
import { addProduct, updateProduct } from "../services/productService"; // ✅ Fix import

interface Props {
  editingProduct?: { id: number; name: string; stock: number; price: number };
  onSave: () => void; // Callback after save
}

const ProductForm: React.FC<Props> = ({ editingProduct, onSave }) => {
  const [name, setName] = useState("");
  const [stock, setStock] = useState("");
  const [price, setPrice] = useState("");

  useEffect(() => {
    if (editingProduct) {
      setName(editingProduct.name);
      setStock(editingProduct.stock.toString());
      setPrice(editingProduct.price.toString());
    }
  }, [editingProduct]);

  const handleSubmit = async () => {
    if (!name || !stock || !price) {
      alert("Please fill in all fields!");
      return;
    }

    const product = { name, stock: parseInt(stock), price: parseFloat(price) };

    if (editingProduct) {
      await updateProduct(editingProduct.id, product);
    } else {
      await addProduct(product);
    }

    setName("");
    setStock("");
    setPrice("");
    onSave(); // Refresh product list
  };

  return (
    <View>
      <Text>{editingProduct ? "Edit Product" : "Add Product"}</Text>
      <TextInput placeholder="Name" value={name} onChangeText={setName} />
      <TextInput placeholder="Stock" value={stock} onChangeText={setStock} keyboardType="numeric" />
      <TextInput placeholder="Price" value={price} onChangeText={setPrice} keyboardType="numeric" />
      <Button title={editingProduct ? "Update" : "Add"} onPress={handleSubmit} />
    </View>
  );
};

export default ProductForm;
