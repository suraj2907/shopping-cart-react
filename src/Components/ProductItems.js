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

  const ShowProducts = () => {
    const filteredProducts =
      filter === "ALL"
        ? products
        : products.filter((item) => item.category === filter);
    return (
      <>
        {" "}
        <div
          className="buttons d-flex justify-content-center me-3 ms-3  mb-4"
          style={{ overflow: "hidden" }}
        >
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
        {filteredProducts.map((item) => (
          <div className=" col-md-3 col-sm-6 mb-4">
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
                <h5 class="card-title"> {item.title}</h5>
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
      </>
    );
  };

  return (
    <>
      <div>
        <div>
          <div className="row">
            <div className="col-12  mb-5">
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
