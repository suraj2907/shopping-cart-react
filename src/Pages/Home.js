import React, { useContext, useState } from "react";
import { UserContext } from "../Context/UserContext";
import { Navigate } from "react-router-dom";
import ProductItems from "../Components/ProductItems";
import Footer from "../Layout/Footer";

const Home = () => {
  const Context = useContext(UserContext);
  const [user, setUser] = useState(null);

  if (!Context.user?.uid) {
    return <Navigate to="/signin" />;
  }
  return (
    <>
      <ProductItems />
    </>
  );
};

export default Home;
