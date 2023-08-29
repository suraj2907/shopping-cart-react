import axios from "axios";
import React, { useEffect, useState } from "react";
import { NavLink, useParams } from "react-router-dom";
import { useDispatch } from "react-redux";
import { addToCart } from "../Redux/action/action";
import { useSelector } from "react-redux";

import { FaStar } from "react-icons/fa";
import Skeleton from "react-loading-skeleton";

const cartItemsFromStorage =
  JSON.parse(localStorage.getItem("CartItems")) || [];
const ProductDetails = () => {
  const { id } = useParams();
  const cartItems = useSelector((state) => state.handleCart);
  const [isloading, setIsLoading] = useState(false);
  const [product, setProduct] = useState(cartItemsFromStorage);

  const dispatch = useDispatch();

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        setIsLoading(true);
        const { data } = await axios.get(
          `https://fakestoreapi.com/products/${id}`
        );
        setProduct(data);
      } catch (error) {
        console.error("Error fetching product:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchProduct();
  }, [id]);

  const addProduct = (product) => {
    const existingCartItemsJSON = localStorage.getItem("CartItems");
    const existingCartItems = existingCartItemsJSON
      ? JSON.parse(existingCartItemsJSON)
      : [];

    const updatedProduct = [...existingCartItems, product];
    dispatch(addToCart(product));
    localStorage.setItem("CartItems", JSON.stringify(updatedProduct));
  };

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
        <button className="btn btn-primary" onClick={() => addProduct(product)}>
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
