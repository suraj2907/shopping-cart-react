import React, { useContext } from "react";
import { UserContext } from "../Context/UserContext";
import { Navigate } from "react-router-dom";
import ProductItems from "../Components/ProductItems";

const Home = () => {
  const Context = useContext(UserContext);

  if (!Context.user?.uid) {
    return <Navigate to="/signin" />;
  }
  return (
    <>
      <div className="col-12">
        <ProductItems />
      </div>
    </>
  );
};

export default Home;
