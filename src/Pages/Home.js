import React, { useContext, useState } from "react";
import { UserContext } from "../Context/UserContext";
import { Navigate } from "react-router-dom";

const Home = () => {
  const Context = useContext(UserContext);
  const [user, setUser] = useState(null)

  if (!Context.user?.uid) {
    return <Navigate to="/signin" />;
  }
  return <div>Home</div>;
};

export default Home;
