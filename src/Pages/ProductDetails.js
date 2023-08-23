import axios from "axios";
import React, { useEffect, useState } from "react";
import { NavLink, useParams } from "react-router-dom";
import { useDispatch } from "react-redux";
import { addToCart } from "../Redux/action/action";

import { FaStar } from "react-icons/fa";
import Skeleton from "react-loading-skeleton";

const ProductDetails = () => {
  const { id } = useParams();
  const [product, setProduct] = useState([]);
  const [isloading, setIsLoading] = useState(false);

  const dispatch = useDispatch();

  useEffect(() => {
    // Get the current cart items from local storage
    if (product) {
      const cartItems = JSON.parse(localStorage.getItem("cartItems")) || [];

      // Add the new product to the cart items array
      cartItems.push(product);

      // Store the updated cart items back in local storage
      localStorage.setItem("cartItems", JSON.stringify(cartItems));
    }
  }, [product]);

  const addProductToCart = (product) => {
    dispatch(addToCart(product));
  };

  useEffect(() => {
    const fetchProduct = async () => {
      setIsLoading(true);
      const { data } = await axios.get(
        `https://fakestoreapi.com/products/${id}`
      );
      console.log(data);
      setProduct(data);

      setIsLoading(false);
    };

    fetchProduct();
  }, [id]);

  const ShowProducts = () => (
    <div className="d-flex row" key={product.id}>
      <div className="col-md-6 col-sm-3 mt-5">
        <img
          src={product.image}
          alt={product.title}
          height="400px"
          width="400px"
        />
      </div>
      <div className="col-md-6 mt-5">
        <h4 className="text-uppercase text-black-50">{product.category}</h4>
        <h1 className="display-5">{product.title}</h1>
        <p className="lead fw-bolder">
          Rating {product.rating && product.rating.rate}
          <FaStar />
        </p>
        <h3 className="display-6 fw-bolder my-4">${product.price}</h3>
        <p className="lead">{product.description}</p>
        <button
          className="btn btn-primary"
          onClick={() => addProductToCart(product)}
        >
          Add to Cart
        </button>
        <NavLink to="/MyCart" className="btn btn-outline-dark ms-2">
          Go to Cart
        </NavLink>
      </div>
    </div>
  );

  return (
    <>
      <div className="container py-5">
        <div className="row">
          {isloading ? (
            <>
              {" "}
              <div className="col-md-6">
                <Skeleton height={400} />
              </div>
              <div className="col-md-6">
                <Skeleton width={300} height={50} />
                <Skeleton height={75} />
                <Skeleton width={25} height={150} />
                <Skeleton height={50} />
                <Skeleton height={150} />
                <Skeleton height={50} width={100} />
                <Skeleton height={50} width={100} />
              </div>
            </>
          ) : (
            <ShowProducts />
          )}
        </div>
      </div>
    </>
  );
};

export default ProductDetails;
