import React, { useEffect, useState } from "react";
import axios from "axios";
import Footer from "../Layout/Footer";
import { NavLink } from "react-router-dom";

const ProductItems = () => {
  const [products, setProducts] = useState([]);
  const [filter, setFilter] = useState("ALL");
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const fetchProducts = async () => {
      setIsLoading(true);
      const { data } = await axios.get(`https://fakestoreapi.com/products`);

      console.log(data);
      setProducts(data);

      setIsLoading(false);
    };

    fetchProducts();
  }, []);

  const sortProduct = (order) => {
    const sorted = [...products];
    if (order === "price-asc") {
      sorted.sort((a, b) => a.price - b.price);
    } else if (order === "price-desc") {
      sorted.sort((a, b) => b.price - a.price);
    }
    setProducts(sorted);
  };

  const ShowProducts = () => {
    const filteredProducts =
      filter === "ALL"
        ? products
        : products.filter((item) => item.category === filter);
    return (
      <>
        {" "}
        {/* Sort By Price */}
        <div className="flex flex-col items-center mb-2 gap-2">
          <h1 className="text-center text-xl font-semibold mb-2">
            Sort By Price -&gt;{" "}
          </h1>
          <div className="flex flex-wrap justify-center gap-2">
            <button
              className="px-4 py-2 rounded-xl bg-yellow-400 text-slate-900 hover:bg-yellow-300 font-semibold text-center transition-all duration-200 shadow"
              onClick={() => sortProduct("price-asc")}
            >
              Ascending Price
            </button>
            <button
              className="px-4 py-2 rounded-xl bg-yellow-400 text-slate-900 hover:bg-yellow-300 font-semibold text-center transition-all duration-200 shadow"
              onClick={() => sortProduct("price-desc")}
            >
              Descending Price
            </button>
          </div>
        </div>
        {/* Sort By Categories */}
        <div className="flex flex-col items-center gap-2 mb-4">
          <h4 className="text-center text-xl font-semibold mb-2">
            Sort By Categories -&gt;{" "}
          </h4>
          <div className="flex flex-wrap justify-center gap-2">
            <button
              className="w-auto py-2 px-4 rounded-xl bg-yellow-400 text-slate-900 hover:bg-yellow-300 font-semibold text-center transition-all duration-200 shadow"
              onClick={() => setFilter("ALL")}
            >
              ALL
            </button>
            <button
              className="px-4 py-2 rounded-xl bg-yellow-400 text-slate-900 hover:bg-yellow-300 font-semibold text-center transition-all duration-200 shadow "
              onClick={() => setFilter("men's clothing")}
            >
              Mens's Clothing
            </button>
            <button
              className="px-4 py-2 rounded-xl bg-yellow-400 text-slate-900 hover:bg-yellow-300 font-semibold text-center transition-all duration-200 shadow "
              onClick={() => setFilter("women's clothing")}
            >
              Women's Clothing
            </button>
            <button
              className="px-4 py-2 rounded-xl bg-yellow-400 text-slate-900 hover:bg-yellow-300 font-semibold text-center transition-all duration-200 shadow "
              onClick={() => setFilter("jewelery")}
            >
              Jewelery
            </button>
            <button
              className="px-4 py-2 rounded-xl bg-yellow-400 text-slate-900 hover:bg-yellow-300 font-semibold text-center transition-all duration-200 shadow "
              onClick={() => setFilter("electronics")}
            >
              Electronics
            </button>
          </div>
        </div>
        <div className="flex flex-wrap gap-8 justify-center">
          {filteredProducts.map((item) => (
            <NavLink
              key={item.id}
              to={`/ProductDetails/${item.id}`}
              className="bg-white rounded-2xl shadow-lg flex flex-col justify-between items-center p-5 w-full sm:w-72 min-h-[430px] hover:shadow-2xl transition-shadow duration-200 cursor-pointer group"
            >
              <img
                src={item.image}
                alt={item.title}
                className="h-48 w-48 mx-auto object-contain mb-4 rounded-xl bg-gray-50 group-hover:scale-105 transition-transform duration-200"
              />
              <h5 className="font-bold text-lg text-center mb-2 line-clamp-2">
                {item.title}
              </h5>
              <p className="text-gray-600 text-sm text-center mb-2 line-clamp-3">
                {item.description.substring(0, 100)}...
              </p>
              <p className="text-blue-700 font-bold text-xl mt-auto mb-2">
                ${item.price}
              </p>
              <span className="w-full py-2 rounded-xl bg-yellow-400 text-slate-900 font-semibold text-center transition-all duration-200 shadow group-hover:bg-yellow-300">
                Buy Now
              </span>
            </NavLink>
          ))}
        </div>
      </>
    );
  };

  return (
    <>
      <div>
        <div>
          <div className="row">
            <div className="col-12  mb-5">
              <h1 className="display-6 overflow-hidden fw-bolder text-center">
                Latest Products
              </h1>
              <hr />
            </div>
          </div>
          <div className="flex flex-wrap justify-center gap-6 overflow-hidden ">
            {isLoading ? (
              <>
                {[...Array(4)].map((_, idx) => (
                  <div
                    key={idx}
                    className="flex flex-col items-center gap-2 w-[300px]"
                  >
                    <div className="animate-pulse bg-gray-300 h-[250px] w-[250px] rounded mb-2"></div>
                    <div className="animate-pulse bg-gray-300 h-[50px] w-[150px] rounded mb-2"></div>
                    <div className="animate-pulse bg-gray-300 h-[75px] w-[200px] rounded mb-2"></div>
                    <div className="animate-pulse bg-gray-300 h-[50px] w-[50px] rounded mb-2"></div>
                    <div className="animate-pulse bg-gray-300 h-[35px] w-[50px] rounded"></div>
                  </div>
                ))}
              </>
            ) : (
              <ShowProducts />
            )}
          </div>

          {isLoading ? "" : <Footer />}
        </div>
      </div>
    </>
  );
};

export default ProductItems;
