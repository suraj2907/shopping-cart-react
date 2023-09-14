import React, { useEffect, useState } from "react";
import axios from "axios";
import Footer from "../Layout/Footer";
import Skeleton from "react-loading-skeleton";
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
        <div className="buttons d-flex justify-content-center flex-wrap mb-2 gap-2 text-center ">
          <h4 className="text-center overflow-hidden">Sort By Price -&gt; </h4>
          <button
            className="btn btn-outline-dark"
            onClick={() => sortProduct("price-asc")}
          >
            Ascending Price
          </button>
          <button
            className="btn btn-outline-dark"
            onClick={() => sortProduct("price-desc")}
          >
            Descending Price
          </button>
        </div>
        {/* Sort By Categories */}
        <div className="buttons d-flex justify-content-center flex-wrap text-center gap-2  mb-4">
          <h4 className="text-center overflow-hidden">
            Sort By Categories -&gt;{" "}
          </h4>

          <button
            className="btn btn-outline-dark me-2 "
            onClick={() => setFilter("ALL")}
          >
            ALL
          </button>
          <button
            className="btn btn-outline-dark me-2 "
            onClick={() => setFilter("men's clothing")}
          >
            Mens's Clothing
          </button>
          <button
            className="btn btn-outline-dark me-2 "
            onClick={() => setFilter("women's clothing")}
          >
            Women's Clothing
          </button>
          <button
            className="btn btn-outline-dark me-2 "
            onClick={() => setFilter("jewelery")}
          >
            Jewelery
          </button>
          <button
            className="btn btn-outline-dark me-2 "
            onClick={() => setFilter("electronics")}
          >
            Electronics
          </button>
        </div>
        <div className="d-flex flex-wrap justify-content-center">
          {filteredProducts.map((item) => (
            <div className=" d-flex  flex-wrap col-md-3 col-sm-6 mb-4">
              <div
                class="card h-100 ms-5 p-4 d-flex justify-content-center outline text-center"
                key={item.id}
                style={{ width: "300px" }}
              >
                <img
                  height="250px"
                  class="card-img-top"
                  src={item.image}
                  alt={item.title}
                />
                <div class="card-body">
                  <h5 class="card-title overflow-hidden"> {item.title}</h5>
                  <p class="card-text">{item.description.substring(0, 100)}</p>
                  <p class="card-text" style={{ fontWeight: "bold" }}>
                    ${item.price}
                  </p>
                  <NavLink
                    to={`/ProductDetails/${item.id}`}
                    class="btn btn-primary"
                  >
                    Buy Now
                  </NavLink>
                </div>
              </div>
            </div>
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
          <div className="d-flex row justify-content-center ">
            {isLoading ? (
              <>
                <div className="col-md-3">
                  <Skeleton height={350} />
                </div>
                <div className="col-md-3">
                  <Skeleton height={350} />
                </div>
                <div className="col-md-3">
                  <Skeleton height={350} />
                </div>
                <div className="col-md-3">
                  <Skeleton height={350} />
                </div>
              </>
            ) : (
              <ShowProducts />
            )}
          </div>
          <Footer />
        </div>
      </div>
    </>
  );
};

export default ProductItems;
