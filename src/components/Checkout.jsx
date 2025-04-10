// src/components/Checkout.jsx
import { useState } from "react";
import axios from "axios";

const Checkout = () => {
  const customerId = localStorage.getItem("customerId");
  const [address, setAddress] = useState("");
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  const handleCheckout = async (e) => {
    e.preventDefault();
    setMessage("");
    setError("");

    if (!address.trim()) {
      setError("Delivery address is required.");
      return;
    }

    try {
      const res = await axios.post("http://localhost:5000/api/orders", {
        customer_id: customerId,
        delivery_address: address,
      });

      setMessage("✅ Order placed successfully! Check your email for confirmation.");
      setAddress("");
    } catch (err) {
      console.error(err);
      setError("Order failed. Try again.");
    }
  };

  return (
    <div className="max-w-xl mx-auto mt-20 p-6 bg-white shadow-md rounded-xl">
      <h2 className="text-2xl font-bold mb-4">Checkout</h2>

      {message && <p className="text-green-600 mb-4">{message}</p>}
      {error && <p className="text-red-600 mb-4">{error}</p>}

      <form onSubmit={handleCheckout} className="space-y-4">
        <textarea
          rows={4}
          className="w-full border rounded-md p-2"
          placeholder="Enter delivery address"
          value={address}
          onChange={(e) => setAddress(e.target.value)}
          required
        />

        <button
          type="submit"
          className="w-full bg-green-600 text-white py-2 rounded hover:bg-green-700"
        >
          Place Order
        </button>
      </form>
    </div>
  );
};

export default Checkout;
