import { useEffect, useState } from "react";
import { fetchProducts } from "../utils/api";
import ProductCard from "../components/ProductCard";
import Select from "react-select";
import Loader from "../components/Loader";
import "../styles/Home.css";

function Home() {
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState({
    value: "All",
    label: "All",
  });
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchProducts()
      .then((data) => {
        setProducts(data);
        setFilteredProducts(data);
        const uniqueCategories = [
          "All",
          ...new Set(data.map((p) => p.category)),
        ];
        const categoryOptions = uniqueCategories.map((cat) => ({
          value: cat,
          label: cat,
        }));
        setCategories(categoryOptions);
        setLoading(false);
      })
      .catch((err) => {
        setError(err.message);
        setLoading(false);
      });
  }, []);

  const handleFilterChange = (selected) => {
    setSelectedCategory(selected);
    if (selected.value === "All") {
      setFilteredProducts(products);
    } else {
      setFilteredProducts(
        products.filter((p) => p.category === selected.value)
      );
    }
  };

  if (loading) return <Loader />;
  if (error) return <p> Error: {error}</p>;

  return (
    <div className="home-container">
      <div className="home-header">
        <h2>Our Products</h2>
        <div className="select-wrapper">
          <Select
            options={categories}
            value={selectedCategory}
            onChange={handleFilterChange}
            className="react-select-container"
            classNamePrefix="react-select"
            styles={{
              menu: (base) => ({ ...base, zIndex: 9999 }),
            }}
          />
        </div>
      </div>

      <div className="product-grid">
        {filteredProducts.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </div>
  );
}

export default Home;
