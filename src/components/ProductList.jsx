// src/components/ProductList.jsx
import { useEffect, useState } from "react";
import axios from "axios";

const ProductList = () => {
  const [products, setProducts] = useState([]);
  const [msg, setMsg] = useState("");

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const res = await axios.get("http://localhost:5000/api/products");
        setProducts(res.data);
      } catch (err) {
        console.error("Failed to fetch products", err);
      }
    };

    fetchProducts();
  }, []);

  const handleAddToCart = async (productId) => {
    const customerId = localStorage.getItem("customerId");
    if (!customerId) return alert("Customer not found.");

    try {
      await axios.post("http://localhost:5000/api/cart", {
        customer_id: customerId,
        product_id: productId,
        quantity: 1,
      });
      setMsg("Item added to cart!");
      setTimeout(() => setMsg(""), 2000);
    } catch (err) {
      console.error("Error adding to cart", err);
      setMsg("Error adding to cart.");
    }
  };

  return (
    <div className="max-w-6xl mx-auto px-4 py-8">
      <h2 className="text-3xl font-bold mb-6 text-center">Products</h2>
      {msg && <p className="text-green-600 text-center mb-4">{msg}</p>}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {products.map((product) => (
          <div
            key={product.id}
            className="border rounded-xl p-4 shadow hover:shadow-md transition"
          >
            <img
              src={`/${product.image_url || "default.jpg"}`}
              alt={product.name}
              className="w-full h-40 object-cover rounded-md mb-3"
            />
            <h3 className="text-xl font-semibold">{product.name}</h3>
            <p className="text-gray-600 mb-2">{product.description}</p>
            <p className="font-bold text-lg mb-2">${product.price}</p>
            <button
              className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
              onClick={() => handleAddToCart(product.id)}
            >
              Add to Cart
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ProductList;
