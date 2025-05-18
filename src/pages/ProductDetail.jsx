import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { fetchProductById } from "../utils/api";
import { useNavigate } from "react-router-dom";

import "../styles/ProductDetail.css";

function ProductDetail({ handleAdd }) {
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
      <button className="back-button" onClick={() => navigate(-1)}>
        ← Back
      </button>
      <div className="product-detail">
        <img className="product-image" src={product.image} alt={product.name} />
        <div className="product-info">
          <h2>{product.name}</h2>
          <p className="product-price">${product.price}</p>
          <p className="product-description">{product.description}</p>
          <button className="add-to-cart-button" onClick={() => handleAdd(product)}>Add to Cart</button>
        </div>
      </div>
    </div>
  );
}

export default ProductDetail;
