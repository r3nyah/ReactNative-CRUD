import React, { useEffect, useState } from "react";
import { View, Text, Button, FlatList } from "react-native";
import { getProducts, deleteProduct } from "../services/productService";
import ProductForm from "./ProductForm";

const ProductList: React.FC = () => {
  const [products, setProducts] = useState<{ id: number; name: string; stock: number; price: number }[]>([]);
  const [editingProduct, setEditingProduct] = useState<any>(null);

  const fetchProducts = async () => {
    const data = await getProducts();
    setProducts(data);
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  const handleDelete = async (id: number) => {
    await deleteProduct(id);
    fetchProducts();
  };

  return (
    <View>
      <Text>Product List</Text>
      <ProductForm editingProduct={editingProduct} onSave={() => { fetchProducts(); setEditingProduct(null); }} />
      <FlatList
        data={products}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <View style={{ marginBottom: 10 }}>
            <Text>{item.name} - Stock: {item.stock} - Price: ${item.price}</Text>
            <Button title="Edit" onPress={() => setEditingProduct(item)} />
            <Button title="Delete" onPress={() => handleDelete(item.id)} />
          </View>
        )}
      />
    </View>
  );
};

export default ProductList;
