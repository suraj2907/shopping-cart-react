import "./App.css";
import { Routes, Route } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import { UserContext } from "./Context/UserContext";
import { useState, useEffect } from "react";
import SignIn from "./Pages/SignIn";
import SignUp from "./Pages/SignUp";
import Home from "./Pages/Home";
import firebase from "firebase/compat/app";
import FireBaseConfig from "./FireBaseConfig/FireBaseConfig";
import NavBar from "./Layout/NavBar";
import MyCart from "./Pages/MyCart";
import ProductDetails from "./Pages/ProductDetails";
import Checkout from "./Pages/Checkout";

firebase.initializeApp(FireBaseConfig);
const App = () => {
  const [user, setUser] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    setIsLoading(true);

    const unsubscribe = firebase.auth().onAuthStateChanged((authUser) => {
      setIsLoading(true);
      if (authUser) {
        setUser(authUser);
      } else {
        setUser(null);
      }
      setIsLoading(false);
    });

    return () => {
      // Unsubscribe the listener when component unmounts
      unsubscribe();
    };
  }, []);

  return isLoading ? (
    <div>...Loading</div>
  ) : (
    <>
      {" "}
      <ToastContainer />
      <UserContext.Provider value={{ user, setUser }}>
        <NavBar />
        <Routes>
          <Route exact path="/" element={<Home />} />
          <Route exact path="/Signup" element={<SignUp />} />
          <Route exact path="/Signin" element={<SignIn />} />
          <Route
            exact
            path="/ProductDetails/:id"
            element={<ProductDetails />}
          />
          <Route exact path="/MyCart" element={<MyCart />} />
          <Route exact path="/checkout" element={<Checkout />} />
        </Routes>
      </UserContext.Provider>
    </>
  );
};

export default App;
