// src/components/Cart.jsx
import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Cart = () => {
  const customerId = localStorage.getItem("customerId");
  const navigate = useNavigate();

  const [cartItems, setCartItems] = useState([]);
  const [msg, setMsg] = useState("");

  useEffect(() => {
    if (!customerId) return;
    fetchCart();
  }, []);

  const fetchCart = async () => {
    try {
      const res = await axios.get(`http://localhost:5000/api/cart/${customerId}`);
      setCartItems(res.data);
    } catch (err) {
      console.error("Error fetching cart:", err);
    }
  };

  const handleQuantityChange = async (id, quantity) => {
    try {
      await axios.put(`http://localhost:5000/api/cart/${id}`, { quantity });
      fetchCart();
    } catch (err) {
      console.error("Update failed", err);
    }
  };

  const handleRemove = async (id) => {
    try {
      await axios.delete(`http://localhost:5000/api/cart/${id}`);
      fetchCart();
    } catch (err) {
      console.error("Remove failed", err);
    }
  };

  const handleCheckout = () => {
    navigate("/checkout");
  };

  const total = cartItems.reduce((acc, item) => acc + item.total, 0);

  return (
    <div className="max-w-4xl mx-auto p-4 mt-10 bg-white shadow rounded-xl">
      <h2 className="text-2xl font-bold mb-4">Your Cart</h2>
      {msg && <p className="text-green-600 mb-2">{msg}</p>}
      {cartItems.length === 0 ? (
        <p>Your cart is empty.</p>
      ) : (
        <>
          <ul className="space-y-4">
            {cartItems.map((item) => (
              <li
                key={item.id}
                className="flex justify-between items-center border-b pb-2"
              >
                <div>
                  <p className="font-semibold">{item.name}</p>
                  <p>${item.price} x</p>
                </div>
                <input
                  type="number"
                  min="1"
                  value={item.quantity}
                  onChange={(e) =>
                    handleQuantityChange(item.id, parseInt(e.target.value))
                  }
                  className="w-16 px-2 py-1 border rounded"
                />
                <p className="font-bold">${item.total.toFixed(2)}</p>
                <button
                  className="text-red-600 hover:underline"
                  onClick={() => handleRemove(item.id)}
                >
                  Remove
                </button>
              </li>
            ))}
          </ul>
          <div className="text-right mt-6">
            <p className="text-lg font-bold">Total: ${total.toFixed(2)}</p>
            <button
              onClick={handleCheckout}
              className="mt-4 bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
            >
              Proceed to Checkout
            </button>
          </div>
        </>
      )}
    </div>
  );
};

export default Cart;
