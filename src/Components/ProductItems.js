import React, { useEffect, useState } from "react";
import axios from "axios";
import Footer from "../Layout/Footer";
import Skeleton from "react-loading-skeleton";
import { NavLink } from "react-router-dom";

const ProductItems = () => {
  const [products, setProducts] = useState([]);
  const [filter, setFilter] = useState("ALL");
  const [isLoading, setIsLoading] = useState(false);

  const fetchProducts = async () => {
    setIsLoading(true);
    const { data } = await axios.get(`https://fakestoreapi.com/products`);

    console.log(data);
    setProducts(data);

    setIsLoading(false);
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  const ShowProducts = () => {
    const filteredProducts =
      filter === "ALL"
        ? products
        : products.filter((product) => product.category === filter);
    return (
      <>
        {" "}
        <div className="buttons d-flex justify-content-center mb-4">
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
        {filteredProducts.map((product) => (
          <div className=" col-md-3 mb-4">
            <div
              class="card h-100 ms-5 p-4 d-flex justify-content-center outline text-center"
              key={product.id}
              style={{ width: "300px" }}
            >
              <img
                height="250px"
                class="card-img-top"
                src={product.image}
                alt={product.title}
              />
              <div class="card-body">
                <h5 class="card-title"> {product.title}</h5>
                <p class="card-text">{product.description.substring(0, 100)}</p>
                <p class="card-text" style={{ fontWeight: "bold" }}>
                  ${product.price}
                </p>
                <NavLink
                  to={`/ProductDetails/${product.id}`}
                  class="btn btn-primary"
                >
                  Buy Now
                </NavLink>
              </div>
            </div>
          </div>
        ))}
      </>
    );
  };

  return (
    <>
      <div>
        <div>
          <div className="row">
            <div className="col-12 mb-5">
              <h1 className="display-6 fw-bolder text-center">
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
