import React, { useEffect, useState } from "react";
import { View, Text, TextInput, Button, FlatList } from "react-native";
import { getProducts, addProduct, updateProduct, deleteProduct, Product } from "../services/productService";

const ProductScreen = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [name, setName] = useState("");
  const [stock, setStock] = useState("");
  const [price, setPrice] = useState("");

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    const data = await getProducts();
    setProducts(data);
  };

  const handleAddProduct = async () => {
    if (!name || !stock || !price) return;
    await addProduct({ name, stock: Number(stock), price: Number(price) });
    fetchProducts();
    setName("");
    setStock("");
    setPrice("");
  };

  const handleUpdateProduct = async (id: number) => {
    await updateProduct(id, { name, stock: Number(stock), price: Number(price) });
    fetchProducts();
  };

  const handleDeleteProduct = async (id: number) => {
    await deleteProduct(id);
    fetchProducts();
  };

  return (
    <View>
      <Text>Product List</Text>
      <FlatList
        data={products}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <View>
            <Text>{item.name} - Stock: {item.stock} - Price: ${item.price}</Text>
            <Button title="Update" onPress={() => handleUpdateProduct(item.id)} />
            <Button title="Delete" onPress={() => handleDeleteProduct(item.id)} />
          </View>
        )}
      />
      <TextInput placeholder="Name" value={name} onChangeText={setName} />
      <TextInput placeholder="Stock" value={stock} onChangeText={setStock} keyboardType="numeric" />
      <TextInput placeholder="Price" value={price} onChangeText={setPrice} keyboardType="numeric" />
      <Button title="Add Product" onPress={handleAddProduct} />
    </View>
  );
};

export default ProductScreen;
