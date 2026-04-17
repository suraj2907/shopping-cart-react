import { useState, useEffect } from 'react';
import { getProducts } from '../services/api';

const useProducts = () => {
  const [products, setProducts] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchAllProducts = async () => {
      setIsLoading(true);
      setError(null);
      try {
        const data = await getProducts();
        setProducts(data);
      } catch (err) {
        setError(err.message || 'Something went wrong while fetching products.');
      } finally {
        setIsLoading(false);
      }
    };

    fetchAllProducts();
  }, []);

  return { products, setProducts, isLoading, error };
};

export default useProducts;
