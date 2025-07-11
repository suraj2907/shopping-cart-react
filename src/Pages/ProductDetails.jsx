import axios from "axios";
import React, { useEffect, useState } from "react";
import { NavLink, useParams } from "react-router-dom";
import { useDispatch } from "react-redux";
import { addToCart } from "../Redux/action/action";
import { useSelector } from "react-redux";

import { FaStar } from "react-icons/fa";
// Removed Skeleton import and CSS

const ProductDetails = () => {
  const { id } = useParams();
  const cartItems = useSelector((state) => state.handleCart);
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

  // Listing of product acc. to their Id's received from previous page
  const ShowProducts = () => (
    <div className="w-full flex justify-center">
      <div className="bg-white rounded-3xl shadow-2xl p-8 flex flex-col md:flex-row gap-10 max-w-4xl w-full items-start">
        {/* Image Section */}
        <div className="flex flex-1 justify-center items-center w-full md:w-1/2 bg-gray-50 rounded-2xl p-6 shadow-inner">
          <img
            src={product.image}
            alt={product.title}
            className="h-72 w-72 object-contain rounded-xl drop-shadow-lg mb-4"
          />
        </div>
        {/* Details Section */}
        <div className="flex flex-wrap justify-center w-full md:w-1/2 gap-4">
          <span className="inline-block px-3 py-1 bg-blue-100 text-blue-700 text-xs font-semibold rounded-full w-max mb-2 uppercase tracking-wide">
            {product.category}
          </span>
          <h1 className="text-2xl md:text-3xl font-extrabold text-gray-800 mb-2 leading-tight">
            {product.title}
          </h1>
          <div className="flex items-center gap-3 mb-2">
            <span className="text-lg font-semibold text-gray-700 flex items-center">
              {product.rating && product.rating.rate}
              <FaStar className="ml-1 text-yellow-400" />
            </span>
            <span className="text-gray-400 text-sm">
              ({product.rating && product.rating.count} reviews)
            </span>
          </div>
          <h3 className="text-2xl font-bold text-blue-600 mb-2">
            ${product.price}
          </h3>
          <p className="text-gray-600 text-base mb-4 leading-relaxed">
            {product.description}
          </p>
          <div className="flex flex-col sm:flex-row gap-4 mt-4">
            <button
              className="flex-1 px-6 py-3 rounded-xl bg-yellow-400 text-slate-900 font-bold text-lg shadow hover:bg-yellow-300 transition"
              onClick={() => addProduct(product)}
            >
              Add to Cart ({cartItems.length})
            </button>
            <NavLink
              to="/MyCart"
              className="flex-1 px-6 py-3 rounded-xl border-2 border-blue-600 text-blue-600 font-bold text-lg text-center hover:bg-blue-600 hover:text-white transition shadow"
            >
              Go to Cart
            </NavLink>
          </div>
        </div>
      </div>
    </div>
  );

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-50">
      <div className="w-full max-w-4xl p-6 bg-white rounded-2xl shadow-lg">
        {isLoading ? (
          <div className="flex flex-col md:flex-row gap-8">
            <div className="w-full md:w-1/2">
              <div className="animate-pulse bg-gray-300 h-[400px] w-full rounded"></div>
            </div>
            <div className="w-full md:w-1/2 flex flex-col gap-4">
              <div className="animate-pulse bg-gray-300 h-[50px] w-[300px] rounded"></div>
              <div className="animate-pulse bg-gray-300 h-[75px] w-full rounded"></div>
              <div className="animate-pulse bg-gray-300 h-[25px] w-[50px] rounded"></div>
              <div className="animate-pulse bg-gray-300 h-[50px] w-full rounded"></div>
              <div className="animate-pulse bg-gray-300 h-[150px] w-full rounded"></div>
              <div className="animate-pulse bg-gray-300 h-[50px] w-[100px] rounded"></div>
            </div>
          </div>
        ) : (
          product && <ShowProducts />
        )}
      </div>
    </div>
  );
};

export default ProductDetails;
