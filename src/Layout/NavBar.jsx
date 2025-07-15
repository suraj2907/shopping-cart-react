import React, { useContext, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { UserContext } from "../Context/UserContext";
import { FaShoppingCart, FaBars, FaTimes } from "react-icons/fa";
import { useSelector } from "react-redux";
import firebase from "firebase/compat/app";
import "firebase/compat/auth";

const NavBar = () => {
  const cartItems = useSelector((state) => state.handleCart);
  const context = useContext(UserContext);
  const [toggle, setToggle] = useState(false);
  const location = useLocation();
  const isSignIn = location.pathname.toLowerCase().includes("signin");
  const isSignUp = location.pathname.toLowerCase().includes("signup");

  // Debug: log user context
  // console.log("NavBar context.user:", context.user);

  const handleToggle = () => setToggle(!toggle);

  const handleLogOut = () => {
    firebase
      .auth()
      .signOut()
      .then(() => {
        context.setUser(null);
        localStorage.clear();
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <nav className="w-full bg-slate-900 text-yellow-400 px-6 py-3 flex items-center justify-between shadow-lg fixed top-0 left-0 z-50">
      <Link
        to="/"
        className="text-2xl font-bold tracking-wide text-white hover:text-blue-200 transition"
      >
        E-Commerce
      </Link>
      <div className="flex items-center gap-6">
        {/* Cart always visible after login */}
        {context.user && (
          <Link
            to="/MyCart"
            className="flex items-center gap-1 hover:text-blue-200 transition"
          >
            <FaShoppingCart />
            <span>Cart ({cartItems.length})</span>
          </Link>
        )}
        {/* Email only on desktop after login */}
        {context.user?.email && (
          <span className="hidden md:inline-block font-semibold text-white/80">
            {context.user.email}
          </span>
        )}
        {/* Toggle button: only visible on mobile */}
        <button className="block md:hidden ml-2" onClick={handleToggle}>
          {toggle ? <FaTimes size={24} /> : <FaBars size={24} />}
        </button>
      </div>
      {/* Desktop Auth Buttons: only visible on desktop */}
      <div className="hidden md:flex items-center gap-4 ml-8">
        {context.user ? (
          <button
            onClick={handleLogOut}
            className="bg-slate-900 text-yellow-400 px-4 py-2 rounded-lg font-semibold hover:bg-blue-100 transition"
          >
            Logout
          </button>
        ) : (
          <>
            {!isSignIn && (
              <Link
                to="/signin"
                className="bg-slate-900 text-yellow-400 px-4 py-2 rounded-lg font-semibold hover:bg-blue-100 transition"
              >
                SignIn
              </Link>
            )}
            {!isSignUp && (
              <Link
                to="/signup"
                className="bg-slate-900 text-yellow-400 px-4 py-2 rounded-lg font-semibold hover:bg-blue-100 transition"
              >
                SignUp
              </Link>
            )}
          </>
        )}
      </div>
      {/* Mobile Dropdown: only visible on mobile when toggled */}
      {toggle && (
        <div className="absolute top-16 right-0 bg-black rounded-xl shadow-lg flex flex-col items-start gap-2 p-4 z-50 md:hidden w-full min-w-[150px]">
          {context.user ? (
            <button
              onClick={() => {
                handleLogOut();
                setToggle(false);
              }}
              className="w-full bg-slate-900 text-yellow-400 px-4 py-2 rounded-lg font-semibold hover:bg-blue-100 transition text-left"
            >
              Logout
            </button>
          ) : (
            <>
              {!isSignIn && (
                <Link
                  to="/signin"
                  className="w-full bg-slate-900 text-yellow-400 px-6 py-4 rounded-lg font-semibold hover:bg-blue-100 transition text-lg"
                  onClick={() => setToggle(false)}
                >
                  SignIn
                </Link>
              )}
              {!isSignUp && (
                <Link
                  to="/signup"
                  className="w-full bg-slate-900 text-yellow-400 px-6 py-4 rounded-lg font-semibold hover:bg-blue-100 transition text-lg"
                  onClick={() => setToggle(false)}
                >
                  SignUp
                </Link>
              )}
            </>
          )}
        </div>
      )}
    </nav>
  );
};

export default NavBar;
