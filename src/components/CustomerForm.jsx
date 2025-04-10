// src/components/CustomerForm.jsx
import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const CustomerForm = () => {
  const [formData, setFormData] = useState({ name: "", email: "", phone: "" });
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleChange = e => {
    setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async e => {
    e.preventDefault();
    setError("");

    try {
      const res = await axios.post("http://localhost:5000/api/customers", formData);
      const customerId = res.data.customerId;

      localStorage.setItem("customerId", customerId);
      navigate("/products");
    } catch (err) {
      console.error(err);
      setError(err.response?.data?.message || "Something went wrong");
    }
  };

  return (
    <div className="max-w-md mx-auto mt-20 p-6 bg-white shadow-md rounded-xl">
      <h2 className="text-2xl font-bold mb-4">Enter Your Details</h2>
      {error && <p className="text-red-500 mb-3">{error}</p>}
      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          type="text"
          name="name"
          placeholder="Name"
          className="w-full px-4 py-2 border rounded-md"
          value={formData.name}
          onChange={handleChange}
          required
        />
        <input
          type="email"
          name="email"
          placeholder="Email"
          className="w-full px-4 py-2 border rounded-md"
          value={formData.email}
          onChange={handleChange}
          required
        />
        <input
          type="text"
          name="phone"
          placeholder="Phone (optional)"
          className="w-full px-4 py-2 border rounded-md"
          value={formData.phone}
          onChange={handleChange}
        />
        <button
          type="submit"
          className="w-full bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700"
        >
          Continue to Products
        </button>
      </form>
    </div>
  );
};

export default CustomerForm;
