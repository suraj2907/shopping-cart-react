import React, { useContext, useEffect, useState } from "react";
import { UserContext } from "../Context/UserContext";
import axios from "axios";
import Footer from "../Layout/Footer";
import Loading from "./Loading";

const ProductItems = () => {
  const [products, setProducts] = useState([]);
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
    return (
      <>
        {" "}
        <div className="buttons d-flex justify-content-center mb-4">
          <button className="btn btn-outline-dark me-2 ">ALL</button>
          <button className="btn btn-outline-dark me-2 ">
            Mens's Clothing
          </button>
          <button className="btn btn-outline-dark me-2 ">
            Women's Clothing
          </button>
          <button className="btn btn-outline-dark me-2 ">
            Jewelery Clothing
          </button>
          <button className="btn btn-outline-dark me-2 ">Electronics</button>
        </div>
        {products.map((product) => (
          <div
            key={product.id}
            className="d-flex justify-content-between align-items-center my-3 me-5 col-md-3"
          >
            <div
              class="card h-100 p-3 outline  text-center"
              style={{ width: "max-content" }}
            >
              <img
                class="card-img-top"
                src={product.image}
                alt={product.title}
              />
              <div class="card-body">
                <h5 class="card-title"> {product.title}</h5>
                <p class="card-text">{product.description}</p>
                <p class="card-text">${product.price}</p>
                <a href="#" class="btn btn-primary">
                  Buy Now
                </a>
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
            {isLoading ? <Loading /> : <ShowProducts />}
          </div>
          <Footer />
        </div>
      </div>
    </>
  );
};

export default ProductItems;
