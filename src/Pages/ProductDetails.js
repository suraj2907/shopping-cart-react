import axios from "axios";
import React, { useEffect, useState } from "react";
import { NavLink, useParams } from "react-router-dom";
import { useDispatch } from "react-redux";
import { addToCart } from "../Redux/action/action";
//import { useSelector } from "react-redux";

import { FaStar } from "react-icons/fa";
import Skeleton from "react-loading-skeleton";

const ProductDetails = () => {
  const { id } = useParams();
  //const cartItems = useSelector((state) => state.handleCart);
  const [isLoading, setIsLoading] = useState(true);
  const [product, setProduct] = useState({});

  const dispatch = useDispatch();

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        setIsLoading(true);
        const { data } = await axios.get(
          `https://fakestoreapi.com/products/${id}`
        );
        setProduct(data);
        setIsLoading(false);
      } catch (error) {
        console.error("Error fetching product:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchProduct();
  }, [id]);

  const addProduct = (product) => {
    if (product) {
      dispatch(addToCart(product));

      // Retrieve existing cart items from localStorage
      const existingCartItemsJSON = localStorage.getItem("CartItems");
      const existingCartItems = existingCartItemsJSON
        ? JSON.parse(existingCartItemsJSON)
        : [];

      // Find the index of the existing product in cart items
      const existingProductIndex = existingCartItems.findIndex(
        (item) => item.id === product.id
      );

      if (existingProductIndex !== -1) {
        // If the product already exists in the cart, update its quantity
        existingCartItems[existingProductIndex].qty++;
      } else {
        // If the product doesn't exist, add it with a quantity of 1
        existingCartItems.push({ ...product, qty: 1 });
      }

      // Store the updated cart items back in localStorage
      localStorage.setItem("CartItems", JSON.stringify(existingCartItems));
    } else {
      console.error("Invalid product:", product);
    }
  };

  useEffect(() => {
    const cartJSON = localStorage.getItem("CartItems");
    if (cartJSON) {
      const cartArray = JSON.parse(cartJSON);

      // Ensure cartArray is always an array
      if (!Array.isArray(cartArray)) {
        console.error("Invalid cartArray:", cartArray);
        return;
      }
      //Dispatch addToCart action to populate the Redux store with items from local storage
      cartArray.forEach((item) => {
        dispatch(addToCart(item));
      });
    }
  }, [dispatch]);

  // Listin g of product acc. to their Id's received from previous page
  const ShowProducts = () => (
    <div className="d-flex row " key={product.id}>
      <div className="col-md-6 col-sm-3 mt-5">
        <img
          src={product.image}
          alt={product.title}
          height="400px"
          width="400px"
        />
      </div>
      <div className="col-md-6 mt-5  ">
        <h4 className="text-uppercase text-black-50 overflow-hidden">{product.category}</h4>
        <h1 className="display-5 overflow-hidden">{product.title}</h1>
        <p className="lead fw-bolder overflow-hidden">
          Rating {product.rating && product.rating.rate}
          <FaStar />
        </p>
        <h3 className="display-6 fw-bolder my-4 overflow-hidden">${product.price}</h3>
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
          {isLoading ? (
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
            product && <ShowProducts />
          )}
        </div>
      </div>
    </>
  );
};

export default ProductDetails;
