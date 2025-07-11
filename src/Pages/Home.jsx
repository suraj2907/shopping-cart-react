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
    <div className="w-full flex-col flex-wrap items-center justify-center min-h-screen bg-gray-50">
      <div className="w-full px-4 py-8">
        <ProductItems />
      </div>
    </div>
  );
};

export default Home;
