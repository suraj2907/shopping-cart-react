import React, { useContext, useState } from "react";
import { UserContext } from "../Context/UserContext";
import { Navigate } from "react-router-dom";
import ProductItems from "../Components/ProductItems";

const Home = () => {
  const Context = useContext(UserContext);

  // const [user, setUser] = useState(null);

  if (!Context.user?.uid) {
    return <Navigate to="/signin" />;
  }
  return (
    <>
      <div className="col-12 overflow-hidden">
        <ProductItems />
      </div>
    </>
  );
};

export default Home;
