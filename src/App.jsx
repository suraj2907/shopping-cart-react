import React from "react";
import "./App.css";
import { Routes, Route } from "react-router-dom";
import { UserContext } from "./context/UserContext";
import { useState, useEffect } from "react";
import SignIn from "./pages/SignIn";
import SignUp from "./pages/SignUp";
import Home from "./pages/Home";
import firebase from "firebase/compat/app";
import FireBaseConfig from "./firebase/FireBaseConfig";
import NavBar from "./layout/NavBar";
import MyCart from "./pages/MyCart";
import ProductDetails from "./pages/ProductDetails";
import Checkout from "./pages/Checkout";
import NotFound from "./pages/NotFound";
import { ToastProvider } from "./components/Toast";

firebase.initializeApp(FireBaseConfig);
const App = () => {
  const [user, setUser] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    setIsLoading(true);

    const unsubscribe = firebase.auth().onAuthStateChanged((authUser) => {
      setIsLoading(false);
      if (authUser) {
        setUser({ email: authUser.email, uid: authUser.uid });
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
      <ToastProvider>
        <UserContext.Provider value={{ user, setUser }}>
          <NavBar />
          <div>
            {" "}
            {/* Add padding for fixed navbar */}
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
              <Route path="*" element={<NotFound />} />
            </Routes>
          </div>
        </UserContext.Provider>
      </ToastProvider>
    </>
  );
};

export default App;
