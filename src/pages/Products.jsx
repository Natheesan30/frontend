import ProductList from "../components/ProductList";
import Cart from "../components/Cart";

const Products = () => {
  return (
    <div className="min-h-screen bg-gray-100 py-10">
      <ProductList />
      <div className="mt-10">
        <Cart />
      </div>
    </div>
  );
};

export default Products;
