import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { fetchProductById } from "../utils/api";
import { useNavigate } from "react-router-dom";

import "../styles/ProductDetail.css";

function ProductDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function getProduct() {
      try {
        const data = await fetchProductById(id);
        setProduct(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    }
    getProduct();
  }, [id]);

  if (loading) return <div>Loading product...</div>;
  if (error) return <div>Error: {error}</div>;
  if (!product) return <p>Product not found.</p>;

  return (
    <div className="product-detail-container">
      <button onClick={() => navigate(-1)} className="back-button">
        ← Back
      </button>
      <div className="product-detail">
        <h2>{product.name}</h2>
        <img src={product.image} alt={product.name} />
        <p>{product.description}</p>
        <p>Price: ${product.price}</p>
        <button className="add-to-cart-button">Add to Cart 🛒</button>
      </div>
    </div>
  );
}

export default ProductDetail;
